<template>
  <div id="worker">
    <!-- 员工管理图标 -->
    <div class="worker-icon">
      <i class="el-icon-menu"></i>
      <span>员工管理</span>
    </div>

    <!-- 添加与搜索 -->
    <div class="operate">
      <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加员工</el-button>
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
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button @click="toggleSelection()">取消选择</el-button>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>

    </div>

    <!-- 添加员工弹框 -->
    <el-dialog title="添加员工"
     :visible.sync="dialogFormVisible"
     >
      <el-form :model="form">
        <el-form-item label="ID：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别：" :label-width="formLabelWidth" class="choose-sex">
          <input type="radio" name="sex" checked>男
          <input type="radio" name="sex">女
          <input type="radio" name="sex">保密
        </el-form-item>

        <el-form-item label="入职日期：" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="workdate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="生日：" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="birthdate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="地址：" :label-width="formLabelWidth">
          <el-input autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="职位：" :label-width="formLabelWidth">
          <select name="" id="">
            <option value="">厨师</option>
            <option value="">服务员</option>
            <option value="">收营员</option>
          </select>
        </el-form-item>

        <el-form-item label="在职状态：" :label-width="formLabelWidth">
          <el-switch
            style="display: block"
            v-model="valuestate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="在职"
            inactive-text="离职">
          </el-switch>
        </el-form-item>
      </el-form>



      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">添 加</el-button>
      </div>
    </el-dialog>

    

  </div>
</template>

<script>

export default {
  name: 'worker',
  components: {
    
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
      input:'',
      //添加员工弹出模态框
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        tel:''
      },
      formLabelWidth: '120px',
      //入职日期选择
       pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      workdate: '',
      birthdate:'',
      //在职状态
      valuestate:'true'
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
    }

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
  //选择性别
  .choose-sex{
    text-align: left;
  }
  //日期选择
  .block{
    text-align: left;
  }
</style>