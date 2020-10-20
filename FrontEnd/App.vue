<script>
	import IMService from "lib/restapi";
	export default {
	onLaunch: function() {
		
		console.log('App Launch');
		const _self = this;  
				function randomString(length) {
				  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
				  var result = '';
				  for (var i = length; i > 0; --i) 
				    result += str[Math.floor(Math.random() * str.length)];
				  return result;
				}
				//alert(randomString(6));
				

		        const _handlePush = function(message) {  
		            console.log("处理成功了鸭");
					//console.log(message);
					let messagedata = JSON.parse(message.payload);
					let title = messagedata.title;
					let content = messagedata.content;
					console.log(title.slice(12));//for group
					const uuser = getApp().globalData.imService.currentUser;
					//查找对应的群聊名称  并且修改数据库进入群聊
					console.log(uuser);
					const groupID = title.slice(12);
					//发起request  添加群聊内容
					
					const L = parseFloat(content.slice(0,10)); 
					const Lo = parseFloat(content.slice(13));
					console.log(L);
					console.log(Lo);
					uni.setStorageSync('L',L);
					uni.setStorageSync('Lo',Lo);
					let data = {
						title:title,
						content:content,
						ui_id:randomString(10)
					};
					
					console.log(messagedata);
					uni.navigateTo({
						url:"../map/map?L="+L+"&Lo="+Lo,
						fail:function(e){
							console.log(e);
						},
						success:function(succ){
							console.log(succ);
							uni.setStorageSync("isForSave",true);
							
							uni.request({
								url:'http://159.138.27.178:3000/group/update',
								data:{myself_uuid:uuser.uuid,groupid:groupID},
								method:'POST',
								success() {
									console.log('succ');
								},
								fail() {
									console.log('fail');
								}
							});
							
							
							//IMService.addgroup('group-dcb0-4bc9-99c6-fa77b9eb763f','yes',['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a']);
						}})
					
		         
		        
		       
	}
	plus.push.addEventListener('click', _handlePush);
	plus.push.addEventListener('receive', _handlePush);  
	},
	onShow: function() {
		uni.request({
		    url: 'http://159.138.27.178:3000/api/getmarket', //仅为示例，并非真实接口地址。
		    //data: data,
			method:"GET",
		    header: {
		        //'custom-header': 'hello' //自定义请求头信息
		    },
		    success: (res) => {
		        console.log(res);
		        this.text = 'request success';
		    }
		});
		console.log('App Show');
		
		IMService.getThisUser();
		IMService.getThisGroup();
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData : {
	    imService : null,
		baseUrl:'http://159.138.27.178:3000'
	}
};
</script>

<style>
	 @import url("./static/style/chatInterface.css");
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
