<template>
	<view>
	<view class="container">
		<view>
		    <view class="page-body" >
		        <view class="page-section page-section-gap">
		            <map id="map1" ref="map1" style="width: 100%; " :latitude="latitude" :longitude="longitude" :markers="marker" :controls="controls">
		            </map>
		        </view>
		    </view>
			<!-- <button @click="click">dianw</button> -->
		</view>
		<view style="background-color: #ffffff;width: 100%; border-radius: 35rpx;transform: translate(0rpx,0rpx);display: flex;flex-direction: column;box-shadow: 10px 10px 10px 5px #888888;">
			<view style="display: flex;flex-direction: row;padding: 50rpx;align-items: center;" >
				<image src="../../static/select.png" style="width: 56rpx;height: 56rpx;padding-right: 20rpx;"></image>
				<text style="font-size: 50rpx;">请选择救援者的类型</text>
			</view>
			<view style="display: flex;flex-direction: row;padding-bottom: 20rpx;">
				<button style="border-radius: 25rpx;background-color: #3a57cc;color: #FFFFFF;"  :style="{'background-color':isBlue?'#3a57cc':'#d4d4d4'}" @click="clickToSetButton(1)">专业医生</button>
				<button style="border-radius: 25rpx;background-color: #3a57cc;color: #FFFFFF;"  :style="{'background-color':!isBlue?'#3a57cc':'#d4d4d4'}" @click="clickToSetButton(2)">热心市民</button>
			</view>
			<view style="display: flex;flex-direction: row;padding: 50rpx;align-items: center;" v-if="isshow">
				<image src="../../static/number.png" style="width: 75rpx;height: 75rpx;padding-right: 20rpx;"></image>
				<text style="font-size: 30rpx;">你的附近有{{number}}个人,他们是<span style="font-size: 50rpx;">医务人员</span>，可以对你进行帮助</text>
			</view>
			<view style="display: flex;flex-direction: row;padding: 50rpx;align-items: center;" v-if="!isshow">
				<image src="../../static/number.png" style="width: 75rpx;height: 75rpx;padding-right: 20rpx;"></image>
				<text style="font-size: 30rpx;">你的附近有{{numberforDo}}个人,他们是<span style="font-size: 50rpx;">社会友人</span>，可以对你进行帮助</text>
			</view>
			
			
		</view>
		<view style="display: flex;flex-direction: column;align-items: center;">
			<image src="../../static/jiantou.png" style="width: 50rpx;height: 50rpx;padding-top: 50rpx;padding-bottom: 50rpx;" ></image>
			<button style="width: 80%;height: 150rpx;background-color:#3a57cc;font-size: 60rpx;color: #FFFFFF;border-radius: 35rpx;" @click="clickToshow"  :style="{'background-color':!state?'#3a57cc':'#d4d4d4'}">SOS</button>
			<switch v-if="state&&canCancel" style="padding-top: 20rpx;" @change="changeForCancel">求救取消---持续1分钟</switch>
			<text v-if="!canCancel" style="font-size: 35rpx;color: red;">急救中，不可取消</text>
		</view>
		<!-- TODO需要最地图的适配等 ，先写假数据吧，随机random一下 或者写进去数据库  查找距离最小的几个 -->
		
<!-- 		<view class="uni-padding-wrap uni-common-mt swich" >
		            
		            <view class="swichme">
		                <switch  @change="switch1Change" />
		                
		            </view>
		            
		        </view> -->
		
	</view>
	<!-- <button @click="mymap">dianw1</button> -->
	</view>
</template>

<script>
	import Map from '@/js_sdk/fx-openMap/openMap.js'
	
	export default {
		onShow () {
			let fristEnter = uni.getStorageSync('Entered');
			console.log(fristEnter);
			if(!fristEnter){
				uni.reLaunch({
					url : '../daohang/daohang'
				});
				uni.setStorage({
				    key: 'Entered',
				    data: true,
				    success: function () {
				        console.log('success');
				    }
				});
			}else{
			
		    let imService = getApp().globalData.imService;
			if(!imService || !imService.currentUser) {
				uni.showToast({
					title:"必须先登录",
					icon:"../../static/22.jpg",
					success() {
						console.log('yes');
					}
				})
		        uni.reLaunch({
					url : '../login/login'
				})
		    }
		    this.currentUser = imService.currentUser;
			
			//console.log(info);

			}
		},
		data() {
			return {
				isBlue:true,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				isshow:false,
				number:11,
				state:false,
				numberforDo:22,
				canCancel:true,
				timelockid:'',
				id:0, // 使用 marker点击事件 需要填写id
				         title: 'map',
				         latitude: 40.013305,
				         longitude: 118.685713,
				
								marker: [{
								   　　id:0,
								   　　latitude: 39.013305,//纬度
								   　　longitude: 116.685713,//经度
								   　　iconPath: '',    //显示的图标        
								   　　rotate:0,   // 旋转度数
								   　　width:20,   //宽
								   　　height:20,   //高
								  　　 title:'你在哪了',//标注点名
								  　　 alpha:0.5,  //透明度
								  　　 label:{//为标记点旁边增加标签   //因背景颜色H5不支持
								  　　 content:'shaidao',//文本
								　　　　color:'red',//文本颜色
								       
								   },
								   callout:{//自定义标记点上方的气泡窗口 点击有效  
								   　　content:'幸福花园店A组',//文本
								   　　color:'#ffffff',//文字颜色
								   　　fontSize:14,//文本大小
								   　　borderRadius:2,//边框圆角
								  　　 bgColor:'#00c16f',//背景颜色
								   　　display:'ALWAYS',//常显
								   },
								         
								   },{
								   　　id:0,
								   　　latitude: 40.013305,//纬度
								   　　longitude: 98.685713,//经度
								   　　iconPath: '',    //显示的图标        
								   　　rotate:0,   // 旋转度数
								   　　width:20,   //宽
								   　　height:20,   //高
								  　　 title:'你在哪了',//标注点名
								  　　 alpha:0.5,  //透明度
								  　　 label:{//为标记点旁边增加标签   //因背景颜色H5不支持
								  　　 content:'唐山迁安',//文本
								　　　　color:'red',//文本颜色
								       
								   },
								   callout:{//自定义标记点上方的气泡窗口 点击有效  
								   　　content:'幸福花园店A组',//文本
								   　　color:'#ffffff',//文字颜色
								   　　fontSize:14,//文本大小
								   　　borderRadius:2,//边框圆角
								  　　 bgColor:'#00c16f',//背景颜色
								   　　display:'ALWAYS',//常显
								   }
								         
								   },{
								   　　id:0,
								   　　latitude: 38.013305,//纬度
								   　　longitude: 97.685713,//经度
								   　　iconPath: '',    //显示的图标        
								   　　rotate:0,   // 旋转度数
								   　　width:20,   //宽
								   　　height:20,   //高
								  　　 title:'你在哪了',//标注点名
								  　　 alpha:0.5,  //透明度
								  　　 label:{//为标记点旁边增加标签   //因背景颜色H5不支持
								  　　 content:'唐山迁安',//文本
								　　　　color:'red',//文本颜色
								       
								   },
								   callout:{//自定义标记点上方的气泡窗口 点击有效  
								   　　content:'幸福花园店A组',//文本
								   　　color:'#ffffff',//文字颜色
								   　　fontSize:14,//文本大小
								   　　borderRadius:2,//边框圆角
								  　　 bgColor:'#00c16f',//背景颜色
								   　　display:'ALWAYS',//常显
								   }
								         
								   }],
								
							　　controls:[{//在地图上显示控件，控件不随着地图移动
							   　　id:1,//控件id
							   　　iconPath:'../../static/beiW.png',//显示的图标    
							   　　position:{//控件在地图的位置
								  　　left:15,
								  　　top:15,
								  　　width:50,
								  　　height:50
							  　　  },    
				　　}],
			}
		},
		methods: {
			clickToshow(){
				const myself= getApp().globalData.imService.currentUser;
				if(this.state){
					return;
				}
				// this.isshow = !this.isshow;
				this.state = true;
				var that = this;
				var location_x_data;
				var location_y_data;
				uni.getLocation({
					success(res){
						location_x_data = res.longitude;
						location_y_data = res.latitude;
						console.log(res);
					},
					fail(e){
						console.log(e);
					}
				})
				let c = setTimeout(function(){
					that.canCancel = false;
					var data_forblue = that.isBlue;
					//console.log(e);
					uni.request({
						method:'POST',
						url:'http://159.138.27.178:3000/1',
						data:{type:data_forblue,location_x:location_x_data,location_y:location_y_data,uuid_self:myself.uuid},
						success(sess) {
							console.log(sess);
						},
						fail(fa) {
							console.log(fa);
						}
					});
				},10000)
				//console.log(c);
				this.timelockid = c;
			}
			,
			changeForCancel(e){
				console.log(e.target.value);
				
				var thats = this;
				uni.showLoading({
					title:'加载中'
				})
				setTimeout(function () {
				    uni.hideLoading();
					uni.showToast({
						title:'取消成功'
					})
					thats.state = !thats.state;
					clearTimeout(thats.timelockid);
					thats.canCancel = true;
				}, 2000);
				
			}
			,
			clickToSetButton(id){
				// console.log(id);
				if(id==1){
					this.isBlue = true;
					this.isshow = true;
				}else{
					this.isBlue = false;
					this.isshow = false;
				}
			}
			,
			switch1Change: function (e) {
			            console.log('switch1 发生 change 事件，携带值为', e.target.value);
						uni.navigateTo({

							url:"../daohang/daohang?test=1",
							fail:function(e){
								console.log(e);
							}
						});
						uni.$emit("add","tes")
						//触发后端事件 发起post   
			        },
			switch2Change: function (e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
				uni.switchTab({
					url:"../map/map?test=1",
					fail:function(e){
						console.log(e);
					}
				});
			},
			mymap(){
				var latitude = 100;
				var longitude = 200;
				var name = "yes";
				Map.openMap(latitude, longitude, name);
			}
		}
	}
</script>

<style>
	.page-body{
		height: 500rpx;
	}
	.container {
		
		
		font-size: 14px;
		line-height: 24px;
	}
	.swich{
		display: flex; 
		flex-direction: row; 
		justify-content: center;
		
	}
	.swichme{
		
		display: flex;
		flex-direction: row;
		align-items: center;
		line-height: 1200rpx;
	}

	
</style>
