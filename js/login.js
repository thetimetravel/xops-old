function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

  $.post("http://127.0.0.1:86/HBuilder/xops/Back.php",{
	     
	     type:"User",
		 operation:"login",
	     account:username,
		 password:password,
		 token:"1ab66e59325257b60b971d4afa1505ce"
	     
	   },function(data,status){
	
	// alert("df:<?php  session_start(); $_SESSION['amid'];?>")
	
		  var obj=JSON.parse(data);
	     var id=obj.data;
		switch(obj.code)
{
    case 203:
	   $.sendSuccessToTop('账户和密码不能为空！', 2000, function() {  });
        // alert("账户和密码不能为空");
        break;
	case 201:
	 $.sendSuccessToTop('账户不能为空！', 2000, function() {  });
	     // alert("账户不能为空");
		 break;
	case 202:
	$.sendSuccessToTop('密码不能为空！', 2000, function() {  });
		 // alert("密码不能为空")
         break;
    case 301:
	$.sendSuccessToTop('账户输入错误！', 2000, function() {  });
		 // alert("账户输入错误！");
		 break;
	case 302:
	$.sendSuccessToTop('密码输入错误！', 2000, function() {  });
		 // alert("密码输入错误！");
		 break;
	case 200:
	$.sendSuccessToTop('登录成功！', 2000, function() {  });
		 // alert("登录成功！")
		 // var t=document.write()
		
			localStorage.setItem('xops_id', username);
			// localStorage.setItem('xops_admin_id', id);
				// alert("w:+"+localStorage.getItem('xops_id'))
				 
		 window.location.href="http://127.0.0.1:86/HBuilder/xops/index.html"
		 break;
    default:
        ;

}
		 
	    });
		

	//    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
	// httpRequest.open('POST', 'http://localhost:86/HBuilder/xops/login.php', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
	// httpRequest.setRequestHeader("Content-type","application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
	// var obj = {
	// 	type: "OrderManager22",
	// 	operation: "OrderSearch",
	// };
	// httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中
	// /**
	//  * 获取数据后的处理程序
	//  */
	// httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
	//          console.log("pp:"+httpRequest.responseText)
	//     if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
	//         var json = httpRequest.responseText;//获取到服务端返回的数据
	//         console.log(json);
	//     }
	// 	 
	// };
	



	// 	function createXMLHttpRequest() {
	// 	var xmlHttp;
	// 	if (window.XMLHttpRequest) {
	// 		xmlHttp = new XMLHttpRequest();
	// 		if (xmlHttp.overrideMimeType)
	// 			xmlHttp.overrideMimeType('text/xml');
	// 	} else if (window.ActiveXObject) {
	// 		try {
	// 			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	// 		} catch (e) {
	// 			try {
	// 				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	// 			} catch (e) {
	// 			}
	// 		}
	// 	}
	// 	return xmlHttp;
	// }
	// 
	//     xmlHttp = createXMLHttpRequest();
	//     var url = "http://localhost:86/HBuilder/xops/login.php";
	//     xmlHttp.open("POST", url, true);
	//     xmlHttp.onreadystatechange = getStatusBack;
	//     xmlHttp.setRequestHeader("Content-Type",
	// 	   "application/x-www-form-urlencoded;");
	//   var obj ={	         
	//        type:"OrderManager22",
	//        value:"OrderSearch",
	// 
	//      };
	//  xmlHttp.send(obj);
// 	function post(URL, PARAMS)
// 	{
// 	    var temp = document.createElement("form");
// 	    temp.action = URL;
// 	    temp.method = "post";
// 	    temp.style.display = "none";
// 	    for (var x in PARAMS)
// 	    {
// 	        var opt = document.createElement("textarea");
// 	        opt.name = x;
// 	        opt.value = PARAMS[x];
// 	         alert(PARAMS[x]);
// 	        temp.appendChild(opt);
// 	    }
// 	 
// 	    document.body.appendChild(temp);
// 	alert(typeof(temp))
// 	var obj = {"name":"Poly", "career":"it"};
// for(var i in document.body.appendChild(temp)) {
// 
//      console.log(i,":",obj[i]);
// 
// }
// 
// 	    temp.submit();
// 	    return temp;
// 	} 
// 	
// 	 post("http://localhost:86/HBuilder/xops/login.php",obj)




}
