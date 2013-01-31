void function(window,document){
	//命名空间对象
	var NSObject = function(){
		if(!this instanceof arguments.callee) return new arguments.callee();
	},
	NSPrototype = NSObject.prototype = {
		constructor:Object
	};
	var extend = NSPrototype.extend = function(sub,sup){
		var root = sub;
		if(!sup){
			root = this;
			sup = sub;
		}
		for(var i in sup) root[i] = sup[i];
	}
	var Type = function(f){
		return function(o){
			return f.call(o);
		};
	}(Object.prototype.toString);
	void function(Type,types){
		for(var i=0,len=types.length;i<len;i++)
			Type['is'+types[i]] = function(type){
				return function(o){
					return Type(o) === '[object '+type+']';
				};
			}(types[i]);
	}(Type,['Number','String','String','Function','Object','Date','RegExp','Undefined','Null']);
	var UseNameSpace = NSPrototype.UseNameSpace = function(NS,root){
		root = root || this;
		NS = Type.isString(NS) ? NS.split('.') : [];
		for(var i=0,len=NS.length;i<len;i++){
			if(!root[NS[i]]) root[NS[i]] = new NSObject();
			root = root[NS[i]];
		}
		return root;
	}
	UseNameSpace('Anole');
	Anole.UseNameSpace('core').extend({
		Type:Type
	});
	Anole.extend({
		/**
		 * 定义类
		 × @param {Function} 可选 要继承的类
		 * @param {Object} 	 必填 实现类的成员
		 * @return {Function} 定义的类
		 × @author ou xing zhi
		 */
		Class:(function(){
			var slice = [].slice;
			function bind(fun,obj){
				var a = slice.call(arguments,2);
				return function(){
					var args = a.concat(slice.call(arguments,0));
					fun.apply(obj,args);
				};
			}
			function Class(){
				var args = slice.call(arguments,0),
					propertys = args.pop(),
					parent = args.shift(),
					empty = function(){}
					Class = function(){
						this.initialize.apply(this,arguments);
					}
				typeof parent != 'function' && (parent = function(){});
				empty.prototype = parent.prototype;
				Class.prototype = new empty();
				var supInitialize = Class.prototype.initialize ;
				for(var i in propertys) {
					Class.prototype[i] = propertys[i];
				}
				if(supInitialize && Class.prototype.initialize){
					var newInitialize = Class.prototype.initialize;
					Class.prototype.initialize = function(){
						newInitialize.apply(this,[bind(function(){supInitialize.apply(this,arguments);},this)].concat(slice.call(arguments,0)));
					}
				}
				Class.prototype.constructor = parent;
				return Class;
			}
			return Class;
		})()
	});
}(window,document);
