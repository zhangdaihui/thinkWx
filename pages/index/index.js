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
    userInfo: {}
  },
  onLoad:function(){
    let aa='123456';
    console.log(THINK.md5.hex_md5(aa));
    let text=`
      <h2 class="title">新增函数</h2>
      <ul>
          <li>THINK.config<span class="fr">//读取、设置配置文件</span></li>
          <li>THINK.cache/cacheSync<span>//读取、设置本地缓存</span></li>
          <li>THINK.params<span>//读取post、get、data-参数</span></li>
          <li>THINK.html2json/json2html<span>//html《=》json</span></li>
          <li>THINK.mixin<span>//非构造函数继承</span></li>
          <li>THINK.promise<span>//返回Promise对象</span></li>
          <li>THINK.xxx<span>//新增部分工具函数</span></li>
      </ul>
      <h2 class="title">Promise封装函数</h2>
      <ul>
          <li>THINK.request</li>
          <li>THINK.getStorage<span>//支持同步、异步</span></li>
          <li>THINK.setStorage<span>//支持同步、异步</span></li>
      </ul>
      <h2 class="title">模板相关</h2>
      <ul>
          <li>
              <h3>支持html格式输出</h3>
          </li>
      </ul>
    `;
    this.setData({
      text:THINK.html2json(text)
    });
    THINK.cache('name').then(res=>{
      console.log(res);
    });
  }
})
