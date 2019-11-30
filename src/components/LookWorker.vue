<template>
  <div class="lookworker">
    <!-- 查看员工按钮 -->
    <el-button @click="dialogFormVisible = true" type="text" size="small" icon="el-icon-view">查看</el-button>
    <!-- 查看员工弹框 -->
    <el-dialog title="查看员工信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="ID：" :label-width="formLabelWidth">
          <el-input  autocomplete="off" :disabled="true" v-model="info.id">{{info.id}}</el-input>
        </el-form-item>

        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true" v-model="info.name">{{info.name}}</el-input>
        </el-form-item>

        <el-form-item label="性别：" :label-width="formLabelWidth" >
          <el-input  autocomplete="off"  :disabled="true" v-model="info.sex">{{info.sex}}</el-input>
        </el-form-item>

        <el-form-item label="入职日期：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true" v-model="info.date">{{info.date}}</el-input>
        </el-form-item>

        <el-form-item label="生日：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true" v-model="info.birthday">{{info.birthday}}</el-input>
        </el-form-item>

        <el-form-item label="手机：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true" v-model="info.tel">{{info.tel}}</el-input>
        </el-form-item>

        <el-form-item label="地址：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true" v-model="info.address">{{info.address}}</el-input>
        </el-form-item>

        <el-form-item label="职位：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true" v-model="info.position">{{info.position}}</el-input>
        </el-form-item>

        <el-form-item label="工资：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true" v-model="info.salary">{{info.salary}}</el-input>
        </el-form-item>

        <el-form-item label="在职状态：" :label-width="formLabelWidth">
          <el-input  autocomplete="off"  :disabled="true" v-model="info.state">{{info.state}}</el-input>
        </el-form-item>

        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input
          type="textarea"
          :rows="2"
          v-model="info.remark"
          :disabled="true">
          {{info.remark}}
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
  props:['info'],
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px'
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