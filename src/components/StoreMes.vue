<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-image style="width: 65%;" :src="url" :preview-src-list="srcList"></el-image>
      </el-col>
      <el-col :span="12" class="Mes">
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
  name: "storemes",
  data() {
    return {
      url: require("@/assets/images/timg.jpg"),
      srcList: [require("@/assets/images/timg.jpg")]
    };
  },
  created () {
      //   this.axios.get('/user/',{

        // })
        // .then(res=> {
        //   console.log('获取支出信息：',res.data);
 
        // })
        // .catch(err => {
        //   console.log(err);
        // })
  }
};
</script>

<style lang="less" scoped>
.Mes {
  box-shadow: 0 2px 6px rgb(160, 159, 159);
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.mesList {
  width: 30%;
  float: left;
  text-align: right;
}
ul li {
  line-height: 40px;
}
</style>