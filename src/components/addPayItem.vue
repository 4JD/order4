<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" id="addPay">
      <i class="el-icon-upload el-icon--right"></i>添加支出
    </el-button>

    <el-dialog title="请在下方添加支出" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
     
        <el-form-item label="支出类型" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.type" placeholder="请选择支出类型"> 
            <el-option label="工资" value="工资"></el-option>
            <el-option label="原材料" value="原材料"></el-option>
            <el-option label="房租" value="房租"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作者" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.name" placeholder="请选择操作者">
            <el-option label="张三" value="张三"></el-option>
            <el-option label="李四" value="李四"></el-option>
            <el-option label="王五" value="王五"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支出金额" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.price" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="支出备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
        dialogFormVisible: false,
        ruleForm: {
          type: '工资',
          name: '张三',
          price: '',
          remark: ''
        },
        formLabelWidth: '120px',
        rules: {
          price: [
            { required: true, message: '请输入金额', trigger: 'blur' },
            { type:'number', message: '请输入数字', trigger: 'blur' }
          ]
        }
    }
  }
};
</script>

<style scoped>
  .el-dialog__header .el-dialog__title {
    font-size: 24px;
  }
  .el-select {
    width: 80%;
  }
  .el-textarea {
    width: 80%;
    text-align: center;
  }
  #addPay {
    float: left;
  }

</style>