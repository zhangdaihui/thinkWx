var Tools=function(){};
/**
 * 返回文件后缀
 * @param  {Object} file 
 * @return {String}      
 */
Tools.getFilenameExt=function(file) {
	const types = file.name.split('.');
	return types[types.length - 1];
}

/**
 * 返回指定范围内的一个整数
 * @param  {Number} min 
 * @param  {Number} max 
 * @return {String}      
 */
Tools.rand=function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 生成字符串组合
 * @param  {Number} size 
 * @return {String}      
 */
Tools.randString=function(size) {
	let result = ''
	let allChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	size = size || 1;
	while (size--) {
		result += allChar.charAt(this.rand(0, allChar.length - 1));
	}
	return result;
}

/**
 * 生成文件名
 * @param  {Object} file 
 * @return {String}      
 */
Tools.randFilename=function(file) {
	return this.randString(this.rand(10, 100)) + Date.parse(new Date()) + '.' + this.getFilenameExt(file);
}

/**
 * 判断某个元素是否为字符串
 * @param  {String}  value 
 * @return {Boolean}       
 */
Tools.isString=function(value) {
	return typeof value === 'string';
}

/**
 * 判断某个元素是否为函数
 * @param  {Function}  value 
 * @return {Boolean}     
 */
Tools.isFunction=function(value) {
	return this.type(value) === 'function';
}

/**
 * 判断某个元素是否为数组
 * @param  {Array}  value 
 * @return {Boolean}       
 */
Tools.isArray=function(value) {
	return Array.isArray(value);
}

/**
 * 判断某个元素是否为对象
 * @param  {Obejct}  value 
 * @return {Boolean}       
 */
Tools.isObject=function(value) {
	return value !== null && typeof value === 'object';
}

/**
 * 判断某个元素是否为数值
 * @param  {Number}  value 
 * @return {Boolean}       
 */
Tools.isNumber=function(value) {
	return typeof value === 'number';
}

/**
 * 判断某个元素是否为日期
 * @param  {Date}  value 
 * @return {Boolean}       
 */
Tools.isDate=function(value) {
	return this.type(value) === '[object Date]';
}

/**
 * 判断某个元素是否为正则表达式
 * @param  {RegExp}  value 
 * @return {Boolean}       
 */
Tools.isRegExp=function(value) {
	return this.type(value) === '[object RegExp]';
}

/**
 * 判断某个元素是否为File对象
 * @param  {Object}  obj 
 * @return {Boolean}     
 */
Tools.isFile=function(obj) {
	return this.type(obj) === '[object File]';
}

/**
 * 判断某个元素是否为FormData对象
 * @param  {Object}  obj 
 * @return {Boolean}     
 */
Tools.isFormData=function(obj) {
	return this.type(obj) === '[object FormData]';
}

/**
 * 判断某个元素是否为Blob对象
 * @param  {Object}  obj 
 * @return {Boolean}     
 */
Tools.isBlob=function(obj) {
	return this.type(obj) === '[object Blob]';
}

/**
 * 判断某个元素是否为布尔值
 * @param  {boolean}  value 
 * @return {Boolean}       
 */
Tools.isBoolean=function(value) {
	return typeof value === 'boolean';
}

/**
 * 判断某个元素是否为Promise对象
 * @param  {Function}  obj 
 * @return {Boolean}     
 */
Tools.isPromiseLike=function(obj) {
	return obj && this.isFunction(obj.then);
}

/**
 * 判断数组类型
 * @param  {Array}  value 
 * @return {Boolean}       
 */
Tools.isTypedArray=function(value) {
	const TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/;
	return value && this.isNumber(value.length) && TYPED_ARRAY_REGEXP.test(this.type(value));
}

/**
 * 判断某个元素是否为ArrayBuffer对象
 * @param  {Object}  obj 
 * @return {Boolean}     
 */
Tools.isArrayBuffer=function(obj) {
	return this.type(obj) === '[object ArrayBuffer]';
}

/**
 * 判断某个元素是否为defined
 * @param  {undefined}  value 
 * @return {Boolean}       
 */
Tools.isDefined=function(value) {
	return typeof value !== 'undefined';
}

/**
 * 判断某个元素是否为undefined
 * @param  {undefined}  value 
 * @return {Boolean}       
 */
Tools.isUndefined=function(value) {
	return typeof value === 'undefined';
}

/**
 * 判断某个元素是否为null
 * @param  {Null}  value 
 * @return {Boolean}       
 */
Tools.isNull=function(value) {
	return value === null;
}

/**
 * 判断某个元素是否为有限数
 * @param  {Number}  value 
 * @return {Boolean}       
 */
Tools.isFinite=function(value) {
	return typeof value == 'number' && isFinite(value);
}

/**
 * 判断某个元素是否为自然数
 * @param  {Number}  value 
 * @return {Boolean}       
 */
Tools.isNaN=function(value) {
	return this.isNumber(value) && value != +value;
}

Tools.isError=function(value) {
	return this.type(value) === '[object Error]';
}

/**
 * 删除字符串左右两端的空格
 * @param  {String} str 
 * @return {String}     
 */
Tools.trim=function(str) {
	return this.isString(str) ? str.trim() : str;
}

/**
 * 字符串转义
 * @param  {String} str 
 * @return {String}     
 */
Tools.escapeForRegexp=function(str) {
	return str.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
}

/**
 * 字符串转对象
 * @param  {String} str 'key1,key2,...'
 * @return {Object} in the form of {key1:true, key2:true, ...}    
 */
Tools.makeMap=function(str) {
	let obj = {}, items = str.split(',');
	for (let i = 0; i < items.length; i++) {
		obj[items[i]] = !0;
	}
	return obj;
}

/**
 * 判断数组中是否含有指定元素
 * @param  {Array} arr 
 * @param  {Objext} obj 
 * @return {Array}     
 */
Tools.includes=function(arr, obj) {
	return Array.prototype.indexOf.call(arr, obj) != -1;
}

/**
 * 数组删除指定的元素，并返回元素的索引值
 * @param  {Array} array 
 * @param  {String} value 
 * @return {Number}       
 */
Tools.arrayRemove=function(array, value) {
	let index = array.indexOf(value);
	if (index >= 0) {
		array.splice(index, 1);
	}
	return index;
}

/**
 * 日期增加分钟
 * @param  {Date} date    
 * @param  {Number} minutes 
 * @return {Date}
 */
Tools.addDateMinutes=function(date, minutes) {
	date = new Date(date.getTime());
	date.setMinutes(date.getMinutes() + minutes || 0);
	return date;
}

/**
 * 对象解析出JSON字符串
 * @param  {Object} obj    
 * @param  {Number} pretty 
 * @return {Object}        
 */
Tools.toJson=function(obj, pretty) {
	if (this.isUndefined(obj)) return undefined;
	if (!this.isNumber(pretty)) {
		pretty = pretty ? 2 : null;
	}
	return JSON.stringify(obj, null, pretty);
}

/**
 * JSON字符串解析成对象
 * @param  {String} json 
 * @return {Object}      
 */
Tools.fromJson=function(json) {
	return this.isString(json) ? JSON.parse(json) : json
}

/**
 * 扩展对象
 * @return {Object}
 */
Tools.extend=function() {
	let src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = !1;

	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[i] || {};
		i++;
	}

	if (typeof target !== 'object' && !this.isFunction(target)) {
		target = {};
	}

	if (i === length) {
		target = this;
		i--;
	}

	for (; i < length; i++) {
		if ((options = arguments[i]) != null) {
			for (name in options) {
				src = target[name];
				copy = options[name];

				if (target === copy) {
					continue;
				}

				if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = !1;
						clone = src && this.isArray(src) ? src : [];
					} else {
						clone = src && this.isPlainObject(src) ? src : {};
					}
					target[name] = this.extend(deep, clone, copy)
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}
	return target;
}

/**
 * 判断传入的参数是否为纯粹的对象，即直接量{}或new Object()创建的对象
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
Tools.isPlainObject=function(obj) {
	let getProto = Object.getPrototypeOf;
	let class2type = {};
	let toString = class2type.toString;
	let hasOwn = class2type.hasOwnProperty;
	let fnToString = hasOwn.toString;
	let ObjectFunctionString = fnToString.call(Object);
	let proto, Ctor
	if (!obj || this.type(obj) !== '[object Object]') {
		return !1;
	}
	proto = getProto(obj)
	if (!proto) {
		return !0;
	}
	Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
	return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
}

/**
 * 判断对象是否为空
 * @param  {Object}  obj 
 * @return {Boolean}     
 */
/*
Tools.isEmptyObject=function(obj) {
	for (let i in obj)
		return !1
	return !0
}
*/
Tools.isEmpty=function(obj){
    if(arguments.length>1){
        throw new Error('错误的参数');
    }
    let str=Object.prototype.toString.call(obj).toLowerCase().slice(8,-1);
    if(str==='object'){
        for(var name in obj){
            if(obj.hasOwnProperty(name)){
                return false;
            }
        }
        return true;
    }else{
        return obj?false:true;
    }
}

/**
 * 判断对象的类型
 * @param  {Object} obj 
 * @return {String}     
 */
Tools.type=function(obj) {
	const toString = Object.prototype.toString;

	if (obj == null) {
		return obj + '';
	}

	return typeof obj === 'object' || typeof obj === 'function' ? toString.call(obj) || 'object' : typeof obj;
}

/**
 * 合并对象并返回一个新的对象，目标对象自身也会改变
 * @param  {Array} args 
 * @return {Object}     
 */
Tools.merge=function(...args) {
	return Object.assign(...args);
}

/**
 * 拷贝对象并返回一个新的对象
 * @param  {Object} obj 
 * @return {Object}     
 */
Tools.clone=function(obj) {
	if (typeof obj !== 'object' || !obj) {
		return obj;
	}
	let copy = {};
	for (let attr in obj) {
		if (obj.hasOwnProperty(attr)) {
			copy[attr] = obj[attr];
		}
	}
	return copy;
}

/**
 * 删除对象上的指定属性并返回一个新的对象
 * @param  {Object} obj  
 * @param  {Array} keys 
 * @return {[type]}      
 */
Tools.omit=function(obj, keys) {
	let o = this.clone(obj)
	keys.forEach(key => {
		delete o[key]
	})
	return o;
}

/**
 * 返回一个新数组，数组中的元素为指定属性的值
 * @param  {Array} arr 
 * @param  {String} key 
 * @return {Array}     
 */
Tools.pluck=function(arr, key) {
	if (typeof arr !== 'object' || arr.length === 0) {
		return [];
	}
	if (!key) {
		return arr;
	}
	return arr.map(a => a[key]);
}

/**
 * 返回序列化的值
 * @param  {String} value 
 * @return {String} 
 */
Tools.serializeValue=function(value) {
	if (this.isObject(value)) return this.isDate(value) ? value.toISOString() : this.toJson(value)
	return value;
}

/**
 * 编码URI
 * @param  {String} value 
 * @param  {String} pctEncodeSpaces 
 * @return {String} 
 */
Tools.encodeUriQuery=function(value, pctEncodeSpaces) {
	return encodeURIComponent(value)
		.replace(/%40/gi, '@')
		.replace(/%3A/gi, ':')
		.replace(/%24/g, '$')
		.replace(/%2C/gi, ',')
		.replace(/%3B/gi, ';')
		.replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
}

/**
 * 对象序列化
 * @param  {Object} obj 
 * @return {String} 
 */
Tools.paramSerializer=function(obj) {
	if (!obj) return ''
	let that = this
	let parts = []
	for (let key in obj) {
		const value = obj[key]
		if (value === null || that.isUndefined(value)) return
		if (that.isArray(value)) {
			value.forEach(function (v) {
				parts.push(that.encodeUriQuery(key) + '=' + that.encodeUriQuery(that.serializeValue(v)))
			})
		} else {
			parts.push(that.encodeUriQuery(key) + '=' + that.encodeUriQuery(that.serializeValue(value)))
		}
	}
	return parts.join('&');
}

/**
 * 拼接URL
 * @param  {String} obj 
 * @param  {Object} obj 
 * @return {String} 
 */
Tools.buildUrl=function(url, obj) {
	const serializedParams = this.paramSerializer(obj)
	if (serializedParams.length > 0) {
		url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
	}
	return url;
}
/**
 * 手机号码检测
 */
Tools.checkPhone=function(num) {
	var chk = /^1[34578]\d{9}$/;
	return chk.test(num);
}
module.exports = Tools;