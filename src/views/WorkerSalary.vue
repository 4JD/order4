<template>
  <div>
    <el-button type="info" plain icon="el-icon-close" @click="backtoworker">返回</el-button>
    <div id="zhu" style="width: 500px;height:400px;"></div>
  </div>
</template>

<script>


export default {
  name: 'workersalary',
  components: {
    
  },
  data() {
    return {

    }
  },
  methods: {
    backtoworker() {
      this.$router.replace("/worker");
    }
  },
  mounted() {
    var myChart = this.echarts.init(document.getElementById("zhu"));
    myChart.setOption({
      title: {
        text: "员工收入"
      },
      tooltip: {},
      xAxis: {
        data: ["大厨", "服务员一号", "服务员二号", "收营员", "打杂", "清洁"]
      },
      yAxis: {},
      series: [
        {
          name: "工资",
          type: "bar",
          data: [8888, 5555,6666, 4444, 3333, 2999]
        }
      ]
    });
  }
}
</script>

<style lang="less" scoped>

</style>