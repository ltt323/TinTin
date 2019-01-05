//实现表单登录校验需要用到插件bootstrap-validator
//使用这个插件的步骤:1.引包,是在bootstrap的基础上css和js
$("#form").bootstrapValidator({
    //配置字段
    fields:{
        username:{
            //校验规则
            validators:{
                //非空校验
                notEmpty:{
                    message:"用户名不能为空"
                },
                //长度校验
                stringLength:{
                    min:2,
                    max:6,
                    message:"用户名的长度必须是2-6位"
                },
                callback:{
                    message:"用户名不存在"
                }
            }
        },
        password:{
            validators:{
              notEmpty:{
                  message:"密码不能为空"
              },
              stringLength:{
                  min:6,
                  max:12,
                  message:"密码长度必须是6-12位"
              },
              callback:{
                  message:"密码错误"
              }
            }
        }
    },
    feedbackIcons:{
        valid:'glyphicon glyphicon-ok',//校验成功,传入的是bootstrap中的字体图标
        invalid:'glyphicon glyphicon-remove',//校验失败
        validating:'glyphicon glyphicon-refresh'//正在校验
    }
})
//2.点击登录时会发送ajax请求,并且发生页面跳转,submit会提交数据,但是不会进行页面跳转,所以我们需要一个
//监听事件,success.form.bv事件,当校验成功后出发该事件,并且组织默认的表单提交
$("#form").on("success.form.bv",function(e){
    //阻止默认上传
    e.preventDefault();
    //发送ajax请求
    $.ajax({
        url:"/employee/employeeLogin",
        type:"post",
        data:$("#form").serialize(),
        dataType:'json',
        success:function(info){
            console.log(info);
            if(info.success){
                location.href = "index.html"
            }
            if(info.error === 1001){
                //利用bootstrapValidator中有很多API,这里可以利用
                //.updateStatus(字段的名称,状态包括NOT_VALIDATED, VALIDATING, INVALID or VALID,最后一个参数
                //是上面的验证规则)
                $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                return;
            }
            if(info.error === 1000){
                $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
                return;
            }
            
        }
    })
})
//3.表单重置功能
//只需要使用插件即可resetForm(),里面不传参数的话就是只重置状态,不重置内容,如果传参数就是都重置
//因为按钮的type本来就是reset就已经重置内容啦,所以爱这里不需要在重置内容
$('[type="reset"]').click(function(){
    $('#form').data("bootstrapValidator").resetForm();
})
//4.进度条的使用:利用插件即可
//进度条每个页面都要使用到,所以可以分为功能类
