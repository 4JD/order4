<template>
  <div class="income-list">
  <el-row>
      <el-col :span="24">
        <h2><span class="el-icon-menu"></span>收入情况</h2>
      </el-col>
    </el-row>
    <el-form ref="form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="支付类型：">
            <el-select placeholder="支付类型">
              <el-option label="支付宝" value="zhifubao"></el-option>
              <el-option label="微信" value="weichat"></el-option>
              <el-option label="现金" value="cash"></el-option>
            </el-select>
         </el-form-item> 
        </el-col>
        <el-col :span="4">
           <el-form-item>
          
         </el-form-item> 
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品类型：">
          <el-select placeholder="商品类型">
            <el-option label="面食" value="mianshi"></el-option>
            <el-option label="小炒" value="xiaochao"></el-option>
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
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item >
          
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="其他：">
           <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

      <el-table  stripe style="width: 90%; "  border  :data="tableData">
      <el-table-column
        prop="id"
        label="收入id"
        align="center">
      </el-table-column>

      <el-table-column
        prop="goodsName"
        label="商品名"
        align="center">
      </el-table-column>

      <el-table-column
        prop="goodsType"
        label="商品类型"
        align="center">
      </el-table-column>

      <el-table-column
        prop="price"
        label="单价/(元)"
        align="center">
      </el-table-column>

      <el-table-column
        prop="number"
        label="卖出数量/(份)"
        align="center">
      </el-table-column>
      
      <el-table-column
        prop="totalPrice"
        label="总价/(元)"
        align="center">
      </el-table-column>

      <el-table-column
        prop="payment"
        label="支付方式"
        align="center">
      </el-table-column>

      <el-table-column
        prop="date"
        label="支付时间"
        width="190"
        align="center">

      </el-table-column>

  </el-table>
  </div>
</template>


<script>

export default {
  name: 'income',
  components: {
    
  },
  data () {
    return {
       value2: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
         tableData: [{
          date: '2016-05-02 09:20:00',
          id: '1',
          goodsName: '二两面条',
          goodsType: '面食',
          price: '7',
          number: '2',
          totalPrice: '14',
          payment: '支付宝'
        }, {
          date: '2016-05-02 09:20:00',
          id: '1',
          goodsName: '二两面条',
          goodsType: '面食',
          price: '7',
          number: '2',
          totalPrice: '14',
          payment: '支付宝'
        }, {
          date: '2016-05-02 09:20:00',
          id: '1',
          goodsName: '二两面条',
          goodsType: '面食',
          price: '7',
          number: '2',
          totalPrice: '14',
          payment: '支付宝'
        }]
    }
  }
 
}
</script>

<style lang="less">
    h2 {
    float: left;
    margin-left: 5%;
  }
  .el-table {
    margin:2% auto;
  }
  .el-form {
    width: 90%;
    margin:2% auto; 
  }
  .el-input {
    width: 80%;
  }
</style>