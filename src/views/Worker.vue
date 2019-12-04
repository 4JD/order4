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
      <!-- <el-button type="info" icon="el-icon-view" @click="looksalary">薪资概况</el-button> -->
      
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
          <!-- <th>工资</th> -->
          <th>在职状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in tableData" :key="index">
          <td><span class="check-span" @click="item.select=!item.select" :class="{'check-true':item.select}"></span></td>
          <td>{{item.workerId}}</td>
          <td>{{item.workerName}}</td>
          <td>{{item.workerSex}}</td>
          <td>{{item.workerTel}}</td>
          <td>{{item.workerAddress}}</td>
          <td>{{item.workerDate}}</td>
          <td>{{item.positionName}}</td>
          <td>{{item.workerState}}</td>
         
          <!-- <td>{{item.salary}}</td> -->
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
      tableData: [],
      //搜索输入框
      searchinput:'',
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
      }

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
        console.log(String(i+1))
        // this.tableData.splice(i,1)
        this.axios.post("/workerDelete",{
          workerId:String(i+1)
        })
        .then(res => {
          console.log("单个删除" ,res.data.data.list);
          // this.tableData = res.data.data.list;
          this.tableData.splice(i+1,1)
        })
        .catch(err => {
          console.log(err);
        });

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
      /* this.tableData = this.tableData.filter((item)=> {
        return item.id = this.searchinput
      }) */
      console.log(typeof(this.searchinput))
      this.axios.post("/workerFindById",{
        workerId:this.searchinput
      })
      .then(res => {
        console.log(res.data.data);
          this.tableData = this.tableData.filter((item)=> {
          return item.workerId = this.searchinput
        })
      })
      .catch(err => {
        console.log(err);
      });
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
  },
  created() {
    this.axios
    .post("/workerFindAll"
    ,{
      page:1,
      limit:8,
      // workerId:'1',
      // workerName:'偏偏',
      // workerSex:'男',
      // workerBirthday:'2019-12-03',
      // workerAddress:'国信安',
      // workerTel:'13344445678',
      // positionId:'1',
      // workerState:'1',
      // remark:'aaaaaaaa'

    }
    )
    .then(res => {
      console.log("获取员工信息：", res.data.data);
      this.tableData = res.data.data.list;
    })
    .catch(err => {
      console.log(err);
    });

    /* this.axios
    .post("/user/searchIncome",{
      userId:1,
      page:1,
      pageSize:5
    })
    .then(res => {
      console.log( res.data);
      // this.tableData = res.data.data.list;
      
    })
    .catch(err => {
      console.log(err);
    }); */
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
    // display: block;
  }

  //员工数量
  .worker-number{
    font-size: 18px;
    font-weight: 500;
  }
</style>