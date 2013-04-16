void function(window,document){
	var slice = Array.prototype.slice;

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
	}(Type,['Number','Boolean','String','Function','Object','Date','RegExp','Error','Undefined','Null']);
	var NS = NSPrototype.NS = function(ns,root){
		root = root || this;
		ns = Type.isString(ns) ? ns.split('.') : [];
		for(var i=0,len=ns.length;i<len;i++){
			if(!root[ns[i]]) root[ns[i]] = new NSObject();
			root = root[ns[i]];
		}
		return root;
	}
	NS('Anole');
         
	Anole.extend({
            Type:Type,
            is:function(obj){
                var type = typeof obj;
                switch(type){
                    case 'null':
                    case 'undefined':
                    case 'number':
                    case 'boolean':
                    case 'string':
                    case 'function':
                        return type;
                }
                if(Type.isObject(obj)) return 'object';
                if(Type.isArray(obj)) return 'array';
                if(Type.isDate(obj)) return 'date';
                if(Type.isRegExp(obj)) return 'regexp';
                if(Type.isError(obj)) return 'error';
            }
	});
        Anole.NS('console').extend({
            log:function(tag,message){
                console.log(message);
            }
        });
    Anole.NS('config').extend({
        debug:
    });
	Anole.NS('Class').extend({
		/**
		 * 定义类
		 × @param {Function} 可选 要继承的类
		 * @param {Object} 	 必填 实现类的成员
		 * @return {Function} 定义的类
		 */
		create:(function(){
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
					empty = function(){},
					Class = function(){
						this.initialize.apply(this,arguments);
					};
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
        /*
        * Object 命名空间 
        */
        Anole.NS('Object').extend({
            /**
             *  取对象的所有的key
             *  @param obj {Object} 对象
             *  @return {Array}     所有的key
             */
            getKey:function(obj){
                var k = [];
                for(var i in obj){
                    if(obj.hasOwnProperty(i)) k.push(i);
                }
                return k;
            }
        });
        Anole.NS('Array').extend({
            each:function(){
            valueOf:function(obj){
                //todo
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
        bind:function(fun,space,args){
                Type.isArray(args) || (args = [args]);
                return function(){
                        var a = args.concat(slice.call(arguments));
                        fun.apply(space,a);
                }
        }
	});
}(window,document);
