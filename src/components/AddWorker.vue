<template>
  <div class="addworker">
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加员工</el-button>
    <!-- 添加员工弹框 -->
    <el-dialog title="添加员工" :visible.sync="dialogFormVisible" destroy-on-close>
      <el-form>
        <el-form-item label="ID：" :label-width="formLabelWidth"   :rules="[{ required: true, message: 'id不能为空'}]">
          <el-input  autocomplete="off"  clearable placeholder="请输入员工ID" v-model="addform.id"></el-input>
        </el-form-item>

        <el-form-item label="姓名：" :label-width="formLabelWidth"  :rules="[{ required: true, message: '姓名不能为空',trigger: 'blur' }]">
          <el-input  autocomplete="off"  clearable placeholder="请输入员工姓名"  v-model="addform.name"></el-input>
        </el-form-item>

        <el-form-item label="性别：" :label-width="formLabelWidth" class="choose-sex" :rules="[{ required: true, message: '请选择性别', trigger: 'change' }]">
          <el-input  autocomplete="off"  clearable placeholder="请输入员工性别"  v-model="addform.sex"></el-input>
        </el-form-item>

        <el-form-item label="入职日期：" :label-width="formLabelWidth" :rules="[{ type: 'date', required: true, message: '请选择入职日期', trigger: 'change' }]">
          <div class="block">
            <el-date-picker
              align="right"
              type="date"
              placeholder="选择入职日期"
              :picker-options="pickerOptions"
              v-model="addform.date" >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="生日：" :label-width="formLabelWidth"  :rules="[{ type: 'date', required: true, message: '请选择生日', trigger: 'change' }]">
          <div class="block">
            <el-date-picker
              align="right"
              type="date"
              placeholder="选择生日"
              :picker-options="pickerOptions"
               v-model="addform.birthday">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="手机：" :label-width="formLabelWidth" :rules="[{ required: true, message: '电话号码不能为空', trigger: 'blur' }]">
          <el-input  autocomplete="off"  clearable placeholder="请输入员工电话号码" maxlength="11"  v-model="addform.tel"></el-input>
        </el-form-item>

        <el-form-item label="地址：" :label-width="formLabelWidth"  :rules="[{ required: true, message: '地址不能为空', trigger: 'blur' }]">
          <el-input  autocomplete="off"  clearable placeholder="请输入员工地址"  v-model="addform.address"></el-input>
        </el-form-item>

        <el-form-item label="职位：" :label-width="formLabelWidth"  :rules="[{ required: true, message: '请选择一个职位', trigger: 'change' }]">
          <el-input  autocomplete="off"  clearable placeholder="请输入员工职位"  v-model="addform.position"></el-input>
        </el-form-item>

        <el-form-item label="工资：" :label-width="formLabelWidth"  :rules="[{ required: true, message: '请填写薪资', trigger: 'blur' }]">
          <el-input  autocomplete="off" clearable placeholder="请输入员工薪资"  v-model="addform.salary"></el-input>
        </el-form-item>

        <el-form-item label="在职状态：" :label-width="formLabelWidth" class="workstate">
          <el-input  autocomplete="off" clearable placeholder="请输入员工在职状态"  v-model="addform.state"></el-input>
        </el-form-item>

        <el-form-item label="备注：" :label-width="formLabelWidth"  :rules="[{ required: true, message: '请填写备注', trigger: 'blur' }]">
          <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="addform.remark" >
        </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;canceladd();">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; addWorker();addsuccess()" >添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'addworker',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      addform:{
        id:'',
        date: '',
        name: '',
        sex:'',
        birthday:'',
        address: '',
        tel:'',
        position:'',
        salary:'',
        state:'',
        remark:''
      }
      
     
    }
     

  },
  methods: {
    //添加成功
    addsuccess() {
      
      this.$message({
        message: '添加成功',
        type: 'success',        
      });
    },
    canceladd() {
       
      
    },
    addWorker() {
      this.$emit('add',{
        id:this.addform.id,
        date:this.addform.date,
        name:this.addform.name,
        sex:this.addform.sex,
        birthday:this.addform.birthday,
        address:this.addform.address,
        tel:this.addform.tel,
        position:this.addform.position,
        salary:this.addform.salary,
        state:this.addform.state,
        remark:this.addform.remark
      })
    }
    
  }
}
</script>

<style lang="less" scoped>
  .addworker{
    width: 120px;
    height: 50px;
    float: left;
    margin-left: 10px;
  }
  //性别选择
  .choose-sex{
    text-align: left;
  }
  //日期选择
  .block{
    text-align: left;
  }
  //职位选择
  .choose-position{
    float: left;
    margin-top: 10px;
  }
  .choose-state{
    text-align: left;
    margin-top: 8px;
  }
  .workstate{
    text-align: left;
  }
  // 弹框样式设置
  /* .el-form-item{
    margin-bottom: 10px;
  } */
  .el-dialog__body{
    padding: 15px;
  }

</style>