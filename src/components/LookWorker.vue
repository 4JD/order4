<template>
  <div class="lookworker">
    <!-- 查看员工按钮 -->
    <el-button @click="dialogFormVisible = true" type="text" size="small" icon="el-icon-view">查看</el-button>
    <!-- 查看员工弹框 -->
    <el-dialog title="查看员工信息" :visible.sync="dialogFormVisible">
      <el-form :model="tableData">
        <el-form-item label="ID：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="性别：" :label-width="formLabelWidth" class="choose-sex">
          <input type="radio" name="sex" checked>男
        </el-form-item>

        <el-form-item label="入职日期：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="生日：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="地址：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="职位：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="在职状态：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input
          type="textarea"
          :rows="2"
          
          :disabled="true">
        </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'lookworker',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
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
    }
  }
}
</script>

<style lang="less" scoped>
  .lookworker{
    width: 30%;
    float: left;
  }
</style>