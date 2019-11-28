<template>
  <div>
      <el-row>
      <el-col :span="24">
        <h1>店铺中心</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
       <h2>风采展示</h2>
      </el-col>
      <el-col :span="24">
       
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <h2>详细信息</h2>
      </el-col>
      <el-col :span="6">
       <ul class="mesList">
          <li>管理员：</li>
          <li>联系电话：</li>
          <li>老板名：</li>
          <li>店铺名称：</li>
          <li>店铺地址：</li>
        </ul>
         <ul class="mesListItem">
            <li>张三</li>
            <li>3423534</li>
            <li>李四</li>
            <li>香飘飘</li>
            <li>学府大道二段</li>
          </ul>
      </el-col>
      
      <el-col :span="12">
        <h2>详细信息</h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'storecenter'
}
</script>

<style scoped>
.el-row {
  width: 90%;
  margin: 2% auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

h2 {
  float: left;
}
</style>