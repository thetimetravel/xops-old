window.nicePage = {
	table: "div",
	bar: "bar",
	limit: "10",
	color: "#1E9FFF",
	layout: ["count", "prev", "page", "next", "limit", "skip"],
	setCfg: function(b) {
		nicePage.table = b.table;
		nicePage.bar = b.bar;
		nicePage.limit = b.limit;
		nicePage.color = b.color;
		nicePage.layout = b.layout
	},
	returnHtml: function(g, e) {
		
		var h = '<table class="layui-table" lay-size="sm"><colgroup>';
		for (var f in e) {
			h += " <col width=" + e[f] + "  >"
		}
		h += " </colgroup><thead><tr  id=\'ttt\'>";
		for (var f in g) {
			h += " <th >" + g[f] + "</th>"
			
		}
		h += " </tr></thead> <tbody>";
			
		return h
	},
	returnList: function(j) {
		var h = new Array();
		for (var f in j) {
			var i = "";
			for (var g in j[f]) {
				i += j[f][g] + "_"
			}
			i = i.substring(0, i.length - 1);
			h.push(i)
		}
		return h
	},
	returnTable: function(e) {
		var h = e.split("_");
		var g = "<tr id=\"tablett\">";
		for (var f in h) {
			g += "<td>" + h[f] + "</td>"
		}
		g += "</tr>";
		
		return g
	}
};
$(function() {
	layui.use("laypage", function() {
		var a = layui.laypage;
		a.render({
			elem: nicePage.bar,
			limit: nicePage.limit,
			theme: nicePage.color,
			count: jsont.length,
			layout: nicePage.layout,
			jump: function(b) {
				
				document.getElementById("table").innerHTML = function() {
					
					var c = [nicePage.returnHtml(nameList, widthList)],
						d = nicePage.returnList(jsont).concat().splice(b.curr * b.limit - b.limit, b.limit);
						
					layui.each(d, function(e, g) {
						var f = nicePage.returnTable(g);
						c.push(f)
					});
					c.push(" </tbody></table></br>");
					return c.join("")
				}()
			}
		})
	})
});
