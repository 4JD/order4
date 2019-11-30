<template>
  <div>
    <el-row>
      <el-col :span="24" class="Mes">
        <ul class="mesList">
          <li>管理员：</li>
          <li>联系电话：</li>
          <li>老板名：</li>
          <li>营业执照号：</li>
          <li>店铺名称：</li>
          <li>店铺地址：</li>
        </ul>
        <ul class="mesListItem">
          <li>张三</li>
          <li>3423534</li>
          <li>李四</li>
          <li>43535436</li>
          <li>香飘飘</li>
          <li>学府大道二段</li>
        </ul>
      </el-col>
     
    </el-row>
  </div>
</template>

<script>
export default {
  name:'storemes'
}
</script>

<style lang="less" scoped>


.mesList {
  width: 30%;
  float: left;
  text-align: right;
}
ul li {
  line-height: 40px;

}
</style>