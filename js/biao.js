courseList2 = [
	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', '', '', '']
];

var week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] : ['一', '二', '三', '四', '五', '六', '日'];
var day = new Date().getDay();
courseType = []
result = "["
cou=""
// alert("d:"+typeof(day)+" "+day)
$.post("http://localhost:86/HBuilder/xops/Back.php", {
	type: "Uptime",
	operation: "search",
	token: "1ab66e59325257b60b971d4afa1505ce"
}, function(data, status) {

	var obj = JSON.parse(data)
	// alert("data:"+obj.nums)
	if (obj.nums == 0) {
		layui.use(['layer'], function() {
			layer = layui.layer;
			layer.msg('您尚未设置上课时间表，请先去设置！', {
				icon: 6
			});
		})
		return;
	}
	data=obj.data;
	cou=obj.nums;
	
	
	for (var j in data)
		for (var i in data[j]) {
			// console.log('i:' + i + " " + j + " " + typeof(data[j][i]), " ", data[j][i])
			result += "[{index:'" + (parseInt(j)+1) + "',name:'" + data[j]['begin'] + "-" + data[j]['over'] + "'},1],";
			break;

		}
		result = result.substring(0, result.lastIndexOf(','));
		 result+="]";
           
	courseType=eval(result);
 //  var pp=[
	//   [{index: '1', name: '09:00-09:40'}, 1],
	//   [{index: '2', name: '09:40-10:20'}, 1],
	//   [{index: '3', name: '10:40-12:00'}, 1],
	//   [{index: '4', name: '14:00-14:40'}, 1],
	//   [{index: '5', name: '14:40:15:20'}, 1],
	//   [{index: '6', name: '15:30:16:10'}, 1],
	//   [{index: '7', name: '16:10:16:50'}, 1],
	//   [{index: '8', name: '17:00:17:40'}, 1],
	//   [{index: '9', name: '17:40:18:20'}, 1],
	//   [{index: '10', name: '19:00:19:40'}, 1],
	//   [{index: '11', name: '19:40:20:20'}, 1],
	//   [{index: '12', name: '20:30:21:10'}, 1]
	// ];
	
	// alert("d1:"+typeof(pp)+" "+typeof(courseType))
	
	var div = document.getElementById('right');
	 // alert("4kp:"+cou+" "+div.clientHeight)
	 
	heigh=div.clientHeight-55;
	 // alert("5kp:"+" "+heigh)
	heigh=heigh /cou;
	heigh=Math.floor( heigh * 100 ) / 100
	heigh=heigh>30?heigh:30;
	 // alert("2kp:"+" "+heigh)
		Timetable = new Timetables({
				el: '#coursesTable',
				timetables: courseList2,
				week: week,
				timetableType: courseType,
				highlightWeek: day,
				gridOnClick: function(e) {
				
					alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节');
					console.log(e);
				},
				styles: {
					Gheight: heigh,
					leftHandWidth: 80,
				}
			});
	 
})

	// var courseType = [
	//   [{index: '1', name: '9:00-9:40'}, 1],
	//   [{index: '2', name: '9:40-10:20'}, 1],
	//   [{index: '3', name: '10:40-12:00'}, 1],
	//   [{index: '4', name: '14:00-14:40'}, 1],
	//   [{index: '5', name: '14:40:15:20'}, 1],
	//   [{index: '6', name: '15:30:16:10'}, 1],
	//   [{index: '7', name: '16:10:16:50'}, 1],
	//   [{index: '8', name: '17:00:17:40'}, 1],
	//   [{index: '9', name: '17:40:18:20'}, 1],
	//   [{index: '10', name: '19:00:19:40'}, 1],
	//   [{index: '11', name: '19:40:20:20'}, 1],
	//   [{index: '12', name: '20:30:21:10'}, 1]
	// ];
	// 实例化(初始化课表)
	// var Timetable = new Timetables({
	// 	el: '#coursesTable',
	// 	timetables: courseList2,
	// 	week: week,
	// 	timetableType: courseType,
	// 	highlightWeek: day,
	// 	gridOnClick: function(e) {
	// 		alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节');
	// 		console.log(e);
	// 	},
	// 	styles: {
	// 		Gheight: 50,
	// 		leftHandWidth: 80,
	// 	}
	// });

	//切换课表
	function onChange(data) {


		Timetable.setOption({
			timetables: data,
			// week: ['一', '二', '三', '四', '五', '六', '日'],

			timetableType: courseType,
			gridOnClick: function(e) {
					if (e.name != null)
				alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节');
				console.log(e);
			}
		});
	};
