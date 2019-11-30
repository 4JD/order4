<template>
  <div id="worker">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 员工管理图标 -->
    <div class="worker-icon">
      <i class="el-icon-menu"></i>
      <span>员工管理</span>
    </div>

    <!-- 添加与搜索 -->
    <div class="operate">
      <el-button type="danger" icon="el-icon-delete" @click="delAll()"  >批量删除</el-button>

      <AddWorker @add="addworkerinfo"></AddWorker>

      <el-input
        placeholder="请输入你要搜索的员工信息"
        v-model="searchinput"
        clearable
        class="searchinput">
      </el-input>
      <el-button type="success" icon="el-icon-search" @click="searchworker()" class="searchworker">搜索员工</el-button>
      <el-button type="info" icon="el-icon-view" @click="looksalary">薪资概况</el-button>
      
      <span>共有<span class="worker-number"> {{tableData.length}} </span>名员工</span>
    </div>

    <!-- 表格 -->
    <div class="worker-table">
      
      <table>
        <tr>
          <th><span class="check-span " :class="{'check-true':isSelectAll}" @click="selectAll(isSelectAll)"></span>全选</th>
          <th>ID</th>
          <th>姓名</th>
          <th>性别</th>
          <th>手机</th>
          <th>地址</th>
          <th>入职日期</th>
          <th>职位</th>
          <th>工资</th>
          <th>在职状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in tableData" :key="index">
          <td><span class="check-span" @click="item.select=!item.select" :class="{'check-true':item.select}"></span></td>
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.tel}}</td>
          <td>{{item.address}}</td>
          <td>{{item.date}}</td>
          <td>{{item.position}}</td>
          <td>{{item.salary}}</td>
          <td>{{item.state}}</td>
          <td>
            <LookWorker :info='item'></LookWorker>
            <AlterWorker :info="item"></AlterWorker>
            <el-button type="text" size="small" @click="del(index)" icon="el-icon-delete" class="del-btn">删除</el-button>
          </td>
        </tr>
      </table>


      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>

    </div>

  </div>
</template>

<script>
import AddWorker from "../components/AddWorker";
import LookWorker from "../components/LookWorker";
import AlterWorker from "../components/AlterWorker";


export default {
  name: 'worker',
  components: {
    AddWorker,
    LookWorker,
    AlterWorker
  },
  data() {
    return {
      tableData: [{
        id:1,
        date: '2016-05-01',
        name: '王小虎',
        sex:'男',
        birthday:'2000-01-01',
        address: '上海市普陀区金沙江路 1518 弄',
        tel:'13344445555',
        position:'服务员',
        salary:'6666.00',
        state:'在职',
        remark:'我是王小虎'
        },
        {
          id:2,
          date: '2016-05-02',
          name: '王老虎',
          sex:'女',
          birthday:'2000-01-02',
          address: '上海市普陀区金沙江路 1518 弄',
          tel:'13344445555',
          position:'收营员',
          salary:'7777.00',
          state:'在职',
          remark:'我是王老虎'
        }, 
        {
          id:3,
          date: '2016-05-03',
          name: '王大虎',
          sex:'保密',
          birthday:'2000-01-03',
          address: '上海市普陀区金沙江路 1518 弄',
          tel:'13344445555',
          position:'厨师',
          salary:'8888.00',
          state:'在职',
          remark:'我是王大虎'
        }
      ],
      //搜索输入框
      searchinput:''

    }
  },
  computed: {
    //检测是否全选
    isSelectAll:function() {
      
      return this.tableData.every(function (val) { return val.select});
    }
  },
  methods: {
    //单个删除员工
    del(i) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(i)
        this.tableData.splice(i,1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //批量删除员工
    delAll() {
      this.tableData = this.tableData.filter(function(item) {return !item.select})
    },
    //全选
    selectAll: function(_isSelect) {
      //遍历tableData，全部取反
      for (var i = 0, len = this.tableData.length; i < len; i++) {
        this.tableData[i].select = !_isSelect;
      }
    },
    //跳转查看员工收入页面
    looksalary() {
      this.$router.replace("/workersalary");
    },
    //筛选搜索员工
    searchworker() {
      
      this.tableData = this.tableData.filter((item)=> {
        return item.id = this.searchinput
      })
    },
    //添加员工
    addworkerinfo(data){
      this.tableData.push(data)
    }
  },
  mounted: function(){
    var _this = this;
    
    this.tableData.map(function (item) {
      _this.$set(item, 'select', false);
    });
  }
  
  
  
}
</script>

<style lang="less" scoped>
  //员工管理图标
  .worker-icon{
    font-size: 20px;
    text-align: left;
    height: 60px;
    line-height: 60px;
  }

  // 增加和搜索
  .operate{
    height: 50px;
    line-height: 50px;
  }
  .operate .el-button{
    float: left;
    margin-top: 5px;
  }
  .operate > span {
    float: right;
  }
  .operate .el-input{
    width: 20%;
    float: left;
    margin: 0 10px;
  }
  // 取消选中按钮
  .worker-table .el-button{
    float: left;
    margin-top: 5px;
  }
  // 分页
  .el-pagination{
    float: right;
    margin-top: 10px;
    margin-right: 20px;
  }

  //单个删除按钮
  .worker-table .el-button[data-v-06627738]{
    margin-top: 0;
    float: left;
    margin-left: 5px;
  }


  table {
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    text-align: center;
  }
  table,tr,th,td {
    border: 1px solid rgb(175, 154, 154);
  }
  .check-span{
    background: url("../assets/images/spring.png") no-repeat 0 0;
    display: block;
    width: 24px;
    height: 20px;
  }
  .check-span.check-true{
    background: url("../assets/images/spring.png") no-repeat 0 -22px;
  }

  //员工数量
  .worker-number{
    font-size: 18px;
    font-weight: 500;
  }
</style>