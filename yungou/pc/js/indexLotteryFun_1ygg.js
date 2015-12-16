$.fn.StartTimeOutComm = function(s, d) {
	var r = $(this);
	var a = new Date();
	a.setSeconds(a.getSeconds() + d);
	var l = 0;
	var o = 0;
	var n = 0;
	var k = function() {
		var u = new Date();
		if (a > u) {
			var v = parseInt((a.getTime() - u.getTime()) / 1000);
			var t = v % 60;
			l = parseInt(v / 60);
			o = parseInt(t);
			if (t >= o) {
				n = parseInt((t - o) * 10)
			} else {
				n = 0
			}
			setTimeout(k, 3000)
		}
	};
	var b = r.find("span.minute");
	var j = r.find("span.second");
	var e = r.find("span.millisecond");
	var q = r.find("span.last");
	var g = 9;
	var m = function() {
		g--;
		if (g < 0) {
			g = 9
		}
		q.html(g);
		setTimeout(m, 10)
	};
	var c = function() {
		q.html("0");
		r.find("b").html("正在计算,请稍后…");
		var u = null;
		var t = function() {
			GetJPData("http://www.34qy.com", "getItemInfo", s, function(v) {
				if (v) {
					if(v.errorCode == 1){
						var w = $('<p class="u-publish-member gray6"><i>恭喜</i><a href="http://www.34qy.com/?/uname/' + v.q_uid + '" target="_blank" class="blue mlr5 FB" title="' + v.user + '">' + v.user + '</a><i>获得</i></p><p class="u-publish-order gray9">本期云购：' + v.zongrenshu + '人次</p><p class="u-publish-number gray9">幸运云购码：<span class="orange FB">' + v.q_user_code + "</span></p>");
						r.attr("state", "3").children("div.m-publish-txt").html(w);
					}
					if (u != null) {
						clearInterval(u);
						u = null
					}
					r.changeLotteryFun()
				}
			})
		};
		u = setInterval(t, 10000)
	};
	var i = function() {
		n--;
		if (n < 1) {
			if (o < 1) {
				if (l < 1) {
					c();
					return
				} else {
					l--
				}
				o = 59
			} else {
				o--
			}
			n = 9
		}
		setTimeout(i, 100)
	};
	var f = 0,
		p = 0;
	var h = function() {
		if (n > -1) {
			e.html(n)
		}
		if (f != o) {
			if (o < 10) {
				j.html("0" + o)
			} else {
				j.html(o)
			}
			f = o
		}
		if (p != l) {
			if (l < 10) {
				b.html("0" + l)
			} else {
				b.html("00")
			}
			p = l
		}
		setTimeout(h, 100)
	};
	k();
	i();
	m();
	h()
};
$.fn.changeLotteryFun = function() {
	var c = $(this);
	var a = $("#btnRigRaff");
	var d = a.children("em");
	var b = parseInt(d.html());
	b = b - 1;
	if (b > 0) {
		d.html(b)
	} else {
		d.hide()
	}
	setTimeout(function() {
		var f = $("#divRighRaff");
		var g = $("#raffBox");
		var l = $("#ulRaffList");
		var e = $("#raffClose");
		var j = 96;
		var k = 4;
		e.hide();
		var m = l.children().length;
		if (a.attr("isShowed") == "1") {
			if (m <= k) {
				var h = function() {
					if (l.attr("animate") != "1") {
						l.attr("animate", "1");
						var n = (m - 1) * j;
						g.animate({
							height: n,
							opacity: 1
						}, {
							queue: false,
							duration: 300,
							complete: function() {
								g.css("height", n + "px").children().eq(0).css("height", n + "px");
								if (n <= 0) {
									l.empty();
									a.attr("isShowed", "0");
									f.fadeOut()
								} else {
									var p = l.children().length;
									p = p - 1;
									l.children("li").eq(p).remove();
									l.parent().css("top", "0px").parent().css("height", n + "px");
									var o = (p > k ? k : p) * j - 60 + 16;
									e.css("top", "-" + o + "px").show();
									if(l.children().length==0){
										a.attr("isShowed", "0");
										f.fadeOut()
									}
								}
								l.attr("animate", "0")
							}
						})
					} else {
						setTimeout(h, 1000)
					}
				};
				h()
			} else {
				var h = function() {
					if (l.attr("animate") != "1") {
						l.attr("animate", "1").show().parent().css("top", "0px");
						m = l.children().length;
						l.children("li:gt(" + (m - 2) + ")").remove();
						m = m - 1;
						if (m <= k) {
							g.find("#raff_scroller").hide().children().css("top", "0px")
						} else {
							l.parent().css("top", "-" + ((l.children().length - k) * j) + "px")
						}
						l.attr("animate", "0");
						var n = (m > k ? k : m) * j - 60 + 16;
						e.css("top", "-" + n + "px").show()
					} else {
						setTimeout(h, 1000)
					}
				};
				h()
			}
		} else {
			var i = (m - 1) * j;
			g.css("height", i + "px");
			l.children("li:gt(" + (m - 2) + ")").remove();
			m = m - 1;
			if (m <= 0) {
				l.empty();
				a.attr("isShowed", "0");
				f.fadeOut()
			}
		}
	}, 10000)
};