var http = require('http');
var util = require('util');
var querystring = require('querystring');
// 加载node上websocket模块 ws;
var ws = require("ws");

// var formidable = require('formidable');
 
//已连接socket用户
var MYCLIENT=[];
var MyLoop=null;

var OpenHeartBeat=false;

// 启动基于websocket的服务器,监听我们的客户端接入进来。
var server = new ws.Server({
	host: "0.0.0.0",
    port: 6085,
    verifyClient:verifyClient
});

//接收PHP的post请求
http.createServer(function(req, res){
    
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
		console.log('chunk:',chunk);
    });
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        // res.end(util.inspect(post));
        console.log('接收到post请求');
        console.log(post," ",typeof(post));
		for(var i in post)
		console.log("i:",i," ",post[i]);
        //当PHP处理完用户新提交的保修单后触发
        if(post.type=='NewOrder'){
			//返回数据给请求用户
            res.end(JSON.stringify({type:'NewOrder_Success'})); 
			
            SendClientUpdate(post.type,post.id.split(','));
        }
        //当PHP处理完管理员处理新的维修单后触发
        if(post.type=='CompleteNewOrder'){
            res.end(JSON.stringify({type:'CompleteNewOrder_Success'}));
            SendClientUpdate(post.type,post.id.split(','));
        }

        //管理员提交维修结束的请求后，触发维修结束
        if(post.type=='OrderEnding'){
            res.end(JSON.stringify({type:'OrderEnding_Success'}));
            SendClientUpdate(post.type,post.id.split(','));
        }


        //客户提交对管理员的评价后触发
        if(post.type=='OrderScore'){
            res.end(JSON.stringify({type:'OrderScore_Success'}));
            SendClientUpdate(post.type,post.id.split(','));

        }

        //管理员处理了无效订单
        if(post.type=='InvalidOrder'){
            res.end(JSON.stringify({type:'OrderScore_Success'}));
            SendClientUpdate(post.type,post.id.split(','));

        }
        //管理员修改维修人员
        if(post.type=='RepairUpdate'){
            res.end(JSON.stringify({type:'RepairUpdate_Success'}));
            SendClientUpdate(post.type,post.id.split(','));

        }
        //管理员删除订单
        if(post.type=='DeletOrder'){
            res.end(JSON.stringify({type:'DeletOrder_Success'}));
            SendClientUpdate(post.type,post.id.split(','));

        }
        if(post.type=='JBOpenID'){
            res.end(JSON.stringify({type:'JBOpenID_Success'}));
            SendClientUpdate(post.type,post.id.split(','));
        }


        
    });
}).listen(3005);


//更新socket时间
function UpdateHeartBeat(data){
    for(var i=0;i<MYCLIENT.length;i++){
        if(MYCLIENT[i].socket==data.socket){
            MYCLIENT[i].time=data.NewTime;
            MYCLIENT[i].socket.send(JSON.stringify({type:'UpdateSuccess'}))
        }
    }


}



//心跳检测
function HeartBeat(){
    //开启心跳包检测
    console.log('服务器开启心跳检测');
    loop();
    function loop(){
        MyLoop=setTimeout(loop, '7000');
        // console.log('服务器检测');
        // console.log(MYCLIENT);
        var timeDic={};
        var MyNowTime=new Date().getTime();
        for(var i=0;i<MYCLIENT.length;i++){
            if(MyNowTime-MYCLIENT[i].time>=6000){
                // console.log('用户断线，id:'+MYCLIENT[i].id);
                MYCLIENT.splice(i,1);
                if(MYCLIENT.length==0){
                    clearTimeout(MyLoop);
                    OpenHeartBeat=false;
                    // console.log('停止心跳检测');
                  }
            }else{
                timeDic[i]=MyNowTime-MYCLIENT[i].time;

            }
          
        }
       
        // console.log(timeDic);
    
        

    }



}



//查找id对应的socket
function CheckSocket(myid){
    var result={state:false,socket:[]};
    for(var i=0;i<MYCLIENT.length;i++){
        if(MYCLIENT[i].id==myid){
            result.state=true;
            result.socket.push(MYCLIENT[i].socket);
        }
    }
    return result;
}


//触发通知函数
function SendClientUpdate(type,myid){
    for(var j=0;j<myid.length;j++){
        var result=CheckSocket(myid[j]);

        if(result.state){
            for(var i=0;i<result.socket.length;i++){
                result.socket[i].send(JSON.stringify({type:type,id:myid.toString()}));
                console.log('发送。。。',type);
            }
        }
    }
}


 //socket连接验证
function verifyClient(info){
	console.log("start")
    // console.log(info.req.url);
    if(info.req.url=='/?type=ConnetSocket'){
        console.log('验证成功');
        return true;
    }else{
        console.log('验证失败');
        return false;
    }
}



// 监听接入进来的客户端事件
function websocket_add_listener(client_sock) {
	// close事件
	client_sock.on("close", function() {

        for(var i=0;i<MYCLIENT.length;i++){
            if(MYCLIENT[i].socket==client_sock){
                MYCLIENT.splice(i,1);
                if(MYCLIENT.length==0){
                    clearTimeout(MyLoop);
                    OpenHeartBeat=false;
                    console.log('停止心跳检测');
                }
               
            }
        }
        console.log(MYCLIENT);
		console.log("client close");
	});
 
	// error事件
	client_sock.on("error", function(err) {
		console.log("client error", err);
	});
	// end 
	// message 事件, data已经是根据websocket协议解码开来的原始数据；
	// websocket底层有数据包的封包协议，所以，绝对不会出现粘包的情况。
	// 每解一个数据包，就会触发一个message事件;
	// 不会出现粘包的情况，send一次，就会把send的数据独立封包。
	// 想我们如果是直接基于TCP，我们要自己实现类是于websocket封包协议；
	client_sock.on("message", function(data) {
        var MyData=JSON.parse(data);
        console.log("type:",MyData.type);
        if(MyData.type=='MyInfo'){
            if(!OpenHeartBeat){
                HeartBeat();
                OpenHeartBeat=true;
            }
            var ClientObj={
                socket:client_sock,
                id:parseInt(MyData.id),
                time:new Date().getTime() 
            }
            console.log('新进入客户端')
            console.log(ClientObj.id);
            MYCLIENT.push(ClientObj);
            client_sock.send(JSON.stringify({type:'ConnetSuccess'}));
        }

        //接收到心跳包
        if(MyData.type=='HeartBeat'){
            console.log('收到心跳包');
            UpdateHeartBeat({
                socket:client_sock,
                NewTime:new Date().getTime() 
            })
        }

        // console.log(MYCLIENT);
	});
	// end 
}
 
// connection 事件, 有客户端接入进来;
function on_server_client_comming (client_sock) {
    console.log("有客户端连接websocket");
	websocket_add_listener(client_sock);
}
 
server.on("connection", on_server_client_comming);
 
// error事件,表示的我们监听错误;
function on_server_listen_error(err) {
 
}
server.on("error", on_server_listen_error);
 
// headers事件, 回给客户端的字符。
function on_server_headers(data) {
	// console.log(data);
}
server.on("headers", on_server_headers);
console.log('Socket服务器开启成功,正在监听6085端口');
console.log('请求服务器开启成功,正在监听3000端口post请求');
 
 
