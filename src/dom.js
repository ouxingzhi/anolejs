/**
 * DOM选择器
 */
void function (Anole, window, document) {
	var strTrim = Anole.String.trim,
	Type = Anole.Type;
	Anole.NS('dom').extend((function () {
			var simpExp = /^(?:#(\w+)|\.(\w+)|(\w+|\*))$/i,
			dirExp = /(?:\s|>|\+|~(?!=))/i,
			cssExp = /^(\*|[\w-]+)?(?:#([\w-]+))?(?:\.([\w-]+))?(?:\[([\w-]+)(?:([~\^$*|]?=)['"]([\w-]+)['"])?\])?(?:\:([\w-]+)(?:\(([^\(\)]*)\))?)?$/i;
			push = Array.prototype.push,
            slice = Array.prototype.slice;
			/**
			 * 通用元素选择器,支持IE6+,FF,CHROME,支持CSS3
			 * @param selector {String} css选择器
			 * @param root {Node} node对象
			 * @param results {Array} 要放置的数组
			 * @reutrn {Array<Element>} 返回element的数组
			 */
			function query(selector, root, results) {
				results = results || [];
				root = root || document;
				/*
				if(!root.getElementsByTagName) return results;
				if(!selector) return results;
				var simpMatch = simpExp.exec(selector),cols;
				if(simpMatch[1] && root.getElementById){
				cols = root.getElementById(simpMatch[1]);
				results.push(cols);
				return results;
				}else if(simpMatch[2] && root.getElementsByClassName){
				cols = root.getElementsByClassName(simpMatch[2]);
				cols && push.apply(results,cols);
				return results;
				}else if(simpMatch[3]){
				cols = root.getElementsByTagName(simpMatch[3]);
				cols && push.apply(results,cols);
				return results;
				}
				if(root.querySelectorAll){
				cols = root.querySelectorAll(selector);
				cols && push.apply(results,cols);
				return results;
				}*/
				return select(selector, root, results);
			}
			function select(selector, root, results) {
				var paths = selector.split(',');
				for (var i = 0; i < paths.length; i++) {
					push.apply(results, selectPath(paths[i], root));
				}
				return results;
			}
			function selectPath(path, root) {
				path = strTrim(path).replace(/\s+(>|\+|~)\s+/ig, '$1').replace(/\s+/ig, ' ');
				var dirs = path.split(dirExp),
				ops = path,
				i;
				for (i = 0; i < dirs.length; i++) {
					if (!dirs[i])
						throw new Error('css表达式语法错误');
					ops = ops.replace(dirs[i], '');
				}
				ops = ops.split('');
				if (Math.max(dirs.length - 1, 0) !== ops.length) {
					throw new Error('css表达式语法错误');
				}
				ops.unshift(' ');
                return iteratorPath(root,dirs,ops);
			}
			function iteratorPath(parent, dirs, ops) {
				var results = [],
				i;
				if (Type.isArray(parent)) {
					for (i = 0; i < parent.length; i++) {
						push.apply(results, iteratorPath(parent[i], dirs, ops));
					}
				} else {
					if (!parent.getElementsByTagName)
						return results;
					parent = push.apply(results, selectOfDir(parent, dirs, ops));
				}
				return results;
			}
			function selectOfDir(parent, dirs, ops) {
				var op = ops.shift(),
				dir = dirs.shift();

				if (!dir || !op)
					return parent && [parent] || [];
				var struct = cssExp.exec(dir);
				parent = PATH[op](parent, op, dir, struct);
				if (!parent || !parent.length)
					return [];
                if(dirs.length){
                    return iteratorPath(parent, dirs, ops);
                }else{
                    return parent;
                }
			}
			var PATH = {
				' ' : function (parent, op, dir, struct) {
					var results = [],el,els;
					if (struct[2] && parent.getElementById) {
                        el = parent.getElementById(struct[2]);
						if(el && (!struct[1] || struct[1].toLowerCase()===el.nodeName.toLowerCase())) results.push(el);
					}else if(struct[1]){
                        try{
							els = parent.getElementsByTagName(struct[1]);
							push.apply(results,els);
						}catch(e){
							for(var i=0;i<els.length;i++) results.push(els[i]);
						}
                    }else{
						try{
							els = parent.getElementsByTagName('*');
							push.apply(results,els);
						}catch(e){
							for(var i=0;i<els.length;i++) results.push(els[i]);
						}
                    }
                    if(!results.length) return results;
					for (var i = 2; i < struct.length; i++) {
						if (struct[i] && FILTER[i]) {
							results = FILTER[i](struct[i], results,struct,i);
						}
					}
                    return results;
				},
				'>' : function (parent, op, dir, struct) {
                    var results = [],childs = parent.childNodes;
                    for(var t=0;t<childs.length;t++){
                        if(childs[t].nodeType === 1)results.push(childs[t]);
                    }
                    if(!results.length) return results;
					for (var i = 1; i < struct.length; i++) {
						if (struct[i] && FILTER[i]) {
							results = FILTER[i](struct[i], results,struct,i);
						}
					}
                    return results;
                },
				'+' : function (parent, op, dir, struct) {
                    var results = [],nextSibling = parent;
                    while(nextSibling = nextSibling.nextSibling){
                        if(nextSibling.nodeType === 1) break;
                    }
                    nextSibling && results.push(nextSibling);
                    if(!results.length) return results;
					for (var i = 1; i < struct.length; i++) {
						if (struct[i] && FILTER[i]) {
							results = FILTER[i](struct[i], results,struct,i);
						}
					}
                    return results;
                },
				'~' : function (parent, op, dir, struct) {
                    var results = [],
                        parentNode = parent.parentNode,
                        childs;
                    if(parentNode && (childs = parentNode.childNodes) && childs.length){
                        for(var t=0;t<childs.length;t++){
                            if(parent !== childs[t] && childs[t].nodeType === 1)results.push(childs[t]);
                        }
                    }
                    if(!results.length) return results;
					for (var i = 1; i < struct.length; i++) {
						if (struct[i] && FILTER[i]) {
							results = FILTER[i](struct[i], results,struct,i);
						}
					}
                    return results;
                }
			};
			var FILTER = [null,
				//Tag Name
				function (tag, results,struct,t) {
					var _results = [];
                    for(var i=0;i<results.length;i++){
                        if(results[i].nodeName.toLowerCase() === tag.toLowerCase()) _results.push(results[i]);
                    }
                    return _results;
				},
				//Id
				function (id,results,struct,t) {
                    var _results = [];
                    for(var i=0;i<results.length;i++){
                        if(results[i].id && results[i].id === id) _results.push(results[i]);
                    }
                    return _results;
                },
				//Class
				function (cls,results,struct,t) {
                    var _results = [];
                    for(var i=0;i<results.length;i++){
                        if(results[i].className && results[i].className.match(new RegExp('(?:\\s|^)'+cls+'(?:\\s|$)','ig'))) _results.push(results[i]);
                    }
                    return _results;
                },
				//Attribute
				function (attr,results,struct,t) {
                    var _results = [],
                        op = struct[t+1],
                        val = struct[t+2],
                        attrs,
                        i,t;
                    for(i=0;i<results.length;i++){
                        ATTR[op || ''](results[i].attributes,attr,val) && _results.push(results[i]);
                    }
                    return _results;
                },
                null,
                null,
				//Pseudo Classes
				function (pseude,results,struct,t) {
                    var _results = [],
						pseudo = struct[t],
                        val = struct[t+1],
						dispose = PSEUDO[pseudo];
					if(!dispose) return _results;
                    for(var i=0;i<results.length;i++){
                       dispose(results,_results,val);
                    }
                    return _results;
                }
			];
            var ATTR = {
                '':function(attrs,name,val){
                    for(var i=0;i<attrs.length;i++){
                        if(attrs.item(i).name === name) return true;
                    }
                    return false;
                },
                '=':function(attrs,name,val){
                    var attr;
					if(!attrs) return false;
                    for(var i=0;i<attrs.length;i++){
                        attr = attrs.item(i);
                        if(attr.name === name && attr.value === val) return true;
                    }
                    return false;
                },
                '~=':function(attrs,name,val){
                    var attr;
					if(!attrs) return false;
                    for(var i=0;i<attrs.length;i++){
                        attr = attrs.item(i);
                        if(attr.name === name && (attr.value+'').match(new RegExp('(?:\\s|^)'+val+'(?:\\s|$)','ig'))) return true;
                    }
                    return false;
                },
                '^=':function(attrs,name,val){
                    var attr;
					if(!attrs) return false;
                    for(var i=0;i<attrs.length;i++){
                        attr = attrs.item(i);
                        if(attr.name === name && (attr.value+'').match(new RegExp('^'+val,'ig'))) return true;
                    }
                    return false;
                },
                '$=':function(attrs,name,val){
                    var attr;
					if(!attrs) return false;
                    for(var i=0;i<attrs.length;i++){
                        attr = attrs.item(i);
                        if(attr.name === name && (attr.value+'').match(new RegExp(val+'$','ig'))) return true;
                    }
                    return false;
                },
                '*=':function(attrs,name,val){
                    var attr;
					if(!attrs) return false;
                    for(var i=0;i<attrs.length;i++){
                        attr = attrs.item(i);
                        if(attr.name === name && (attr.value+'').indexOf(val) >-1) return true;
                    }
                    return false;
                },
                '|=':function(attrs,name,val){
                    var attr;
					if(!attrs) return false;
                    for(var i=0;i<attrs.length;i++){
                        attr = attrs.item(i);
                        if(attr.name === name && (attr.value+'').match(new RegExp('^'+val+'-','ig'))) return true;
                    }
                    return false;
                }
            };
            
            var PSEUDO = {
                'not':function(results,_results,val){
                    
                },
                'root':function(results,_results,val){
                    
                },
                'first-child':function(results,_results,val){
                    
                },
                'last-child':function(results,_results,val){
                    
                },
                'only-child':function(results,_results,val){
                    
                },
                'nth-child':function(results,_results,val){
                    
                },
                'nth-last-child':function(results,_results,val){
                    
                },
                'first-of-type':function(results,_results,val){
                    
                },
                'last-of-type':function(results,_results,val){
                    
                },
                'only-of-type':function(results,_results,val){
                    
                },
                'nth-of-type':function(results,_results,val){
                    
                },
                'nth-last-of-type':function(results,_results,val){
                    
                },
                'empty':function(results,_results,val){
                    
                },
                'checked':function(results,_results,val){
                    
                },
                'enabled':function(results,_results,val){
                    
                },
                'disabled':function(results,_results,val){
                    
                },
                'target':function(results,_results,val){
                    
                }
            };
			return {
				query : query //,
				//match:match,

			}
		})());
}
(Anole, window, document);
