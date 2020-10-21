<template>
    <div class="mine">
		<div style="display: flex;" class="allInfo">
		<div class="topsomthing">	
        <div class="top">
            <image :src="currentUser.avatar"></image>
            <view class="topTwo">
				<!-- <view class="name">{{currentUser.name}}</view> -->
				<view class="name" style="font-size: 15rpx;font-weight: bolder;">{{currentUser.address}}</view>
				<view class="name">{{currentUser.name}}</view>
			</view>
			<view><div style="width: auto;height: auto;background-color: #ffe789;border-radius: 45rpx;font-size: 25rpx;"><text style="margin: 5rpx;">见义勇为</text></div></view>
        </div>
		
		<div class="toptop">
		<view class="info">
			<view class="name">
				<text>{{currentUser.score}}</text>
				<text>善行积分</text>
			</view>
			<!-- <view class="line"></view> -->
			<view class="name">
				<text>{{currentUser.range}}</text>
				<text>善行排名</text>
			</view>
			<!-- <view class="line"></view> -->
			<view class="name">
				<text>{{currentUser.scorerange}}</text>
				<text>分数排名</text>
			</view>
		</view>
		</div>
	</div>	
		<div class="ball">
			<view v-for=" bar in dataforReward" class="BarforReward" style="display: flex;flex-direction: row;">
				<view style="display: flex;flex-direction: row;">
					<image :src="bar.pic"></image>
					<view style="display: flex;flex-direction: column;">
						<text>{{bar.content}}</text>
						<text>{{bar.content2}}</text>
					</view>
					
				</view>
				
			</view>
		</div>
        <div class="bottom">
			<view v-for=" bar in dataforBar" class="Bar" @click="clickme(bar.id)">
				<image :src="bar.pic"></image>
				<text>{{bar.content}}</text>
				<image src="../../static/jiantou.png" style="transform: translate(350rpx,0rpx);"></image>
			</view>
<!--            <text>欢迎体验GoEasyIM</text>
            <view class="logout" @click="logout">注销</view> -->
        </div>
		<div style="width: 100%;height: 100rpx;background-color:#FFFFFF ;line-height: 100rpx;font-weight: bolder;display: flex;flex-direction: row;align-items: center;" >
			<image src="../../static/55.png" style="width: 56rpx;height: 56rpx;margin-right: 50rpx;margin-left: 25rpx;"></image>
			<text>必读系列</text>
			</div>
		<div class="last_module">
					<view v-for=" bar in dataforBiDU" class="Bar_forlastmodule" @click="clickmeForRead(bar.id)">
						<image :src="bar.pic"></image>
						<view style="display: flex;flex-direction: column;">
						<text>{{bar.content}}</text>
						<text>{{bar.sec_content}}</text>
						</view>
						<!-- <image src="../../static/jiantou.png" style="transform: translate(350rpx,0rpx);"></image> -->
					</view>
		<!--            <text>欢迎体验GoEasyIM</text>
		            <view class="logout" @click="logout">注销</view> -->
		        </div>
		
		
		
    </div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                currentUser : null,
				myselfinfo:{sfz:430321200101127019,name:"dtwang"},
				dataforBar:[{pic:"../../static/find.png",content:"历史善行查询",id:1},{pic:"../../static/tochange.png",content:"兑换公益积分",id:2},{pic:"../../static/logining.png",content:"重新实名认证",id:3}],
				dataforReward:[{pic:"../../static/zan.png",content:"获赞",content2:"0"},{pic:"../../static/time.png",content:"义工时",content2:0}],
				dataforBiDU:[{pic:"../../static/toRead.png",content:"老人摔倒扶还是不扶的信任问题",sec_content:'',id:1},{pic:"../../static/toRead.png",content:"最快找到心肺复苏救援者的时间问题",sec_content:'',id:2}],
            }
        },
        onShow () {
            let imService = getApp().globalData.imService;
			if(!imService || !imService.currentUser) {
                uni.navigateTo({
					url : '../login/login'
				})
            }
            this.currentUser = imService.currentUser;
        },
        methods : {
            logout () {
                getApp().globalData.imService.disconnect().then(res => {
                    uni.navigateTo({
                        url : '../login/login'
                    })
                })

            },
			clickme(option){
				console.log(option);
				switch(option){
					case 1:{
					uni.navigateTo({
						url:'./recard/recard',
						fail(why) {
							console.log(why)
						}
					});
					break;
					}
					case 2:{
					uni.navigateTo({
						url:'./charge/charge'
					});
					break;
					}
				}
			},
			clickmeForRead(option){
				// uni.$emit("ReadInfo",option);
				switch(option){
					case 1:{
					uni.navigateTo({
						url:'../read/read?id='+option,
						fail(why) {
							console.log(why)
						}
					});
					
					break;
					}
					case 2:{
					uni.navigateTo({
						url:'../read/read?id='+option,
					});
					break;
					}
					case 3:{
					uni.navigateTo({
						url:'../read/read?id='+option,
					});
					break;
					}
				}
			}
        }
    }
</script>

<style>
	.topsomthing{
		background-image: url(../../static/qietume2.png) ;
		background-position: 2% 2%;
	}
	.line{
		width: 5rpx;
		/* height: 100rpx; */
		background-color: #FFFFFF;
		margin-bottom: 5rpx;
	}
    .mine{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
		background-color: #f5f5f5;
    }
	.ball{
		background-color:#FFFFFF ;
		/* height: 200rpx; */
		margin-left: 50rpx;
		margin-right: 50rpx;
		border-radius: 46rpx;
		transform: translate(0,-20rpx);
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		box-shadow: 5px 5px 2px #888888;
		font-weight: bolder;
		/* flex-grow: 1; */
	}
	.Bar{
		display: flex;
		flex-direction: row;
		/* justify-content: center; */
		align-items: center;
		margin-bottom: 8rpx;
		padding: 10rpx;
		background-color: #FFFFFF;
		border-color: #f5f5f5;
		border-bottom: #f5f5f5;
		
	}
		
	.BarforReward{
		padding: 50rpx;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
	.Bar  image{
		width:56rpx;
		height: 56rpx;
		margin-left: 25rpx;
		margin-right: 40rpx;
	}
	.Bar text{
		font-size: 25rpx;
		color: ;
		
	}
	.Bar_forlastmodule image{
		width:56rpx;
		height: 56rpx;
		margin-left: 25rpx;
		margin-right: 40rpx;
	}
	.Bar_forlastmodule text{
		font-size: 25rpx;
		color: ;
		
	}
	.BarforReward image{
		width:56rpx;
		height: 56rpx;
		margin-left: 25rpx;
		margin-right: 40rpx;
	}
	.BarforReward text{
		font-size: 25rpx;
		color: ;
	}
	.allInfo{
		display: flex;
		flex-direction: column;
		
	}
    .top {
        /* height: 200rpx; */
        /* background: #3956cb; */
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        align-items: center;
    }
	.toptop{
	    /* height: 300rpx; */
	    /* background: #3956cb; */
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    align-items: center;
		margin-bottom: 10rpx;
	}
		
	.info{
		/* background: #3956cb; */
		display: flex;
		flex-direction: row;
		justify-content: center;
		color: #FFFFFF;
		padding-bottom: 20rpx;
	}
	.topTwo{
		/* height: 400rpx; */
		/* background: #3956cb; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #FFFFFF;
		
		/* //align-items: center; */
	}
    .top image{
        width:100rpx;
        height: 100rpx;
        border-radius: 100rpx;
		padding-right: 50rpx;
		padding-top:20rpx ;
		padding-bottom:20rpx ;
		padding-left: 50rpx;
    }
    .top .name{
        line-height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 25rpx;
		/* align-items: center; */
		/* padding-left: 50rpx;
		padding-right: 50rpx;
		border-color: #FFFFFF;
		border-style: solid;
		border-radius: 20rpx;
		margin-left: 15rpx;
		margin-right: 15rpx; */
    }
	.toptop .name{
	    line-height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;
		padding-right: 20rpx;
		border-color: #FFFFFF;
		/* border-style: solid;
		border-radius: 20rpx; */
		padding-bottom:20rpx ;
		margin-left: 15rpx;
		margin-right: 15rpx;
		font-weight: bold;
	}
	
    .bottom{
        text-align: center;
        /* line-height: 200rpx; */
    }
	
	.last_module{
		
	}
	.Bar_forlastmodule{
		display: flex;
		flex-direction: row;
		/* justify-content: center; */
		align-items: center;
		margin-bottom: 8rpx;
		padding: 10rpx;
		background-color: #FFFFFF;
		border-color: #f5f5f5;
		border-bottom: #f5f5f5;
	}
	.logout{
		width: 266rpx;
		height: 76rpx;
		line-height: 76rpx;
		margin: 0 auto;
		background-color: #618DFF;
		border-radius: 10rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		
	}
</style>
