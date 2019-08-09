/* 
 * 动态数据表格插件 zbtable
 * @author banzz
 * @version v.1.0.1
 * @since 2018-11-20
 */

	 // alert("1p:"+ window.screen.availWidth)
;(function($){
	$.fn.ZBTable=function(options){
		
		var defaults={
			evenRowClass:'zbt-evenRow',
    		oddRowClass:'zbt-oddRow',
    		curRowClass:'zbt-curRow',
    		titles:[],
    		data: [],
    		overflowHeight: "260px"
		}
		
		var opts=$.extend(defaults, options);
		
		var titles = opts.titles;
		var datas = opts.data;
		
		var init = function (dom){
			var id = dom[0].id;
			$("#"+id).empty();
			
			var arrH = [];
			arrH.push("<div id='"+id+"-zbTable-head'>");
			arrH.push("<table class='zbt-table'>");
			arrH.push("<thead id='"+id+"-thead'>");
			arrH.push("<tr>");
			$.each(titles,function(i,item){
				var tdw = "";
				if(item.width){
					tdw = "width='"+item.width+"'px";
				}
				if(item.checkBox){
					// console.log("ty:"+i+" "+tdw)
					arrH.push("<th "+tdw+"><input type='checkbox' name='AllChecks'/></th>");
				}else{
				// console.log("tt:"+i+" "+tdw+" "+item.title)
					arrH.push("<th "+tdw+" width style=\"width: 110px;\">"+item.title+"</th>");
				}
			});
			arrH.push("</tr>");
			arrH.push("</thead>");
			arrH.push("</table>");
			arrH.push("</div>");
			dom.append(arrH.join(""));
			
			var arrB = [];
			var y=-1;
			arrB.push("<div id='"+id+"-zbTable-data'>");
			arrB.push("<table class='zbt-table'>");
			arrB.push("<tbody id='"+id+"-tbody'>");
			$.each(datas, function(i,item) {
				arrB.push("<tr id='"+i+"tab'  >");
				$.each(titles, function(i,item2) {
					if(item2.checkBox){
						arrB.push("<td><input type='checkbox' class='testclass' name='Checks' value='"+item[item2.keyName]+"'/></td>");
					}else{
					 // for(var j in item)
					 // console.log("p1:"+j+" "+item[j]+" "+i)
						y++;
						var t=y/6;
						t= parseInt(t);
						// console.log("yy:"+y+" "+t+" "+i);
						if(item2['keyName']=="password")
						arrB.push("	<td ><input  onchange=\"change(this,'"+t+"','"+item2["keyName"]+"')\"  class='contain' name='Checks' value='"+item[item2.keyName]+"' onkeyup=\"value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')\" /></td>");
						else
						arrB.push("	<td ><input  onchange=\"change(this,'"+t+"','"+item2["keyName"]+"')\"  class='contain' name='Checks' value='"+item[item2.keyName]+"'/></td>");
					}
				});
				arrB.push("</tr>");
			});
			arrB.push("</tbody>");
			arrB.push("</table>");
			arrB.push("</div>");
			dom.append(arrB.join(""));
		}
		
		var addRowColor = function (_id){
			$("#"+_id+"-tbody tr:even").addClass(opts.evenRowClass);
			$("#"+_id+"-tbody tr:odd").addClass(opts.oddRowClass);
			$("#"+_id+"-tbody tr").hover(function(){
	       			$(this).addClass(opts.curRowClass);
	       		},function(){
	       			$(this).removeClass(opts.curRowClass);
	       		}
	        );
		}
		
		var syncTableWidth = function (id){
			var ths = $("#"+id+"-thead tr:eq(0) > th");
			var len = ths.length;
			ths.each(function(i){
				if(i < len - 1){
					var tarTh= $(this);
					var srcTd= $("#"+id+"-tbody tr:eq(0) > td:eq(" + i + ")");
					if(srcTd.length == 0){
						return;
					}
					var inW,outW,Width;
					if(tarTh.attr("width")){
						inW= Math.ceil(tarTh.innerWidth());
						outW= Math.ceil(tarTh.outerWidth());
						Width= Math.ceil(tarTh.width());
					}else{
						inW= Math.ceil(srcTd.innerWidth());
						outW= Math.ceil(srcTd.outerWidth());
						Width= Math.ceil(srcTd.width());
					}
					inW=100;
					outW=100;
					Width=120;
					// console.log('[]:'+inW+" "+outW+" "+Width)
					srcTd.innerWidth(inW).outerWidth(outW).width(Width);
					tarTh.innerWidth(inW).outerWidth(outW).width(Width);
				}
			});
		}
		
		var setOverflowHeight = function (id){
			$("#"+id+"-zbTable-data").css({"max-height": opts.overflowHeight,"overflow":"auto"});
		}
		
		return this.each(function(){
			var _this = $(this);
			var _this_id = _this[0].id;
			 
			init(_this);
			 
			addRowColor(_this_id);
			
         	syncTableWidth(_this_id);
         	
         	setOverflowHeight(_this_id);
         	
         	addEvents(_this_id);
         	
		});
		
		function addEvents(id){
			
			var allcheck = $("#"+id+"-thead>tr input[type='checkbox'][name='AllChecks']");
			var checks = $("#"+id+"-tbody>tr input[type='checkbox'][name='Checks']");
			var len = checks.size();
			allcheck.click(function(){
				var f = this.checked;
				$("input[type='checkbox'][name='Checks']").each(function(i,item){
					item.checked = f;
				});
			});
			
			checks.click(function(){
				var num = 0;
				var f = allcheck.is(':checked');
				if(f){
					allcheck.attr('checked',false);
				}
				checks.each(function(i,item){
					if(item.checked){
						num++;
					}
				});
				if(num == len){
					allcheck.attr('checked',true);
				}
			});
		}
	}
})(jQuery);