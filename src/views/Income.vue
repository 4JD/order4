<template>
  <div class="income-list">
    <el-row>
      <el-col :span="24">
        <h2>
          <span class="el-icon-menu"></span>收入情况
        </h2>
      </el-col>
    </el-row>
    <el-form ref="form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="支付类型：">
            <el-select placeholder="支付类型" v-model="payType">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="在线支付" value="在线支付"></el-option>
              <el-option label="现金支付" value="现金支付"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品类型：">
            <el-select placeholder="商品类型" v-model="goodsType">
              <el-option label="全部" value="全部"></el-option>
              <el-option
                :label="item.foodTypeName"
                :value="item.foodTypeName"
                v-for="(item,index) in payTypes"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间：">
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="其他：">
            <el-input v-model="keyword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" @click="searchBtn" id="searchBtn">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table stripe style="width: 90%; " border :data="tableData">
      <el-table-column prop="incomeId" label="收入id" align="center"></el-table-column>

      <el-table-column prop="orderFoodPacks[0].foodName" label="商品名" align="center"></el-table-column>

      <el-table-column prop="orderFoodPacks[0].foodTypeName" label="商品类型" align="center"></el-table-column>

      <el-table-column prop="orderFoodPacks[0].foodPrice" label="单价/(元)" align="center"></el-table-column>

      <el-table-column prop="orderFoodPacks[0].foodNum" label="卖出数量/(份)" align="center"></el-table-column>

      <el-table-column prop="orderPrice" label="总价/(元)" align="center"></el-table-column>

      <el-table-column prop="paymentTypeName" label="支付方式" align="center"></el-table-column>

      <el-table-column prop="orderTime" label="支付时间" width="190" align="center"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page.sync="currentPage3"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalSize"
    ></el-pagination>
  </div>
</template>


<script>
import { formatDate } from "@/assets/js/formatDate.js";

export default {
  name: "income",
  components: {},
  data() {
    return {
      value2: "",
      payType: "",
      goodsType: "",
      keyword: "",
      payTypes: [],
      currentPage3: 1,
      totalSize: 0,
      pageSize: 10,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: []
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    searchBtn() {
      // console.log(this.value2);
      var orderTimeStart = formatDate(this.value2[0], "yyyy-MM-dd hh:mm:ss");
      var orderTimeEnd = formatDate(this.value2[1], "yyyy-MM-dd hh:mm:ss");

      // console.log(orderTimeStart);
      // console.log(orderTimeEnd);
      if (this.value2 == "") {
        orderTimeStart = "";
        orderTimeStart = "";
      } else if (this.payType == "全部") {
        this.payType = "";
      } else if (this.goodsType == "全部") {
        this.goodsType = "";
      } else {
        this.axios
          .post("/income/allIncome", {
            userId: sessionStorage.getItem("userId"),
            orderTimeStart: orderTimeStart,
            orderTimeEnd: orderTimeEnd,
            foodName: this.keyword,
            paymentName: this.payType,
            foodTypeName: this.goodsType
          })
          .then(res => {
            // console.log("获取筛选信息：", res.data);
            this.tableData = res.data.data.list;
            this.totalSize = res.data.data.total;
          })
          .catch(err => {
            // console.log(err);
          });
      }
    },
    filterTag(value, row) {
      return row.payment === value;
    },
    filterGoods(value, row) {
      return row.goodsType === value;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.axios
        .post("/income/pageIncome", {
          userId: sessionStorage.getItem("userId"),
          page: this.currentPage3,
          pageSize: this.pageSize
        })
        .then(res => {
          // console.log("获取当前收入信息：", res.data.data.list);
          this.tableData = res.data.data.list;
          this.totalSize = res.data.data.total;
        })
        .catch(err => {
          // console.log(err);
        });
    }
  },
  created() {
    this.axios
      .post("/income/allIncome", {
        userId: sessionStorage.getItem("userId")
      })
      .then(res => {
        // console.log("获取收入信息：", res.data.data.list);
        this.tableData = res.data.data.list;
        this.totalSize = res.data.data.total;
        // this.currentPage3
        // this.currentPage3 = res.data.data.list.page;
      })
      .catch(err => {
        // console.log(err);
      });

    this.axios
      .post("/foodType/findTypeByUserId", {
        userId: sessionStorage.getItem("userId")
      })
      .then(res => {
        // console.log("获取商品类型信息：", res.data);
        this.payTypes = res.data.data;
        // console.log(res.data.data);
    
      })
      .catch(err => {
        // console.log(err);
      });
  }
};
</script>

<style lang="less">
@import "../assets/css/base.less";
@import "../assets/css/resize.css";

.income-list {
  text-align: center;
}

h2 {
  float: left;
  margin-left: 5%;
  margin-top: 30px;
}
.el-table {
  margin: 2% auto;
}
.el-form {
  width: 90%;
  margin: 2% auto;
}
.el-input {
  width: 80%;
}
.el-button {
  background: #ff9a00;
  border-color: #ff9a00;

  &:link {
    background: #ec9005;
    border-color: #ec9005;
  } /* 未访问的链接 */
  &:visited {
    background: #ec9005;
    border-color: #ec9005;
  } /* 已访问的链接 */
  &:hover {
    background: #ec9005;
    border-color: #ec9005;
  } /* 鼠标移动到链接上 */
  &:active {
    background: #ec9005;
    border-color: #ec9005;
  } /* 选定的链接 */
}
</style>