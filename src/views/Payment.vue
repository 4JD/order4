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
            <el-select placeholder="支出类型">
              <el-option label="工资" value="gongzi"></el-option>
              <el-option label="原材料" value="origin"></el-option>
              <el-option label="房租" value="fangzi"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="操作者：">
            <el-select placeholder="操作者：">
              <el-option label="张三" value="zhangsan"></el-option>
              <el-option label="李四" value="lisi"></el-option>
              <el-option label="王五" value="wangwu"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

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

        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
         
          <addPayItem></addPayItem>
        </el-col>
      </el-row>
    </el-form>

    <el-table stripe style="width: 90%; " border :data="tableData">
      <el-table-column prop="id" label="支出id" align="center"></el-table-column>

      <el-table-column prop="payType" label="支出类型" align="center"></el-table-column>

      <el-table-column prop="payUser" label="操作者" align="center"></el-table-column>

      <el-table-column prop="payPrice" label="支出金额/(元)" align="center"></el-table-column>

      <el-table-column prop="date" label="支出时间" align="center"></el-table-column>

      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import addPayItem from "@/components/addPayItem.vue";

export default {
  name: "payment",
  components: {
    addPayItem
  },
  data() {
    return {
      value3: "",
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
        {
          date: "2016-05-02 09:20:00",
          id: "1",
          payType: "二两面条",
          payUser: "面食",
          payPrice: "7",
          remark: "2"
        },
        {
          date: "2016-05-02 09:20:00",
          id: "1",
          payType: "二两面条",
          payUser: "面食",
          payPrice: "7",
          remark: "2"
        }
      ]
    };
  },
  methods: {}
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
#addPay {
  float: left;
}
</style>