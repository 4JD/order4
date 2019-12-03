<template>
  <div class="payment-list">
    <el-row>
      <el-col :span="24">
        <h2>
          <span class="el-icon-menu"></span>支出情况
        </h2>
      </el-col>
    </el-row>
    <el-form ref="form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="支出类型：">
            <el-select placeholder="支出类型" v-model="payType" >
              <el-option label="全部" value="allType" ></el-option>
             
              <el-option v-for="item in tableData" :key = "item" :label="item.addpayTypeName" :value="item.addpayTypeName" ></el-option>
             
            </el-select>
          </el-form-item>
        </el-col>
       
      
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间：">
            <el-date-picker
              v-model="value3"
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

        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <addPayItem @add="pushItem"></addPayItem>
        </el-col>
      </el-row>
    </el-form>

    <el-table stripe style="width: 90%; " border :data="tableData">
      <el-table-column prop="addpayId" label="支出id" align="center"></el-table-column>

      <el-table-column prop="addpayTypeName" label="支出类型" align="center"></el-table-column>

      <el-table-column prop="userName" label="操作者" align="center"></el-table-column>

      <el-table-column prop="addpayPrice" label="支出金额/(元)" align="center"></el-table-column>

      <el-table-column prop="addpayDate" label="支出时间" align="center"></el-table-column>

      <el-table-column prop="addpayRemark" label="备注" align="center"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalSize"
    ></el-pagination>
  </div>
</template>

<script>
import addPayItem from "@/components/addPayItem.vue";
import { formatDate } from "@/assets/js/formatDate.js";
var tableData = [
  {
    date: "2016-05-02 09:20:00",
    id: "1",
    payType: "工资",
    payUser: "张三",
    payPrice: "7",
    remark: "无"
  },
  {
    date: "2016-05-02 09:20:00",
    id: "1",
    payType: "房租",
    payUser: "李四",
    payPrice: "7",
    remark: "2"
  },
  {
    date: "2016-05-02 09:20:00",
    id: "1",
    payType: "原材料",
    payUser: "王五",
    payPrice: "7",
    remark: "2"
  }
];

export default {
  name: "payment",
  components: {
    addPayItem
  },
  data() {
    return {
      value3: "",
      currentPage3: 5,
      totalSize: 1000,
      pageSize: 20,
      payType:'',
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    pushItem(data) {
      this.tableData.push(data);
      console.log("父组件接收" + data);
    },
    searchBtn() {
      if (this.value3 != "") {
        console.log(formatDate(this.value3[0], "yyyy-MM-dd"));
        console.log(formatDate(this.value3[1], "yyyy-MM-dd"));
      }
      console.log(this.payType);
      //   this.axios.get('/user/searchPay',{
      //     checkPaytime1:formatDate(this.value3[0], "yyyy-MM-dd"),
      //     checkPaytime2:formatDate(this.value3[1], "yyyy-MM-dd")
      // })
      // .then(res=> {
      //   console.log('获取支出信息：',res.data);
      //   this.tableData = res.data.data;
      // })
      // .catch(err => {
      //   console.log(err);
      // })
    }
  },
  created() {
    this.tableData = tableData;
    this.axios
      .get("/user/searchPay?userName=admin", {
        page: this.currentPage3,
        pageSize: this.pageSize
      })
      .then(res => {
        console.log("获取支出信息：", res.data);
        this.tableData = res.data.data.list;
        // this.filtersType = ({
        //   text: res.data.data.list.addpayTypeName,
        //   value: res.data.data.list.addpayTypeName
        // })
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less">
@import "../assets/css/base.less";
@import "../assets/css/resize.css";
.payment-list {
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
}
.el-button:hover {
  background: #ec9005;
  border-color: #ec9005;
}
</style>