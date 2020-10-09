<template>
	<view>
    <scroll-view class="conversations" scroll-y="true">
		
		<view v-if="conversations && conversations.conversations && conversations.conversations.length !=0">
			<view class="scroll-item" v-for="(conversation, key) in conversations.conversations" :key="key">
				<image :src="friends[conversation.userId] && friends[conversation.userId].avatar" v-if="conversation.type == 'private'" class="head-icon"></image>
				<image src="/static/images/group.png" v-else  class="head-icon"></image>
				<view class="scroll-item_info">
					<view class="item-info-top">
						<text class="item-info-top_name"  v-if="conversation.type == 'private'">{{friends[conversation.userId] && friends[conversation.userId].name}}</text>
						<text class="item-info-top_name" v-else>{{groups[conversation.groupId] && groups[conversation.groupId].name}}</text>
						<view class="item-info-top_time">{{formatDate(conversation.lastMessage.timestamp)}}</view>
					</view>
					<view class="item-info-bottom">
						<view class="item-info-bottom-item" @click="navigateToChat(conversation)">
							<view class="item-info-top_content" v-if="conversation.lastMessage.type == 'text'">{{conversation.lastMessage.payload.text}}</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'video'">[视频消息]</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'audio'">[语音消息]</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'image'">[图片消息]</view>
							<view class="item-info-top_content" v-else-if="conversation.lastMessage.type == 'file'">[文件消息]</view>
							<view class="item-info-top_content" v-else>[[未识别内容]]</view>
							<view class="item-info-bottom_unread" v-if="conversation.unread">{{conversation.unread || 0}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="no-conversation" v-else>
			当前没有会话为空
		</view>
		
		
		
		
	</scroll-view>
	<view style="position: absolute;bottom: 100rpx;right: 10rpx;display: flex;flex-direction: column;" v-if="isSaving" @click="for_c_saving">
		<image  src="../../static/saving.png"style="width: 156rpx;height: 156rpx;"></image>
		<text style="font-size: 25rpx;color: #000000;">继续救援</text>
	</view>
	
	</view>
</template>

<script>
	export default {
		name: "contacts",
		data () {
			return {
				conversations : {
					unreadTotal : 0,
					conversations : []
				},
				friends : null,
				groups : null,
				imService : null,
				isSaving:false
			}
		},
		onShow () {
			this.imService = getApp().globalData.imService;
			if(!this.imService || !this.imService.currentUser){
				uni.navigateTo({
					url : '../login/login'
				});
				return
			}
			this.isSaving = uni.getStorageSync("isForSave");
			
			uni.showLoading({
				mask : true
			});

			//为什么onshow里面赋值！ uni的tabbar 的onLoad只会执行一次
			this.friends = this.imService.friends;
			this.groups = this.imService.groups;
			this.imService.onConversationsUpdate = (conversations) => {
				this.conversations = conversations;
				this.setUnreadAmount();
			};
			var promise = this.imService.latestConversations();
			promise.then(res => {
					this.conversations = res.content;
					console.log("conversations load successfully")
					this.setUnreadAmount();
					uni.hideLoading();
				}).catch(e => {
					console.log(e)
				});
		},
		methods : {
				
			for_c_saving(){
				uni.navigateTo({
					url:"../map/map",//need location
				})
			}
			,
			navigateToChat (conversion) {
				if (conversion.type == 'private') {
					uni.navigateTo({
						url : '../chat/privateChat/privateChat?friend=' + JSON.stringify(this.friends[conversion.userId])
					})
				}else{
					uni.navigateTo({
						url : '../chat/groupChat/groupChat?group=' + JSON.stringify(this.groups[conversion.groupId])
					})
				}
			},
			formatDate (t) {
				t = t || Date.now();
				let time = new Date(t);
				let str= time.getMonth() < 9 ? ('0' + (time.getMonth() +1)) : (time.getMonth() +1);
				str += '-';
				str += time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
				str += ' ';
				str += time.getHours();
				str += ':';
				str += time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
				return str;
			},
			setUnreadAmount () {
				if(this.conversations.unreadTotal >0){
					uni.setTabBarBadge({
						index: 0,
						text: this.conversations.unreadTotal.toString()
					})
				}else{
					uni.hideTabBarRedDot({
						index :0
					})
				}
			}
		}
	}
</script>

<style>
	.conversations{
		width: 750rpx;
		padding-left: 32rpx;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
	}
	.conversations .scroll-item{
		height: 152rpx;
		display: flex;
		align-items: center;
	}
	.conversations .scroll-item .head-icon{
		width:100rpx;
		height: 100rpx;
		margin-right: 28rpx;
	}
	.conversations .scroll-item_info{
		height: 151rpx;
		width: 590rpx;
		padding-right: 32rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #EFEFEF;
	}
	.conversations .scroll-item_info .item-info-top{
		padding-top: 20rpx;
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
	.conversations .item-info-top_name{
		font-size: 34rpx;
		color: #262628;
	}
	.conversations .item-info-top_time{
		font-size: 26rpx;
		color: rgba(179, 179, 179, 0.8);
		font-family: Source Han Sans CN;
	}
	.conversations .item-info-bottom{
		height: 40rpx;
		line-height: 40rpx;
		overflow: hidden;
	}
	.conversations .item-info-bottom-item{
		display: flex;
		justify-content: space-between;
	}
	.item-info-bottom .item-info-top_content{
		font-size: 30rpx;
		color: #b3b3b3;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		
	}
	.item-info-bottom .item-info-bottom_unread{
		padding: 6rpx;
		background-color: #EE593C;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 28rpx;
		border-radius: 24rpx;
		min-width: 24rpx;
		min-height: 24rpx;
		text-align: center;
	}
	.no-conversation{
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #9D9D9D;
	}
</style>
