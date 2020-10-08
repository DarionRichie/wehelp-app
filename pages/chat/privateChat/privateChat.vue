<template>
	<view class="chatInterface">
		<view class="scroll-view">
			<view class="all-history-loaded">
				{{allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息'}}
			</view>
			<!--已经收到的消息-->
			<view v-for="(message, key) in messages || []"
				 :key="message.timestamp"
				 class = "message-item"
				 :class="{'self' : message.senderId == (currentUser && currentUser.uuid)}">
				<view :class="friend.online ? 'avatar' : 'avatar offline-gray'"
					 v-if="message.senderId != (currentUser && currentUser.uuid)">
					<image :src="friend.avatar"></image>
				</view>
				<view class="avatar" v-else>
					<image :src="currentUser.avatar"></image>
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
				<view :class="friend.online ? 'avatar' : 'avatar offline-gray'"
					 v-if="message.senderId != (currentUser && currentUser.uuid)">
					<image :src="friend.avatar"></image>
				</view>
				<view class="avatar" v-else>
					<image :src="currentUser.avatar"></image>
				</view>
				<view class="content">
					<b class="pending"></b>
					<span class="text-content" v-if="message.type =='text'">{{message.payload.text}}</span>
					<image class="image-content" v-if="message.type == 'image'" :src="message.payload.url"  mode="widthFix" @load="scrollToBottom"></image>
					<view class="video-snapshot" v-if="message.type == 'video'">
						<image :src="message.payload.thumbnail.url" mode="aspectFit" @load="scrollToBottom"></image>
						<view class="video-play-icon"></view>
					</view>
					<GoEasyAudioPlayer v-if="message.type =='audio'" :src="message.payload.url" :duration="message.payload.duration" />
				</view>
			</view>
		</view>
		<view class="action-box" v-if="!video.visible">
			<view class="action-top">
				<view :class="[audio.visible ? 'record-icon record-open':'record-icon']" @click="switchAudioKeyboard"></view>
				<view class="record-input" @touchstart="onRecordStart" @touchend="onRecordEnd" v-if="audio.visible" >{{audio.recording ? '松开发送' : '按住录音'}}</view>
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
	</view>
</template>

<script>
	import GoEasyAudioPlayer from "../../../components/GoEasyAudioPlayer/GoEasyAudioPlayer";
	const recorderManager = uni.getRecorderManager();
	export default {
		name: "privateChat",
		components : {
			GoEasyAudioPlayer,
		},
		data() {
			return {

				//聊天文本框
				content: '',
				friend: null,
				currentUser: null,
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
				imService : null
			}
		},
		watch : {
			//每当新增了发送中的消息，都滑动到底部
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
			this.friend = JSON.parse(options.friend);
			this.currentUser = this.imService.currentUser;
			let privateMessages = this.imService.getPrivateMessages(this.friend.uuid);
			this.messages = privateMessages.sentMessages;
			this.pendingMessages = privateMessages.pendingMessages;

			uni.setNavigationBarTitle({
				title : this.friend.name
			});

			this.initialListeners();


			//每次进入聊天页面，总是滚动到底部
			this.scrollToBottom()


			//收到的消息设置为已读
			if(this.messages.length !=0){
				this.imService.markPrivateMessageAsRead(this.friend.uuid);
			}


		},
		onPullDownRefresh: function(e) {
			this.loadMoreHistoryMessage();
		},
		onUnload() {
			//退出聊天页面之前，清空页面传入的监听器
			if(this.imService) {
				this.imService.onNewPrivateMessageReceive =  (friendId, message)=> {};
				this.imService.onPrivateHistoryLoad = (friendId, messages) =>{};
			}
		},
		methods: {
			initialListeners () {
				//传入监听器，收到一条私聊消息总是滚到到页面底部
				this.imService.onNewPrivateMessageReceive =  (friendId, message)=> {
					if (friendId == this.friend.uuid) {
						this.imService.markPrivateMessageAsRead(friendId);
						//收到新消息，是滚动到最底部
						this.scrollToBottom()
					}
				};

				//传入监听器，完成一次私聊历史加载时，如果加载结果为空，显示没有更多消息
				this.imService.onPrivateHistoryLoad = (friendId, messages) =>{
					if (messages.length == 0) {
						//灰色，就不能点击了
						this.allHistoryLoaded = true
					}
					uni.stopPullDownRefresh();
				};
				// 录音监听器
				this.initRecorderListeners();
			},
			initRecorderListeners(){
				let self = this;
				// 监听录音开始
				recorderManager.onStart(function(){
					self.audio.recording = true;
				});

				//录音结束后，发送
				recorderManager.onStop(function(res){
					self.audio.recording = false;
					self.imService.sendPrivateAudioMessage(self.friend.uuid, res)
				});

				// 监听录音报错
				recorderManager.onError(function(res){
					console.log("录音报错：",res);
				})
			},
			sendMessage() {//发送消息
				if (this.content.trim() != '') {
					this.imService.sendPrivateTextMessage(this.friend.uuid, this.content);
				}
				this.content = "";
			},
			loadMoreHistoryMessage() {//历史消息
				let lastMessageTimeStamp = Date.now();
				let lastMessage = this.messages[0];
				if (lastMessage) {
					lastMessageTimeStamp = lastMessage.timestamp;
				}
				this.imService.loadPrivateHistoryMessage(this.friend.uuid, lastMessageTimeStamp);
			},
			//语音录制按钮和键盘输入的切换
			switchAudioKeyboard() {
				this.audio.visible = !this.audio.visible;
				if(uni.authorize){
					uni.authorize({
						scope : 'scope.record'
					})
				}
			},
			onRecordStart () {
				try{
					recorderManager.start();
				}catch(e){
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
					uni.showModal({
						title: '录音错误',
						content : '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
					});
				}
			},
			sendVideo () {//发送文件
				uni.chooseVideo({
					success : (res) => {
						this.imService.sendPrivateVideoMessage(this.friend.uuid, res)
					}
				})
			},
			sendImage() {
				uni.chooseImage({
					count :1,
					success :(res) => {
						this.imService.sendPrivateImageMessage(this.friend.uuid,res);
					}
				})
			},
			showImageFullScreen (e) {
				var imagesUrl = [e.currentTarget.dataset.url];
				uni.previewImage({
					urls: imagesUrl
				});
			},
			playVideo (e) {
				this.video.visible = true;
				this.video.url =e.currentTarget.dataset.url;
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

<style >
</style>
