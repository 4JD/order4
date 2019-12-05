<template>
  <div id="worker">
    <!-- 员工管理图标 -->
    <div class="worker-icon">
      <i class="el-icon-menu"></i>
      <span>员工管理</span>
    </div>

    <!-- 添加与搜索 -->
    <div class="operate">
      <el-button type="danger" icon="el-icon-delete" @click="delAll()">批量删除</el-button>

      <AddWorker @add="addworkerinfo"></AddWorker>

      <el-input
        placeholder="请输入你要搜索的员工ID"
        v-model="searchinput"
        clearable
        id="searchvalue"
        >
      </el-input>
      <el-button type="success" icon="el-icon-search" @click="searchworker()" >搜索员工</el-button>
      
      <span>共有<span class="worker-number"> {{tableData.length}} </span>名员工</span>
      <br>
      <!-- <span>代表在职</span><span>1 </span><span>代表离职，</span><span>0 </span> -->
    </div>

    <!-- 表格 -->
    <div class="worker-table">
      <table>
        <tr>
          <th class="choosespan"><span class="check-span " :class="{'check-true':isSelectAll}" @click="selectAll(isSelectAll)"></span>全选</th>
          <th>ID</th>
          <th>姓名</th>
          <th>性别</th>
          <th>手机</th>
          <th>地址</th>
          <th>入职日期</th>
          <th>职位</th>
          <th>在职状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in tableData" :key="index" :oneworkerid="index">
          <td><span class="check-span" @click="item.select=!item.select" :class="{'check-true':item.select}"></span></td>
          <td>{{item.workerId}}</td>
          <td>{{item.workerName}}</td>
          <td>{{item.workerSex}}</td>
          <td>{{item.workerTel}}</td>
          <td>{{item.workerAddress}}</td>
          <td>{{item.workerDate}}</td>
          <td>{{item.positionName}}</td>
          <td>{{item.workerState}}</td>
          <td>
            <LookWorker :info='item'></LookWorker>
            <AlterWorker :info="item"  @edit="edit"></AlterWorker>
            <el-button type="text" size="small" @click="del" icon="el-icon-delete" class="del-btn">删除</el-button>
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
      },
      oneworkerid:''

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
    del() {
      console.log("单个删除命令",this.oneworkerid)
      this.axios.post("/workerDelete",{
        workerId:String(this.tableData[this.oneworkerid].workerId)
      })
      .then(res => {
        console.log("单个删除" ,res.data);
        this.getWorker();
      })
      .catch(err => {
        console.log(err);
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
    //筛选搜索员工  searchinput
    searchworker() {
      this.getWorker();
    },
    //添加员工
    addworkerinfo(data){
       this.axios.post("/workerInsert",{
        workerId:data.workerId,
        workerName:data.workerName,
        workerSex:data.workerSex,
        workerBirthday:data.workerBirthday,
        workerDate:data.workerDate,
        workerAddress:data.workerAddress,
        workerTel:data.workerTel,
        positionName:data.positionName,
        workerState:data.workerState,
        remark:data.remark
      })
      .then(res => {
        console.log("添加" ,res.data);
        this.axios
        .post("/workerFindAll"
        ,{
          page:1,
          limit:20
        }
        )
        .then(res => {
          console.log("获取员工信息：", res.data.data.list);
          this.tableData = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });


      // this.tableData.push(data)
    },
    //获取员工信息
    getWorker(){
      this.axios
      .post("/workerFindAll"
      ,{
        page:1,
        limit:20,
        workerId:String(this.searchinput)
      }
      )
      .then(res => {
        console.log("获取员工信息：", res.data.data.list);
        this.tableData = res.data.data.list;
      })
      .catch(err => {
        console.log(err);
      });
    },

    //修改
    edit(data) {
      console.log(data.workerBirthday)
      this.axios.post("/workerUpdate",{
        workerId:data.workerId,
        workerName:data.workerName,
        workerSex:data.workerSex,
        workerBirthday:data.workerBirthday,
        workerDate:data.workerDate,
        workerAddress:data.workerAddress,
        workerTel:data.workerTel,
        positionName:data.positionName,
        workerState:data.workerState,
        remark:data.remark
      })
      .then(res => {
        console.log("修改" ,res.data);
        this.axios
        .post("/workerFindAll"
        ,{
          page:1,
          limit:20
        }
        )
        .then(res => {
          console.log("获取员工信息：", res.data.data.list);
          this.tableData = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted: function(){
    var _this = this;
    this.tableData.map(function (item) {
      _this.$set(item, 'select', false);
    });
  },
  created() {
    this.getWorker();
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
    width: 90%;
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