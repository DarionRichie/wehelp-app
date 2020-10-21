<template>
	<view style="background-color: #f5f5f5;display: flex;flex-direction: column;">
		<view v-for="data in dataForQuery" class="query" style="display: flex;flex-direction: column;" @click="clickforgetQuery(data.id)">
			<view style="display: flex;flex-direction: row;align-items: center;">
				<image :src="data.iconimage" style="width: 100rpx;height: 100rpx;"></image>
				<text style="margin: 50rpx;font-size: 35rpx;" decode="true" space="true">hash:\n &nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 25rpx;">{{data.detail.hash}}</span></text>
			</view>
			<view style="display: flex;flex-direction: row;align-items: center;">
			<div style="margin: 20rpx;font-size: 25rpx;background-color: #ffe789;width: 20%;text-align: center;border-radius: 20rpx;">友善行为</div>
			<!-- <image style="margin-left: auto;width: 36rpx;height: 36rpx;margin-top: 20rpx;" src="../../../static/jiantou.png"></image> -->
			<text style="font-size: 20rpx;color: #555555;margin-left: auto;">7月12日</text>
			</view>
			<!-- <text>1111</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataForQuery:[{id:'1234',iconimage:'../../../static/zan.png',detail:{hash:'0x6B4dFa95aea4B6817B03AdE31A65249EEb55DaeC',event:'示例',score:'10',address_to:'0x04637105D356649779EC5298d244cab03cAf9AAb',address_from:'0x127C8d002A28e1a55c003Eb4B2D0017EA11bc0D6'}},{iconimage:'../../../static/zan.png',detail:{hash:'0x4D29911c67209FC2feB67DC8093e4630D26eb532',event:'示例',score:'40',address_to:'0x93140e8fC6a5867736f9e868E23c8a38D74d2E23',address_from:'0x9e294C24aC4B2EFE555aDF2fA2ddB5266Cd74182'}},{iconimage:'../../../static/zan.png',detail:{hash:'0xDaF88bf10dd9538df84ba1F93697B3C0fA64214a',event:'示例',score:'30',address_to:'0x441F8d9d6Fc5a41EDEf0C8B64B38E33E07dc7c5E',address_from:'0x9e294C24aC4B2EFE555aDF2fA2ddB5266Cd74182'}}],
			}
		},
		methods: {
			clickforgetQuery(id){
				//the query id is the /*交易号*/
				uni.navigateTo({
					url:'query/query?idforquery='+id,
				})
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title : '记录查询',
			});
		}
	}
</script>

<style>
	.query{
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		word-break: break-all;
		padding: 20rpx;
		margin-top: 30rpx;
		margin-bottom: 0rpx;
	}
</style>
