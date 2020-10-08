<template>
	<view>
		<view style="background-color: #f5f5f5;display: flex;flex-direction: column;">
			<text style="font-weight: bolder;font-size: 50rpx;margin: 50rpx;text-align: center;color: #636363;">{{this.readcontent.title}}</text>
			<view style="background-color: #FFFFFF">
			<image style="margin-left: 50rpx;margin-right: 50rpx;" :src="this.readcontent.pic[0]"></image>
			<div style="margin-left: 100rpx;margin-right:100rpx;background-color:#f5f5f5;display: flex;flex-direction: column;margin-top: 20rpx;margin-bottom: 30rpx;box-shadow: 5px 5px 2px #888888;color: #666666;border-radius: 10rpx;"><text style="text-align: center;font-size: 40rpx;">黄金心肺复苏是最重要的</text></div>
			</view>
		</view>
		<view style="display: flex;flex-direction: column;"><text style="text-align: center;font-size: 150rpx;color: #007AFF;margin-bottom: 20rpx;">01</text></view>
		<view class="context_nice">
			<text decode="true"  space="true">{{this.readcontent.content[0]}}</text>
		</view>
		<view style="display: flex;flex-direction: column;"><text style="text-align: center;font-size: 150rpx;color: #007AFF;margin-bottom: 20rpx;">02</text></view>
		<view class="context_nice">
			<text decode="true"  space="true">{{this.readcontent.content[1]}}</text>
		</view>
		<!-- <image :src="this.readcontent.pic[0]"></image>
		<image :src="this.readcontent.pic[1]"></image> -->
		
	</view>
</template>

<script>
	export default {
		onLoad(option){
			console.log(option.id);
			//for get somthing from sever
			// uni.request({
			// 	url:'' //to get information
			// })
		},
		onShow() {
			uni.setNavigationBarTitle({
				title : this.readname,
			});
		},
		//需要全局的事件进行传输; $emit
		data() {
			return {
				readname:'必读系列的东西',
				readcontent:{pic:['../../static/qietume2.png','../../static/find.png','../../static/find.png'],title:'心肺复苏黄金三分钟',content:['&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;心搏骤停是指各种原因引起的、在未能预计的情况和时间内心脏突然停止搏动，从而导致有效心泵功能和有效循环突然中止，引起全身组织细胞严重缺血、缺氧和代谢障碍，如不及时抢救即可立刻失去生命。心搏骤停不同于任何慢性病终末期的心脏停搏，若及时采取正确有效的复苏措施，病人有可能被挽回生命并得到康复。','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;随着国内疫情得到控制，人们出游意愿逐渐强烈。根据麦肯锡9月发布的《重返增长：中国旅游市场的前瞻思考》，5月份有15%的受访者表示在未来四个月有出游计划，到了8月，这一数字陡然升至70%，尤其是年轻，已婚和退休人群。']}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.context_nice{
	margin-left: 50rpx;
	margin-right: 50rpx;
	}
</style>
