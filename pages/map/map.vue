<template>

</template>

<script>
	export default {
		onLoad(option) {
			//use 缓存
			console.log(option);
			if(option){
				//缓存
				uni.setStorageSync('L',option.L);
				uni.setStorageSync('Lo',option.Lo);
			}
		}
		,
		onReady(){
			var that = this;
			const gaodeMap = uni.requireNativePlugin('gaode-map'); 
			uni.getLocation({
						    type: 'wgs84',
							geocode:true,//设置该参数为true可直接获取经纬度及城市信息
						    success: function (res) {
								console.log(res);
								uni.showToast({
								    title: '获取地址成功哦!',
									icon:'none'
								});
								that.latitude = res.latitude;
								that.longitude = res.longitude;
								that.myL = res.latitude;
								that.myLo = res.longitude;
								that.show(gaodeMap);
								that.startGaoDeListener(gaodeMap)
								//that.addrDel = res;
						    }
					});
			
			
;			var that = this;
			uni.$on("add",function(){
				console.log("触发了add事件");
			})
			
		},
	    data() {
	        return {
				id:0, // 使用 marker点击事件 需要填写id
	            title: 'map',
	            latitude: 40.013305,
	            longitude: 118.685713,
				ID:'',
				myL:40.427231,
				myLo:110.427231,
				endL:0,
				endLo:0,
				marker: [{
				   　　id:0,
				   　　latitude: 40.013305,//纬度
				   　　longitude: 118.685713,//经度
				   　　iconPath: '',    //显示的图标        
				   　　rotate:0,   // 旋转度数
				   　　width:20,   //宽
				   　　height:20,   //高
				  　　 title:'你在哪了',//标注点名
				  　　 alpha:0.5,  //透明度
				  　　 label:{//为标记点旁边增加标签   //因背景颜色H5不支持
				  　　 content:'唐山迁安',//文本
				　　　　color:'red',//文本颜色
				       // 　　fontSize:24,//文字大小
				       //    x:5,//label的坐标，原点是 marker 对应的经纬度
				       //    y:1,//label的坐标，原点是 marker 对应的经纬度 
				       //    borderWidth:12,//边框宽度
				       //    borderColor:'pink',//边框颜色    
				       // 　　borderRadius:20,//边框圆角                        
				       // 　　bgColor:'black',//背景色
				       // 　　padding:5,//文本边缘留白
				       //    textAlign:'right'//文本对齐方式。
				   },
				   callout:{//自定义标记点上方的气泡窗口 点击有效  
				   　　content:'幸福花园店A组',//文本
				   　　color:'#ffffff',//文字颜色
				   　　fontSize:14,//文本大小
				   　　borderRadius:2,//边框圆角
				  　　 bgColor:'#00c16f',//背景颜色
				   　　display:'ALWAYS',//常显
				   },
				   // anchor:{//经纬度在标注图标的锚点，默认底边中点
				   //     x:0,    原点为给出的经纬度
				   //     y:0,
				   // }
				                
				   }],
				// controls:[{
				// 	id:0,
				// 	clickable:true,
				// 	position:{
				// 		left:0
				// },
				// iconPath:'../../../static/地图.png'
	   //      }]
	   　　controls:[{//在地图上显示控件，控件不随着地图移动
	      　　id:1,//控件id
	      　　iconPath:'../../static/fangxiang.png',//显示的图标    
	      　　position:{//控件在地图的位置
	         　　left:15,
	         　　top:15,
	         　　width:50,
	         　　height:50
	     　　  },    
	   　　}],
	    }
		},
	    methods: {startGaoDeListener(gaodeMap) {
				var that = this;
                let state = setInterval(function() {
                    gaodeMap.stateGaoDe(function(res) {
            
						if(res.msg=='退出导航'){
							uni.reLaunch({
								url:"../conversations/conversations",
								success() {
									clearInterval(that.ID);
								}
							})
							that.endL = uni.getStorageSync('L');
							that.endLo = uni.getStorageSync('Lo');
								
							if(that.myL<=(that.endL+0.2*that.endL)&&that.myL>=(that.endL-0.2*that.endL)&&that.myLo<=(that.endLo+0.2*that.endLo)&&that.myLo>=(that.endLo-0.2*that.endLo)){
								uni.setStorageSync('isForSave',false)
							}
						
						}
                    })
                }, 500);
				this.ID = state;
				
				
                //clearInterval(state)
            },
            gotoStartGaoDeNav() {
                /* 直接导航 */
                gaodeMap.gotoStartGaoDeNav(mapNavi, function(res) {
                    console.log(res)
					console.log("gotoStartGaoDeNav");
                });
            },
            gotoRide() {
                /* 骑行导航 */
                gaodeMap.gotoRideRoute(mapNavi, function(res) {
                    console.log(res)
                });
            },
            gotoDriveRoute() {
                /* 驾车导航 */
                gaodeMap.gotoDriveRoute(mapNavi, function(res) {
                    console.log(res)
                });
            },
            gotoWalkRoute() {
                /* 步行导航 当前位置，终点距离不能超过100公里 */
                gaodeMap.gotoWalkRoute(mapNavi, function(res) {
                    console.log(res)
                });
            },
            getShowRoute() {
                //起点 
                let start = {
                    Name: '三元桥',
                    Lat: this.myL,
                    Lng: this.myLo,
                    ID: ""
                };
                //途径点（最多支持三个)
  
          
                //终点
                let end = {
                    Name: '北京站',
                    Lat: 40.013305,
                    Lng: 118.685713,
                    ID: ""
                };
                /* gaodeMap.gotoShowRoute(null,wayList,end,(res)=>{
                    console.log(res)
                }); */
                gaodeMap.gotoShowRoute(start, wayList, end, (res) => {
                    console.log(res)
                });
				}
			,
			click(){
				console.log(111)
				uni.chooseLocation({
				    success: function (res) {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
				    }
				});
							console.log(111)
			},
			show(gaodeMap){
				var that = this;
				function getShow(){
				//起点 
				console.log(that.myL)
				let start={Name:'我的位置',Lat:that.myL,Lng:that.myLo,ID:""};
				//途径点（最多支持三个)
				let wayList=[];
				
				//终点
				
				// uni.setStorageSync('L',27.4512);
				// uni.setStorageSync('Lo',115.552);
				that.endL = uni.getStorageSync('L');
				that.endLo = uni.getStorageSync('Lo')
				let end={Name:'目标位置',Lat:that.endLo,Lng:that.endL,ID:""};
				console.log(that.myL);
				console.log(that.myLo);
				console.log(that.endL);
				console.log(that.endLo);
				/* gaodeMap.gotoShowRoute(null,wayList,end,(res)=>{
				console.log(res)
				}); */
				gaodeMap.gotoShowRoute(start,wayList,end,(res)=>{
				console.log(res)
				});
				/* gaodeMap.gotoShowRoute(start,null,end,(res)=>{
				console.log(res)
				});
				gaodeMap.gotoShowRoute(null,null,end,(res)=>{
				console.log(res)
				}); */
				}
				getShow();
			}
	    },
		onLoad(option) {
			console.log(option);
		}
	}
	
	//TODO 进行地图放入index页面的集合，并且变成一个上拉和下拉的监听事件进行对应的 --- 需要服务器进行对应的记载相应的位置在哪里
	//页面的设计等 直接使用巨的格式和方式进行加载  ---- 启动页和引导页的制作  
</script>

<style>

</style>
