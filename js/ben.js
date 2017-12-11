;
(function(window, undefined) {
	var _ben = window.ben,
		_$ = window.$;

	var ben = window.ben = window.$ = function(selector, context) {
		return new ben.fn.init(selector, context);
	};

	// DOM选取和初始化
	ben.fn = ben.prototype = {
		ben: "examing", // ben版本
		length: 0, // 长度
		init: function(selector, context) { // 初始化函数
			selector = selector || document; // 默认为document
			// 元素
			if (selector.nodeType) {
				this.length = 1;
				this[0] = selector;
				return this;
			}
			// 字符串
			if (typeof selector == "string") {
				var match = selector.match(/^#(\w+)$|^<(.*)>$/);
				if (match) {
					if (match[1]) { // id选择器
						var elem = document.getElementById(match[1]);
						if (elem && elem.id != match[1]) {
							elem = document.getElementsByName(id);
							for (var i = elem.length - 1; i >= 0; i--) {
								if (elem[i].id == id) {
									return ben(elem[i]);
								}
							}
						}
						return ben(elem || []);
					}
					if (match[2]) { // 创建元素
						var child = ben(ben.create(match[2]).childNodes); // 快捷添加
						return context ? child.appendTo(context) : child;
					}
				}
				return ben().find(selector, context);
			}
			// 类数组
			if (typeof selector.length == "number") {
				this.length = 0;
				Array.prototype.push.apply(this, selector);
				return this;
			}
			// 函数
			if (typeof selector == "function") {
				$().ready(selector);
			}
			// 默认返回document
			return ben();
		}
	};
	ben.fn.init.prototype = ben.fn;

	// 拓展函数(默认深度复制)
	ben.extend = ben.fn.extend = function(extend) {
		if (arguments.length > 1) {
			ben(arguments).each(function() {
				if (this !== extend) {
					ben.extend.call(extend, this);
				}
			});
			return extend;
		} else {
			for (var name in extend) {
				if (ben.type && ben.type(extend[name]) == "object") {
					this[name] = ben.type(this[name]) == "object" ? this[name] : {};
					ben.extend(this[name], extend[name]);
				} if (ben.type && ben.type(extend[name]) == "array") {
					this[name]=Array.prototype.slice.call(extend[name]);
				} else {
					this[name] = extend[name];
				}
			}
			return this;
		}
	};

	// 基本工具
	ben.extend({
		// 遍历
		each: function(obj, fn, argus) {
			if (argus) {
				if (obj.length === undefined) {
					for (var name in obj) {
						if (fn.apply(obj[name], argus) === false) break;
					}
				} else {
					for (var i = 0; i < obj.length; i++) {
						if (fn.apply(obj[i], argus) === false) break;
					}
				}
			} else {
				if (obj.length === undefined) {
					for (var name in obj) {
						if (fn.call(obj[name], name, obj[name]) === false) break;
					}
				} else {
					for (var i = 0; i < obj.length; i++) {
						if (fn.call(obj[i], i, obj[i]) === false) break;
					}
				}
			}
			return obj;
		},
		// 类型
		type: function(obj) {
			var kind = Object.prototype.toString.call(obj, null).toLowerCase();
			return kind.substring(8, kind.length - 1);
		}
	});
	ben.fn.extend({
		// 索引
		index: function(obj) {
			for (var i = 0, j = this.length; i < j; i++) {
				if (this[i] === obj) return i;
			}
			return -1;
		},
		// 获取innerHTML
		innerHTML: function(value,index) {
			if(value){
				if(index!==undefined){
					this[index].innerHTML=value;
				}else{
					this.each(function(){
						this.innerHTML=value;
					});
				}
				return this;
			}else{
				return this[index||0].innerHTML;
			}
		},
		// 获取value
		value: function(value,index) {
			if(typeof value == "string"){
				if(index!==undefined){
					this[index].value=value;
				}else{
					this.each(function(){
						this.value=value;
					});
				}
				return this;
			}else{
				return this[index||0].value;
			}
		},
		// 获取焦点
		focus: function(index) {
			this[index || 0].focus();
			return this;
		},
		// 选取内容
		select: function(index) {
			this[index || 0].select();
			return this;
		},
		reset:function(index){
			if(index===undefined){
				this.each(function(){
					this.reset();
				});
			}else{
				this[index].reset();
			}
			return this;
		},
		// 元素添加
		add: function(selector, context) {
			Array.prototype.push.apply(this, ben(selector, context));
			return this;
		},
		toArray: function() {
			return Array.prototype.slice.call(this);
		}
	});

	// 接口
	ben.fn.extend({
		// 基本接口
		each: function(fn, argus) {
			return ben.each(this, function() {
				var args = [this].concat(Array.prototype.slice.call(arguments));
				fn.apply(this, args);
			}, argus);
		},
		type: function() {
			return ben.type(this[0]);
		},
		// 选择器
		find: function(selector, context) {
			return ben.find(selector, context || this);
		},
		// css接口
		css: function(attr, value) {
			if (ben.type(attr) == "string" && value === undefined) {
				return ben.css(this[0], attr);
			} else {
				return this.each(function() {
					ben.css(this, attr, value);
				});
			}
		},
		width: function() {
			return this.length>0?ben.width(this[0]):this;
		},
		height: function() {
			return this.length>0?ben.height(this[0]):this;
		},
		offsetTop: function() {
			return ben.offsetTop(this[0]);
		},
		offsetLeft: function() {
			return ben.offsetLeft(this[0]);
		},
		offsetWidth: function() {
			return this[0].offsetWidth;
		},
		offsetHeight: function() {
			return this[0].offsetHeight;
		},
		// 事件接口
		on: function() {
			return this.each(ben.on, arguments);
		},
		re: function() {
			return this.each(ben.re, arguments);
		},
		de: function() {
			return this.each(ben.de, arguments);
		},
		click: function(fn) {
			return this.on("click", fn);
		},
		mouseover: function(fn) {
			return this.on("mouseover", fn);
		},
		mouseout: function(fn) {
			return this.on("mouseout", fn);
		},
		change:function(fn){
			return this.on("change",fn);
		},
		load:function(fn){
			var length=this.length,
				that=this,
				i=0;
			return this.on("load",function(){
				i++;
				if(i==length)fn.call(that);
			});
		},
		// 动画接口
		animate: function() {
			return this.each(ben.animate, arguments);
		},
		stop: function() {
			return this.each(ben.stop);
		},
		// 瀑布流接口
		waterfall: function(settings) {
			settings.box = this[0];
			return ben.waterfall(settings);
		},
		// 轮播图接口
		slider: function(settings) {
			settings.box = this;
			return ben.slider(settings);
		}
	});

	// css选择器
	ben.extend({
		find: function(selector, context) {
			var exp = /^#(\w+)$|^\.(\w+)$|^(\w+|\*)$|^\[(\w+)=([^\[\]]+)\]$/,
				match = selector.match(exp),
				context = ben(context),
				elem = [];
			if (match) {
				if (match[1]) { // id选择器
					context.each(function() {
						elem[0] = this.getElementById(match[1]);
						if (elem[0]) {
							if (elem[0].id == match[1]) {
								return false;
							} else {
								elem[0] = this.getElementsByName(id);
								for (var i = 0, j = elem[0].length; i < j; i++) {
									if (elem[0][i].id == id) {
										elem[0] = elem[0][i];
										return false;
									}
								}
							}
						}
					});
				} else if (match[2]) {
					if (document.getElementsByClassName) {
						context.each(function() {
							var classname = Array.prototype.slice.call(this.getElementsByClassName(match[2]));
							Array.prototype.push.apply(elem, classname);
						});
					} else {
						context.each(function() {
							var all = this.getElementsByTagName("*"),
								exp = new RegExp("\\b" + match[2] + "\\b");
							for (var i = 0, j = all.length; i < j; i++) {
								if (exp.test(all[i].className)) {
									elem.push(all[i]);
								}
							}
						});
					}
				} else if (match[3]) {
					context.each(function() {
						var tagname = Array.prototype.slice.call(this.getElementsByTagName(match[3]));
						if (tagname) Array.prototype.push.apply(elem, tagname);
					});
				} else if (match[4]) {
					context.each(function() {
						var all = this.getElementsByTagName("*");
						for (var i = all.length - 1; i >= 0; i--) {
							if (all[i].getAttribute(match[4]) == match[5]) {
								elem.push(all[i]);
							}
						}
					});
				}
			} else {
				elem = ben(elem);
				if (selector.indexOf(",") != -1) {
					var selectors = selector.split(",");
					for (var i = 0; i < selectors.length; i++) {
						elem = elem.add(selectors[i], context);
					}
				} else if (selector.indexOf(" ") != -1) {
					var selectors = selector.split(" ");
					elem = ben(selectors[0], context);
					for (var i = 1; i < selectors.length; i++) {
						elem = elem.find(selectors[i]);
					}
				} else {
					var selectors = selector.match(/#\w+|\.\w+|\w+|\*/g),
						elems = [];
					ben(selectors).each(function(val, index, value) {
						elems.push(ben(value, context));
					});
					elems[0].each(function() {
						for (var i = 1; i < elems.length; i++) {
							if (elems[i].index(this) == -1) break;
						}
						if (i == elems.length) elem.add(this);
					});
				}
				elem = elem.toArray();
			}
			for (var i = 0; i < elem.length; i++) {
				for (var j = i - 1; j >= 0; j--) {
					if (elem[i] === elem[j]) {
						elem.splice(i--, 1);
						break;
					}
				}
			}
			return ben(elem);
		}
	});

	// css操作
	ben.extend({
		css: function(obj, attr, value) {
			var elem = (obj === document) ? obj.body : obj;
			if (ben.type(attr) == "object") {
				ben.each(attr, function(attr, value) {
					value = ben.type(value) == "number" ? value + "px" : value;
					elem.style[attr] = value;
				});
			} else if (value || value===0) {
				value = ben.type(value) == "number" ? value + "px" : value;
				elem.style[attr] = value;
			} else {
				if (window.getComputedStyle) {
					return window.getComputedStyle(elem, null)[attr];
				} else {
					return elem.currentStyle[attr];
				}
			}
			return obj;
		},
		width: function(obj) {
			var paddingLeft = parseFloat(ben.css(obj, "paddingLeft")),
				paddingRight = parseFloat(ben.css(obj, "paddingRight")),
				width = parseFloat(ben.css(obj, "width"));
			return Math.round(paddingLeft + paddingRight + width);
		},
		height: function(obj) {
			var paddingTop = parseFloat(ben.css(obj, "paddingTop")),
				paddingBottom = parseFloat(ben.css(obj, "paddingBottom")),
				height = parseFloat(ben.css(obj, "height"));
			return Math.round(paddingTop + paddingBottom + height);
		},
		offsetTop: function(obj) {
			var top = obj.offsetTop,
				parent = obj.parentNode;
			while (parent !== document.body) {
				top += parent.offsetTop;
				parent = parent.parentNode;
			}
			return top;
		},
		offsetLeft: function(obj) {
			var left = obj.offsetLeft,
				parent = obj.parentNode;
			while (parent !== document.body) {
				left += parent.offsetLeft;
				parent = parent.parentNode;
			}
			return left;
		}
	});

	// 事件
	ben.extend({
		// 添加事件
		on: function(obj, event, fn) {
			if (obj.addEventListener !== undefined) {
				obj.addEventListener(event, fn, false);
			} else if (obj.attachEvent !== undefined) {
				obj.attachEvent("on" + event, fn);
			} else {
				obj["on" + event] = fn;
			}
			return obj;
		},
		// 删除事件
		re: function(obj, event, fn) {
			if (obj.removeEventListener != undefined) {
				obj.removeEventListener(event, fn, false);
			} else if (obj.detachEvent != undefined) {
				obj.detachEvent("on" + event, fn);
			} else {
				obj["on" + event] = "";
			}
			return obj;
		},
		// 事件代理
		de: function(obj, selector, event, fn) {
			ben.on(obj, event, function() {
				ben(selector).each(function(obj, e) {
					if (e.target && e.target == obj) {
						fn.call(obj);
					}
				}, arguments);
			});
		}
	});

	// 元素创建
	ben.extend({
		// 创建文本节点
		createTextNode: function(emmet) {
			var oFragment = document.createDocumentFragment(),
				match, textNode;
			if (match = emmet.match(/^\{(.*)\}(\*(\d+))?$/)) {
				var textNode = document.createTextNode(match[1]);
				oFragment.appendChild(textNode.cloneNode(true));
				if (match[3]) {
					for (var i = 1; i < parseInt(match[3]); i++) {
						oFragment.appendChild(textNode.cloneNode(true));
					}
				}
				return oFragment;
			} else {
				return false;
			}
		},
		// 创建元素节点
		createElement: function(emmet) {
			var oFragment = document.createDocumentFragment(),
				match, elementNode, attrs, split;
			if (match = emmet.match(/^(\w+)?([\.#]\w+|\[\w+=.*?\])*(\{.*\})?(\*\d+)?$/)) {
				elementNode = document.createElement(match[1] || "div");
				attrs = emmet.match(/[\.#]\w+|\[\w+=.*?\]/g) || [];
				for (var i = 0; i < attrs.length; i++) {
					if (attrs[i][0] == '#') {
						split = attrs[i].match(/#(\w+)/);
						elementNode.id = split[1];
					} else if (attrs[i][0] == ".") {
						split = attrs[i].match(/\.(\w+)/);
						elementNode.className += elementNode.className ? " " + split[1] : split[1];
					} else {
						split = attrs[i].match(/\[(\w+)=(.*?)\]/);
						elementNode.setAttribute(split[1], split[2]);
					}
				}
				if (match[3]) elementNode.appendChild(ben.createTextNode(match[3]));
				oFragment.appendChild(elementNode.cloneNode(true));
				if (match[4]) {
					split = parseInt(match[4].match(/\*(\d+)/)[1]);
					for (var i = 1; i < split; i++) {
						oFragment.appendChild(elementNode.cloneNode(true));
					}
				}
				return oFragment;
			} else {
				return false;
			}
		},
		// 创建节点
		create: function(emmet) {
			var exp = /(\w+)?([\.#]\w+|\[\w+=.*?\])*(\{.*?\})?(\*\d+)?/g,
				match = emmet.match(exp),
				one, two;
			for (var i = 0; i < match.length; i++) {
				if (match[i] == "" || match[i][0] == '*') {
					match.splice(i--, 1);
				} else {
					emmet = emmet.replace(match[i], i);
					if (match[i][0] == '{') {
						match[i] = ben.createTextNode(match[i]);
					} else {
						match[i] = ben.createElement(match[i]);
					}
				}
			}
			emmet = "(" + emmet + ")";
			while (one = emmet.match(/\(([^\(\)]*)\)/)) {
				one = one[1];
				while (two = one.match(/(\d+)\*(\d+)/)) {
					two[1] = parseInt(two[1]);
					two[2] = parseInt(two[2]);
					var self = match[two[1]].cloneNode(true);
					for (var i = 1; i < two[2]; i++) {
						match[two[1]].appendChild(self.cloneNode(true));
					}
					one = one.replace(two[0], two[1].toString());
				}
				while (two = one.match(/(\d+)>(\d+)(?!>)/)) {
					two[1] = parseInt(two[1]);
					two[2] = parseInt(two[2]);
					for (var i = 0; i < match[two[1]].childNodes.length; i++) {
						match[two[1]].childNodes[i].appendChild(match[two[2]].cloneNode(true));
					}
					one = one.replace(two[0], two[1].toString());
				}
				while (two = one.match(/(\d+)\+(\d+)/)) {
					two[1] = parseInt(two[1]);
					two[2] = parseInt(two[2]);
					match[two[1]].appendChild(match[two[2]].cloneNode(true));
					one = one.replace(two[0], two[1].toString());
				}
				emmet = emmet.replace(/\([^\(\)]+\)/, one);
			}
			return match[0];
		}
	});
	ben.fn.extend({
		append: function(selector, callback) {
			var child = ben(selector).appendTo(this);
			if (callback) callback.call(child);
			return this;
		},
		appendTo: function(selector, callback) {
			var child = [];
			var parent = ben(selector).each(function(obj, that) {
				var oFragment = document.createDocumentFragment();
				that.each(function(obj) {
					child.push(obj.cloneNode(true));
					oFragment.appendChild(child[child.length - 1]);
				});
				obj = obj == document ? document.body : obj;
				obj.appendChild(oFragment);
			}, [this]);
			if (callback) callback.call(parent);
			return ben(child);
		}
	});

	// ajax
	ben.extend({
		// ajax传输
		ajax: function(settings) {
			var method = settings.method ? settings.method.toUpperCase() : "GET",
				url = settings.url,
				async = !(settings.async === false),
				data = "",
				header = settings.header || "Content-type",
				contentType = settings.contentType || "application/x-www-form-urlencoded",
				success = settings.success || function() {},
				error = settings.error || function() {},
				xmlhttp;
			if (settings.data) {
				for (var name in settings.data) {
					data += "&" + name + "=" + settings.data[name];
				}
				data = data.substr(1);
				if (method == "GET") url += "?" + data;
			}
			if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.open(method, url, async);
			xmlhttp.setRequestHeader(header, contentType);
			xmlhttp.send(data);
			if (async) {
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4) {
						if (xmlhttp.status == 200) {
							success.call(settings, xmlhttp.responseText);
						} else if (xmlhttp.status == 404) {
							error.call(settings);
						}
					}
				}
			}
		},
		// JSON解析
		parseJSON: function(data) {
			return (new Function("return " + data))();
		}
	});
	
	// 参数处理
	ben.extend({
		data:{},
		argus:function(name,defaults,argus,callback){
			var data=ben.data[name]=ben.extend(ben.data[name]||defaults,argus);
			callback.call(data);
			return data;
		},
		htmlDATA:function(){
			var exp=/(\w+)=(\w+)/g,
				search=window.location.search,
				name,
				json={};
			while(name=exp.exec(search)){
				json[name[1]]=name[2];
			}
			return json;
		}
	});

	// 动画组件
	ben.extend({
		animateData: {
			zhen: 25, // 动画帧率
			list: [], // 动画队列
			callback: false, // 回调进行时
			timer: undefined // 定时器指针
		},
		animate: function(obj, styles) {
			var length = arguments.length,
				action = {
					styles: {},
					types: {},
					callback: function() {},
					speed: 0,
					tween: {},
					startAttr: {}
				},
				data = ben.animateData,
				list = data.list;
			if (styles.styles) {
				ben.extend(action, styles);
			} else {
				ben.extend(action.styles, styles);
				for (var i = 2; i < arguments.length; i++) {
					var type = ben.type(arguments[i]);
					if (type == "regexp") {
						for (var name in styles) {
							action.types[name] = arguments[i];
						}
					} else if (type == "function") {
						action.callback = arguments[i];
					} else if (type == "number") {
						action.speed = arguments[i];
					} else if (type == "string") {
						for (var name in styles) {
							action.tween[name] = arguments[i];
						}
					}
				}
			}
			for (var i = 0; i < list.length; i++) {
				if (list[i].obj === obj) {
					if (data.callback) {
						list[i].actions.unshift(action);
					} else {
						list[i].actions.push(action);
					}
					break;
				}
			}
			if (i == list.length) {
				list.push({
					obj: obj,
					actions: [action]
				});
			}
			if (data.timer === undefined) {
				data.timer = setInterval(function() {
					var flag1 = true;
					for (var i = 0; i < list.length; i++) {
						var obj = list[i].obj,
							action = list[i].actions[0],
							styles = action.styles,
							types = action.types,
							callback = action.callback,
							speed = action.speed,
							tween = action.tween,
							startTime = action.startTime = action.startTime || (new Date()).getTime();
						flag2 = true;
						for (var attr in styles) {
							if (attr == "opacity") {
								var css = parseFloat(ben.css(obj, attr)) * 100,
									next = (styles[attr] * 100 - css) / 8;
								next = next > 0 ? Math.ceil(next) : Math.floor(next);
								css = (next + css) / 100;
								if (next != 0) {
									obj.style[attr] = css;
									flag1 = flag2 = false;
								}
							} else if (speed == 0) {
								var css = ben.css(obj, attr),
									num = css.match(types[attr] || /^(-?\d+(\.\d+)?)px$/)[1],
									now = parseFloat(num),
									now = styles[attr] > now ? Math.floor(now) : Math.ceil(now),
									next = (styles[attr] - now) / 8,
									next = next > 0 ? Math.ceil(next) : Math.floor(next);
								if (next != 0) {
									obj.style[attr] = css.replace(num, now + next);
									flag1 = flag2 = false;
								}
							} else {
								var css = ben.css(obj, attr),
									num = css.substring(0,css.length-2),
									t = (new Date()).getTime() - startTime,
									b = action.startAttr[attr] = action.startAttr[attr] || parseFloat(num),
									c = styles[attr] - b;
								d = speed;
								if (t >= d) {
									obj.style[attr] = css.replace(num, styles[attr]);
								} else {
									obj.style[attr] = css.replace(num, ben.tween[tween[attr] || "linear"](t, b, c, d));
									flag1 = flag2 = false;
								}
							}
						}
						if (flag2) {
							if (list[i].actions.length > 1) {
								list[i].actions.shift();
							} else {
								list.splice(i, 1);
							}
							data.callback = true;
							callback.call(obj);
							data.callback = false;
							i--
						}
					}
					if (flag1) {
						clearInterval(data.timer);
						data.timer = undefined;
					}
				}, data.zhen);
			}
		},
		// 缓动
		tween: {
			// t时间差，b初始值，c属性差，d持续时间
			// 线性缓动
			linear: function(t, b, c, d) {
				return c * t / d + b;
			},
			// 二次方缓动
			easein: function(t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeout: function(t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeinout: function(t, b, c, d) {
				if (t < d / 2) return ben.tween.easein(t, b, c / 2, d / 2);
				return ben.tween.easeout(t - d / 2, b + c / 2, c / 2, d / 2);
			},
			// 三次方缓动
			easein_3: function(t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeout_3: function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeinout_3: function(t, b, c, d) {
				if (t < d / 2) return ben.tween.easein_3(t, b, c / 2, d / 2);
				return ben.tween.easeout_3(t - d / 2, b + c / 2, c / 2, d / 2);
			},
			// 四次方缓动
			easein_4: function(t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeout_4: function(t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeinout_4: function(t, b, c, d) {
				if (t < d / 2) return ben.tween.easein_4(t, b, c / 2, d / 2);
				return ben.tween.easeout_4(t - d / 2, b + c / 2, c / 2, d / 2);
			},
			// 五次方缓动
			easein_5: function(t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeout_5: function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeinout_5: function(t, b, c, d) {
				if (t < d / 2) return ben.tween.easein_5(t, b, c / 2, d / 2);
				return ben.tween.easeout_5(t - d / 2, b + c / 2, c / 2, d / 2);
			},
			// 2的指数缓动
			expoin: function(t, b, c, d) {
				return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			expoout: function(t, b, c, d) {
				return (t == d) ? d : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			expoinout: function(t, b, c, d) {
				if (t < d / 2) return ben.tween.expoin(t, b, c / 2, d / 2);
				return ben.tween.expoout(t - d / 2, b + c / 2, c / 2, d / 2);
			},
			// 2的指数衰减缓动
			elasticin: function(t, b, c, d) {
				return (t == 0) ? b : c * Math.sin(6.5 * Math.PI * (t /= d)) * Math.pow(2, 10 * (t - 1)) + b;
			},
			elasticout: function(t, b, c, d) {
				return (t == d) ? d : c * (-Math.pow(2, -10 * t / d) * Math.sin(Math.PI * ((t /= d) * 6.5 + 0.5)) + 1) + b;
			},
			elasticinout: function(t, b, c, d) {
				if (t < d / 2) return ben.tween.elasticin(t, b, c / 2, d / 2);
				return ben.tween.elasticout(t - d / 2, b + c / 2, c / 2, d / 2);
			},
			// 2的指数衰减反弹缓动
			bouncein: function(t, b, c, d) {
				return (t == 0) ? b : c * Math.abs(Math.sin(4.5 * Math.PI * (t /= d))) * Math.pow(2, 10 * (t - 1)) + b;
			},
			bounceout: function(t, b, c, d) {
				return (t == d) ? d : c * (-Math.pow(2, -10 * t / d) * Math.abs(Math.sin(Math.PI * ((t /= d) * 4.5 + 0.5))) + 1) + b;
			},
			bounceinout: function(t, b, c, d) {
				if (t < d / 2) return ben.tween.bouncein(t, b, c / 2, d / 2);
				return ben.tween.bounceout(t - d / 2, b + c / 2, c / 2, d / 2);
			}
		},
		// 停止动画
		stop: function(obj) {
			var list = ben.animateData.list;
			for (var i = 0; i < list.length; i++) {
				if (list[i].obj === obj) {
					list.splice(i, 1);
					return obj;
				}
			}
			return obj;
		}
	});

	// 瀑布流组件
	ben.extend({
		waterfall: function(settings) {
			/*
			 * settings:{ 参数设定
			 * 	box：瀑布流容器，必填
			 * 	contents：瀑布流的内容div,重排时不用填
			 * 	notAppend：是否不自动添加到box
			 * 	width：内容的宽度
			 * 	col：列间距
			 * 	row：行间距
			 * 	rows：当前每一列的高度
			 * 	getMore：参数为一个函数，获取数据后变成参数调用该函数
			 * 	setTime：更新延迟时间
			 *  resize：是否自适应
			 * 	auto：是否自适应宽度
			 * }
			 */
			return ben.argus("waterfall",{
				append:true,
				col:12,
				row:12,
				setTime:200,
				resize:false,
				auto:true,
				border:true,
				cols:[],
				rows:[],
				getMore:false,
				couldGetMore:true,
				getMoreIng:false
			},settings,function(){
				var box=$(this.box),
					contents=this.contents,
					col=this.col,
					row=this.row,
					cols=this.cols,
					rows=this.rows,
					border=this.border,
					append=this.append,
					width=this.width,
					auto=this.auto,
					getMore=this.getMore,
					setTime=this.setTime,
					resize=this.resize;
				if(append)contents=contents.appendTo(box);
				if(!this.width)width=this.width=contents.width();
				if(border){
					var list=Math.floor((box.width()-col)/(width+col));
					if(auto)col=(box.width()-width*list)/(list+1);
					for(var i=0;i<list;i++){
						cols[i]=i*(width+col)+col;
						rows[i]=rows[i]||row;
					}
				}else{
					var list=Math.floor((box.width()+col)/(width+col));
					if(auto)col=(box.width()-width*list)/(list-1);
					for(var i=0;i<list;i++){
						cols[i]=i*(width+col);
						rows[i]=rows[i]||0;
					}
				}
				contents.each(function(obj) {
					var top = rows[0],
						left = cols[0],
						line = 0;
					for (var i = 1; i < list; i++) {
						if (top > rows[i]) {
							top = rows[i];
							left = cols[i];
							line = i;
						}
					}
					$(obj).css({
						top: top,
						left: left
					});
					rows[line] += $(obj).height() + row;
				});
				box.css({
					position: "relative",
					height: Math.max.apply(null, rows)
				});
				contents.css({
					position: "absolute",
					width: width
				});
				if (getMore&&this.couldGetMore) {
					ben.data.waterfall.couldGetMore=false;
					$().on("scroll",(function(){
						var boxHeight = box.offsetTop() + box.offsetHeight() - document.documentElement.clientHeight,
							nowHeight = document.body.scrollTop + document.documentElement.clientHeight,
							callee=arguments.callee;
						if(boxHeight<nowHeight&&!ben.data.waterfall.getMoreIng){
							ben.data.waterfall.getMoreIng=true;
							setTimeout(function(){
								getMore(function(more){
									ben.data.waterfall.getMoreIng=false;
									ben.waterfall(more);
								},callee);
							},setTime);
						}
						return callee;
					})());
				}
				
//				if (resize) {
//					window.onresize = (function() {
//						if (!ben.waterfallData.resizeIng) {
//							ben.waterfallData.resizeIng = true;
//							setTimeout(function() {
//								console.log(456);
//								ben.waterfallData.resizeIng = false;
//								window.onresize = "";
//								ben.waterfall({
//									contents: $("div", box[0]),
//									rows: [],
//									notAppend: true
//								});
//							}, setTime);
//						}
//						return arguments.callee;
//					})();
//				}
			}).box;
		}
	});

	// 轮播图
	ben.extend({
		slider: function(settings) {
			/*
			 * box:有宽度和高度的空容器，图片大小为100%
			 * urls:图片地址数组，至少一一个
			 * circle:是否循环播放，默认为false
			 * index:从第几张图片开始，默认为第一张
			 * change:容器大小改变时触发的函数
			 * interval：定时翻页
			 * speed：缓动时间
			 * tween：缓动效果
			 */
			return ben.argus("slider",{
				img:ben([]),
				circle:false,
				index:0,
				change:false,
				interval:false,
				speed:0,
				tween:"linear"
			},settings,function(){
				with(this){
					if(circle){
						index++;
						urls.unshift(urls[urls.length - 1]);
						urls.push(urls[1]);
					}
					for(var i=0;i<urls.length;i++){
						img.add("<img[src=" + urls[i] + "]>");
					}
					box[0].innerHTML = "";
					box.css({
						position: "relative",
						overflow: "hidden"
					}).append($("<.sliderImgs>").css({
						width: urls.length * 100 + "%",
						height: "100%",
						marginLeft: -index * box.width()
					}).append(img.css({
						width: (100 / urls.length) + "%",
						height: "100%"
					}))).append($("<.sliderLeft{<}>").css({
						left: "5%"
					}).add($("<.sliderRight{>}>").css({
						right: "5%"
					})).css({
						height: "16%",
						width: box.height() * 0.08,
						lineHeight: box.height() * 0.16,
						backgroundColor: "white",
						position: "absolute",
						top: "40%",
						borderRadius: "20% / 10%",
						fontSize: box.height() * 0.14,
						fontWeight: "bolder",
						opacity: "0.2",
						textAlign: "center",
						cursor: "pointer"
					}), function() {
						$(".sliderLeft").click(function() {
							if(index>0)index--;
						});
						$(".sliderRight").click(function() {
							if(index<urls.length-1)index++;
						});
						$(this).mouseover(function() {
							$(this).stop().animate({
								opacity: 0.5
							});
						}).mouseout(function() {
							$(this).stop().animate({
								opacity: 0.2
							});
						}).click(function() {
							isinterval = true;
							$("<.slidershade>").css({
								width: "100%",
								height: "100%",
								position: "absolute",
								top: 0,
								left: 0
							}).appendTo(box);
							$(".sliderImgs").animate({
								marginLeft: -index * box.width()
							}, function() {
								if (circle) {
									if (index == 0) {
										index = urls.length - 2;
										$(this).css("marginLeft", -index * box.width());
									} else if (index == urls.length - 1) {
										index = 1;
										$(this).css("marginLeft", -index * box.width());
									}
								}
								box[0].removeChild($(".slidershade")[0]);
								isinterval = false;
							}, speed, tween);
						});
						var width = box.width(),
							height = box.height();
						setInterval(function() {
							if (box.width() != width || box.height() != height) {
								width = box.width();
								height = box.height();
								box.find(".sliderLeft,.sliderRight").css({
									width: height * 0.08,
									lineHeight: height * 0.16,
									fontSize: height * 0.14
								});
								box.find(".sliderImgs").css({
									marginLeft: -index * width
								});
								if (change) change.call(box[0]);
							}
						}, 50);
					});
		
					if (interval) {
						var isinterval = false
						setInterval(function() {
							if (!isinterval) {
								isinterval = true;
								$(".sliderRight")[0].click();
							}
						}, interval);
					}
				}
			}).box;
		}
	});
})(window);