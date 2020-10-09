
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/map/map","pages/me/me","pages/daohang/daohang","pages/login/login","pages/conversations/conversations","pages/contacts/contacts","pages/mine/mine","pages/chat/privateChat/privateChat","pages/chat/groupChat/groupChat","pages/chat/groupChat/member","pages/re/re","pages/mine/recard/recard","pages/mine/charge/charge","pages/friends/friends","pages/read/read","pages/mine/recard/query/query","pages/evaluate/evaluate"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#3a57cc","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7A7E83","selectedColor":"#000000","borderStyle":"black","backgroundColor":"#ffffff","fontSize":"15px","list":[{"pagePath":"pages/index/index","text":"求救","iconPath":"static/wehelp/sos_1.png","selectedIconPath":"static/wehelp/sos_2.png"},{"pagePath":"pages/friends/friends","text":"动态","iconPath":"static/wehelp/dongtai_1.png","selectedIconPath":"static/wehelp/dongtai_2.png"},{"pagePath":"pages/conversations/conversations","text":"会话","iconPath":"static/wehelp/group_1.png","selectedIconPath":"static/wehelp/group_2.png"},{"pagePath":"pages/contacts/contacts","text":"通讯录","iconPath":"static/wehelp/tx_1.png","selectedIconPath":"static/wehelp/tx_2.png"},{"pagePath":"pages/mine/mine","text":"我","iconPath":"static/wehelp/mine_1.png","selectedIconPath":"static/wehelp/mine2.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Wehelp","compilerVersion":"2.8.11","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"求救"}},{"path":"/pages/map/map","meta":{},"window":{"navigationBarTitleText":"地图"}},{"path":"/pages/me/me","meta":{},"window":{}},{"path":"/pages/daohang/daohang","meta":{},"window":{"navigationBarTitleText":"引导页","titleNView":false,"bounce":"none"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","titleNView":true}},{"path":"/pages/conversations/conversations","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"会话","titleNView":true}},{"path":"/pages/contacts/contacts","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"通讯录"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/chat/privateChat/privateChat","meta":{},"window":{"navigationBarTitleText":"uni-app","enablePullDownRefresh":true}},{"path":"/pages/chat/groupChat/groupChat","meta":{},"window":{"navigationBarTitleText":"群","enablePullDownRefresh":true}},{"path":"/pages/chat/groupChat/member","meta":{},"window":{"navigationBarTitleText":"群成员","navigationBarBackgroundColor":"#F3F4F7"}},{"path":"/pages/re/re","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/mine/recard/recard","meta":{},"window":{}},{"path":"/pages/mine/charge/charge","meta":{},"window":{"backgroundColor":"#f4f8fb"}},{"path":"/pages/friends/friends","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"动态","enablePullDownRefresh":true}},{"path":"/pages/read/read","meta":{},"window":{}},{"path":"/pages/mine/recard/query/query","meta":{},"window":{}},{"path":"/pages/evaluate/evaluate","meta":{},"window":{"navigationBarTitleText":"评价"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
