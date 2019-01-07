//一进入页面就发送ajax请求,获取数据动态渲染到页面中
$(function(){
    var pageCurrrent = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:pageCurrrent,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                //动态渲染到页面中(注册事件利用事件冒泡)
                var htmlstr = template("twoCate-tml",info);
                $('tbody').html(htmlstr);
                //分页插件代码
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion: 3,  // 版本号
                currentPage: info.page,  // 当前页
                totalPages: Math.ceil( info.total / info.size ), // 总页数
                onPageClicked:function(a,b,c,page){
                    pageCurrrent = page;
                    render();
                }
            })

            }
        })
    }

//2. 点击添加分类
//出现莫泰框
$('.add_btn').click(function(){
    $('#twocateModal').modal('show');
})
//3.发送jax获取后台数据,动态渲染到ul的李相面
$.ajax({
    url:'/category/queryTopCategoryPaging',
    type:'get',
    data:{
        page:1,
        pageSize:100
    },
    dataType:'json',
    success:function(info){
        //动态渲染到页面中(注册事件利用事件冒泡)
        var htmlstr = template("chosecate-tml",info);
        $('.choose_cate ul').html(htmlstr);
        
    }
})
//4.点击li会把li里面的内容赋值给上面的按钮的,注意时间冒泡
$('.chose-name').on('click','li',function(){
    var liContent = $(this).text();
    $('.header-font').text(liContent);
    $(this).parent().toggle();
    //4.1 点击li时把,li这个一级分类的id值赋值 给下面的隐藏域的value值.
    var cateId = $(this).data('id');
    // console.log(cateId);
    $('.categoryId').val(cateId);
    $('#form').data("bootstrapValidator").updateStatus( "categoryId", "VALID" )
})
//5. 点击选择一级按钮,展示下面的ul
$('.chose_first').click(function(){
    $(this).siblings().toggle();
})



//6.上传文件事件
$("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var picurl = data.result.picAddr;
      console.log(picurl);
      $('.modal img').attr('src',picurl);
      //把获取到的地址赋值给下面的隐藏域的val值用来上传
      $('.brandlogo').val(picurl);
    //   console.log($('.brandlogo').val(picurl));
      $("#form").data('bootstrapValidator').updateStatus("brandLogo","VALID")
    }
});

//7. 点击确定按钮,发送ajax请求,请求参数brandName  categoryId   brandLogo  brandLogo
//7.1 进行表单校验
$('#form').bootstrapValidator({
    // 配置不校验的类型, 对 hidden 需要进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
        categoryId:{
            validators:{
                notEmpty:{
                    message:'请选择一级分类'
                }
            }
        },
        brandName:{
            validators: {
              notEmpty: {
                message: "分类名称不能为空"
              }
            }
        },
        brandLogo:{
            validators:{
                notEmpty:{
                    message:'请上传图片'
                }
            }
        }
    }
  })

//8 校验成功之后就会触发事件,发送ajax请求
$('#form').on('success.form.bv',function(e){
    e.preventDefault();
    //发送ajax请求
    $.ajax({
        url:'/category/addSecondCategory',
        type:'post',
        data:$('#form').serialize(),
        dataType:"json",
        success:function(info){
            pageCurrrent = 1;
            $('#twocateModal').modal("hide");
            render();

        }
    })
})


})
