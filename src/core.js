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
}(window,document);
