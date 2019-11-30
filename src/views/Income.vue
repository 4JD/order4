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
      <!-- <el-row>
        <el-col :span="6">
          <el-form-item label="支付类型：">
            <el-select placeholder="支付类型" v-model="payType">
              <el-option label="全部" value="all"></el-option>
              <el-option label="支付宝" value="zhifubao"></el-option>
              <el-option label="微信" value="weichat"></el-option>
              <el-option label="现金" value="cash"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品类型：">
            <el-select placeholder="商品类型" v-model="goodsType">
              <el-option label="全部" value="all"></el-option>
              <el-option label="面食" value="mianshi"></el-option>
              <el-option label="小炒" value="xiaochao"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->

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
          <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table stripe style="width: 90%; " border :data="tableData">
      <el-table-column prop="id" label="收入id" align="center"></el-table-column>

      <el-table-column prop="goodsName" label="商品名" align="center"></el-table-column>

      <el-table-column
        prop="goodsType"
        label="商品类型"
        align="center"
        :filters="[{ text: '面食', value: '面食' }, { text: '小炒', value: '小炒' }]"
        :filter-method="filterGoods"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.goodsType === '面食' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.goodsType}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="price" label="单价/(元)" align="center"></el-table-column>

      <el-table-column prop="number" label="卖出数量/(份)" align="center"></el-table-column>

      <el-table-column prop="totalPrice" label="总价/(元)" align="center"></el-table-column>

      <el-table-column
        prop="payment"
        label="支付方式"
        align="center"
        :filters="[{ text: '支付宝', value: '支付宝' }, { text: '微信', value: '微信' },{ text: '现金', value: '现金' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.payment === '支付宝' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.payment}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="支付时间" width="190" align="center"></el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>


<script>
import { formatDate } from '@/assets/js/formatDate.js'
var tableData = [
        {
          date: "2016-05-02 09:20:00",
          id: "1",
          goodsName: "二两面条",
          goodsType: "面食",
          price: "7",
          number: "2",
          totalPrice: "14",
          payment: "支付宝"
        },
        {
          date: "2016-05-02 09:20:00",
          id: "1",
          goodsName: "二两面条",
          goodsType: "小炒",
          price: "7",
          number: "2",
          totalPrice: "14",
          payment: "微信"
        },
        {
          date: "2016-05-02 09:20:00",
          id: "1",
          goodsName: "二两面条",
          goodsType: "面食",
          price: "7",
          number: "2",
          totalPrice: "14",
          payment: "现金"
        }
      ]

export default {
  name: "income",
  components: {},
  data() {
    return {
      value2: "",
      payType: "",
      goodsType: "",
      keyword: "",
      currentPage3: 5,
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
      tableData: [
      ]
    };
  },
  filters: {
    formatDate(time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd');
   }
  },
  methods: {
    
    searchBtn() {
      console.log(formatDate(this.value2[0], 'yyyy-MM-dd hh:mm:ss'));
    },
    filterTag(value, row) {
      return row.payment === value;
    },
    filterGoods(value, row) {
      return row.goodsType === value;
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  
  },
  created () {
    this.tableData = tableData;
  }
};
</script>

<style lang="less">
h2 {
  float: left;
  margin-left: 5%;
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
</style>