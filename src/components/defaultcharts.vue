<template>
  <div class="main" ref="main"></div>
</template>

<script>
import echarts from "echarts";
import {dataStatistics} from '@/api/charts'
// 引入柱状图
import "echarts/lib/chart/bar";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
export default {
  name: "defaultcharts",
  data() {
    return {
      charts: ""
    };
  },
  mounted() {
   
    dataStatistics().then(res=>{
        window.console.log(res)
    this.charts = echarts.init(this.$refs.main);
    let _appList=[];
    res.data.data.forEach(element => {
        _appList.push(element.name)
        
    });
    this.charts.setOption({
      title: {
        text: "整体数据",
       
        x: "left"
      },
      color: ["#409eff", "#f76137", "#f9b358"],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "right",
        align:"left",
        data: _appList
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:res.data.data
          
        }
      ]
    });
    })
  }
};
</script>

<style>
.main {
  width: 80%;
  height: 463px;
}
</style>