//判断是否登录,一进页面就执行一次,如果没有登录返回到登录页面中
//前后台分离,所以前端不会知道后台的数据,所以只能发送请求判断是否用户已经登录
$.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    dataType:'json',
    success:function(info){
        console.log(info);
        if(info.error === 400){
            location.href = 'login.html';
        }
    }
})