<template>
<div class="main" ref="main">

</div>
  
</template>

<script>
import echarts from 'echarts';
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
export default {
    name:"defaultcharts",
    data(){
        return{
            charts:''
        }
    },
    mounted() {
    this.charts=    echarts.init(this.$refs.main);
    this.charts.setOption({
         tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
              
            ]
        }
    ]

    })

    },

}
</script>

<style>
.main{
    width: 99px;
    height: 99px;
}

</style>