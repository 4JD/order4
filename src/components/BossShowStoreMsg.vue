<template>
  <div class="boss-storemsg">
      <div class="echarts" id="echarts">nei</div>
  </div>
</template>

<script>
export default {
  name: "bossshowstoremsg",
  template: {},
  props: {
      storelist: Array,
  },
  data() {
    return {

    };
  },
  methods: {},
    mounted() {
      console.log(this.storelist);
         // 获取店铺名字
      var storeNames = [];
       // 获取店铺收入
      var storeIncomes = [];
      // 获取店铺支出 
      var storeExpends = [];
      // 利润数组
      var liruns =[];
      this.storelist.forEach(function(item) {
        // 店铺名字数组
        storeNames.push(item.storeName);
        // 店铺收入数组
        storeIncomes.push(item.storeIncome);
        // 店铺支出数组
        storeExpends.push(item.storeExpend);
        // 店铺利润数组
        const lirun = Number(item.storeIncome)+Number(item.storeExpend);
        liruns.push(lirun);
      });

      // console.log(storeNames,storeIncomes,storeExpends,liruns);
    var myChart = this.echarts.init(document.getElementById("echarts"));
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
          // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          data: storeNames
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
          // data: [200, 170, 240, 244, 200, 220, 210]
          data: liruns
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
          // data: [320, 302, 341, 374, 390, 450, 420]
          data: storeIncomes
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
          // data: [-120, -132, -101, -134, -190, -230, -210]
          data: storeExpends
        }
      ]
    });
  },
};
</script>

<style lang="less" scoped>
.boss-storemsg {
  margin: 0 auto;
}
#echarts {
  min-width: 700px;
  width: 700px;
  margin: 2% auto;
  height: 550px;
}
</style>