var charts1 = echarts.init(document.getElementById("table1"));
charts1.setOption((() => {
    var option = null;
    var labels = [];
    for (var val of table1) {
        labels.push(val["name"]);
    }
    option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: '0%',
            data: labels,
            textStyle: {
                color: "#fff"
            }
        },
        series: [{
            name: '数据来源',
            type: 'pie',
            radius: '55%',
            center: ['67%', '50%'],
            data: table1,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 7,
                    shadowColor: 'rgba(0, 110, 127, 0.6)'
                }
            },
            label: {            //饼图图形上的文本标签
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        }]
    };
    return option;
})(), true);
window.addEventListener('resize', function () {
    chart1.resize();
});
//table2
function initTable2() {
    var myChart = echarts.init(document.getElementById('table2'));

    var presents = [];
    var data = [];
    for (var val of table2) {
        presents.push(val["name"]);
        data.push({
            name: val["name"],
            value: val["count"]
        });
    }
    var maskImage = new Image();
    maskImage.onload = function () {
        myChart.setOption({
            tooltip: {
                show: true
            },
            grid: {
                left: 0,
                bottom: 0,
                top: 0,
                right: 0,
            },
            xAxis: {
                type: "category",
                show: false
            },
            yAxis: {
                max: 100,
                show: false
            },
            series: [{
                zlevel: -1,
                type: 'pictorialBar',
                name: 'pictorial',
                silent: true,
                symbol: 'image://' + symbolUrl,
                symbolSize: ['90%', '125%'],
                symbolPosition: 'center',
                barWidth: '100%',
                barMaxWidth: '100%',
                itemStyle: {
                    normal: {
                        opacity: 0.1
                    }
                },
                data: [{
                    value: 100
                }]
            }, {
                type: 'wordCloud',
                sizeRange: [11, 34],
                rotationRange: [-90, 90],
                maskImage: maskImage,
                textPadding: 0,
                gridSize: 5,
                width: '90%',
                height: '125%',
                left: 'center',
                top: 'center',
                drawOutOfBound: false,
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 255) % 150 + 100,
                                Math.round(Math.random() * 255) % 150 + 100,
                                Math.round(Math.random() * 255) % 150 + 100
                            ].join(',') + ')';
                        }
                    },
                },
                data: data
            },]
        });

    };
    maskImage.src = symbolUrl;
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}
initTable2();

//table3
var chart3 = echarts.init(document.getElementById("table3"));chart3.setOption((() => {
    var option = null;
    option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            name: '舆情占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [ { name: "中性", value:  23353 },{ name: "正面", value: 2419 }, { name: "负面", value: 2701 }],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 7,
                    shadowColor: 'rgba(0, 110, 127, 0.6)'
                }
            },
            label: {            //饼图图形上的文本标签
                normal: {
                    show: true,
                    textStyle: {
                        fontWeight: 300,
                        fontSize: 16,    //文字的字体大小
                        color: '#fff'
                    }
                }
            }
        }]
    };
    return option;
})(), true);
window.addEventListener('resize', function () {
    chart3.resize();
});
//table5

function initTable5() {
    var dom = document.getElementById("table5");
    var dom2 = document.getElementById("container5");
    var myChart = echarts.init(dom);
    var myChart2 = echarts.init(dom2);
    var app = {};
    var XAxis = [];
    var positiveData = [];
    var negativeData = [];
    var neutralData = [];
    for (var val of table5) {
        XAxis.push(val["date"]);
        positiveData.push(val["positive"]);
        negativeData.push(val["negative"]);
        neutralData.push(val["neutral"]);
    }
    option = null;
    option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            icon: 'rectangle',
            data: ['负面', '正面', '中性'],
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        },
        color: ["rgb(240,42,50)", "rgb(45,255,50)", "rgb(0,110,250)"],
        grid: {
            left: '0%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: XAxis,
            axisLabel: {
                textStyle: {
                    color: '#fff',//坐标值得具体的颜色
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#ffffff',//左边线的颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',//坐标值得具体的颜色

                }
            }
        },
        series: [{
            name: '负面',
            type: 'line',
            stack: '总量',
            data: negativeData,
            itemStyle: {
                normal: {
                    // color: '#fff', //改变折线点的颜色
                    lineStyle: {
                        color: 'rgb(240,42,50)' //改变折线颜色
                    }
                }
            },
        }, {
            name: '正面',
            type: 'line',
            stack: '总量',
            data: positiveData,
            itemStyle: {
                normal: {
                    // color: '#fff', //改变折线点的颜色
                    lineStyle: {
                        color: 'rgb(45,255,50)' //改变折线颜色
                    }
                }
            },
        }, {
            name: '中性',
            type: 'line',
            stack: '总量',
            data: neutralData,
            itemStyle: {
                normal: {
                    // color: '#fff', //改变折线点的颜色
                    lineStyle: {
                        color: 'rgb(0,110,250)' //改变折线颜色
                    }
                }
            },
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        myChart2.setOption(option);
    }
    window.addEventListener('resize', function () {
        myChart.resize();
        myChart2.resize();
    });
    
}
initTable5();

function initTable6() {
    var dom = document.getElementById("table6");
    var myChart = echarts.init(dom);
    var myChart2 = echarts.init(document.getElementById("container6"));
    var XAxis = [];
    var neutralData = [];
    for (var val of table6) {
        XAxis.push(val["name"]);
        neutralData.push(val["value"]);
    }
    option = null;
    option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '0%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        legend: {
            data: ['价格'],
            icon: 'rectangle',
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: XAxis,
            axisLabel: {
                textStyle: {
                    color: '#fff',//坐标值得具体的颜色
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#ffffff',//左边线的颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',//坐标值得具体的颜色

                }
            }
        },
        series: [{
            name: '价格',
            type: 'line',
            stack: '总量',
            data: neutralData
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        myChart2.setOption(option, true);
    }
    window.addEventListener('resize', function () {
        myChart.resize();
        myChart2.resize();
    });
}
initTable6();

function initTable7() {
    var dom = document.getElementById("table7");
    var myChart = echarts.init(dom);
    var myChart2 = echarts.init(document.getElementById("container7"));
    var XAxis = [];
    var neutralData = [];
    for (var val of table7) {
        XAxis.push(val["date"]);
        neutralData.push(val["count"]);
    }
    option = null;
    option = {

        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['舆情量'],
            icon: 'rectangle',
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        },
        grid: {
            left: '0%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: XAxis,
            axisLabel: {
                textStyle: {
                    color: '#fff',//坐标值得具体的颜色
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#ffffff',//左边线的颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',//坐标值得具体的颜色

                }
            }
        },
        series: [{
            name: '舆情量',
            type: 'line',
            stack: '总量',
            data: neutralData
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        myChart2.setOption(option, true);
    }
    window.addEventListener('resize', function () {
        myChart.resize();
        myChart2.resize();
    });
}
initTable7();