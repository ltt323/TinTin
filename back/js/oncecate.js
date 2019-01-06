//1. 进入页面会发送ajax请求渲染从后台获取数据,动态渲染到页面中
$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                
                var htmlstr = template("onetpl",info);
                $("tbody").html(htmlstr);
                //2. 加入分页插件,版本3.x以上的需要使用ul包裹切记
                $("#paginaor").bootstrapPaginator({
                    //设置版本号
                    bootstrapMajorVersion:3,
                    //当前页码
                    currentPage:info.page,
                    //一共有多少页
                    totalPages:Math.ceil(info.total/info.size),
                    //点击页码时触发的事件
                    onPageClicked:function(a,b,c,page){
                        //page是当前页码,只要将currentpage等于当前页码即可
                        currentPage = page;
                        render();
                    }
                })

            }

        })
    }

    //3. 点击添加按钮出现模态框.
    $('.btn_add').click(function(){
        $('#onecateModal').modal('show');
        //点击确定按钮时,发送ajax请求,并且要组织submit的默认发送请求,改为ajax请求
        $('.btn').click(function(e){
            e.preventDefault();
            $.ajax({
                url:'/category/addTopCategory',
                type:'post',
                data:$('#form').serialize(),
                dataType:'json',
                success:function(info){
                    console.log(info);
                    render();

                }
            })
        })
    })
})