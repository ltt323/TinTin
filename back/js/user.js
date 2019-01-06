$(function(){
    var currentPage = 1;
    var pageSize = 5;
    // 发送ajax请求获取user后台数据,动态渲染到页面中
    render();
    function render(){
        $.ajax({
            url:'/user/queryUser',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                
                //动态渲染到页面中
                var htmlstr = template("usertml",info);
                $('tbody').html(htmlstr);
        
                //创建一个分页插件
    
                $(".pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    



    //点击按钮,弹出模态框,并且点击模态框的,因为按钮是动态渲染的额所以需要事件委托
    $('tbody').on('click',".user_btn",function(){
        $('#userModal').modal('show');
        var currentId = $(this).parent().data('id');
     
        var isDelete = $(this).hasClass('btn-danger')? 0 : 1;
        // console.log(isDelete);
        //点击确定发送ajax请求
        $(".confirm").click(function(){
            $.ajax({
                url:"/user/updateUser",
                type:'post',
                data:{
                    id:currentId,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function(info){
                    console.log(info);
                    if(info.success){
                        $('#userModal').modal('hide');
                        render();
                    }
                    
                }
            })
        })

    })
    
})
    