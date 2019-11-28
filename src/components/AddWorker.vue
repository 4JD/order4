<template>
  <div class="addworker">
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加员工</el-button>
    <!-- 添加员工弹框 -->
    <el-dialog title="添加员工" :visible.sync="dialogFormVisible" destroy-on-close>
      <el-form :model="form" >
        <el-form-item label="ID：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="form.id" clearable placeholder="请输入员工ID"></el-input>
        </el-form-item>

        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="form.name" clearable placeholder="请输入员工姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别：" :label-width="formLabelWidth" class="choose-sex" >
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
          <el-radio v-model="form.sex" label="3">保密</el-radio>
        </el-form-item>

        <el-form-item label="入职日期：" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.workdate"
              align="right"
              type="date"
              placeholder="选择入职日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="生日：" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.birthday"
              align="right"
              type="date"
              placeholder="选择生日"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="form.tel" clearable placeholder="请输入员工电话号码"></el-input>
        </el-form-item>

        <el-form-item label="地址：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="form.area" clearable placeholder="请输入员工地址"></el-input>
        </el-form-item>

        <el-form-item label="职位：" :label-width="formLabelWidth">
          <el-select v-model="form.job" placeholder="请选择" class="choose-position">
            <el-option
              v-for="item in form.joboption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="在职状态：" :label-width="formLabelWidth" class="workstate">
          <!-- <el-switch
            style="display: block"
            v-model="form.valuestate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="在职"
            inactive-text="离职" class="choose-state">
          </el-switch> -->
          <span>{{form.state}}</span>
        </el-form-item>

        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.remark">
        </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;canceladd()">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;addsuccess()" >添 加</el-button>
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
      form: {
        id:'',
        name: '',
        sex:'',
        workdate: '',
        birthday: '',
        tel:'',
        area: '',
        job:'',
        joboption: [{
          value: '选项1',
          label: '大厨'
        }, {
          value: '选项2',
          label: '服务员'
        }, {
          value: '选项3',
          label: '收营员'
        }, {
          value: '选项4',
          label: '配送小哥'
        }, {
          value: '选项5',
          label: '洗碗工'
        }],
        state:'在职',
        remark:''        
      },
      formLabelWidth: '120px'
  
      
     
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
      this.form = {
        id:'',
        name: '',
        sex:'',
        workdate: '',
        birthday: '',
        tel:'',
        area: '',
        job:'',
        joboption: [{
          value: '选项1',
          label: '大厨'
        }, {
          value: '选项2',
          label: '服务员'
        }, {
          value: '选项3',
          label: '收营员'
        }, {
          value: '选项4',
          label: '配送小哥'
        }, {
          value: '选项5',
          label: '洗碗工'
        }],
        state:'在职',
        remark:''  
      }
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
  .el-form-item{
    margin-bottom: 10px;
  }
  .el-dialog__body{
    padding: 15px;
  }

</style>