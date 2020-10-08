<template>
	<view class="chatInterface" >
		<image class="group-icon" src="/static/images/group-icon.png" @click="showMembers" />
		<view class="scroll-view">
			<view class="all-history-loaded">
				{{allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息'}}
			</view>
			<!--已经收到的消息-->
			<view v-for="(message, key) in messages || []"
				 :key="message.timestamp"
				 class = "message-item"
				 :class="{'self' : message.senderId == (currentUser && currentUser.uuid)}">
				<view class="avatar">
					<image :src="currentUser.avatar" v-if="message.senderId == currentUser && currentUser.uuid"></image>
					<image :src="groupMembers[message.senderId].avatar" v-else></image>
				</view>
				<view class="content">
					<span class="text-content" v-if="message.type =='text'">{{message.payload.text}}</span>
					<image class="image-content" v-if="message.type == 'image'" :src="message.payload.url" :data-url="message.payload.url" @click="showImageFullScreen" mode="widthFix"></image>
					<view class="video-snapshot"  v-if="message.type == 'video'" :data-url="message.payload.video.url" @click="playVideo">
						<image :src="message.payload.thumbnail.url" mode="aspectFit"></image>
						<view class="video-play-icon"></view>
					</view>
					<GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url" :duration="message.payload.duration" />
				</view>
			</view>
			<!--发送中的消息-->
			<view v-for="(message, index) in pendingMessages || []"
				 :key="index"
				 class = "message-item"
				 :class="{'self' : message.senderId == (currentUser && currentUser.uuid)}">
				<view class="avatar">
					<image :src="currentUser.avatar" v-if="message.senderId == currentUser && currentUser.uuid"></image>
					<image :src="groupMembers[message.senderId].avatar" v-else></image>
				</view>
				<view class="content">
					<b class="pending"></b>
					<span class="text-content" v-if="message.type =='text'">{{message.payload.text}}</span>
					<image class="image-content" v-if="message.type == 'image'" :src="message.payload.url" @load="scrollToBottom" mode="widthFix"></image>
					<view class="video-snapshot" v-if="message.type == 'video'">
						<video :src="message.payload.video.url"></video>
						<view class="video-play-icon"></view>
					</view>
					<GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url" :duration="message.payload.duration" />
				</view>
			</view>
		</view>
		<view class="action-box" v-if="!video.visible">
			<view class="action-top">
				<view :class="[audio.visible ? 'record-icon record-open':'record-icon']" @click="switchAudioKeyboard"></view>
				<view class="record-input" @longpress="onRecordStart" @touchend="onRecordEnd" v-if="audio.visible" >{{audio.recording ? '松开发送' : '按住录音'}}</view>
				<view class="message-input" v-else>
					<input type="text" placeholder="发送消息" v-model="content">
				</view>
				<view class="file-icon img-video" @click="sendImage"></view>
				<view class="file-icon" @click="sendVideo"></view>
				<span class="send-message-btn" @click="sendMessage">发送</span>
			</view>
		</view>
		<view class="record-loading" v-if="audio.recording"></view>
		<video :src="video.url" v-if="video.visible" id="videoPlayer" autoplay="true" @fullscreenchange="onVideoFullScreenChange"  @play="onVideoPlayStart"></video>
		<view style="position: absolute;bottom: 200rpx;left: 10rpx;display: flex;flex-direction: column;">
			<button style="background-color: #007AFF;font-size: 25rpx;color: #FFFFFF;border-radius: 25rpx;" @click="toPJ" v-if="isSaving">进入评价</button>
		</view>
	</view>
	
</template>

<script>
	import GoEasyAudioPlayer from "../../../components/GoEasyAudioPlayer/GoEasyAudioPlayer";
	const recorderManager = uni.getRecorderManager();
	export default {
		name: "groupChat",
		components : {
			GoEasyAudioPlayer,
		},
		onShow() {
			this.isSaving = uni.getStorageSync("isForSave");
		},
		data () {
			return {
				//聊天文本框
				content: '',
				group:null,
				currentUser: null,

				//群成员
				groupMembers : {},
				//已经接收到的消息
				messages: [],
				//正在发送中的消息
				pendingMessages : [],
				//已经加载完所有历史消息
				allHistoryLoaded: false,

				audio : {
					//语音录音中
					recording : false,

					//录音按钮展示
					visible : false
				},
				video : {
					visible : false,
					url : '',
					context : null
				},
				imService : null,
				isSaving:false
			}
		},
		watch : {
			pendingMessages(){
				this.scrollToBottom()
			}
		},
		onReady () {
			this.video.context = uni.createVideoContext('videoPlayer');
		},
		onLoad(options) {

			this.imService = getApp().globalData.imService;
			if(!this.imService || !this.imService.currentUser){
				uni.navigateTo({
					url : '../../login/login'
				});
				return
			}
			//对话数据
			this.group = JSON.parse(options.group);
			this.currentUser = this.imService.currentUser;
			let privateMessages = this.imService.getGroupMessages(this.group.uuid);
			this.messages = privateMessages.sentMessages;
			this.pendingMessages = privateMessages.pendingMessages;
			this.groupMembers = this.imService.getGroupMembers(this.group.uuid);
			uni.setNavigationBarTitle({
				title : this.group.name + "（" + Object.keys(this.groupMembers).length + "）"
			});
			
			this.initialListeners();

			
			//每次进入聊天页面，总是滚动到底部
			this.scrollToBottom()

			if(this.messages.length !=0){
				this.imService.markGroupMessageAsRead(this.group.uuid);
			}
		},
		onPullDownRefresh: function(e) {
			this.loadMoreHistoryMessage()
		},
		onUnload() {
			//退出聊天页面之前，清空页面传入的监听器
			this.imService.onNewGroupMessageReceive =  (groupId, message)=> {};
			this.imService.onGroupHistoryLoad = (groupId, messages) =>{ };
		},
		methods : {
			toPJ(){
				uni.navigateTo({
					url:'../../evaluate/evaluate'
				})
			}
			,
			initialListeners(){
				//传入监听器，收到一条私聊消息总是滚到到页面底部
				this.imService.onNewGroupMessageReceive =  (groupId, message)=> {
					if (groupId == this.group.uuid) {
						this.imService.markGroupMessageAsRead(groupId);
						//收到新消息，是滚动到最底部
						this.scrollToBottom();
					}
				};
				
				//传入监听器，完成一次私聊历史加载时，如果加载结果为空，显示没有更多消息
				this.imService.onGroupHistoryLoad = (groupId, messages) =>{
					if (messages.length == 0) {
						//todo:灰色，就不能点击了
						this.allHistoryLoaded = true;
					}
					uni.stopPullDownRefresh();
				};
				
				// 录音监听器
				this.initRecorderListeners();
			},
			initRecorderListeners(){
				var self = this;
				// 监听录音开始
				recorderManager.onStart(function(){
					console.log("onStart");
					self.audio.recording = true;
				});
				
				//录音结束后，发送
				recorderManager.onStop(function(res){
					console.log("onStop");
					self.audio.recording = false;
					self.imService.sendGroupAudioMessage(self.group.uuid, res)
				});
				
				// 监听录音报错
				recorderManager.onError(function(res){
					console.log("录音报错：",res);
				})
			},
			sendMessage () {//发送消息
				if(this.content.trim() != "") {
					this.imService.sendGroupTextMessage(this.group.uuid, this.content);
				}
				this.content = "";
			},
			loadMoreHistoryMessage () {//历史消息
				let lastMessageTimeStamp = Date.now();
				let lastMessage = this.messages[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				this.imService.loadGroupHistoryMessage(this.group.uuid, lastMessageTimeStamp);
			},
			showMembers () {//显示群成员
				uni.navigateTo({
					url : '../groupChat/member?users=' + JSON.stringify(this.groupMembers)
				})
			},
			onRecordStart () {
				try{
					recorderManager.start();
				}catch(e){
					console.log("e:",e);
					uni.showModal({
						title: '录音错误',
						content : '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
					});
				}
			},
			onRecordEnd () {
				try{
					recorderManager.stop();
				}catch(e){
					console.log("e:",e);
					uni.showModal({
						title: '录音错误',
						content : '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
					});
				}
			},
			sendVideo () {//发送文件
				uni.chooseVideo({
					success : (res) => {
						this.imService.sendGroupVideoMessage(this.group.uuid, res)
					}
				})
			},
			sendImage() {
				uni.chooseImage({
					count :1,
					success :(res) => {
						this.imService.sendGroupImageMessage(this.group.uuid,res);
					}
				})
			},
			showImageFullScreen (e) {
				var imagesUrl = [e.currentTarget.dataset.url];
				uni.previewImage({
					urls: imagesUrl
				});
			},
			//语音录制按钮和键盘输入的切换
			switchAudioKeyboard() {
				this.audio.visible = !this.audio.visible;
			},
			playVideo (e) {
				this.video.visible = true;
				this.video.url = e.currentTarget.dataset.url;
			},
			onVideoPlayStart () {
				this.video.context.requestFullScreen({
					direction : 0
				});
			},
			onVideoFullScreenChange (e) {
				//当退出全屏播放时，隐藏播放器
				if(this.video.visible && !e.detail.fullScreen){
					this.video.visible = false;
					this.video.context.stop();
				}
			},
			scrollToBottom () {
				this.$nextTick(function(){
					uni.pageScrollTo({
						scrollTop: 2000000,
						duration : 10
					})
				})
			}
		}
	}
</script>

<style>

</style>
