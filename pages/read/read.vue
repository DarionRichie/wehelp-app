<template>
	<view :value="index">
		<view style="background-color: #f5f5f5;display: flex;flex-direction: column;">
			<text style="font-weight: bolder;font-size: 50rpx;margin: 50rpx;text-align: center;color: #636363;">{{this.readcontent[index].title}}</text>
			<view style="background-color: #FFFFFF">
			<image style="margin-left: 50rpx;margin-right: 50rpx;" :src="this.readcontent[index].pic[0]"></image>
			<div style="margin-left: 100rpx;margin-right:100rpx;background-color:#f5f5f5;display: flex;flex-direction: column;margin-top: 20rpx;margin-bottom: 30rpx;box-shadow: 5px 5px 2px #888888;color: #666666;border-radius: 10rpx;"><text style="text-align: center;font-size: 40rpx;">{{this.readcontent[index].title}}</text></div>
			</view>
		</view>
		<view style="display: flex;flex-direction: column;"><text style="text-align: center;font-size: 150rpx;color: #007AFF;margin-bottom: 20rpx;">01</text></view>
		<view class="context_nice">
			<text decode="true"  space="true">{{this.readcontent[index].content[0]}}</text>
		</view>
		<view style="display: flex;flex-direction: column;"><text style="text-align: center;font-size: 150rpx;color: #007AFF;margin-bottom: 20rpx;">02</text></view>
		<view class="context_nice">
			<text decode="true"  space="true">{{this.readcontent[index].content[1]}}</text>
		</view>
		<!-- <image :src="this.readcontent.pic[0]"></image>
		<image :src="this.readcontent.pic[1]"></image> -->
		
	</view>
</template>

<script>
	export default {
		onLoad(option){
			console.log(option.id);
			this.index = option.id - 1;
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
				index:0,
				readname:'必读系列',
				readcontent:[{pic:['../../static/qietume2.png','../../static/find.png','../../static/find.png'],title:'老人摔倒',content:['&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前几次事件中“讹人”的老人，大多数身体存在问题，有些是自己摔倒后受伤。其讹人的目的地是为了找人替他们支付医疗费用。值得注意的是：在这几个“讹人”的事件中，当事的老人都保持着神志的清醒。。','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户案例：热心市民苏某在WeHelp上收到求救信号，按照定位赶到公园一无监控偏僻角落扶起一老人并将其送到医院。经检查，老人右腿胫骨骨折，需要手术费三万余元，老人提起诉讼状告热心市民苏某，要求其承担手术费用。但是从区块链上查询本次救援经过，热心市民苏某10:15分接受到老人的求救信息，从办公室赶到求救地点，不存在撞倒老人的行为，老人败诉。']},
				{pic:['../../static/qietume2.png','../../static/find.png','../../static/find.png'],title:'找到心肺复苏救援者',content:['&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;心脏停止跳动的后果是以秒计算的，十秒钟以后患者的意识就开始丧失，三十秒钟全身抽搐，然后慢慢的开始出现脑水肿以及脑死亡，进入植物人状态，所以四到六分钟内，是猝死者急救的黄金抢救时间，这段时间是救护车无法到达的，在公交站、地铁站等地，只有人群中受过心肺复苏训练的人员可以在黄金时间内施救。','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;汹涌的深圳地铁四号线世界之窗站一名男子突然倒地抽搐，疑似出现心脏骤停。地铁乘客使用WeHelp发出医疗求助，隔壁7号车厢的一名医生马上赶来为他进行心肺复苏，并利用深圳地铁的AED进行除颤，救护车随后赶来将男子送往医院救治。由于抢救及时，男子目前已无大碍。']}]
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
