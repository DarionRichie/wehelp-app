<template>
	<view style="display: flex;flex-direction: column;">
		<view style="display: flex;flex-direction: row;margin-top: 20rpx;margin: 20rpx;align-items: center;">
			<!-- 直接写样式 -->
			<image src="../../static/55.png" style="width: 100rpx;height: 100rpx;"></image>
			<text style="font-size: 35rpx;">记录您的救援过程，获得善行积分和点赞</text>
		</view>
		
		            
		<view class="uni-textarea" style="border: #333333;margin: 20rpx;border:solid;border-width: thin;border-radius: 40rpx;padding: 20rpx;">
			<textarea placeholder="请输入介绍信息" v-model="info"/>
		</view>
		<view style="display: flex;flex-direction: row;align-items: center;">
			<text style="margin-left: 30rpx;color: #333333;font-size: 35rpx;">举报求救者</text>
			<picker @change="bindPickerChange" :value="index" :range="array" style="width: 150rpx;margin-left: auto;margin-right: 100rpx;">
				<button style="background-color:#3a57cc ;color: #FFFFFF">{{array[index]}}</button>
			</picker>
		</view>
		<div style="width: 100%;margin-top: 20rpx;margin-bottom:  20rpx;height: 2rpx;background-color: #9cabb3;"></div>		
		<view style="display: flex;flex-direction: row;align-items: center;">
			<text style="margin-left: 30rpx;color: #333333;font-size: 35rpx;">突出贡献求救者</text>
			<picker @change="bindPickerChange1" :value="index1" :range="array1" style="width: 150rpx;margin-left: auto;margin-right: 100rpx;">
				<button style="background-color:#3a57cc ;color: #FFFFFF">{{array[index1]}}</button>
			</picker>
		</view>   
		<div style="width: 100%;margin-top: 20rpx;margin-bottom:  20rpx;height: 2rpx;background-color: #9cabb3;"></div>
		<view style="display: flex;flex-direction: row;align-items: center;">
			<text style="margin-left: 30rpx;color: #989898;font-size: 25rpx;">上传图片(最多6张)</text>
		</view>
		<view>
			<vastwu-saveimg :imgListprop="photo_list" :num='9' :isBase64='true' :isSave='true' :size='180' @chooseImage='imglist_msg'  @delImg='del_imglist_msg'></vastwu-saveimg>
		</view>
		
		<button style="background-color: #007AFF;color: #FFFFFF;">提交评价</button>
	</view>
</template>

<script>
	import vastwuSaveimg from '../../components/vastwu-saveimg/vastwu-saveimg.vue'
	export default {
		components: {vastwuSaveimg},
		onShow() {
			this.isSaving = uni.getStorageSync("isForSave");
		},
		data() {
			return {
				title: 'picker',
				array: ['无','小王', '小李', '小钟', '小巨'],
				index: 0,
				info:'',
				photo_list:[],
				array1: ['无','小王', '小李', '小钟', '小巨'],
				index1: 0,
				isSaving:false
				
			}
		},
		methods: {
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value;
						this.base = e.target.value;
			        },
			bindPickerChange1: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index1 = e.target.value;
						this.base = e.target.value;
			        },
			imglist_msg(e){
				console.log(this.photo_list);
				console.log(e);
			},
				
			del_imglist_msg(){
			}
		}
	}
</script>

<style>

</style>
