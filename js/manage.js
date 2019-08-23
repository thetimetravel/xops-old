$(document).ready(main);

function main(){
    //左侧栏动态显示
    $('.c').mouseover(function () {
        $(this).children('ul').stop(true,true).show('normal');
    });
    $('.myflight_subnav_wrapper').mouseleave(function () {

        $(this).children('ul').hide();
    });
    //右侧栏
    $('.manage_tab li').bind('click', function () {
		// alert("d")
		
        $(this).addClass('manage_tab_bright').siblings('li').removeClass('manage_tab_bright');
		
        if($(this).index()==0){
			 
            // alert(0)
            chusi();
		    $('#show_data').attr("style","display:none;")
			// $('#show_data').show("fast",function(){
			// 	init();
			// });
			//slow
	
			$( "#finish" ).hide();
			
			 $("#shenhe").hide();
			 $("#guo").hide();
			 	$('#show_data').show();
			 init();
        }
        else if($(this).index()==1){
			// alert(1)
            $('.manage_myflight_content ul').hide();
	    $("#guo").empty();
		
			 $("#finish").hide();
			 $("#shenhe").hide();
			  $('#show_data').attr("style","display:none;")
			  // $( "#finish" ).show("fast",function(){
				 //     
				 //  finish()
			  // });
			  	chusi();
			  $( "#finish" ).show();
			  finish();
			
        }else{
			// alert(2)
			 $("#guo").hide()
			 $('.manage_myflight_content ul').hide();
			$('#show_data').attr("style","display:none;")
		  $("#finish").hide();
		chusi();
			
				// $("#shenhe").show(" ",function(){
				// 				  shenhe()
				// });
				 $("#shenhe").show();
				 shenhe();
				 
		}
		// alert("dd6:"+$(this).index())
    })
	
	
}

		function deal(ww){
			// alert("dfg:"+parseInt($(ww).attr("id")))
		 // $( "#finish" ).hide();
			 $('#show_data').attr("style","display:none;")
				$("#guo" ).show("fast", function() {
					$("#guo").empty();
				 guo(parseInt($(ww).attr("id")))
				 chusi();
			
			})
			
			  $( "#finish" ).hide();
			
		}
		
		function delfinsih(ww){

			 $('#show_data').attr("style","display:none;")
			
			 $( "#finish" ).hide();
			
			 $("#guo" ).show("fast", function() {
			 		$("#guo").empty();
			 	 guo(parseInt($(ww).attr("id")))
			 chusi();
			 })
		}
		
		function shen(ww){
			$('.manage_myflight_content ul').hide();
			 $('#show_data').attr("style","display:none;")
		
			 $( "#finish" ).hide();
			 $( "#shenhe" ).hide();
			   
			 // $("#guo" ).show("fast", function() {
			 // 		$("#guo").empty();
			 // 	 guo(parseInt($(ww).attr("id")))
			 // chusi();
			 // })
			 $("#guo" ).show()
			 	$("#guo").empty();
			 	 guo(parseInt($(ww).attr("id")))
			 chusi();
		}
		
			function fhui(){

				  $('.manage_myflight_content ul').hide();
					$(".maindiv").hide()	
						$("#shenhe").hide()
							$("#guo").hide()
				// $('#show_data').show("fast",function(){
				// 
				// 	init();
				// 	chusi();
				// });
				
				$('#show_data').show();
				init();
					chusi();
			}
			
			function fhui2(){
			
				$("#show_data").hide()
				  $('.manage_myflight_content ul').hide();
					$("#guo").hide()
					$(".maindiv").hide()
						$("#shenhe").hide()
				// $('#finish').show("slow",function(){
				// 	finish();
				// 	chusi();
				// });
				$('#finish').show();
				finish();
					chusi();
			}
			
			function fhui4(){
				 $("#guo").hide()
				$('.manage_myflight_content ul').hide();
				$("#finish").hide();
				$('#show_data').attr("style","display:none;")
				// $("#shenhe").show(" ",function(){
				//  shenhe()
				//  chusi();
				// 				});
				$("#shenhe").show();
				  shenhe()
				 chusi();
				
			}
			function del(ww){
			
		  $.sendConfirm({
		   withCenter: true,
		   title: '提示',
		   msg: '您确定删除该订单信息吗？',
		   button: {
		     confirm: '确认',
		     cancel: '取消',
		     cancelFirst: true
		   },
		   onConfirm: function() {
			 
			   $.post("http://127.0.0.1:86/HBuilder/xops/Back.php", {
			   	type: "Yuorder",
			   	operation: "delid",
			    userid:parseInt($(ww).attr("id")),
			   	token: "1ab66e59325257b60b971d4afa1505ce"
			   }, function(data2, status) {
				
			   	obj = JSON.parse(data2);
				   // alert("d:"+obj.code)
				switch(obj.code){
					case 201:
					 $.sendSuccessToTop('缺少参数id或者id为空', 2000, function() {			 	});
					break;
					case 203:
					$.sendSuccessToTop('参数id不存在数据库', 2000, function() {			 	});
					break;
					case 200:
					 $.sendSuccessToTop('删除成功', 2000, function() {
					  console.log('sendSuccessToTop closed');
									 
					});
					   chusi();
					var methods=$("#resurn").attr("onclick");
								
					if(methods.indexOf("2")!=-1)
					fhui2();
					else if(methods.indexOf("4")!=-1)
					 fhui4();
					 else
					  fhui();
				
					break;
					case 202:
					 $.sendSuccessToTop('删除失败', 2000, function() {
					  console.log('sendSuccessToTop closed');
									 
					});
					break;
					default:
					break
				}
				
				})
			 
			
		     console.log('点击确认！');
		   },
		   onCancel: function() {
		     console.log('点击取消！');
		   },
		   onClose: function() {
		     console.log('点击关闭！');
		   },
		
		 });
		    chusi();
	}


			
		function suc(value){
			var act=localStorage.getItem('xops_id');
			// alert("dd:"+typeof(act)+" "+act)
			if(act==null){
				$.sendSuccessToTop('当前登录用户名无效，登录失败，请重新登录！', 2000, function() {  });
			}else{
				$.post("http://127.0.0.1:86/HBuilder/xops/Back.php", {
					type: "Yuorder",
					operation: "addac",
				 username:act,
				 userid:parseInt($(value).attr("id")),
					token: "1ab66e59325257b60b971d4afa1505ce"
				}, function(data2, status) {
								
							// alert("da:"+data2)
					var obj = JSON.parse(data2);
						 if(obj.code==201){
					$.sendSuccessToTop('参数id,账号为空', 2000, function() {  });
													   }else if(obj.code==200){
														   $.sendSuccessToTop('处理成功！', 2000, function() {  });
														   fhui();
													   }else if(obj.code==203){
													 $.sendSuccessToTop('管理员登录账户错误！', 2000, function() {  });
													   }
					 // alert("5d:"+act+" "+parseInt($(value).attr("id")))
					 $.post("http://mycloud.konzesys.com.cn/app/zhiweibao/xops/Back.php", {
						type: "Yuorder",
						operation:"weixin",
					 username:act,
					 userid:parseInt($(value).attr("id")),
						token: "1ab66e59325257b60b971d4afa1505ce"
					}, function(data2, status) {
						 // alert("4d:"+data2)
						})
								  
						
								   })
				
			}
			// alert("f")
			chusi();
			// alert("dfg:"+parseInt($(value).attr("id")))
		

		}
 