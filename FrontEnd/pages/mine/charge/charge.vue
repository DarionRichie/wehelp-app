<template>
	<view>
		<view style="background-color: #f4f8fb;display: flex;flex-direction: column;">
			<view style="background-color: #FFFFFF;margin: 40rpx;margin-top: 400rpx;border-radius: 35rpx;transform: ;">
				<view style="border: #f4f8fb;border-radius: 35rpx;margin: 50rpx;border-style: solid;display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;align-items: center;">
						<text style="padding-left: 40rpx;font-size: 35rpx;color: #aaaaaa;padding-bottom: 15rpx;">From</text>
						<text style="margin-left: auto;font-size: 35rpx;color: #aaaaaa;padding-bottom: 15rpx;padding-right: 40rpx;">Balance:{}</text>
					</view>
					<view style="display: flex;flex-direction: row;align-items: center;">
						<input type="text" value="0.0" style="padding-left: 40rpx;" v-model="valueFrom"/>
						<div style="background-color: #3a57cc;border-radius: 15rpx;transform: translate(-100rpx);color: #FFFFFF;padding: 10rpx;font-size: 25rpx;">MAX</div>
						<text style="padding-right: 40rpx;">wehelp</text>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
				<image src="../../../static/jiantou.png" style="width: 100rpx;height: 100rpx;"></image>
				</view>
				<view style="border: #f4f8fb;border-radius: 35rpx;margin: 50rpx;border-style: solid;display: flex;flex-direction: column;">
					<view style="display: flex;flex-direction: row;align-items: center;">
						<text style="padding-left: 40rpx;font-size: 35rpx;color: #aaaaaa;padding-bottom: 15rpx;">To</text>
						<text style="margin-left: auto;font-size: 35rpx;color: #aaaaaa;padding-bottom: 15rpx;padding-right: 40rpx;"></text>
					</view>
					<view style="display: flex;flex-direction: row;align-items: center;">
						<input type="text" value="0.0" style="padding-left: 40rpx; " v-model="getValue"/>
						<view class="" style="padding-right: 40rpx;padding-left: 10rpx;">
						    <view class="">
						        <view class="">
						            <picker @change="bindPickerChange" :value="index" :range="array" style="width: 150rpx;">
										<button style="background-color:#3a57cc ;color: #FFFFFF">{{array[index]}}</button>
						            </picker>
						        </view>
						    </view>
						</view>
					</view>
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.setNavigationBarTitle({
				title : '兑换',
			});
		}
		,
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				title: 'picker',
				array: ['深圳', '北京', '上海', '广州'],
				index: 0,
				date: currentDate,
				time: '12:01',
				base:1,
				valueFrom:0.0
			}
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        },
				getValue(){
					return this.base*this.valueFrom;
				}
		    },
		
		methods: {
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value;
						this.base = e.target.value;
			        },
			        bindDateChange: function(e) {
			            this.date = e.target.value
			        },
			        bindTimeChange: function(e) {
			            this.time = e.target.value
			        },
			        getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        }
		}
	}
</script>

<style>

</style>
