<template>
	<view style="display: flex;flex-direction: column;background-color: #f4f8fb;">
		
		<view style="margin: 40rpx;background-color: #ffffff;height: 500rpx;margin-top: 100rpx;display: flex;flex-direction: column;">
			<view style="align-items: center;display: flex;flex-direction: column;">
				<image src="../../../../static/yes.png"  style="width: 106rpx;height: 106rpx;transform: translate(0,-40rpx);"></image>
				<text style="font-size: 35rpx;color: #4CD964;">交易成功</text>
			</view>
			<text style="word-break: break-all;margin: 20rpx;" decode="true" space="true"><span style="font-size: 30rpx;">hash:  </span><span style="font-size: 25rpx;color:grey;">&nbsp;&nbsp;0xawdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span></text>
			<text style="word-break: break-all;margin: 20rpx;" decode="true" space="true"><span style="font-size: 30rpx;">Block:</span><span style="font-size: 25rpx;color:grey;">&nbsp;&nbsp;3288</span></text>
			<text style="word-break: break-all;margin: 20rpx;" decode="true" space="true"><span style="font-size: 30rpx;">trasactionid:</span><span style="font-size: 25rpx;color:grey;">&nbsp;&nbsp;12456555</span></text>
		</view>
		<view style="margin: 40rpx;background-color: #ffffff;height: 500rpx;display: flex;flex-direction: column;margin-top: 0rpx;">
			<!-- <image src="../../../../static/yes.png"  style="width: 106rpx;height: 106rpx;transform: translate(0,-40rpx);"></image> -->
			<view style="align-items: center;display: flex;flex-direction: column;">
			<text style="font-size: 35rpx;color: #4CD964;">交易细节</text>
			</view>
			<text style="word-break: break-all;margin: 20rpx;" decode="true" space="true"><span style="font-size: 30rpx;">address_from:  </span><span style="font-size: 25rpx;color:grey;">&nbsp;&nbsp;0xawdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span></text>
			<text style="word-break: break-all;margin: 20rpx;" decode="true" space="true"><span style="font-size: 30rpx;">address_to:</span><span style="font-size: 25rpx;color:grey;">&nbsp;&nbsp;0xawdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span></text>
			<text style="word-break: break-all;margin: 20rpx;" decode="true" space="true"><span style="font-size: 30rpx;">time:</span><span style="font-size: 25rpx;color:grey;">&nbsp;&nbsp;12456555</span></text>
		</view>
			
		
		
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log(option);
			uni.setNavigationBarTitle({
				title : '交易查询',
			});
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
