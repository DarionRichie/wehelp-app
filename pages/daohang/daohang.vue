<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
    <view>
                <view class="All">
                    <swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="2000" :duration="500">
                        <swiper-item>
                            <view class="swiper-item uni-bg-red">
								<image src="../../static/11.jpg" class="image"></image>
								<!-- <view style="padding-top: 350rpx;text-align: center;color: grey;font-size: 45rpx;padding-left: 50rpx;padding-right: 50rpx;">心肌梗塞的患者，需要在4分钟之内心肺复苏，Wehelp救援在救护车之前</view> -->
							</view>
                        </swiper-item>
                        <swiper-item>
                            <view class="swiper-item uni-bg-green">
								<image src="../../static/22.jpg" class="image"></image>
								<!-- <view style="padding-top: 350rpx;text-align: center;color: grey;font-size: 45rpx;padding-left: 50rpx;padding-right: 50rpx;">心肌梗塞的患者，需要在4分钟之内心肺复苏，Wehelp救援在救护车之前</view> -->
							</view>
                        </swiper-item>
						<swiper-item>
						    <view class="swiper-item uni-bg-green">
								<image src="../../static/33.jpg" class="image"></image>
								<view style="padding-top: 350rpx;text-align: center;color: grey;font-size: 45rpx;padding-left: 50rpx;padding-right: 50rpx;">心肌梗塞的患者，需要在4分钟之内心肺复苏，Wehelp救援在救护车之前</view>
							</view>
						</swiper-item>
                        <swiper-item>
                            <view class="swiper-item uni-bg-blue">
								<image src="../../static/u3.jpg" class="new"></image>
								<view style="height: 700rpx;"></view>
								
								<view style="position: absolute;bottom: 150rpx;width: 40%;left: 50%;margin-left: -20%;">
									<button @click="clickbutton" style="background-color: #007AFF;color: #FFFFFF;">开始使用</button>
								</view>
								
								</view>
                        </swiper-item>
                    </swiper>
                </view>
    </view>
</template>

<script>
import GoEasyIM from 'goeasy-im';

	export default {
	    data() {
	        return {
	            //background: ['color1', 'color2', 'color3'],
	            indicatorDots: true,
	            autoplay: true,
	            interval: 2000,
	            duration: 500,
				height:1450
	        }
	    },
	    methods: {
	        clickbutton(){
				uni.navigateTo({
					url:"../login/login"
				})
			}
	    },
		onShow() {
			var that = this;
			uni.getSystemInfo({
							success:function(res){
								console.log(JSON.stringify(res));
								that.height = res.screenHeight;
							}
			});
		}
	}
</script>
<style>
	.All{
		width: 100%;
	}
	.swiper{
		height:759px; //需要进行js操作获取对应的屏幕的大小进行计算
	}
	swiper-item{
		height: 100%;
	}
	swiper-item .image{
		width: 100%;
		height: 759px;
	}
	.new{
		padding-top: 250rpx;
		width: 100%;
		/* height: 759px; */
	}
</style>
