<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-image style="width: 65%;" :src="url" :preview-src-list="srcList"></el-image>
      </el-col>
      <el-col :span="12" class="Mes">
        <ul class="mesList">
          <li>
            <span class="mesName">管理员：</span>
            <span>张三</span>
          </li>
          <li>
            <span class="mesName">联系电话：</span>
            <span>13554657733</span>
          </li>
          <li>
            <span class="mesName">老板名：</span>
            <span>李四</span>
          </li>
          <li>
            <span class="mesName">营业执照号：</span>
            <span>43535436</span>
          </li>
          <li>
            <span class="mesName">店铺名称：</span>
            <span>飘香</span>
          </li>
          <li>
            <span class="mesName">店铺地址：</span>
            <span>学府大道二段</span>
          </li>
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
      srcList: [require("@/assets/images/timg.jpg")],
      storeMes: []
    };
  },
  created() {
    this.axios
      .post("/store/findStore", {
        "storeId":"1"
      })
      .then(res => {
        console.log("获取店铺信息：", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.Mes {
  box-shadow: 0 2px 6px rgb(160, 159, 159);
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
// .mesName {
//   display: inline-block;
//   width: 50%;
//   float: right;
// }
ul li {
  line-height: 40px;
}
</style>