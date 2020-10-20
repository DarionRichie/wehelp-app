<template>
	<view>
	<view class="login">
		<view><image src="../../static/u3.jpg" style="width: 500rpx;height: 400rpx;top: 0rpx;"></image></view>
		<!-- <view class="title">Wehelp</view> -->
		<input type="text" class="input-box" v-model="username" placeholder="请输入身份证号码">
		<input type="password" class="input-box" v-model="password" placeholder="请输入密码">
		<!-- <input type="password" class="input-box" v-model="password" placeholder="点击输入指纹"> -->
		<button class="login-btn-zhiwen" @click="clickToRe">点击输入指纹</button>
		<div class="alert-box" v-show="showError">
			<image src="../../static/images/login-alert-icon.png"></image>
			<span>请输入正确的身份证号码和指纹</span>
		</div>
		<button class="login-btn" @click="login">注册</button>
		
	</view>
	<text style="font-size: 35rpx;" class="re" >自动生成DID身份认证</text>
	</view>
</template>

<script>
	import IMService from "../../lib/imservice";
	import IMServiceIR from "lib/restapi";

	export default {
	        name: "Login",
	        data () {
	            return {
	                username : '',
	                password : '',
	                showError : false,
					isR:false,
	            }
	        },
			onLoad () {

			},
			
	        methods : {
				clickToRe(){
					console.log("re");
					var that = this;
					uni.checkIsSupportSoterAuthentication({
						success(e) {
							console.log(e.supportMode);
							if(e.supportMode.length!=0){
								uni.startSoterAuthentication({
									requestAuthModes:e.supportMode,
									success(succ) {
										console.log(succ);
										if(succ.errCode==0){
											uni.showToast({
												title:"识别成功拉"
											});
											that.isR = true;
										}
									},
									fail(fa) {
										console.log(fa);
										if(fa.errCode==90010){
											uni.showToast({
												mask:true,
												title:'错误,休息10秒'
											})
										}else if(fa.errCode==90009){
											uni.showToast({
												title:"识别错误!"
											})
										}
									}
								})
							}
						},
						fail() {
							console.log(e);
						}
					})
				},
	            login () {//登录
					const baseUrl = 'http://159.138.27.178:3000/users/re'
	                if (this.username.trim() != "" &&this.password.trim() != ""  &&this.isR) {

						getApp().globalData.imService = new IMService();
	                    if (this.isR) {
							const username = this.username;
							const password = this.password;
							uni.showToast({
								title:"注册成功",
							})
							console.log('fuck');
							uni.request({
								url:baseUrl,
								method:"POST",
								data:{
									username:this.username,//for sfz
									password:this.password
								},
								success(e) {
									console.log(e)
									IMServiceIR.getThisUser();
									if(e.data==0){
										
										uni.showLoading({
											title:'稍等'
										})
										
										
										setTimeout(()=>{
											let loginResult = getApp().globalData.imService.login(username, password);
											console.log('跳转');
											uni.hideLoading()
											if(loginResult){
												getApp().globalData.imService.connectIM();
												uni.switchTab({
													url:'../index/index'
												})
											}
										},4000)
										
									}
								},
								fail(err) {
									console.log(err);
								},
								complete() {
									console.log('结束了');
								}
							})
	                        //连接IM
							//getApp().globalData.imService.connectIM();
							
							// uni.switchTab({
							// 	url:'../index/index'
							// });
							// uni.showToast({
							// 	title:'注册成功'
							// })
	                    } else {
	                        console.log('注册失败');
							this.showError = true;
	                    }
	                    return;
	                }
	                this.showError = true;
					var that = this;
					setTimeout(function(){
						that.showError = false;
					},3000)
	            }
	        }
	    }
</script>

<style>
	.login{
		padding-top: 50rpx;
		width:100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.re{
		padding-top: 50rpx;
		width:100%;
		height: 100%;
		padding: 45rpx;
		color: grey;
		text-decoration: underline;
	}
	.title {
		height: 100rpx;
		font-size:84rpx;
		margin-bottom: 80rpx;
		text-align: center;
		font-family: Source Han Sans CN;
		font-style: normal;
		font-weight: bold;
		color: #D02129;
	}
	.input-box {
		width:600rpx;
		height: 50rpx;
		margin-bottom: 40rpx;
		padding: 26rpx;
		font-size: 32rpx;
	}
	input{
		border: 1px solid #E0E0E0;
	}
	input::-webkit-input-placeholder{
		color: #999999;
	}
	input::-moz-placeholder{
		color: #999999;
	}
	input::-ms-input-placeholder{
		color: #999999;
	}
	.alert-box{
		width:640rpx;
		height: 60rpx;
		margin-bottom: 60rpx;
		padding: 0rpx 20rpx;
		font-size: 32rpx;
		line-height: 48rpx;
		display: flex;
		align-content: center;
		overflow: hidden;
		color: #EE593C;
		align-items: center;
	}
	.alert-box image{
		width:30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}
	.login-btn{
		width: 680rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size:36rpx ;
		text-align: center;
		color: #ffffff;
		background: #618DFF;
		outline: none;
		border: 0;
	}
	.login-btn-zhiwen{
		width: 680rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size:36rpx ;
		text-align: center;
		color: #ffffff;
		background: #d9d6cc;
		outline: none;
		border: 0;
		margin-bottom: 50rpx;
	}
</style>
