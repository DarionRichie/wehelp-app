<template>
	<view>
		<!-- 定义最开始的领奖台的页面  显示今天的前三名 -->
		<view style="width: 100%;">
			<image src="../../static/reward.png" style="width: 100%;height: 450rpx;"></image>
		</view>
		<!-- <button @click="topage">点击跳转</button> -->
		<image :src="currentUser.avatar" style="transform: translate(550rpx,-100rpx);width: 146rpx;height: 156rpx;"></image>
		<view style="display: flex;flex-direction: column;margin: 20rpx;transform: translate(0rpx,-100rpx);">
			<!-- 定义其中的最右边的自己的头像 -- 方法和对应的mine页面是一样的-->
			
			<view v-for="friend in dataForFriend" style="display: flex;flex-direction: column;">
				<view style="display: flex;flex-direction: row;">
					<image :src="friend.avatar" style="width: 90rpx;height: 90rpx"></image>
					<text style="font-weight: bolder;color: #6c9edc;font-size: 35rpx;">{{friend.name}}</text>
				</view>
				<text style="font-size: 35rpx;margin-left: 90rpx;">{{friend.content}}</text>
				<view style="display: flex;flex-direction: row;flex-wrap:wrap ;margin-left: 100rpx;" >
					<view v-for="friendpic in friend.pic"style="">
						<image :src="friendpic" style="padding: 5rpx;width: 250rpx;height: 175rpx;" ></image>
					</view>
				</view>
				<image src="../../static/zan.png" style="width: 40rpx;height: 40rpx;transform: translate(650rpx,0rpx);" ></image>
				<div style="height: 1rpx;width: 100%;background-color: #d3d3d3;margin: 30rpx;"></div>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow () {
		    let imService = getApp().globalData.imService;
			if(!imService || !imService.currentUser) {
		        uni.navigateTo({
					url : '../login/login'
				})
		    }
		    this.currentUser = imService.currentUser;
			console.log(this.currentUser)
		},
		data() {
			return {
				currentUser:null,
				dataForFriend:[{name:"dtwang",avatar:"../../static/55.png",content:"今天看到了一个溺水的小孩子，我马上去把他救起来了，这也是今天的一件善行吧",pic:['../../static/u17.png','../../static/u24.png']},
				{name:"zhong",avatar:"../../static/55.png",content:"希望以后不要发送这种事情了，实在太恐怖了",pic:['../../static/u24.png','../../static/u17.png']},
				{name:"ju",avatar:"../../static/55.png",content:"实在太恐怖了",pic:['../../static/u10.png',]},
				{name:"liu",avatar:"../../static/55.png",content:"又做了一件善良的事情鸭",pic:['../../static/u17.png']}],
			}
		},
		methods: {
			topage(){
				uni.navigateTo({
					url:'../evaluate/evaluate',
				})
			}
		}
	}
</script>

<style>

</style>
