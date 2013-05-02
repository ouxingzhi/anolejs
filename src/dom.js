/**
 * DOM选择器
 * 兼容ie6+,firefox,chrome,safari,Opera等
 * @author    ouxingzhi / ouxingzhi@vip.qq.com
 */
var __count = 0;
void function (Anole, window, document) {
    var strTrim = Anole.String.trim,
    Type = Anole.Type,
    _Array = Anole.Array;
    Anole.NS('dom').extend((function () {
            var simpExp = /^(?:#(\w+)|\.(\w+)|(\w+|\*))$/i,
            dirExp = /(?:\s|>|\+|~(?!=))/i,
            cssExp = /^(\*|[\w-]+)?(?:#([\w-]+))?(?:\.([\w-]+))?(?:\[([\w-]+)(?:([~\^$*|]?=)['"]?([\w-]+)['"]?)?\])?(?:\:([\w-]+)(?:\(([^\(\)]*)\))?)?$/i;
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
                if (!root.getElementsByTagName)
                    return results;
                if (!selector)
                    return results;
				/*
                var simpMatch = simpExp.exec(selector),
                cols;
                if (simpMatch) {
                    if (simpMatch[1] && root.getElementById) {
                        cols = root.getElementById(simpMatch[1]);
                        results.push(cols);
                        return results;
                    } else if (simpMatch[2] && root.getElementsByClassName) {
                        cols = root.getElementsByClassName(simpMatch[2]);
                        _Array.insert(results, cols);
                        return results;
                    } else if (simpMatch[3]) {
                        cols = root.getElementsByTagName(simpMatch[3]);
                        _Array.insert(results, cols);
                        return results;
                    }
                }
                if (typeof root.querySelectorAll === 'function') {
                    cols = root.querySelectorAll(selector);
                    _Array.insert(results, cols);
                    return results;
                }
				*/
                return unique(select(selector, root, results));
            }
            function select(selector, root, results) {
                var paths = selector.split(',');
                for (var i = 0; i < paths.length; i++) {
                    _Array.insert(results, selectPath(paths[i], root));
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
                return iteratorPath(root, dirs, ops);
            }
            function iteratorPath(parent, dirs, ops) {
                var results = [],
                i;
                if (Type.isArray(parent)) {
                    for (i = 0; i < parent.length; i++) {
                        _Array.insert(results, iteratorPath(parent[i], dirs.slice(0), ops.slice(0)));
                    }
                } else {
                    if (!parent.getElementsByTagName)
                        return results;
                    _Array.insert(results, selectOfDir(parent, dirs, ops));
                }
                return results;
            }
            function selectOfDir(parent, dirs, ops) {
                var op = ops.shift(),
                dir = dirs.shift();

                if (!dir || !op)
                    return [];
                var struct = cssExp.exec(dir);
                parent = PATH[op](parent, op, dir, struct);
                if (!parent || !parent.length)
                    return [];
                if (dirs.length) {
                    return iteratorPath(parent, dirs, ops);
                } else {
                    return parent;
                }
            }

            function getChilds(el, tag) {
                var childs = el.childNodes,
                results = [];
                if (!childs)
                    return results;
                for (var i = 0; i < childs.length; i++) {
                    if (tag) {
                        if (childs[i].nodeType === 1 && childs[i].nodeName === tag)
                            results.push(childs[i]);
                    } else {
                        if (childs[i].nodeType === 1)
                            results.push(childs[i]);
                    }
                }
                return results;
            }
            function childTotal(el, tag) {
                var childs = el.childNodes,
                total = 0;
                if (!childs)
                    return total;
                for (var i = 0; i < childs.length; i++) {
                    if (tag) {
                        if (childs[i].nodeType === 1 && childs[i].nodeName === tag)
                            total++;
                    } else {
                        if (childs[i].nodeType === 1)
                            total++;
                    }
                }
                return total;
            }
            /*
			 * 对数组中的元素去重
			 */
            function unique(arr){
                if(arr.length <=1) return arr;
                var l = [],k={},cur,i,t;
                for(i=0,len=arr.length;i<len;i++){
                    cur = arr[i];
                    for(t=i+1;t<len;t++){
                        if(cur === arr[t] && !k[t]){
                            l.push(t);
                            k[t] = true;
                        }
                    }
                }
                l = l.reverse();
                for(i=0;i<l.length;i++){
                    arr.splice(l[i],1);
                }
                return arr;
            }
            /*
             * 层级关系选择
             */
            var PATH = {
                ' ' : function (parent, op, dir, struct) {
                    var results = [],
                    el,
                    els;
                    if (struct[2] && parent.getElementById) {
                        el = parent.getElementById(struct[2]);
                        if (el && (!struct[1] || struct[1].toLowerCase() === el.nodeName.toLowerCase()))
                            results.push(el);
                    } else if (struct[1]) {
                        els = parent.getElementsByTagName(struct[1]);
                        _Array.insert(results, els);
                    } else {
                        els = parent.getElementsByTagName('*');
                        _Array.insert(results, els);
                    }
                    if (!results.length)
                        return results;
                    for (var i = 1; i < struct.length; i++) {
                        if (struct[i] && FILTER[i] && results && results.length) {
                            results = FILTER[i](struct[i], results, struct, i);
                        }
                    }
                    return results;
                },
                '>' : function (parent, op, dir, struct) {
                    var results = [],
                    childs = parent.childNodes;
                    for (var t = 0; t < childs.length; t++) {
                        if (childs[t].nodeType === 1)
                            results.push(childs[t]);
                    }
                    if (!results.length)
                        return results;
                    for (var i = 1; i < struct.length; i++) {
                        if (struct[i] && FILTER[i] && results && results.length) {
                            results = FILTER[i](struct[i], results, struct, i);
                        }
                    }
                    return results;
                },
                '+' : function (parent, op, dir, struct) {
                    var results = [],
                    nextSibling = parent;
                    while (nextSibling = nextSibling.nextSibling) {
                        if (nextSibling.nodeType === 1){
                            results.push(nextSibling);
                            break;
                        }
                    }
                    
                    if (!results.length)
                        return results;
                    for (var i = 1; i < struct.length; i++) {
                        if (struct[i] && FILTER[i] && results && results.length) {
                            results = FILTER[i](struct[i], results, struct, i);
                        }
                    }
                    return results;
                },
                '~' : function (parent, op, dir, struct) {
                    var results = [],
                    nextSibling = parent,
                    isTagName = function(el){
                        if(!struct[1]) return true;
                        if(struct[1].toLowerCase() !== el.nodeName.toLowerCase()) return false;
                        return true;
                    };
                    while (nextSibling = nextSibling.nextSibling) {
                        if (nextSibling.nodeType === 1 && isTagName(nextSibling)){
                            results.push(nextSibling);
                        }
                    }
                    if (!results.length)
                        return results;
                    for (var i = 1; i < struct.length; i++) {
                        if (struct[i] && FILTER[i] && results && results.length) {
                            results = FILTER[i](struct[i], results, struct, i);
                        }
                    }
                    return results;
                }
            };
            /*
             * 筛选器
             */
            var FILTER = [null,
                //Tag Name
                function (tag, results, struct, t) {
                    var _results = [];
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].nodeName.toLowerCase() === tag.toLowerCase() || (tag === '*' && results[i].nodeType === 1))
                            _results.push(results[i]);
                    }
                    return _results;
                },
                //Id
                function (id, results, struct, t) {
                    var _results = [];
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].id && results[i].id === id)
                            _results.push(results[i]);
                    }
                    return _results;
                },
                //Class
                function (cls, results, struct, t) {
                    var _results = [];
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].className && results[i].className.match(new RegExp('(?:\\s|^)' + cls + '(?:\\s|$)', 'ig')))
                            _results.push(results[i]);
                    }
                    return _results;
                },
                //Attribute
                function (attrName, results, struct, t) {
                    var _results = [],
                    op = struct[t + 1],
                    val = struct[t + 2],
                    domVal,
                    i,
                    t;
					
                    for (i = 0; i < results.length; i++) {
                        domVal = attrName === 'class' ? results[i].className : results[i].getAttribute(attrName);
                        domVal && ATTR[op || ''](domVal, attrName, val) && _results.push(results[i]);
                        __count++;
                    }
                    return _results;
                },
                null,
                null,
                //Pseudo Classes
                function (pseude, results, struct, t) {
                    var _results = [],
                    pseudo = struct[t],
                    val = struct[t + 1],
                    dispose = PSEUDO[pseudo];
                    if (!dispose)
                        return _results;
                    
                    dispose(results, _results, val);
                    return _results;
                }
            ];
            /*
             * 属性选择器
             */
            var ATTR = {
                '' : function (domVal, name, val) {
                    if (domVal !== null) return true;
                    return false;
                },
                '=' : function (domVal, name, val) {
                    if(domVal === val) return true;
                    return false;
                },
                '~=' : function (domVal, name, val) {
                    if ((domVal + '').match(new RegExp('(?:\\s|^)' + val + '(?:\\s|$)', 'ig')))
                        return true;
                    return false;
                },
                '^=' : function (domVal, name, val) {
                    if ((domVal + '').match(new RegExp('^' + val, 'ig')))
                        return true;
                    return false;
                },
                '$=' : function (domVal, name, val) {
                    if ((domVal + '').match(new RegExp(val + '$', 'ig')))
                        return true;
                    return false;
                },
                '*=' : function (domVal, name, val) {
                    if ((domVal + '').indexOf(val) > -1)
                        return true;
                    return false;
                },
                '|=' : function (domVal, name, val) {
                    if ((domVal + '').match(new RegExp('^' + val + '-', 'ig')))
                        return true;
                    return false;
                }
            };
            /*
             * 伪类选择器
             */
            var PSEUDO = {
                'not' : function (results, _results, val) {
                    return results;
                },
                'root' : function (results, _results, val) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] && results[i].nodeName && results[i].nodeName === 'HTML') {
                            _results.push(results[i]);
                        }
                    }
                },
                'first-child' : function (results, _results, val) {
                    var firstChild;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] && results[i].parentNode && (firstChild = results[i].parentNode.firstChild)) {
                            do {
                                if (firstChild.nodeType === 1)
                                    break;
                            } while (firstChild = firstChild.nextSibling);
                            if (firstChild) {
                                _results.push(firstChild);
                            }
                        }
                    }
                },
                'last-child' : function (results, _results, val) {
                    var lastChild;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] && results[i].parentNode && (lastChild = results[i].parentNode.lastChild)) {
                            do {
                                if (lastChild.nodeType === 1)
                                    break;
                            } while (lastChild = lastChild.previousSibling);
                            if (lastChild) {
                                _results.push(lastChild);
                            }
                        }
                    }
                },
                'only-child' : function (results, _results, val) {
                    var total = 0;
                    for (var i = 0; i < results.length; i++) {
                        total = childTotal(results[i].parentNode);
                        if (total === 1)
                            _results.push(results[i]);
                    }
                },
                'nth-child' : function (results, _results, val) {
                    var childs;
                    val = parseInt(val);
                    if (isNaN(val))
                        return;
                    val--;
                    for (var i = 0; i < results.length; i++) {
                        childs = getChilds(results[i].parentNode);
                        if (childs && childs[val]) {
                            _results.push(childs[val]);
                        }
                    }
                },
                'nth-last-child' : function (results, _results, val) {
                    var childs;
                    val = parseInt(val);
                    if (isNaN(val))
                        return;
                    val--;
                    for (var i = 0; i < results.length; i++) {
                        childs = getChilds(results[i].parentNode);
                        var pos = childs && (Math.max(childs.length - 1, 0) - val);

                        if (childs && pos >= 0 && childs[pos]) {
                            _results.push(childs[pos]);
                        }
                    }
                },
                'first-of-type' : function (results, _results, val) {
                    var brothers;
                    for (var i = 0; i < results.length; i++) {
                        brothers = results[i] && results[i].parentNode.childNodes;
                        if (brothers) {
                            for (var t = 0; t < brothers.length; t++) {
                                if (brothers[t].nodeType === 1 && brothers[t].nodeName === results[i].nodeName) {
                                    _results.push(brothers[t]);
                                    return;
                                }
                            }
                        }
                    }
                },
                'last-of-type' : function (results, _results, val) {
                    var brothers;
                    for (var i = 0; i < results.length; i++) {
                        brothers = results[i] && results[i].parentNode.childNodes;
                        if (brothers) {
                            for (var t = Math.max(brothers.length - 1, 0); t >= 0; t--) {
                                if (brothers[t].nodeType === 1 && brothers[t].nodeName === results[i].nodeName) {
                                    _results.push(brothers[t]);
                                    return;
                                }
                            }
                        }
                    }
                },
                'only-of-type' : function (results, _results, val) {
                    var total;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] && results[i].parentNode && results[i].parentNode.childNodes) {
                            total = childTotal(results[i].parentNode.childNodes, results[i].nodeName);
                            if (total === 1) {
                                _results.push(results[i]);
                            }
                        }
                    }
                },
                'nth-of-type' : function (results, _results, val) {
                    var brothers,
                    val = parseInt(val);
                    if (isNaN(val))
                        return;
                    val--;
                    for (var i = 0; i < results.length; i++) {
                        brothers = getChilds(results[i].parentNode, results[i].nodeName);
                        if (brothers && brothers.length && brothers[val]) {
                            _results.push(brothers[val]);
                        }
                    }
                },
                'nth-last-of-type' : function (results, _results, val) {
                    var brothers,
                    val = parseInt(val),
                    pos;
                    if (isNaN(val))
                        return;
                    val--;
                    for (var i = 0; i < results.length; i++) {
                        brothers = getChilds(results[i].parentNode, results[i].nodeName);
                        pos = brothers && Math.max(brothers.length - 1, 0) - val;
                        if (brothers && pos >= 0 && brothers.length && brothers[pos]) {
                            _results.push(brothers[pos]);
                        }
                    }
                },
                'empty' : function (results, _results, val) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] && results[i].nodeType === 1 && isEmpty(results[i])) {
                            _results.push(results[i]);
                        }
                    }
                },
                'checked' : function (results, _results, val) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] && results[i].nodeType === 1 && results[i].nodeName === 'INPUT' && results[i].checked) {
                            _results.push(results[i]);
                        }
                    }
                },
                'enabled' : function (results, _results, val) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] && results[i].nodeType === 1 && results[i].nodeName.match(/^(?:input|button|select|option)$/i) && !results[i].disabled) {
                            _results.push(results[i]);
                        }
                    }
                },
                'disabled' : function (results, _results, val) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] && results[i].nodeType === 1 && results[i].nodeName.match(/^(?:input|button|select|option)$/i) && results[i].disabled) {
                            _results.push(results[i]);
                        }
                    }
                },
                'target' : function (results, _results, val) {
                    var hash = location.hash.replace('#', '');
                    if (hash.length) {
                        for (var i = 0; i < results.length; i++) {
                            if (results[i] && results[i].nodeType === 1 && results[i].id === hash) {
                                _results.push(results[i]);
                            }
                        }
                    }
                }
            };
			function isEmpty(node){
				var childNodes,i,reg = /[^\s]/;
				if(!node || !(childNodes = node.childNodes)) return false;
				for(i=0;i<childNodes.length;i++){
					if(childNodes[i].nodeType === 1 || childNodes[i].nodeType === 4 || childNodes[i].nodeType === 8 || (childNodes[i].nodeType === 3 && childNodes[i].data.match(reg))) return false;
				}
				return true;
			}
            return {
                query : query
            }
        })());
}
(Anole, window, document);
