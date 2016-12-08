/*
 * 作者 : ihanyu
 * QQ  : 1016053132
 */
var HTML2JSON=require('html2json');
var CONFIG=require('../conf/config');
var _CONFIG={};
var Fun=function(){};
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
//读取localstorage
Fun.cache=function(key,value){
    if(arguments.length>2){
        throw new Error('错误的参数');
    }
    if(arguments.length==1){
        return wx.getStorageSync(key);
    }else{
        wx.setStorageSync(key,value);
        return wx.getStorageSync(key);
    }
}
//封装get方法(获取get提交的数据)
Fun.get=function(key,e){
    return e[key]||'';
}
//封装post方法(获取post提交的数据)
Fun.post=function(key,e){
    return e['detail']['value'][key] || '';
}
//封装request方法(首先获取post参数，其次获取get参数)
Fun.request=function(key,e){
    if(e.hasOwnProperty('detail')){
        return e['detail']['value'][key] || '';
    }else{
        return e[key]||'';
    }
}
//封装data方法(获取data-xxx)
Fun.data=function(key,e){
    return e['currentTarget']['dataset'][key]||'';
}
//封装isEmpty方法
Fun.isEmpty=function(obj){
    let str=Object.prototype.toString.call(obj).toLowerCase();
    str=str.replace('[','');
    str=str.replace(']','');
    var arr=str.split(' ');
    if(arr[1]=='object'){
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
    let r=/\s+(?=<)/g;
    html=html.replace(r,'');
    let newHtml=HTML2JSON.html2json(html);
    return newHtml;
}
//json转html
Fun.json2html=function(json){
    return HTML2JSON.json2html(json);
}
//非构造函数继承（浅拷贝、深拷贝），默认为浅拷贝
Fun.mixin=function(obj,flag=false){
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
module.exports = Fun;