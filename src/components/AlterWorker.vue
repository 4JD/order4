<template>
  <div class="alter-worker">
    <!-- 修改员工按钮 -->
    <el-button type="text" size="small" @click="dialogFormVisible = true" icon="el-icon-edit">编辑</el-button>
    <!-- 修改员工弹框 -->
    <el-dialog title="编辑员工信息" :visible.sync="dialogFormVisible">
      <el-form >
        <el-form-item label="ID：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="info.id" clearable placeholder="请输入员工ID">{{info.id}}</el-input>
        </el-form-item>

        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="info.name" clearable placeholder="请输入员工姓名">{{info.name}}</el-input>
        </el-form-item>

        <el-form-item label="性别：" :label-width="formLabelWidth" class="choose-sex">
          <el-input  autocomplete="off" v-model="info.sex" clearable placeholder="请选择员工性别">{{info.sex}}</el-input>
        </el-form-item>

        <el-form-item label="入职日期：" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="info.date"
              align="right"
              type="date"
              placeholder="选择入职日期"
              :picker-options="pickerOptions">
              {{info.date}}
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="生日：" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="info.birthday"
              align="right"
              type="date"
              placeholder="选择生日"
              :picker-options="pickerOptions">
              {{info.birthday}}
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="info.tel" clearable placeholder="请输入员工电话号码">{{info.tel}}</el-input>
        </el-form-item>

        <el-form-item label="地址：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="info.address" clearable placeholder="请输入员工地址">{{info.address}}</el-input>
        </el-form-item>

        <el-form-item label="职位：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="info.position" clearable placeholder="请选择员工职位">{{info.position}}</el-input>
        </el-form-item>

        <el-form-item label="薪资：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="info.salary" clearable placeholder="请输入员工薪资">{{info.salary}}</el-input>
        </el-form-item>

        <el-form-item label="在职状态：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="info.state" clearable placeholder="请选择员工在职状态">{{info.state}}</el-input>
        </el-form-item>

        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="info.remark">
          {{info.remark}}
        </el-input>
        </el-form-item>
      </el-form>



      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;canceladd()">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;addsuccess()" >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'alterworker',
  props:['info'],
  data() {
    return {
      //添加员工弹出模态框
      dialogFormVisible: false,
      
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
      valuestate:'true',
      //员工备注信息
      textarea: ''
    }
  },
  methods: {
    //修改成功
    addsuccess(){
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    //取消编辑
    canceladd(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
  /* .add-worker{
    width: 120px;
    height: 50px;
    float: left;
    margin-left: 10px;
  } */
  //选择性别
  .choose-sex{
    text-align: left;
  }
  //日期选择
  .block{
    text-align: left;
  }
  //职位选择
  #choose-position{
    float: left;
    margin-top: 10px;
  }
  .choose-state{
    text-align: left;
    margin-top: 8px;
  }
  // 弹框样式设置
  .el-form-item{
    margin-bottom: 10px;
  }
  .el-dialog__body{
    padding: 15px;
  }

  .alter-worker{
    width: 40%;
    float: left;
  }
</style>