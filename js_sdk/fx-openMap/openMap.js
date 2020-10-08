let itemList = ["百度地图","高德地图","腾讯地图"];
// #ifdef APP-PLUS
var isBaidu = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'});
var isGaode = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'iosamap://'});
let AppitemList = [{title:"腾讯地图"}];
if(isBaidu && isGaode){
	AppitemList = [{title:"百度地图"},{title:"高德地图"}];
}
if(!isBaidu && isGaode){
	AppitemList = [{title:"高德地图"}];
}
if(isBaidu && !isGaode){
	AppitemList = [{title:"百度地图"}];
}
// #endif

function openMapByDefault(latitude, longitude, name) {
	uni.openLocation({
		latitude: latitude,
		longitude: longitude,
		name: name,
		address:"",
		fail: (err) => {
			console.log(err)
		},
	})
}
function openMapByAndroid(latitude, longitude, name) {
	let url = ''; // 回调地址
	let downloadUrl = ''; // 回调地址
	var bdapp = "bdapp://map/direction?destination=name:"+name+"|latlng:"+latitude+","+longitude+"&coord_type=gcj02&src=hxbank";
	var bdappDown = "http://map.baidu.com/zt/qudao/newfengchao/1012337a/html/slide.html"
	var amapuri = "amapuri://route/plan/?sourceApplication=hxbank&dlat="+latitude+"&dlon="+longitude+"&dname="+name+"&dev=1";
	var amapuriDown = "http://wap.amap.com/"
	// #ifdef APP-PLUS
	plus.nativeUI.actionSheet(
		{
			title:"选择导航",
			cancel:"取消",
			buttons:AppitemList
		},
		function(res){
			if(isBaidu && isGaode){
				if(res.index == 1){
					url = bdapp;
					downloadUrl = bdappDown
					openURL(url,downloadUrl)
				}else if(res.index ==2){
					url = amapuri;
					downloadUrl = amapuriDown
					openURL(url,downloadUrl)
				}
			}else if(!isBaidu && isGaode){
				if(res.index == 1){
					url = amapuri;
					downloadUrl = amapuriDown
					openURL(url,downloadUrl)
				}
			}else if(isBaidu && !isGaode){
				if(res.index == 1){
					url = bdapp;
					downloadUrl = bdappDown
					openURL(url,downloadUrl)
				}
			}else{
				openMapByDefault(latitude, longitude, name)
			}
		}
	);
	// #endif
	// #ifndef APP-PLUS
	uni.showActionSheet({
		itemList:itemList,
		success: (res) => {
			if(res.tapIndex == 0){
				url = bdapp;
				downloadUrl = bdappDown
				openURL(url,downloadUrl)
			}else if(res.tapIndex == 1){
				url = amapuri;
				downloadUrl = amapuriDown
				openURL(url,downloadUrl)
			}else{
				url = "qqmap://map/routeplan?type=drive&to="+name+"&tocoord="+latitude+","+longitude+""
				openURLTencent(url,latitude, longitude, name)
			}
			
		}
	})
	// #endif
	
}
function openMapByIos(latitude, longitude, name) {
	let url = ''; // 回调地址
	let downloadUrl = ''; // 回调地址
	var bdapp = "baidumap://map/direction?destination=name:"+name+"|latlng:"+latitude+","+longitude+"&coord_type=gcj02&src=hxban";
	var bdappDown = "http://map.baidu.com/zt/qudao/newfengchao/1012337a/html/slide.html";
	var amapuri = "iosamap://route/plan/?sourceApplication=hxbank&dlat="+latitude+"&dlon="+longitude+"&dname="+name+"&dev=1";
	var amapuriDown = "http://wap.amap.com/";
	// #ifdef APP-PLUS
	plus.nativeUI.actionSheet(
		{
			title:"选择导航",
			cancel:"取消",
			buttons:AppitemList
		},
		function(res){
			if(isBaidu && isGaode){
				if(res.index == 1){
					url = bdapp;
					downloadUrl = bdappDown
					openURL(url,downloadUrl)
				}else if(res.index == 2){
					url = amapuri
					downloadUrl = amapuriDown
					openURL(url,downloadUrl)
				}
			}else if(!isBaidu && isGaode){
				if(res.index == 1){
					url = amapuri
					downloadUrl = amapuriDown
					openURL(url,downloadUrl)
				}
			}else if(isBaidu && !isGaode){
				if(res.index == 1){
					url = bdapp;
					downloadUrl = bdappDown
					openURL(url,downloadUrl)
				}
			}else{
				 openMapByDefault(latitude, longitude, name)
			}
		}
	);
	// #endif
	// #ifndef APP-PLUS
	uni.showActionSheet({
		itemList:itemList,
		success: (res) => {
			if(res.tapIndex == 0){
				url = bdapp;
				downloadUrl = bdappDown
				openURL(url,downloadUrl)
			}else if(res.tapIndex == 1){
				url = amapuri
				downloadUrl = amapuriDown
				openURL(url,downloadUrl)
			}else{
				url = "qqmap://map/routeplan?type=drive&to="+name+"&tocoord="+latitude+","+longitude+""
				openURLTencent(url,latitude, longitude, name)
			}
		}
	})
	// #endif
	
}
function openURL(url,downLoadUrl) {
	// #ifdef APP-PLUS
	plus.runtime.openURL(url);
	// #endif
	// #ifndef APP-PLUS
		window.location.href=url;
		var startTime = Date.now();
		var count = 0;
		var endTime = 0;
		var t = setInterval(function () {
			count += 1;
			endTime = Date.now() - startTime;
			if (endTime > 800) {
				clearInterval(t);
			}
			if (count < 40){
				return false;
			}
			if(!(document.hidden || document.webkitHidden)) {
				if(window.plus){
					plus.runtime.openURL(downLoadUrl);
				}else{
					window.location.href = downLoadUrl;
				}
				
			   
			}
		}, 20);
	// #endif
	
}
function openURLTencent(url,latitude, longitude, name) {
	window.location.href=url;
	var startTime = Date.now();
	var count = 0;
	var endTime = 0;
	var t = setInterval(function () {
	  count += 1;
	  endTime = Date.now() - startTime;
	  if (endTime > 800) {
	    clearInterval(t);
	  }
	  if (count < 40){
		  return false;
	  } 
	  if (!(document.hidden || document.webkitHidden)) {
	   openMapByDefault(latitude, longitude, name)
	  }
	}, 20);
}
export default {
	/* 打开地图 */
	openMap(latitude, longitude, name) {
		// #ifdef MP-WEIXIN
			openMapByDefault(latitude, longitude, name)
		// #endif
		// #ifndef MP
			switch(uni.getSystemInfoSync().platform){
				case 'android':
					console.log('运行Android上')
					openMapByAndroid(latitude, longitude, name)
					break;
				case 'ios':
					console.log('运行iOS上')
					openMapByIos(latitude, longitude, name,)
					break;
				default:
					openMapByDefault(latitude, longitude, name)
					console.log('运行在开发者工具上')	
					break;
			}
			
		// #endif
		
	}
}