/*
 * 作者：ihanyu
 * QQ:  1016053132
 */
//获取应用实例    
var app = getApp();
var THINK=app.think();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    array:[
      {name:'zhangdaihui',age:30},
      {name:'zhanghanyu',age:2}
    ]
  },
  onLoad:function(){
    let text=`
      <h2 class="title">函数相关</h2>
      <ul>
          <li>1.THINK.config<span class="fr">//读取、设置配置文件</span></li>
          <li>2.THINK.cache<span>//读取、设置本地缓存</span></li>
          <li>3.THINK.get<span>//读取get参数</span></li>
          <li>4.THINK.post<span>//读取post参数</span></li>
          <li>5.THINK.request<span>//读取post参数或get参数，post优先</span></li>
          <li>6.THINK.data<span>//读取data-参数</span></li>
          <li>7.THINK.isEmpty<span>//检查是否为空</span></li>
          <li>8.THINK.html2json<span>//html转成json</span></li>
          <li>9.THINK.json2html<span>//json转成html</span></li>
          <li>10.THINK.mixin<span>//非构造函数继承</span></li>
      </ul>
      <h2 class="title">模板相关</h2>
      <ul>
          <li>
              <h3>1.支持html格式输出</h3>
          </li>
      </ul>
    `;
    this.setData({
      text:THINK.html2json(text)
    });
  }
})
