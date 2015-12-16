$(document).ready(function() {
	var a = "http://www.34qy.com";
	$.fn.showSlide = function() {
		var l = $(this);
		var f = l.next().children("a");
		var k = f.size();
		if (k > 1) {
			var d = $('<a class="rslides_nav rslides1_nav pre" href="javascript:;">Previous</a>');
			var n = $('<a class="rslides_nav rslides1_nav next" href="javascript:;">Next</a>');
			l.parent().append(d);
			l.parent().append(n);
			var o = $('<ul class="rslides_tabs"></ul>');
			for (var h = 1; h <= k; h++) {
				o.append('<li><a href="javascript:;">' + h + "</a></li>")
			}
			l.parent().append(o);
			var m = o.children("li");
			var j = 0;
			var e = 5000;
			var g = function() {
				l.stop(true, false).animate({
					opacity: 0.2
				}, 200, function() {
					l.empty().append(f.eq(j)).animate({
						opacity: 1
					}, 200);
					m.eq(j).addClass("rslides_here").siblings().removeClass("rslides_here");
					j++;
					if (j == k) {
						j = 0
					}
				})
			};
			var c = setInterval(g, e);
			m.hover(function() {
				if (c) {
					clearInterval(c)
				}
				j = m.index(this);
				g()
			}, function() {
				c = setInterval(g, e)
			});
			this.hover(function() {
				if (c) {
					clearInterval(c)
				}
			}, function() {
				c = setInterval(g, e)
			}).parent().hover(function() {
				d.show();
				n.show()
			}, function() {
				d.hide();
				n.hide()
			});
			d.hover(function() {
				if (c) {
					clearInterval(c)
				}
			}, function() {
				c = setInterval(g, e)
			}).click(function() {
				j = j - 2;
				if (j < 0) {
					j = j + k
				}
				g();
				return false
			});
			n.hover(function() {
				if (c) {
					clearInterval(c)
				}
			}, function() {
				c = setInterval(g, e)
			}).click(function() {
				g();
				return false
			});
			g()
		} else {
			if (k > 0) {
				l.html(l.next().html())
			}
		}
		l.parent().removeClass("ban_loading")
	};
	var b = function() {
		isLoaded = true;
		var m = $("#divIdxLogin");
		if (m.length > 0) {
			GetJPData("http://www.34qy.com", "uLoginInfo", "", function(z) {
				if (z.code == 0) {
					var A = "";
					A += '<div class="u-member-image"><a href="http://u.34qy.com/' + z.userWeb + '" target="_blank" title="' + z.userName + '"><img src="http://faceimg.34qy.com/UserFace/' + z.userPhoto + '"/></a></div>';
					A += '<div class="u-member-info grayb"><P class="f-member-name"><span class="gray9">Hi，</span><a class="blue FB" href="http://u.34qy.com/' + z.userWeb + '" target="_blank" title="' + z.userName + '">' + z.userName + "</a></P>";
					A += '<span class="class-icon' + z.gradeIco + '">' + z.gradeName + "<s></s></span><P>经验值：" + z.userExperience + "</P></div>";
					A += '<div class="u-member-account"><span class="grayb">帐户余额：</span><span class="orange FB"><b></b>' + z.userBalance + '</span><a class="gray6 mlr5" href="http://member.34qy.com/UserRecharge.html" target="_blank">充值</a></div>';
					m.attr("class", "m-member").html(A)
				}
			})
		}
		$("li.g-goods-list").each(function() {
			$(this).hover(function() {
				$(this).addClass("goods_Cur")
			}, function() {
				$(this).removeClass("goods_Cur")
			})
		});
		var o = function() {
			var G = 0;
			var B = $("#divRaffList");
			var z = true;
			var F = 9;
			var D = null;
			var E = function() {
				GetJPData("http://www.34qy.com", "getLastestLottery", "time=" + G, function(H) {
					if (H.code == 0) {
						if (!z) {
							clearInterval(D);
							D = null;
							C(H);
							D = setInterval(A, 5000)
						} else {
							C(H)
						}
					}
					setTimeout(E, 60000)
				})
			};
			E();
			var C = function(M) {
				G = M.maxTicks;
				var L = M.listItems;
				var N = L.length;
				var J = "";
				var K = function(O) {
					return '<div codeid="' + L[O].codeID + '" ' + (O == N - 1 ? 'last="1"' : "") + '><div><span class="gray9">恭喜</span> <a href="http://u.34qy.com/' + L[O].userWeb + '" class="blue mlr5" target="_blank" title="' + L[O].userName + '">' + L[O].userName + '</a> <span class="gray9">(' + L[O].address + ") " + L[O].time + ' 获得</span> <span><a href="http://dataserver.34qy.com/lotterydetail-' + L[O].codeID + '.html" target="_blank" class="gray6 mlr5" title="' + L[O].goodsName + '">(第' + L[O].codePeriod + "期)" + L[O].goodsName + "</a></span></div></div>"
				};
				for (var H = 0; H < N; H++) {
					J += K(H)
				}
				if (z) {
					B.append(J + K(0));
					B.css("marginTop", "-270px");
					B.next("a").attr("href", "http://dataserver.34qy.com/lotterydetail-" + L[0].codeID + ".html")
				} else {
					if (N < 10) {
						B.children("div:lt(" + N + ")").remove();
						var I = B.children('div[last="1"]');
						I.attr("last", "").next("div").remove();
						B.append(J + B.children().eq(0).html())
					} else {
						B.html(J + K(0))
					}
				} if (z) {
					D = setInterval(A, 5000);
					B.hover(function() {
						clearInterval(D);
						D = null
					}, function() {
						D = setInterval(A, 5000)
					})
				}
				z = false
			};
			var A = function() {
				F--;
				B.animate({
					marginTop: "-" + (F * 30) + "px"
				}, {
					queue: false,
					duration: 800,
					complete: function() {
						var H = B.children("div").eq(F).attr("codeid");
						B.next("a").attr("href", "http://www.34qy.com/lotterydetail-" + H + ".html");
						if (F == 0) {
							B.css("marginTop", "-300px");
							F = 10
						}
					}
				})
			}
		};
		o();
		var v = function() {
			var A = "getbysortid";
			var z = function(C, B) {
				GetLogoInfo(C, A, false, function(D) {
					$("#" + B).html(D).show()
				})
			};
			z(10, "posterTopNav");
			GetLogoInfo(2, A, false, function(B) {
				$("#posterBanner").html(B).ready(function() {
					$("#slideImg").showSlide()
				})
			});
			z(6, "divHotRec");
			z(7, "divNewGoods");
			z(8, "divMidBanner")
		};
		jQuery.getScript(a + "/statics/templates/yungou/pc/js/PosterFun_1gg.js?date=20120309", v);
		var l = $("#myTab_Content0");
		$("#myTab").children().each(function(A, z) {
			var B = $(this);
			B.hover(function() {
				if (A == 0) {
					B.attr("class", "f-notice-hover").next().attr("class", "");
					l.show().next().hide()
				} else {
					B.attr("class", "f-notice-hover").prev().attr("class", "");
					l.hide().next().show()
				}
			}, function() {})
		});
		var c = $("#hidBuyID").val();
		var u = $("#buyList");
		var p = 0;
		var y = 0;
		var r = 20;
		var d = function() {
			GetJPData("http://www.34qy.com", "GetUserBuyNewList", "buyID=" + c, function(C) {
				if (C.code == 0) {
					var B = "";
					var A = C.listItems.length;
					for (var z = 0; z < A; z++) {
						B += '<li><a href="http://u.34qy.com/' + C.listItems[z].userWeb + '" target="_blank" class="f-pic" rel="nofollow"  title="' + C.listItems[z].userName + '"><img alt="" src="http://faceimg.34qy.com/UserFace/' + C.listItems[z].userPhoto + '" width="40" height="40" /></a><div class="m-share-txt gray6"><a href="http://u.34qy.com/' + C.listItems[z].userWeb + '" class="f-name blue" target="_blank" title="' + C.listItems[z].userName + '">' + C.listItems[z].userName + '</a><span class="f-share-tit"><a href="http://www.34qy.com/product/' + C.listItems[z].goodsID + '.html" class="gray6" title="' + C.listItems[z].goodsName + '">' + C.listItems[z].goodsName + "</a></span></div></li>"
					}
					p += A;
					u.append(B);
					c = C.listItems[0].buyID
				}
				if (p < r) {
					setTimeout(d, 10000)
				}
			})
		};
		setTimeout(d, 10000);
		var n = function() {
			u.prepend(u.find("li:last")).css("marginTop", "-74px");
			u.animate({
				marginTop: "0px"
			}, 800);
			if ((y + 10) > r && p >= r) {
				u.find("li:gt(9)").remove();
				p = 10;
				y = 0;
				setTimeout(d, 5000)
			} else {
				y++
			}
		};
		var q = setInterval(n, 3000);
		u.hover(function() {
			clearInterval(q);
			q = null
		}, function() {
			q = setInterval(n, 3000)
		});
		var j = function(C, E, D, K) {
			var F = C;
			E.empty();
			D.empty();
			var J = "http://www.34qy.com/products/";
			var B = "http://www.34qy.com/GoodsPic/pic-200-200/";
			for (var G = 0; G < F.length; G++) {
				var A = F[G].goodsName;
				if (G < K) {
					var I = parseInt(F[G].codeSales);
					var M = parseInt(F[G].codeQuantity);
					var z = M - I;
					var N = parseFloat(I) / M;
					var H = '<li class="g-goods-list"><div class="pic"><a rel="nofollow" href="' + J + F[G].goodsID + '.html" target="_blank" title="' + A + '"><img alt="' + A + '" src="' + B + F[G].goodsPic + '"></a></div><p class="name"><a href="' + J + F[G].goodsID + '.html" target="_blank" title="' + A + '">' + A + '</a></p><p class="F_money">价值：<span class="F_dig"><span class="rmb"></span>' + F[G].codePrice + '</span></p><div class="goods_Curbor"><div class="pic"><a rel="nofollow" href="' + J + F[G].goodsID + '.html" target="_blank" title="' + A + '"><img alt="' + A + '" src="' + B + F[G].goodsPic + '"></a></div><div class="Progress-bar"><p title="已完成' + formatFloat(N * 100) + '%"><span style="' + (I > 0 ? ("width:" + (z > 0 ? (parseInt(170 * N) > 0 ? parseInt(170 * N) + "px" : "1%") : "100%")) : "display:none;") + '"></span></p><ul class="Pro-bar-li"><li class="P-bar01"><em>' + F[G].codeSales + '</em>已参与</li><li class="P-bar02"><em>' + F[G].codeQuantity + '</em>总需人次</li><li class="P-bar03"><em>' + z + '</em>剩余</li></ul></div><div class="g_buybtn"><a href="' + J + F[G].goodsID + '.html" title="立即1元云购" class="orange_btn">立即1元云购</a></div></div></li>';
					E.append(H)
				} else {
					var H = '<li><div class="m-pic-txt"><div class="u-txt"><h5 class="gray3" title="' + A + '"><a class="gray6" href="' + J + F[G].goodsID + '.html" target="_blank">' + F[G].goodsNameEx + '</a></h5><p class="orange">' + F[G].goodsRecDesc + '</p></div><a href="' + J + F[G].goodsID + '.html" target="_blank" class="u-img" title="' + A + '"><img src="http://goodsimg.34qy.com/GoodsPic/pic-70-70/' + F[G].goodsPic + '" border=0 alt=""></a></div></li>';
					D.append(H)
				}
			}
			E.children("li").hover(function() {
				$(this).addClass("goods_Cur")
			}, function() {
				$(this).removeClass("goods_Cur")
			});
			if (F.length < 2 * K) {
				var L = 2 * K - F.length;
				for (var G = 0; G < L; G++) {
					D.append("<li></li>")
				}
			}
		};
		var s = function() {
			GetJPData("http://www.34qy.com", "getRecGoodsList", "goodsLabel=12&quantity=8", function(z) {
				if (z.code == 0) {
					j(z.listItems, $("#ulHotRecList1"), $("#ulHotRecList2"), 4)
				}
			});
			GetJPData("http://www.34qy.com", "getWeekRanking", "quantity=8", function(D) {
				if (D.code == 0) {
					var C = D.listItems;
					var E = "";
					var B = "http://www.34qy.com/products/";
					for (var A = 0; A < C.length; A++) {
						var z = C[A].goodsName;
						E += '<li><div class="m-ranking-goods" style="' + (A == 0 ? "" : "display:none;") + '"><span class="u-ranking-dig">' + (A + 1) + '</span><div class="pic"><a rel="nofollow" href="' + B + C[A].goodsID + '.html" target="_blank" title="' + z + '"><img alt="' + z + '" src="http://goodsimg.34qy.com/GoodsPic/pic-70-70/' + C[A].goodsPic + '"></a></div><p class="name"><a class="gray6" href="' + B + C[A].goodsID + '.html" target="_blank" title="' + z + '">' + z + '</a></p><p class="F_money gray9">价值：<span class="F_dig"><span class="rmb"></span>' + C[A].codePrice + '</span></p></div><div class="m-ranking-tit" style="' + (A == 0 ? "display:none;" : "") + '"><span class="u-ranking-dig">' + (A + 1) + '</span><h4><a href="' + B + C[A].goodsID + '.html" target="_blank" class="gray6">' + z + "</a></h4></div></li>"
					}
					$("#ulWeekRanking").html(E).children("li").hover(function() {
						$(this).children("div.m-ranking-goods").show().next().hide();
						$(this).siblings().children("div.m-ranking-goods").hide().next().show()
					}, function() {
						$(this).children("div.m-ranking-goods").hide().next().show();
						$(this).parent().children("li").eq(0).children("div.m-ranking-goods").show().next().hide()
					})
				}
			})
		};
		var h = function() {
			GetJPData("http://www.34qy.com", "getRecGoodsList", "goodsLabel=13&quantity=10", function(z) {
				if (z.code == 0) {
					j(z.listItems, $("#ulNewRecList1"), $("#ulNewRecList2"), 5)
				}
			})
		};
		var k = 0;
		var g = $("#ulReplyList");
		var e = function() {
			var z = function(H) {
				var J = H;
				var N = 0;
				var M = 0;
				var I = 280;
				var L = J.children().length;
				M = L * I;
				N = I;
				J.width(M).css("left", "0px");
				var K = "500";
				J.show("fast");
				J.nextAll("a.js_pre").eq(0).show().bind("click", function() {
					J.animate({
						left: "-" + N + "px"
					}, K, function() {
						J.append(J.children().eq(0)).css("left", "0px")
					})
				});
				J.nextAll("a.js_next").eq(0).show().bind("click", function() {
					J.prepend(J.children().eq(L - 1)).css("left", "-" + N + "px");
					J.animate({
						left: "0px"
					}, K, function() {})
				})
			};
			var D = "http://postimg.34qy.com/UserPost/RecHome/";
			GetJPData("http://www.34qy.com", "getRecPostList", "", function(K) {
				if (K.code == 0) {
					var N = $("#ulPostRec");
					var P = K.listItems;
					var L = P.length;
					var O = L > 3 ? 3 : L;
					var M = "";
					var I = "http://post.34qy.com/detail-";
					var H = "http://u.34qy.com/";
					for (var J = 0; J < O; J++) {
						M += '<li class="u-single-hover" idx="' + J + '" style="width:280px; float:left; position:relative;"><div class="f-single-txt" style="display: none;"><a href="' + I + P[J].postID + '.html" class="white" target="_blank">' + P[J].postTitle + '</a></div><div class="f-single-info"><a href="' + H + P[J].userWeb + '" target="_blank"><img class="f-single-pic" src="http://faceimg.34qy.com/UserFace/' + P[J].userPhoto + '" width="40" height="40"></a><a class="f-name blue" href="' + H + P[J].userWeb + '" title="' + P[J].userName + '" target="_blank">' + P[J].userName + '</a><span class="gray9 f-share-time">' + P[J].postTime + '</span><span class="f-share-tit mlr5"><a href="' + I + P[J].postID + '.html" target="_blank" class="white" title="' + P[J].postTitle + '">' + P[J].postTitle + '</a></span></div><a href="' + I + P[J].postID + '.html" target="_blank"><img src="' + D + P[J].postImg + '" border="0" alt="" width="280" height="314"></a></li>'
					}
					N.html(M);
					M = "";
					for (var J = O; J < L; J++) {
						M += '<li name="liPostList"><div class="f-single-txt"><a href="' + I + P[J].postID + '.html" class="white" target="_blank" >' + P[J].postTitle + '</a></div><div class="f-single-info" style="display: none;"><a href="' + H + P[J].userWeb + '" target="_blank"><img class="f-single-pic" src="http://faceimg.34qy.com/UserFace/' + P[J].userPhoto + '" width="40" height="40"></a><a class="f-name blue" href="' + H + P[J].userWeb + '" title="' + P[J].userName + '" target="_blank">' + P[J].userName + '</a><span class="gray9 f-share-time">' + P[J].postTime + '</span><span class="f-share-tit mlr5"><a href="' + I + P[J].postID + '.html" target="_blank" class="white" title="' + P[J].postTitle + '">' + P[J].postTitle + '</a></span></div><a href="' + I + P[J].postID + '.html" target="_blank"><img src="' + D + "small/" + P[J].postImg + '" border="0" alt="" width="280" height="315"></a></li>'
					}
					$("#ulPostList").html(M).find('li[name="liPostList"]').each(function() {
						$(this).hover(function() {
							$(this).children(".f-single-txt").hide().next(".f-single-info").show()
						}, function() {
							$(this).children(".f-single-txt").show().next(".f-single-info").hide()
						})
					});
					z(N)
				}
			});
			var F = 0;
			var E = 20;
			var G = 0;
			var A = function() {
				GetJPData("http://www.34qy.com", "lastestPostReply", "quantity=10&lastReplyID=" + k, function(J) {
					if (J.code == 0) {
						k = J.lastReplyID;
						var K = "";
						var I = J.listItems;
						for (var H = 0; H < I.length; H++) {
							K += '<li><a href="http://u.34qy.com/' + I[H].userWeb + '" class="f-pic" target="_blank" title="' + I[H].userName + '"><img src="http://faceimg.34qy.com/UserFace/' + I[H].userPhoto + '" width="40" height="40"></a><div class="m-share-txt gray6"><a class="f-name blue" href="http://u.34qy.com/' + I[H].userWeb + '" title="' + I[H].userName + '" target="_blank">' + I[H].userName + '</a><span class="f-share-tit"><a href="http://post.34qy.com/detail-' + I[H].postID + '.html" target="_blank" class="gray6" title="' + I[H].replyContent + '">' + I[H].replyContent + "</a></span></div></li>"
						}
						G += I.length;
						g.append(K)
					}
					if (G < E) {
						setTimeout(A, 10000)
					}
				})
			};
			var B = function() {
				g.prepend(g.find("li:last")).css("marginTop", "-62px");
				g.animate({
					marginTop: "0px"
				}, 800);
				if ((F + 10) > E && G >= E) {
					g.find("li:gt(9)").remove();
					G = 10;
					F = 0;
					setTimeout(A, 5000)
				} else {
					F++
				}
			};
			var C = setInterval(B, 3000);
			g.hover(function() {
				clearInterval(C);
				C = null
			}, function() {
				C = setInterval(B, 3000)
			});
			A()
		};
		var x = function() {
			GetJPData("http://www.34qy.com", "getGroupTopic", "", function(B) {
				if (B.code == 0) {
					var D = "";
					var C = "http://group.34qy.com/topic-";
					var z = B.list1;
					for (var A = 0; A < z.length; A++) {
						D += '<div class="f-single-txt"><a href="' + C + z[A].topicID + '.html" class="white" target="_blank">' + z[A].topicTitle + '</a></div><a href="' + C + z[A].topicID + '.html" target="_blank" title="' + z[A].topicTitle + '"><img src="http://img.34qy.com/GroupPic/RecHome/' + z[A].topicImg + '" border="0" alt="" width="280" height="160"></a>'
					}
					$("#divGroupTopic").html(D);
					D = "";
					z = B.list2;
					for (var A = 0; A < z.length; A++) {
						D += '<li><span class="u-radius-point"></span>[<a class="gray6" href="http://group.34qy.com/group-' + z[A].groupID + '.html" target="_blank" title="' + z[A].groupName + '">' + z[A].groupName + "</a>]";
						D += '<a class="gray6 ml10" href="http://group.34qy.com/topic-' + z[A].topicID + '.html" title="' + z[A].topicTitle + '" target="_blank">' + z[A].topicTitle + "</a></li>"
					}
					$("#ulRecTopic").append(D);
					D = "";
					z = B.list3;
					for (var A = 0; A < z.length; A++) {
						D += '<li><span class="u-radius-point"></span>[<a class="gray6" href="http://group.34qy.com/group-' + z[A].groupID + '.html" target="_blank" title="' + z[A].groupName + '">' + z[A].groupName + "</a>]";
						D += '<a class="gray6 ml10" href="http://group.34qy.com/topic-' + z[A].topicID + '.html" title="' + z[A].topicTitle + '" target="_blank">' + z[A].topicTitle + "</a></li>"
					}
					$("#ulLastestTopic").append(D)
				}
			});
			GetJPData("http://group.34qy.com", "getHostUserForHome", "quantity=12", function(B) {
				if (B.code == 0) {
					var C = "";
					var A = B.listItems;
					for (var z = 0; z < A.length; z++) {
						C += '<li><a href="http://u.34qy.com/' + A[z].userWeb + '" target="_blank" title="' + A[z].userName + '"><img src="http://faceimg.34qy.com/UserFace/' + A[z].userFace + '" width="47" height="47"></a></li>'
					}
					$("#ulAvatar").html(C)
				}
			});
			GetJPData("http://www.34qy.com", "getHomeGroup", "groupType=1", function(B) {
				if (B.code == 0) {
					var C = "";
					var A = B.listItems;
					for (var z = 0; z < A.length; z++) {
						C += '<li><div class="u-topic-img"><a href="http://group.34qy.com/group-' + A[z].groupID + '.html" class="f-pic" target="_blank"><img src="http://img.34qy.com/GroupIco/' + A[z].groupPic + '" width="80" height="80"></a></div><div class="u-topic-txt"><h2><a href="http://group.34qy.com/group-' + A[z].groupID + '.html" target="_blank" class="gray3">' + A[z].groupName + '</a></h2><p class="u-topic-icon"><i class="f-topic_icon"></i><span class="gray9">' + A[z].userNum + '</span><s class="f-topic_icon"></s><span class="gray9">' + A[z].topicNum + '</span></p><a href="http://group.34qy.com/group-' + A[z].groupID + '.html" target="_blank" class="f-topic-btn">申请加入</a></div></li>'
					}
					$("#ulGroupRec").html(C)
				}
			})
		};
		var w = 0;
		var f = 0;
		var t = [0, 0, 0, 0, ];
		$(window).scroll(function() {
			i()
		});
		var i = function() {
			w = $(window).scrollTop();
			if (w >= 100) {
				if (t[0] == 0) {
					t[0] = 1;
					s()
				}
			}
			if (w >= 600) {
				if (t[1] == 0) {
					t[1] = 1;
					h()
				}
			}
			if (w >= 800) {
				if (t[2] == 0) {
					t[2] = 1;
					e()
				}
			}
			if (w >= 1000) {
				if (t[3] == 0) {
					t[3] = 1;
					x()
				}
			}
		};
		if ($(window).scrollTop() > 100) {
			i()
		}
	};
	jQuery.getScript(a + "/statics/templates/yungou/pc/js/AjaxFun_1gg.js?date=20130123", b)
});