/**

 @Name：testTablePlug tablePlug测试页面引用的组件
 @Author：岁月小偷
 @License：MIT

 */
// layui.config({base: 'layui/plug/'})
layui.config({
		base: 'download/tablePlug/'
	})
	.extend({
		tablePlug: 'tablePlug.min'
	})
	// .extend({tablePlug: 'tablePlug/tablePlug'})
	.extend({
		renderFormSelectsIn: '{/}test/js/renderFormSelectsIn'
	})
	.define(['tablePlug', 'laydate', 'renderFormSelectsIn'], function(exports) {
		"use strict";
		var $ = layui.$,
			form = layui.form,
			layer = layui.layer,
			table = layui.table,
			laydate = layui.laydate,
			formSelects = layui.formSelects,
			renderFormSelectsIn = layui.renderFormSelectsIn,
			tablePlug = layui.tablePlug;

		// 重置选中状态的按钮点击触发
		window.resetCheckboxStatus = function(elem) {
			elem = $(elem);
			var tableId = elem.data('id');
			tablePlug.tableCheck.reset(tableId);
			// 如果是data模式的需要重新同步一下数据
			var tableConfig = tablePlug.getConfig(tableId);
			!tableConfig.url && tableConfig.data && tablePlug.dataRenderChecked(tableConfig.data, tableId);
			table.reload(tableId, {
				page: {
					curr: 1
				}
			});
		};

		// 是否跨页的开关监听
		form.on('switch(statusSwitch)', function(data) {
			var elem = $(data.elem);
			var formElem = elem.closest('.layui-form');
			var tableElem = formElem.next('table');

			var tableId = tableElem.next() ? (tableElem.next().attr('lay-id') || tableElem.attr('id')) : tableElem.attr('id');
			tablePlug.tableCheck.reset(tableId);
			table.reload(tableId, {
				checkStatus: data.elem.checked ? {} : null,
				page: {
					curr: 1
				}
			});
		});

		// 是否启用智能reload
		form.on('switch(smartSwitch)', function(data) {
			tablePlug.smartReload.enable(data.elem.checked);
			$('[lay-event="reload"][data-url="data11"]').first().click();
		});

		// 当前表格要不要智能reload
		form.on('switch(tableSmartSwitch)', function(data) {

			var elem = $(data.elem);
			var formElem = elem.closest('.layui-form');
			var tableElem = formElem.next('table');

			var tableId = tableElem.next() ? (tableElem.next().attr('lay-id') || tableElem.attr('id')) : tableElem.attr('id');
			tablePlug.tableCheck.reset(tableId);
			table.reload(tableId, {
				smartReloadModel: data.elem.checked
			});

		})

		//监听头工具栏事件
		table.on('toolbar(test)', function(obj) {
			var that = this;
			var config = obj.config;
			var btnElem = $(that);
			var tableId = config.id;
			var tableView = config.elem.next();
			switch (obj.event) {
				// case 'addTempData':
				//   // table.addTemp(tableId, function (trElem) { // 不给默认数据默认就是{}
				//   table.addTemp(tableId, {city: '广州', score: 100, experience: '', birthday: ''}, function (trElem) { // 新增支持传一个默认数据
				//     // 进入回调的时候this是当前的表格的config
				//     var that = this;
				//     // 初始化laydate
				//     layui.each(trElem.find('td[data-field="birthday"]'), function (index, tdElem) {
				//       tdElem.onclick = function (event) {
				//         layui.stope(event);
				//       };
				//       laydate.render({
				//         elem: tdElem.children[0],
				//         format: 'yyyy/MM/dd',
				//         done: function (value, date) {
				//           var trElem = $(this.elem[0]).closest('tr');
				//           table.cache[that.id][trElem.data('index')]['birthday'] = value;
				//         }
				//       });
				//     });
				//     renderFormSelectsIn(trElem, {}, 'layuiTable');
				//   });
				//   break;
				// case 'getTempData':
				//   layer.alert('临时数据:' + JSON.stringify(table.getTemp(tableId).data));
				//   break;
				// case 'cleanTempData':
				//   table.cleanTemp(tableId);
				//   layer.msg('临时数据已删除');
				//   break;
				// case 'openSelect':
				//   layer.open({
				//     type: 1,
				//     title: '测试下拉效果单页面',
				//     area: ['300px', '160px'],
				//     content: '<div class="layui-form" style="padding: 20px;"><select><option value="1">北京</option><option value="2">上海</option><option value="3">广州</option><option value="4">深圳</option></select></div>',
				//     success: function (layero, index) {
				//       form.render('select', null, layero.find('select'));
				//     }
				//   });
				//   break;
				// case 'openIframeSelect':
				//   window.dataSub = {city: 2};
				//   layer.open({
				//     type: 2,
				//     title: '测试下拉效果iframe',
				//     shade: false,
				//     area: ['300px', '160px'],
				//     content: 'testIframe.html?time=' + new Date().getTime(),
				//     success: function (layero, index) {
				//     }
				//   });
				//   break;
				case 'autoReload':
					if (!layui._autoReloadIndex) {
						layui._autoReloadIndex = setInterval(function() {
							table.reload(tableId, {});
						}, 300);
					} else {
						clearInterval(layui._autoReloadIndex);
						layui._autoReloadIndex = 0;
					}

					break;
				case 'autoRefresh':
					if (btnElem.data('refresh')) {
						tablePlug.refresh(tableId, false);
					} else {
						tablePlug.refresh(tableId, btnElem.data('time') || 300);
					}
					btnElem.data('refresh', !btnElem.data('refresh'));
					break;
				case 'LAYTABLE_EXPORT':
					// 点击导出图标的时候
					$(this).find('.layui-table-tool-panel li').unbind('click').click(function() {
						// 干掉了原始的事件了，自己定义需要的
						var dataTemp = table.cache[tableId];
						if (!dataTemp || !dataTemp.length) {
							// 处理如果没有数据的时候导出为空的excel，没有导出thead的问题
							dataTemp = [{}];
						}
						// 实际可以根据需要还可以直接请求导出全部，或者导出选中的数据而不是只导出当前的页的数据
						table.exportFile(tableId, dataTemp, $(this).data('type'));
					});
					break;
				case 'getChecked':
					layer.alert(JSON.stringify(table.checkStatus(tableId).data));
					break;
				case 'getCheckedWithCache':
					layer.alert(JSON.stringify(table.checkStatus(tableId, true).dataCache));
					break;
				case 'getCheckedStatus':
					// alert("ale:"+data_json.length)
					var status = table.checkStatus(tableId).status;
					var re = status[tablePlug.CHECK_TYPE_ADDITIONAL];
					var re2 = [];

					function objFn(obj, objIndex, objs) {
						if (re.indexOf(obj.id) > -1)
							re2.push(objIndex);

					}
					data_json.findIndex(objFn)
					for (var i in re2)
						console.log("2q:" + i + " " + re2[i] + typeof(re2))


					layer.alert('新增的：' + JSON.stringify(status[tablePlug.CHECK_TYPE_ADDITIONAL]) + '<br>' +
						'删除的：' + JSON.stringify(status[tablePlug.CHECK_TYPE_REMOVED]));
					break;
				case 'daochu':

					var checkedIds;

					if (config.checkStatus) {
						// 开启了复选状态记忆
						checkedIds = tablePlug.tableCheck.getChecked(tableId);
					} else {
						// 不开启
						checkedIds = table.checkStatus(tableId).data;
					}

					checkedIds.length ?
						layer.open({
							type: 1,
							skin: 'layui-layer-demo', //样式类名
							closeBtn: 1, //不显示关闭按钮
							anim: 2,
							title: "导出数据",
							shade: 0,
							btn: ["导出所有数据", "导出所选数据"],
							shadeClose: true, //开启遮罩关闭
							area: ['330px', '150px'],
							offset: 'auto',
							maxmin: true,
							resize: true,
							content: '<span>文件名:&nbsp;<input type="text" style="width:80%;height:30px;margin-top:10px;"   maxlength="16" id="wen" />',
							yes: function(index, layero) {
								var value = $("#wen").val().trim();
								var len = value.length;
								var resu = '[["ID","职工名","密码","电话","性别","职工id","职务","注册时间"],';
								if (len == 0) {
									layer.msg("导出名称不能为空", {
										icon: 5,
										"title": "提示",
										offset: "rt",
										time: 1500
									});
									$("#wen").focus();
									return false;
								} else {

									value += ".xlsx";
									// alert("btn2:"+typeof(data_json)+" "+len+ " "+resu)
									for (var i in data_json) {
										resu += "[" + data_json[i]["id"] + ",'" + data_json[i]["account"] + "','" + data_json[i]["password"] +"','" + data_json[i]["tel"] + "','" + data_json[i]["sex"]  + "','" + data_json[i]["ac_id"] + "','" + data_json[i]["duty"] + "','" + data_json[i]["time"]+ "'],";
										// console.log("5q"+i+" "+0+" "+data_json[i])


									}
									resu = resu.substr(0, resu.length - 1);
									resu += "]";
									alert(resu)
									var obj2 = eval("(" + resu + ")")
									

									var wb = XLSX.utils.book_new();
									var ws = XLSX.utils.aoa_to_sheet(obj2);
									XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
									XLSX.writeFile(wb, value, {
										compression: true
									});

								}
								layer.msg("导出成功！", {
									icon: 5,
									"title": "提示",
									offset: "rt",
									time: 1500
								});
								parent.layer.close(index);
							},
							btn2: function(index, layero) {
								var value = $("#wen").val().trim();
								var len = value.length;
								if (len == 0) {
									layer.msg("导出名称不能为空", {
										icon: 5,
										"title": "提示",
										offset: "rt",
										time: 1500
									});
									$("#wen").focus();
									return false;
								}
								var status = table.checkStatus(tableId).status;
								var re = status[tablePlug.CHECK_TYPE_ADDITIONAL];
								var re2 = [];

								function objFn(obj, objIndex, objs) {
									if (re.indexOf(obj.id) > -1)
										re2.push(objIndex);

								}
								data_json.findIndex(objFn)
								// alert("c:"+re2.join(","))
								var show = []

								for (var i in re2) {
									show.push(data_json[re2[i]])
								}
							var resu = '[["ID","职工名","密码","电话","性别","职工id","职务","注册时间"],';
								// alert(JSON.stringify(show))
								for (var i in show) {
											resu += "[" + data_json[i]["id"] + ",'" + data_json[i]["account"] + "','" + data_json[i]["password"] +"','" + data_json[i]["tel"] + "','" + data_json[i]["sex"]  + "','" + data_json[i]["ac_id"] + "','" + data_json[i]["duty"] + "','" + data_json[i]["time"]+ "'],";

								}
								resu = resu.substr(0, resu.length - 1);
								resu += "]";
								var obj3 = eval("(" + resu + ")")
								// alert("[]:"+resu)
								value += ".xlsx";
								var wb = XLSX.utils.book_new();
								var ws = XLSX.utils.aoa_to_sheet(obj3);
								XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
								XLSX.writeFile(wb, value, {
									compression: true
								});
								layer.msg("导出成功！", {
									icon: 5,
									"title": "提示",
									offset: "rt",
									time: 1500
								});
								parent.layer.close(index);
							},
							success: function() {
								$("#wen").focus();

							}

						}) : layer.msg('请先选择需要导出的数据', {
							icon: 5,
							title: "提示"
						})
					break;
				case 'deleteSome':
					// 获得当前选中的，不管它的状态是什么？只要是选中的都会获得
					var checkedIds;

					if (config.checkStatus) {
						// 开启了复选状态记忆
						checkedIds = tablePlug.tableCheck.getChecked(tableId);
					} else {
						// 不开启
						checkedIds = table.checkStatus(tableId).data;
					}
					checkedIds.length ? layer.confirm('您是否确定要删除选中的' + checkedIds.length + '条记录？', function(index, layero) {
						// layer.alert('do something with: ' + JSON.stringify(checkedIds));
						tablePlug.del(tableId, checkedIds);
						// console.log("kq3:", checkedIds)
						$.post("http://localhost:86/HBuilder/xops/Back.php", {
							type: "Teacher",
							operation: "del",
							account: checkedIds.toString(),
							token: "1ab66e59325257b60b971d4afa1505ce"
						}, function(data, ss) {
							// alert("data:"+data)
							obj = JSON.parse(data);
							layer.close(index);
							if (obj.code == 200) {
								layer.msg('删除成功！', {
									icon: 1
								});
							} else {
								layer.msg('删除失败！', {
									icon: 1
								});
							}
						})


					}) : layer.msg('请先选中要删除的数据', {
						title: "提示",
						icon: 5
					});
					break;

				case 'reload':

					var options = config.page ? {
						page: {
							curr: resc
						}
					} : {};
					var urlTemp = btnElem.data('url');
					if (urlTemp) {
						options.url = 'json/' + urlTemp + '.json';
					}
					var optionTemp = eval('(' + (btnElem.data('option') || '{}') + ')');
					$.post("http://localhost:86/HBuilder/xops/Back.php", {
						type: "Teacher",
						operation: "search",
					
						token: "1ab66e59325257b60b971d4afa1505ce"
					}, function(data, status) {

						data_json = JSON.parse(data);
						data_json = data_json["data"];
						// alert("data3:"+(data));
						layui.use(['table'], function() {
							var table2 = layui.table;
							table2.reload('test', {
								data: data_json
							});
						});
					})


					table.reload(config.id, $.extend(true, options, optionTemp));

					break;
				case 'reloadIns':
					tablePlug.getIns(config.id).reload({
						// page: false
					});
					break;
				case 'setDisabled':
					// tablePlug.tableCheck.disabled(config.id, [10003, 10004, 10010]);
					// table.reload(tableId, {});
					tablePlug.disabledCheck(tableId, [10003, 10004, 10010]);
					break;
				case 'setDisabledNull':
					tablePlug.disabledCheck(tableId, false);
					break;
				case 'ranksConversion':
					// 表格行列转换(初步效果)
					tableView.toggleClass('vertical');
					var isVertical = tableView.hasClass('vertical');
					var headerElem = tableView.find('.layui-table-box>.layui-table-header');
					var totalElem = tableView.find('.layui-table-total');
					totalElem.css({
						top: isVertical ? tableView.find('.layui-table-tool').outerHeight() - 1 + 'px' : 0
					});
					tableView.find('.layui-table-main').css({
						marginLeft: isVertical ? headerElem.width() + 'px' : 0
					});

					config.reversal = isVertical;
					// 处理360急速模式下出现的异常问题
					table.resize(tableId);
					break;
				case 'ranksConversionPro':
					// 表格行列转换(封装调用)
					tablePlug.reverseTable(tableId);
					break;
				case 'testUpdate':
					layui.each(table.cache[tableId], function(index, data) {
						data.experience = 0;
					});
					tablePlug.update(tableId, table.cache[tableId]); // 等效下面的写法
					// tablePlug.update(tableId);
					break;
					// case 'testUpdate10':
					//   tablePlug.update(tableId, table.cache[tableId].filter(function (data) {
					//     if (data.sex === '女') {
					//       data.experience += 100;
					//       return true;
					//     }
					//   }));
					//   break;
				default:
					typeof layui.data[obj.event] === 'function' && layui.data[obj.event].call(that, obj);
					break;
			}
		});

		//监听行工具事件
		table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var that = this;
			var data = obj.data //获得当前行数据
				,
				layEvent = obj.event //获得 lay-event 对应的值
				,
				trCurr = obj.tr,
				tableId = trCurr.closest('.layui-table-view').attr('lay-id'),
				trIndex = trCurr.data('index');

			//          for(var i in data)
			// console.log("i:",i," ",data[i])
			if (layEvent === 'detail') {
				layer.msg('查看操作21(' + data.time + ')');
			} else if (layEvent === 'del') {
				layer.confirm('真的删除行么', function(index) {
					// obj.del(); //删除对应行（tr）的DOM结构
					//向服务端发送删除请求
					tablePlug.del(tableId, trIndex);
					alert("trIndex:" + trIndex + " " + typeof(trIndex))
					layer.close(index);
					layer.msg('删除成功！', {
						icon: 1
					});
				});
			} else if (layEvent === 'yuyue') {

				layer.confirm('你是否确定预约该教室', {
					icon: 6,
					title: '预约教室'
				}, function(index) {
					var obi_i = GetRequest();
					var use_id = obi_i[0].split("=")[1];
					var user_ac = obi_i[1].split("=")[1];
					var ww = data.yuyue;
					// alert("df:"+ww)
					$.post("http://localhost:86/HBuilder/xops/Back.php", {
						type: "Yuorder",
						operation: "add",
						userid: use_id,
						username: user_ac,
						classname: uu[3],
						path: uu[0] + "/" + uu[1] + "/" + uu[2],
						section: data.jie,
						time: day2,
						yuyue: data.yuyue,
						token: "1ab66e59325257b60b971d4afa1505ce"
					}, function(data, status) {
						obj = JSON.parse(data);
						// alert("oc:"+obj.code)
						data = obj.data;
						if (obj.code == 203) {
							layer.msg("您已经预约该教室了", {
								icon: 5,

							});
						} else {
							console.log("dd:" + data + " " + typeof(data))
							if (data > 0) {
								// alert("p34:"+typeof(we[1])+" "+we[1]+" = "+ww)
								if (ww == 0) {
									layer.msg('预约成功！', {
										icon: 6
									});
								} else {
									layer.msg('预约成功,请等候部门主管批准！', {
										icon: 6
									});
								}

							} else {
								layer.msg('预约失败！', {
									icon: 5
								});
							}
						}
						// alert("data:"+data+" "+typeof(data))

					})


					// layer.msg('预约成功10！'+ use_id+" "+data.jie, {
					// 	icon: 1
					// });
					layer.close(index);
				});
			} else if (layEvent === 'edit') {
				layer.msg('编辑操作(' + data.id + ')');
				// tablePlug.update(tableId, trIndex, {username: '贤心'});
				layer.open({
					type: 1,
					title: '修改信息',
					area: ['600px', '480px'],
					content: '<form class="layui-form" action="" lay-filter="example" style="margin: 10px;">\n' +
						'  <div class="layui-form-item">\n' +
						'    <label class="layui-form-label">姓名</label>\n' +
						'    <div class="layui-input-block">\n' +
						'      <input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="请输入姓名" class="layui-input">\n' +
						'    </div>\n' +
						'  </div>\n' +
						'  <div class="layui-form-item">\n' +
						'    <label class="layui-form-label">城市</label>\n' +
						'    <div class="layui-input-block">\n' +
						'      <select name="city" lay-filter="city">\n' +
						'        <option value=""></option>\n' +
						'        <option value="北京">北京</option>\n' +
						'        <option value="天津">天津</option>\n' +
						'        <option value="上海">上海</option>\n' +
						'        <option value="广州">广州</option>\n' +
						'        <option value="深圳">深圳</option>\n' +
						'        <option value="佛山">佛山</option>\n' +
						'      </select>\n' +
						'    </div>\n' +
						'  </div>\n' +
						'  <div class="layui-form-item">\n' +
						'    <label class="layui-form-label">爱好</label>\n' +
						'    <div class="layui-input-block">\n' +
						'      <input type="checkbox" name="like[write]" title="写作">\n' +
						'      <input type="checkbox" name="like[read]" title="阅读">\n' +
						'      <input type="checkbox" name="like[daze]" title="发呆">\n' +
						'    </div>\n' +
						'  </div>\n' +
						'  <div class="layui-form-item">\n' +
						'    <label class="layui-form-label">是否会员</label>\n' +
						'    <div class="layui-input-block">\n' +
						'      <input type="checkbox" name="vip" lay-skin="switch" lay-text="是|否">\n' +
						'    </div>\n' +
						'  </div>\n' +
						'  <div class="layui-form-item">\n' +
						'    <label class="layui-form-label">性别</label>\n' +
						'    <div class="layui-input-block">\n' +
						'      <input type="radio" name="sex" value="男" title="男">\n' +
						'      <input type="radio" name="sex" value="女" title="女">\n' +
						'    </div>\n' +
						'  </div>\n' +
						'  <div class="layui-form-item layui-form-text">\n' +
						'    <label class="layui-form-label">个人标签</label>\n' +
						'    <div class="layui-input-block">\n' +
						'      <select name="label" xm-select="label">\n' +
						'        <option value="1">中二</option>\n' +
						'        <option value="2">呆萌</option>\n' +
						'        <option value="3">淡漠</option>\n' +
						'        <option value="4">冷艳</option>\n' +
						'        <option value="5">和蔼</option>\n' +
						'        <option value="6">倔强</option>\n' +
						'      </select>\n' +
						'    </div>\n' +
						'  </div>\n' +
						'  <div class="layui-form-item layui-form-text">\n' +
						'    <label class="layui-form-label">个性签名</label>\n' +
						'    <div class="layui-input-block">\n' +
						'      <textarea placeholder="请输入内容" class="layui-textarea" name="sign"></textarea>\n' +
						'    </div>\n' +
						'  </div>\n' +
						'  <div class="layui-form-item layui-hide">\n' +
						'    <div class="layui-input-block">\n' +
						'      <button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>\n' +
						'    </div>\n' +
						'  </div>\n' +
						'</form>',
					success: function(layero, index) {
						var dataTemp = $.extend({}, data);
						if (dataTemp.like) {
							layui.each(dataTemp.like.split(','), function(likeIndex, like) {
								dataTemp['like[' + like + ']'] = "on"
							});
							delete dataTemp.like;
						}
						form.val('example', dataTemp);

						renderFormSelectsIn(layero, {}, 'layer');
						dataTemp.label && formSelects.value('label', dataTemp.label.split(','));

						form.on('submit(demo1)', function(data) {
							var formElem = $(data.form);
							layui.each(data.field, function(key, value) {
								// 针对例子的表单格式的简单处理
								if (key.indexOf('[') !== -1) {
									var keys = key.split(/[\[\]]/);
									data.field[keys[0]] = data.field[keys[0]] ? data.field[keys[0]] + ',' + keys[1] : keys[1];
									delete data.field[key];
								}
							});
							data.field.label = formSelects.value('label', 'valStr');
							// 请求接口成功保存之后调用更新的方法
							tablePlug.update(tableId, trIndex, data.field);
							layer.close(formElem.closest('.layui-layer').attr('times'));
							layer.msg('修改成功！', {
								icon: 1
							});
							return false;
						});
					},
					btn: ['确定', '取消'],
					yes: function(index, layero) {
						layero.find('[lay-submit][lay-filter="demo1"]').get(0).click();
					}
				})
			} else if (layEvent === 'editField') {
				// 编辑字段，先把原始的值保存起来，后面校验失败的时候如果要回滚可以用到，
				var field = $(this).data('field');
				if (!field) {
					return;
				}
				if (!data[field] && data[field] !== 0) {
					data[field] = '';
				}

				table._dataTemp = table._dataTemp || {};
				table._dataTemp[tableId] = table._dataTemp[tableId] || {};
				table._dataTemp[tableId][trIndex] = data;
			} else if (layEvent === 'moveUp') {
				tablePlug.moveUp(tableId, trIndex);
			} else if (layEvent === 'moveDown') {
				tablePlug.moveDown(tableId, trIndex);
			} else {
				typeof layui.data[obj.event] === 'function' && layui.data[obj.event].call(that, obj);
			}
		});

		exports('testTablePlug2', {});
	});
