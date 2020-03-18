//把success蓝色标签去掉，注意对应的各种pwdArr[2]等可能顺序也要变
$(document).ready(function () {
    $username = $('#username'),
    $tel = $('#tel'),
    $pwd = $('#pwd'),
    $code = $('#code');
    //获取各个输入框的input标签对象
    var username = $username.children(),
        tel = $tel.children(),
        pwd = $pwd.children(),
        code = $code.children();
    $userinput = $(username[1])
    $telinput = $(tel[1])
    $pwdinput = $(pwd[1])
    $button = $(code[2])
//用户名input获得和失去焦点事件------------------------------------------------------------------------------
    $userinput.focus(function () {
        $(username[3]).css("display", "block");//黑色提示
    })
    $userinput.blur(function () {
        $(username[3]).css("display", "none");//失去焦点黑色框消失
        var usertest = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
        if (count() == 0) {//红色提示用户名不能为空
            $(username[4]).css("display", "block");
        } else if (count() > 14) {//红色提示用户名太长
            $(username[5]).css("display", "block");
        } else if (usertest.test($userinput.val()) == 0) {//红色警示不显示
            $(username[2]).css("display", "block");
        }
    })
    //用户名字段验证，检测用户名字节数，14个字母或者是7个汉字
    //使用strlen来判断长度:一个汉字认为长度是3个字符(utf-8编码情况下一个汉字3个字符,gbk编码就是2个字符长度)
    function count(){
        var str = $userinput.val();
        var strArr = [];
        strArr = str.split("");//如果把空字符串 ("") 用作separator，那么stringObject 中的每个字符之间都会被分割
        var sum = 0;
        var a = new TextEncoder("utf-8");//这是定义一个utf-8编码的一个对象
        for(var i=0;i<strArr.length;i++){
            if(a.encode(strArr[i]).length === 3){//encode是检测每个字符占了几个字节,判断是否是汉字，若是,字节数+2
                sum+=2;                                         
            }else if(a.encode(strArr[i]).length === 1){
                sum+=1;
            }     
        }
        return sum;//输出sum总字节数
    }
// 手机号---------------------------------------------------------------------------------------
    $telinput.focus(function () {
        $(tel[2]).css("display", "none");//手机号码格式不正确隱藏
    })
    $telinput.blur(function () {
        var teltest = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (teltest.test($telinput.val()) == 0) {
            $(tel[2]).css("display", "block");//手机号码格式不正确
        }
    })
//密码-------------------------------------------------------------------------------------------------
    $pwdinput.focus(function () {//点击密码框出现黑色框提示
        $(pwd[2]).css("display", "block");//感叹号
        $(pwd[5]).css("display", "block");//黑框提示
    })
    $pwdinput.blur(function () {//密码框失去焦点
        $(pwd[5]).css("display", "none");//黑框消失
        var pwdtest1 = /^[^\u4E00-\u9FA5\uF900-\uFA2D\u0020]{8,16}$/;//字母数字标点符号至少两种
        var pwdtest2 = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;//不能有空格和中文    
        if (count2() == 0) {
            $(pwd[4]).css("display", "block");//密码设置不能为空
        } else {
            if (count2() < 8 || count2() > 14) {//密码为8-14个字符
                $(pwd[3]).css("display", "block");//密码设置不符合要求
            } else {
                if (pwdtest1.test($pwdinput.val()) == 0 || pwdtest2.test($pwdinput.val()) == 0) {
                    $(pwd[3]).css("display", "block");//密码设置不符合要求 
                } else {
                    $(pwd[2]).css("display", "none");//密码正确感叹号消失
                }
            }
        }
    })
    function count2() {
        var str = $pwdinput.val();
        var strArr = [];
        strArr = str.split("");
        var count = 0;
        for(var i=0;i<strArr.length;i++){
            count+=1;   
        }
        return count;//输出sum总字节数
    }
//验证码-------------------------------------------------------------------------------------------------------
    $button.click(function () {
        endtime()
    })
    daojishi = 6;
    function endtime() {      
        if (daojishi == 0) {
            $button.removeAttr("disabled");
            $button.val("获取验证码");
            $(code[3]).css("display", "block");
            daojishi = 6;
            return false;
        } else {
            $button.attr("disabled", true);
            $button.val('已发送（' + daojishi + 's)');
            daojishi--;
        }
        setTimeout(function () {
            endtime();
        }, 1000);
    }     
});