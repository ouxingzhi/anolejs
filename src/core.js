/**
 * Anolejs 一个优雅的javascript framewrok
 */
void function (window, document) {
	var slice = Array.prototype.slice,
        push = Array.prototype.push;

	//命名空间对象
	var NSObject = function () {
		if (!this instanceof arguments.callee)
			return new arguments.callee();
	},
	NSPrototype = NSObject.prototype = {
		constructor : Object
	};
	var extend = NSPrototype.extend = function (sub, sup) {
		var root = sub;
		if (!sup) {
			root = this;
			sup = sub;
		}
		for (var i in sup)
			root[i] = sup[i];
	}
	var Type = function (f) {
		return function (o) {
			return f.call(o);
		};
	}
	(Object.prototype.toString);
	void function (Type, types) {
		for (var i = 0, len = types.length; i < len; i++)
			Type['is' + types[i]] = function (type) {
				return function (o) {
					return Type(o) === '[object ' + type + ']';
				};
			}
		(types[i]);
	}
	(Type, ['Number', 'Boolean', 'String', 'Array','Function', 'Object', 'Date', 'RegExp', 'Error', 'Undefined', 'Null']);
	var NS = NSPrototype.NS = function (ns, root) {
		root = root || this;
		ns = Type.isString(ns) ? ns.split('.') : [];
		for (var i = 0, len = ns.length; i < len; i++) {
			if (!root[ns[i]])
				root[ns[i]] = new NSObject();
			root = root[ns[i]];
		}
		return root;
	}
	NS('Anole', window);
	Anole.NS('debug').extend({
		/* 显示所有调试 */
		ENUM_ALL : 7,
		/* 显示调试 */
		ENUM_DEBUG : 1,
		/* 显示错误 */
		ENUM_ERROR : 2,
		/* 显示警告 */
		ENUM_WARNING : 4,
		log : function (tag, message) {
			if (Anole.config.debug & tag) {
				console.log(message);
			}
		}
	});
	Anole.extend({
		config : {
			debug : Anole.debug.ENUM_ALL
		},
		setConfig : function (conf) {
			if (!conf)
				return;
			for (var i in conf) {
				if (conf.hasOwnProperty(i))
					Anole.config[i] = conf[i];
			}
		},
		Type : Type,
		/**
		 * 获得对象的类型
		 * @param obj {any Object} 任何对象
		 * @return {String} 为类型的字符串
		 */
		is : function (obj) {
			var type = typeof obj;
			switch (type) {
			case 'null':
			case 'undefined':
			case 'number':
			case 'boolean':
			case 'string':
			case 'function':
				return type;
			}
			if (type === 'object' && obj === window)
				return 'window';
			if (type === 'object' && obj === document)
				return 'document';
			if (type === 'object' && obj.nodeType && obj.getAttribute)
				return 'element';
			if (Type.isObject(obj))
				return 'object';
			if (Type.isArray(obj))
				return 'array';
			if (Type.isDate(obj))
				return 'date';
			if (Type.isRegExp(obj))
				return 'regexp';
			if (Type.isError(obj))
				return 'error';
		},
		/**
		 * 判断变量是否为空
		 * @param obj {any Object} 任何值
		 * @return {Bootean}
		 */
		isEmpty : function (obj) {
			return !(obj || (Anole.isArray(obj) && obj.length))
		},
		/**
		 * 对一个数组或是对象进行循环处理
		 * @param obj {Array|Object} 要循环的对象
		 * @param fun {Function}
		 * @reutrn void
		 */
		each : function (obj, fun, scope) {
			if (Anole.isEmpty(obj) || !Anole.isFunction(fun))
				return;
			var i;
			if (Anole.isObject(obj)) {
				for (i in obj) {
					if (obj.hasOwnProperty(i))
						fun.call(scope, i, obj[i]);
				}
			} else if (Anole.isArray(obj)) {
				for (i = 0; i < obj.length; i++) {
					fun.call(scope, i, obj[i]);
				}
			}
		},
        $try:function($try,$catch,$finally){
            try{
                typeof $try === 'function' && $try();
            }catch(e){
                typeof $catch === 'function' && $catch();
            }finally{
                typeof $finally === 'function' && $finally();
            }
        }
	});

	Anole.NS('Class').extend({
		/**
		 * 定义类
		× @param {Function} 可选 要继承的类
		 * @param {Object} 	 必填 实现类的成员
		 * @return {Function} 定义的类
		 */
		create : (function () {
			var slice = [].slice;
			function bind(fun, obj) {
				var a = slice.call(arguments, 2);
				return function () {
					var args = a.concat(slice.call(arguments, 0));
					fun.apply(obj, args);
				};
			}
			function Class() {
				var args = slice.call(arguments, 0),
				propertys = args.pop(),
				parent = args.shift(),
				empty = function () {},
				Class = function () {
					this.initialize.apply(this, arguments);
				};
				typeof parent != 'function' && (parent = function () {});
				empty.prototype = parent.prototype;
				Class.prototype = new empty();
				var supInitialize = Class.prototype.initialize;
				for (var i in propertys) {
					Class.prototype[i] = propertys[i];
				}
				if (supInitialize && Class.prototype.initialize) {
					var newInitialize = Class.prototype.initialize;
					Class.prototype.initialize = function () {
						newInitialize.apply(this, [bind(function () {
									supInitialize.apply(this, arguments);
								}, this)].concat(slice.call(arguments, 0)));
					}
				}
				Class.prototype.constructor = parent;
				return Class;
			}
			return Class;
		})()
	});
	/*
	 * Object 命名空间
	 */
	Anole.NS('Object').extend({
		/**
		 *  取对象的所有的key
		 *  @param obj {Object} 对象
		 *  @return {Array}     所有的key
		 */
		getKey : function (obj) {
			var k = [];
			for (var i in obj) {
				if (obj.hasOwnProperty(i))
					k.push(i);
			}
			return k;
		}
	});
	Anole.NS('Array').extend({
		/**
		 * 判断值在数据中的位置，如不存在返回-1
		 */
		indexOf : function (val, arr) {
			if (!arr)
				return -1;
			if (arr.indexOf) {
				return arr.indexOf(val);
			}else {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] === val)
						return i;
				};
			}
			return -1;
		},
        insert:function(arr,val){
            if(Type.isArray(arr) && val){
                if(val && 'length' in val){
                    Anole.$try(function(){
                        push.apply(arr,val);
                    },function(){
                        for(var i=0;i<val.length;i++){
                            arr.push(val[i]);
                        }
                    });
                }else{
                    arr.push(val);
                }
            }
            return arr;
        }
	});
	/*
	 * Function命名空间
	 */
	Anole.NS('Function').extend({
		/**
		 * 绑定函数运行在那个对象
		 * @param {type} fun
		 * @param {type} space
		 * @param {type} args
		 * @returns {unresolved}
		 */
		bind : function (fun, space, args) {
			Type.isArray(args) || (args = [args]);
			return function () {
				var a = args.concat(slice.call(arguments));
				fun.apply(space, a);
			}
		}
	});
	/*
	 * String命名空间
	 */
	Anole.NS('String').extend({
		trim : function (str) {
			return str.trim ? str.trim() : str.replace(/^\s+?|\s+?$/i, '');
		}
	});
	/*
	 * Date命名空间
	 */
	Anole.NS('Date').extend({
        
    });
}
(window, document);