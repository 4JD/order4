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
      <el-button type="danger" icon="el-icon-delete" @click="delAll">批量删除</el-button>
      <AddWorker></AddWorker>
      <el-input
        placeholder="请输入你要搜索的员工信息"
        v-model="input"
        clearable>
      </el-input>
      <el-button type="success" icon="el-icon-search">搜索员工</el-button>
      <span>共有{{tableData.length}}名员工</span>
    </div>

    <!-- 表格 -->
    <div class="worker-table">
      <el-table
        :data="tableData"
        stripe
        border
        size='small'
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        style="width: 100%">

        <el-table-column
          type="selection"
          width="55"
          align="center">
        </el-table-column>

        <el-table-column
          prop="id"
          label="ID"
          align="center"
          sortable>
        </el-table-column>

        <el-table-column
          prop="name"
          label="姓名"
          align="center">
        </el-table-column>

        <el-table-column
          prop="sex"
          label="性别"
          align="center">
        </el-table-column>

        <el-table-column
          prop="date"
          label="入职日期"
          align="center"
          sortable>
        </el-table-column>

        <el-table-column
          prop="birthday"
          label="生日"
          align="center"
          sortable>
        </el-table-column>
        
        <el-table-column
          prop="tel"
          label="电话"
          align="center">
        </el-table-column>

        <el-table-column
          prop="address"
          label="地址"
          align="center"
          width="200">
        </el-table-column>

        <el-table-column
          prop="position"
          label="职位"
          align="center">
        </el-table-column>

        <el-table-column
          prop="state"
          label="在职状态"
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          prop="remark"
          label="操作"
          align="center"
          width="250">
          <template class="worker-operate">
            
            <LookWorker></LookWorker>
            <AlterWorker></AlterWorker>
            
            <el-button type="text" size="small" @click="del" icon="el-icon-delete" class="del-btn">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button @click="toggleSelection()" class="cancel-btn">取消选择</el-button>

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
        state:'在职'
      },
      {
        id:2,
        date: '2016-05-02',
        name: '王老虎',
        sex:'男',
        birthday:'2000-01-02',
        address: '上海市普陀区金沙江路 1518 弄',
        tel:'13344445555',
        position:'服务员',
        state:'在职'
      }, 
      {
        id:3,
        date: '2016-05-03',
        name: '王大虎',
        sex:'男',
        birthday:'2000-01-03',
        address: '上海市普陀区金沙江路 1518 弄',
        tel:'13344445555',
        position:'服务员',
        state:'在职'
      }],
      //默认都没有选中
      multipleSelection: [],
      //搜索输入框
      input:''

    }
  },
  methods: {
    //添加员工弹框
    
    //全选与取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //单个删除员工
    del() {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
      this.$confirm('此操作将删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
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
    }
    
  }
  
  
}
</script>

<style lang="less" scoped>
  /* *{
    margin: 0;
    padding: 0;
  } */
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
  //取消选中按钮
  .cancel-btn{
    margin-left: 0;
  }
</style>