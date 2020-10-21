<template>
	<view>
	<view class="login">
		<view><image src="../../static/u3.jpg" style="width: 500rpx;height: 400rpx;top: 0rpx;"></image></view>
		<!-- <view class="title">Wehelp</view> -->
		<input type="text" class="input-box" v-model="username" placeholder="请输入账号">
		<input type="password" class="input-box" v-model="password" placeholder="请输入密码">
		<div class="alert-box" v-show="showError">
			<image src="../../static/images/login-alert-icon.png"></image>
			<span>请输入正确的用户名和密码</span>
		</div>
		
		<button class="login-btn" @click="login">登录</button>
		
	</view>
	<text style="font-size: 35rpx;" class="re" @click="clickToRe">去注册</text>
	</view>
</template>

<script>
	import IMService from "../../lib/imservice";
	export default {
	        name: "Login",
	        data () {
	            return {
	                username : '',
	                password : '',
	                showError : false
	            }
	        },
			onLoad () {

			},
			
	        methods : {
				clickToRe(){
					console.log("re");
					uni.navigateTo({
						url:"../re/re",
						fail(e) {
							console.log(e);
						}
					})
				},
	            login () {//登录
	                if (this.username.trim() != "" && this.password.trim() != "") {

						getApp().globalData.imService = new IMService();
						console.log(11111);
	                    let loginResult = getApp().globalData.imService.login(this.username, this.password);
						console.log(loginResult);
	                    if (loginResult) {
	                        //连接IM
							getApp().globalData.imService.connectIM();
							uni.switchTab({
								url:'../index/index'
							})
	                    } else {
	                        console.log('登录失败');
							this.showError = true;
	                    }
	                    return;
	                }
	                this.showError = true;
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
</style>
