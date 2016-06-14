# formCheckMessagePlugin
This is form validate Plugin for Jquery. It's use the safetou.com for 3.0 version


 * Created by Administrator on 2016/6/7.
 * version:Beta v0.3
 * author: Mad Hu
 * Change by hu on 2016/6/14
 * desc:

 简单使用：使用的时候，添加下边得属性即可
```javascript
$(function(){
        //插入模式，开始显示提示信息
        $('#username').STInputCheckMsg({
            'msg': "充值金额不能为空！",
            'regex':/^(?=.*\S+)((?!必填).)*$/,
            'left':65,
            'insert':true,
            'firstExist':true
        });
        //浮动模式（默认），开始不显示信息
        $('#money1').STInputCheckMsg({
            'msg': "充值金额不能为空！",
            'regex':/^(?=.*\S+)((?!必填).)*$/,
            'firstExist':false
        });

        ///由于标签是自己定义的，这种方式很多属性不能被使用。
        $('#money2').STInputCheckMsg({
            'msg': "充值金额不能为空！",
            'regex':/^(?=.*\S+)((?!必填).)*$/,
            'signExist':true,
        });
    });

```
 *  msg（必选）:验证需要显示得错误提示信息
 *  msgType（可选 默认error）: error or success 需要显示的是成功的，还是失败的样式
 *  insert（可选 默认false）：提示信息是插入到内容中，还是浮动到内容中，插入的话有一个向下挤的动作，浮动的话，会浮动到input标签下边  false浮动  true插入，默认false
 *  regex(可选 默认验证数字)：input中需要验证的正则表达式。
 *  addClassName(可选 默认空)：为提示信息添加额外的样式文件
 *  left(可选 默认0)：选择浮动操作时，可能提示信息的位置不正确，用left调整提示信息的位置
 *  URL（可选 默认空）：当input中的内容需要提交后台进行验证操作时候，例如注册需要验证手机号码是否已经被注册。添加提交后台得url，只支持post请求
 *  params(可选 默认 空json):input提交后台验证的同时，需要添加额外的json参数列表，
 *  firstExist(可选 默认 false):提示信息当页面第一次显示得时候是否显示。默认false提示信息不显示.true第一次进入页面就显示提示信息
 *  signExist(可选 默认 false)： 自定义提示信息位置。正常的操作是提示信息用js插入input后，这种方式是提示信息手动添加到自己想要的位置以后，进行操作。true，将根据input的id+msg，查找对应的提示标签位置。进行显示提示信息操作。其中left addclassName,insert,msgType将失效
 
## Demo使用
如果需要构建项目，则需要安装nodejs ruby 等前端开发框架。
```
npm install
gulp
```
dest产出目录、src生产目录结构简单，简单使用直接复制main.min.js即可，不需要安装额外的东西。