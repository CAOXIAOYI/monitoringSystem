option = {
    title : {
        // text: '未来一周气温变化',
        // subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    // legend: {
    //     data:['最高气温']
    // },
    // toolbox: {
    //     show : true,
    //     feature : {
    //         mark : {show: true},
    //         dataView : {show: true, readOnly: false},
    //         magicType : {show: true, type: ['line', 'bar']},
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //     }
    // },
    backgroundColor:"#1D324B",
    grid: {
        x: '30px',
        y: '20%',
        x2: '60px',
        y2: '25px',
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLine:{
              lineStyle:{
                color: '#162B44'
              }
            },
            axisLabel: {
              textStyle:{
                color: '#fff'
              }
            },
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name:"(电压幅值)",
            nameTextStyle:{
              color: '#fff'
            },
            axisLabel: {
              inside:true,
              //margin:20,
              textStyle:{
                color: '#fff'
              },
            },
            splitLine: {
              show: true,
              lineStyle:{
                color: '#2C386F'
              }
            },
            axisLine:{
              lineStyle:{
                color: '#162B44'
              }
            },
        }
    ],
    series : [
        {
            name:'最高气温',
            type:'line',
            smooth:true,
            data:[-0.4, 0.1, 0.1, 0.5, 0.6,-0.1, 0.4],
            lineStyle:{
                normal: {
                  width:4,
                  color:new echarts.graphic.LinearGradient(0, 0, 1, 0,[{
                     offset: 0, color: '#FDDA3B'
                  }, {
                     offset: 0.3, color: '#5B62DA'   
                  }, {
                     offset: 0.5, color: '#E974AC'   
                  },{
                     offset: 0.7, color: '#7D7F65'
                  }, {
                     offset: 0.9, color: '#81CB52'   
                  }, {
                     offset: 1, color: '#45E6C0'   
                  }])
                }
            },
            markLine : {
                data : [
                    //{type : 'average', name : '正常'}
                    {yAxis: 0.4, name : '正常'},
                ],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize:20,
                            color:'#158569'
                        },
                        //formatter:'{b}',//a（系列名称），b（数据项名称），c（数值）, d（饼图：百分比 | 雷达图：指标名称）
                    }
                },
                lineStyle:{
                    normal: {
                      //color:['#06C7FE','#f00']
                      color:"#158569"
                    }
                },
            }
        }
    ]
};
                    
