<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h2>当前收益额</h2>
      </el-col>
    </el-row>

    <el-form ref="form">
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" @blur="getDate"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getMon" class="searchBtn">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="8">
        <h3>{{pay}}支出</h3>
        <div class="payItem">
          <span>{{payPrice}}元</span>
        </div>
      </el-col>
      <el-col :span="8">
        <h3>{{profit}}利润</h3>
        <div class="getFinancil">
          <span>{{profitPrice}}元</span>
        </div>
      </el-col>
      <el-col :span="8">
        <h3>{{income}}收入</h3>
        <div class="getPrice">
          <span>{{incomePrice}}元</span>
        </div>
      </el-col>
    </el-row>

    <div>
      <h2>最近半年收益</h2>
      <el-form ref="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="时间">
              <el-date-picker v-model="value2" type="month" placeholder="选择月"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="open" class="searchBtn">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div id="zhu"></div>
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
import { formatDate } from "@/assets/js/formatDate.js";
export default {
  name: "financial",
  components: {
    // HelloWorld
  },
  data() {
    return {
      value1: "",
      value2: "",
      pay: "今日",
      profit: "今日",
      income: "今日",
      payPrice:'',
      profitPrice:'',
      incomePrice:''
    };
  },
  created () {
    //   this.axios.get('/user/getProfit',{

    //   })
    // .then(res=> {
    //   console.log('获取支出信息：',res,data);
     
    // })
    // .catch(err => {
    //   console.log(err);
    // })
  },
  methods: {
    getDate() {
      this.pay = formatDate(this.value1, "yyyy-MM-dd");
      this.profit = formatDate(this.value1, "yyyy-MM-dd");
      this.income = formatDate(this.value1, "yyyy-MM-dd");
    },
    open() {
      
        //   this.axios.get('/user/getProfit',{
        //     checkPaytime1:formatDate(this.value2, "yyyy-MM-dd"),
        // })
        // .then(res=> {
        //   console.log('获取支出信息：',res,data);
        //  
        // })
        // .catch(err => {
        //   console.log(err);
        // })
      this.$alert(
        "这是一段内容",
        formatDate(this.value2, "yyyy-MM") + "月的收益",
        {
          confirmButtonText: "确定",
         
          
        }
      );
    },
    getMon() {
      console.log(formatDate(this.value1, "yyyy-MM-dd"));
      
        //   this.axios.get('/user/getProfit',{
        //     checkPaytime1:formatDate(this.value1, "yyyy-MM-dd"),
        // })
        // .then(res=> {
        //   console.log('获取支出信息：',res,data);
        //  
        // })
        // .catch(err => {
        //   console.log(err);
        // })
    }
  },
  mounted() {
    var myChart = this.echarts.init(document.getElementById("zhu"));
    var dateNow = formatDate(new Date(), "yyyy-MM-dd");
    var arr = dateNow.split("-");
    var dateXAis = arr[1];
    console.log(dateXAis);
    myChart.setOption({
      tooltip: {},
      xAxis: {
        data: [(dateXAis-5)+'月', (dateXAis-4)+'月', (dateXAis-3)+'月', (dateXAis-2)+'月', (dateXAis-1)+'月', dateXAis+'月']
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20, 30]
        }
      ]
    });
  },


  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>

<style lang="less">
@import '../assets/css/base.less';

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
.el-form {
  width: 90%;
  margin: 2% auto;
}
.el-button{
  background:  #ff9a00;
  border-color:#ff9a00;
}
.el-button:hover{
  background:  #ec9005;
  border-color:#ec9005;
}
</style>