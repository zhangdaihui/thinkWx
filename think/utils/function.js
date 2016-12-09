/*
 * 作者 : ihanyu
 * QQ  : 1016053132
 */
var HTML2JSON=require('../think-modules/html2json');
var Promise=require('../think-modules/bluebird');
var CONFIG=require('../conf/config');
var _CONFIG={};
var Fun=function(){};
var THINK=Fun;
//读取config配置文件，因为不支持eval函数，最多支持二级查找，不支持多级
Fun.config=function(key,value){
    if(arguments.length>2){
        throw new Error('错误的参数');
    }
    if(arguments.length==1){
        if(key.indexOf('.')<0){
            if(_CONFIG[key]){
                return _CONFIG[key];
            }else{
                return CONFIG[key]||'';
            }
        }else{
            let arr=key.split('.');
            if(arr.length>2){
                throw new Error('错误的参数');
            }
            return CONFIG[arr[0]][arr[1]]||'';
        }
    }else{
        _CONFIG[key]=value;
    }
}
//Localstorage相关
    //异步读取、设置localstorage
    Fun.cache=function(key,value){
        if(arguments.length==1){
            return Fun.getStorage(key,false);
        }else{
            return Fun.setStorage(key,value,false);
        }
    }
    //同步读取、设置localstorage
    Fun.cacheSync=function(key,value){
        if(arguments.length==1){
            return Fun.getStorage(key,true);
        }else{
            return Fun.setStorage(key,value,true);
        }
    }
//封装params方法(首先获取post参数，其次获取get参数，最后获取data-参数)
Fun.params=function(key,e,type='post'){
    if(arguments.length>3){
        throw new Error('错误的参数');
    }
    switch(type){
        case 'post':
            if(e.hasOwnProperty('detail')){
                return e['detail']['value'][key] || '';
            }
            break;
        case 'get' :
            if(e.hasOwnProperty('key')){
                return e[key]||'';
            }
            break;
        case 'data':
            if(e.hasOwnProperty('currentTarget')){
                return e['currentTarget']['dataset'][key]||'';
            }
            break;        
    }
    return '';
}
//封装isEmpty方法(判断是否为空)
Fun.isEmpty=function(obj){
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
//html转json(已过滤标签外的空格)
Fun.html2json=function(html){
    if(arguments.length>1){
        throw new Error('错误的参数');
    }
    let r=/\s+(?=<)/g;
    html=html.replace(r,'');
    let newHtml=HTML2JSON.html2json(html);
    return newHtml;
}
//json转html
Fun.json2html=function(json){
    if(arguments.length>1){
        throw new Error('错误的参数');
    }
    return HTML2JSON.json2html(json);
}
//非构造函数继承（浅拷贝、深拷贝），默认为浅拷贝
Fun.mixin=function(obj,flag=false){
    if(arguments.length>2){
        throw new Error('错误的参数');
    }
    //浅拷贝
    if(!flag){
        let result={};
        for(var key in obj){
            result[key]=obj[key];
        }
        return result;
    }else{
        let result=null;
        (function(){
            let type=Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
            switch(type){
                case 'object':
                    result={};
                    break;
                case 'array':
                    result=[];
                    break;  
                default:
                    return obj;      
            }
        })();
        for(var key in obj){
            result[key]=(typeof obj[key]).toLowerCase()==='object'?arguments.callee(obj[key]):obj[key];
        }
        return result;
    }
}
/*************************************************************************************************/
//对原有的wx对象进行Promise封装
//返回Promise对象
Fun.promise=function(fn){
    if(arguments.length>1){
        throw new Error('错误的参数');
    }
    return function (obj = {}) {    
        return new Promise((resolve, reject) => {      
            obj.success = function (res) {        
                resolve(res);      
            }      
            obj.fail = function (res) {        
                reject(res);      
            }      
            fn(obj);    
        })  
    }
}
//封装wx.getStorage方法 默认同步获取 flag: true->同步 false->异步
Fun.getStorage=function(key,flag=true){
    //异步
    if(!flag){
        let myRequest=Fun.promise(wx.getStorage);
        return myRequest({
            key: key
        });
    //同步
    }else{
        return wx.getStorageSync(key);
    }
    return '';
}
//封装wx.setStorage 默认同步设置 flag: true->同步 false->异步
Fun.setStorage=function(key,value,flag=true){
    //异步
    if(!flag){
        let myRequest=Fun.promise(wx.setStorage);
        return myRequest({
            key: key,
            data:value
        });
    //同步
    }else{
        wx.setStorageSync(key,value);
        return wx.getStorageSync(key);
    }
    return '';
}
//封装wx.request方法 返回Promise对象
Fun.request=function(options){
    let myRequest=Fun.promise(wx.request);
    let {url,method,data}=options;
    return myRequest({
        url: url,
        method: method.toUpperCase()||'GET',
        data:data
    });
}
module.exports = Fun;