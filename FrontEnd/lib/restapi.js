//用户数据示例
//注册直接注册一个users在创建的时候的  ---- 求救组成一个群聊;
let users = [
    {
        "uuid": "08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a",
        "name": "123",
        "password": "123",
		"address":"",
        "avatar": '/static/images/Avatar-1.png'
    },
    {
        "uuid": "3bb179af-bcc5-4fe0-9dac-c05688484649",
        "name": "Wallace",
        "password": "123",
        "avatar": '/static/images/Avatar-2.png'
    },
    {
        "uuid": "fdee46b0-4b01-4590-bdba-6586d7617f95",
        "name": "Tracy",
        "password": "123",
        "avatar": '/static/images/Avatar-3.png'
    },
    {
        "uuid": "33c3693b-dbb0-4bc9-99c6-fa77b9eb763f",
        "name": "Juanita",
        "password": "123",
        "avatar": '/static/images/Avatar-4.png'
    }
];

//群数据示例
let groups = [
    {
        "uuid": "group-a42b-47b2-bb1e-15e0f5f9a19a",
        "name": "群1",
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649', 'fdee46b0-4b01-4590-bdba-6586d7617f95', '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f']
    },
    {
        "uuid": "group-4b01-4590-bdba-6586d7617f95",
        "name": "群2",
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', 'fdee46b0-4b01-4590-bdba-6586d7617f95', '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f']
    },
    {
        "uuid": "group-dbb0-4bc9-99c6-fa77b9eb763f",
        "name": "群3",
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649']
    }
];


function RestApi() {

}

RestApi.prototype.getThisUser = function () {
    //var friendList = users.filter(v => v.uuid != user.uuid);
	const baseUrl = 'http://159.138.27.178:3000';
	uni.request({
		url:baseUrl+'/users/',
		success:(ress)=>{
			users = ress.data;
			console.log(users);
		},
			
		fail:(err)=>{
			console.log("yes");
			console.log(baseUrl);
			console.log(err);
		}
	})
    //return friendList;
}
RestApi.prototype.getThisGroup = function () {
    //var friendList = users.filter(v => v.uuid != user.uuid);
	const baseUrl = 'http://159.138.27.178:3000';
	uni.request({
		url:baseUrl+'/group/',
		success:(ress)=>{
			groups = ress.data;
			console.log(groups);
		},
			
		fail:(err)=>{
			console.log("yes");
			console.log(baseUrl);
			console.log(err);
		}
	})
    //return friendList;
}

RestApi.prototype.findFriends = function (user) {
    var friendList = users.filter(v => v.uuid != user.uuid);
    return friendList;
}

RestApi.prototype.findGroups = function (user) {
    var groupList = groups.filter(v => v.userList.find(id => id == user.uuid));
	console.log(groupList)
    return groupList;
}

RestApi.prototype.findUser = function (username, password) {
	
    var user = users.find(user => (user.name == username && user.password == password))
    return user;
}
RestApi.prototype.addgroup = function(uuid,name,list){
	groups.push({"uuid":uuid,"name":name,"userList":list});
	console.log(groups)
}

RestApi.prototype.findGroupMembers = function (groupId) {
    let members = [];
    let group = groups.find(v => v.uuid == groupId);
    users.map(user => {
        if (group.userList.find(v => v == user.uuid)) {
            members.push(user)
        }
    });
    return members;
}

export default new RestApi();
