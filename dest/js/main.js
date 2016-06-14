/**
 * Created by Administrator on 2016/6/7.
 * version:Beta v0.3
 * author: Mad Hu
 * Change by hu on 2016/6/13
 * github:https://github.com/Mad-hu/formCheckMessagePlugin
 * desc:
 * 简单使用：使用的时候，添加下边得属性即可
 $(function(){
	//验证金额非空
	 $('#money').STInputCheckMsg({
	        'msg': "充值金额不能为空！",
	        'regex':/^(?=.*\S+)((?!必填).)*$/,
	    });
});
 *
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
 */
;(function($, window, document,undefined) {
    //定义Beautifier的构造函数
    var Drawing = function(ele, opt) {
        this.$element = ele,
            this.defaults = {
                'msg': '',
                'msgType': 'error',
                'insert': false,
                'regex':/^[0-9]{1,20}$/,
                'addClassName':"",
                'left':0,
                'URL':'',
                'params':{},
                'firstExist':false,
                'signExist':false,
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Drawing.prototype = {
        beautify: function() {
            var opt = this.options;

            var msg = opt.msg;               //正则校验提示信息 ""
            var msgType = opt.msgType;       //正则校验提示类型 error success
            var insertMod = opt.insert;       //插入浮动 true false
            var addClassName = opt.addClassName; //添加额外样式 ""
            var leftPosition = opt.left;        //左边调整
            var regex = opt.regex;            //前台验证的正则表达式
            var url = opt.URL;                 //提交到后台得地址
            var params = opt.params;          //提交后台需要传入的参数
            var firstExist = opt.firstExist? "inline":"none"; //初始是否显示提示标签，用与刚开始不显示和刚开始显示提示信息开关
            var signExist = opt.signExist; //用于自定义提示标签，提示标签是否已经存在，true提示标签已经存在，不再创建。提示标签可以写在任意的地方，但是id必须和要验证的input的id相同例如：input id 为userNameID ,提示标签的id必须为userNameIDmsg,这样才能匹配验证

            var objInput =this.$element[0];  //当前input标签

            var inputHeight = $(objInput).height();
            var offsetLeft = $(objInput).offset().left;  // input标签相对与文档左边距离
            var offsetTop = $(objInput).offset().top;    // input标签相对于文档上边距离


            ///存储msg的颜色，根据type类型 错误红色，警告黄色，成功绿色
            var msgColor = "";
            //存储msg的图片路径，图片分为 错误，警告，成功 以后可能用iconfont代替，这里暂时用一个错误的
            var msgImgIcon = "";

            var successImg = "&#xe64c;"   //成功的iconfont
            var warnningImg = "&#xe613;"  //警告的iconfont
            var errorImg = "&#xe60e;"     //错误的iconfont

            var errorColor = '#fe4850'    //错误的颜色
            var warnningColor = 'orange'  //警告的颜色
            var successColor = '#84c84d'  //成功的颜色


            ///支持错误的信息显示，警告和成功的暂时不支持
            switch(msgType){
                case 'error':msgColor = errorColor;msgImgIcon = errorImg;break;
                case 'warnning':msgColor = warnningColor;msgImgIcon = warnningImg;break;
                case 'success':msgColor = successColor;msgImgIcon = successImg;break;
            }
            var insertHTML = "";

            if(!signExist){
                var iconHtml = "<i class=\"iconfont icon\" style=\"display:" + firstExist +";font-size:16px; color: " + msgColor + "\">" + msgImgIcon + "</i>";
                var spanHtml = "<span style=\"color:" + msgColor + ";float:none;font-size: 14px;margin-left: 5px;line-height: 25px;display: " + firstExist+ ";width: auto;\">" + msg +"</span>";
                var contentHtml = iconHtml + spanHtml;

                if(insertMod) {
                    ///直接往下挤的
                    console.log("往下挤1");
                    insertHTML = "<div class=\"tishi_new_1 " + addClassName + "\" style=\"margin-left:" + leftPosition + "px\" id='" + $(objInput)[0].id + "msg" + "' datatype='" + msgType + "'>" + contentHtml + "</div>";
                }else{
                    ///需要定位的
                    var leftOffsetDiv =  leftPosition + offsetLeft; //自定义据左  +  input标签现有据左位置 为提示标记浮动的绝对定位左边位置
                    var topOffsetDiv =  offsetTop + inputHeight + 3;    //input标签据上位置 + input的高度  为标记浮动上边位置
                    insertHTML = "<div class=\"tishi_new " + addClassName + "\" style=\"top: " + topOffsetDiv + "px;left:" + leftOffsetDiv + "px\" id='" + $(objInput)[0].id + "msg" + "' datatype='" + msgType + "'>" + contentHtml + "</div>";
                }
            }

            $(objInput).after(insertHTML);
            function datatypeChange(signText){
                ///改变最外层失败和成功的标志
                $("#" + $(objInput)[0].id + "msg").attr("datatype",signText);
            }
            ///当input被改变的时候触发
            $(objInput).change(function(){
                ///获取input 提示信息中所有的子元素
                var childsNode = $("#" + $(objInput)[0].id + "msg").children();

                ///正则前台判断
                if(regex.test(""+this.value+"")){
                    ///后台验证
                    if(url != ""){
                        params[this.name] = this.value;
                        $.post(url,params, function(data) {
                            var code = data["code"];
                            var msgCode = data["message"];
                            //请求code为200成功  其他为不成功
                            if(code == 200){
                                //设置成功标志
                                datatypeChange("success");

                                childsNode.first().css("color",successColor).css("display","inline").html(successImg);
                                childsNode.last().css("color",successColor).css("display","inline").text("验证通过");
                            }else{
                                ///验证失败就替换为错误的X号显示。默认的
                                datatypeChange("error");

                                childsNode.first().css("color",errorColor).css("display","inline").html(errorImg);
                                childsNode.last().css("color",errorColor).css("display","inline").text(msgCode);
                            }
                        }).error(function(data) {
                            ///验证失败就替换为错误的X号显示。默认的
                            datatypeChange("error");
                            childsNode.first().css("color",errorColor).css("display","inline").html(errorImg);
                            childsNode.last().css("color",errorColor).css("display","inline").text("服务器无响应");
                        })
                    }else{
                        ///验证成功，就替换为成功的对号显示
                        datatypeChange("success");
                        childsNode.first().css("color",successColor).css("display","inline").html(successImg);
                        childsNode.last().css("color",successColor).css("display","inline").text("验证通过");
                    }

                }else{
                    ///验证失败就替换为错误的X号显示。默认的
                    datatypeChange("error");
                    childsNode.first().css("color",errorColor).css("display","inline").html(errorImg);
                    childsNode.last().css("color",errorColor).css("display","inline").text(msgCode);
                }
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.STInputCheckMsg = function(options) {
        //创建Beautifier的实体
        var drawing = new Drawing(this, options);
        //调用其方法
        return drawing.beautify();
    }
})(jQuery, window, document);


