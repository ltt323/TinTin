$(function(){
    //利用插件显示柱状图和饼图
     // 基于准备好的dom，初始化echarts实例
     var myChart = echarts.init(document.getElementById('echarts_lf'));
    
     // 指定图表的配置项和数据
     var option = {
         title: {
             text: '黑马学校招生情况'
         },
         tooltip: {},
         legend: {
             data:['人数']
         },
         xAxis: {
             data: ["1月","2月","3月","4月","5月","6月"]
         },
         yAxis: {},
         series: [{
             name: '人数',
             type: 'bar',
             data: [500, 199, 435, 234, 654, 234]
         }]
     };
    
     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);

     var myChart1 = echarts.init(document.getElementById('echarts_rg'));
    
     // 指定图表的配置项和数据
     var option1 = {
        title : {
            text: '热门课程',
            subtext: '2018-2019学年',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['前端','JAVA','PHP','UI','大数据']
        },
        series : [
            {
                name: '课程名称',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'前端'},
                    {value:310, name:'JAVA'},
                    {value:234, name:'PHP'},
                    {value:135, name:'UI'},
                    {value:1548, name:'大数据'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'yellow'
                    }
                }
            }
        ]
    };
    
     // 使用刚指定的配置项和数据显示图表。
     myChart1.setOption(option1);
});
