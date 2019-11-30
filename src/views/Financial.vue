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
    <div id="zhu" ></div>
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
        text: "本周收益明细"
      },
      tooltip: {},
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20,30]
        }
      ]
    });
  }
};
</script>

<style lang="less">

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
#zhu {
  width: 90%;
  margin: 2% auto;
  height: 600px;
}
</style>