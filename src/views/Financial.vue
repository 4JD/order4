<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h2>当前收益额</h2>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <h3>今日支出</h3>
        <div class="payItem">
          <span>222003元</span>
        </div>
      </el-col>
      <el-col :span="8">
        <h3>今日利润</h3>
        <div class="getFinancil">
          <span>222003元</span>
        </div>
      </el-col>
      <el-col :span="8">
        <h3>今日收入</h3>
        <div class="getPrice">
          <span>222003元</span>
        </div>
      </el-col>
    </el-row>
    <div id="zhu" style="width: 300px;height:300px;"></div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

/*
使用方法2
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
*/

export default {
  name: "financial",
  components: {
    // HelloWorld
  },
  mounted() {
    var myChart = this.echarts.init(document.getElementById("zhu"));
    myChart.setOption({
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  }
};
</script>

<style lang="less">
.mesList {
  text-align: right;
}
ul li {
  height: 40px;
  font-size: 20px;
}
.payItem,
.getPrice {
  width: 200px;
  height: 200px;
  margin: 10% auto;
  border-radius: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 28px;
}
.payItem {
  border: 20px solid lightblue;
}
.getFinancil {
  width: 250px;
  height: 250px;
  margin: 2% auto;
  border-radius: 250px;
  border: 20px solid lightsalmon;
  line-height: 250px;
  text-align: center;
  font-size: 30px;
}
.getPrice {
  border: 20px solid lightcoral;
}
</style>