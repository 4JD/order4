<template>
  <div class="bossshowallearnings">
    <div class="onestoremsg">
      <div class="onestoreimg">
        <img src="../assets/images/store2.jpg" alt="店铺图片" />
      </div>
      <div class="onstoreremark">
        <p>店铺名字: {{item.storeName}}</p>
        <p>主营类型:{{item.storeMainType}}</p>
        <p>营业时间:{{item.storeHour}}</p>
        <p>门面地址:{{item.storeAddress}}</p>
      </div>
    </div>

    <!-- 图表内容 -->
    <div id="echart"></div>
  </div>
</template>

<script>
export default {
  name: "bossshowallearnings",
  props: {
    item: Object
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var myChart = this.echarts.init(document.getElementById("echart"));
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ["利润", "支出", "收入"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "value"
        }
      ],
      yAxis: [
        {
          type: "category",
          axisTick: { show: false },
          data: [this.item.storeName]
        }
      ],
      series: [
        {
          name: "利润",
          type: "bar",
          label: {
            normal: {
              show: true,
              position: "inside"
            }
          },
          data: [this.item.storeIncome]
        },
        {
          name: "收入",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true
            }
          },
          data: [this.item.storeIncome-this.item.storeExpend]
        },
        {
          name: "支出",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "left"
            }
          },
          data: [this.item.storeExpend]
        }
      ]
    });
  }
};
</script>


<style lang="less">
.earningsbox {
  text-align: left;
  width: 90%;
  margin-left: 5%;
  min-width: 450px;
  min-height: 200px;
  flex-wrap: wrap;
  box-shadow: 0 0 5px gray;
  display: inline-block;
  .onestoremsg {
    .onestoreimg {
      // background: pink;
      width: 200px;
      height: 170px;
      float: left;
    }
    .onestoreimg img {
      width: 150px;
      height: 150px;
      margin: 0 20px;
    }
    .onstoreremark {
      margin-left: 200px;
      min-width: 100px;
    }
  }
}
// echart图
#echart {
  width: 600px;
  height: 200px;
}
</style>