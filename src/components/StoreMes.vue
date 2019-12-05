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
            <span>{{this.storeMes.ownerId}}</span>
          </li>
          <li>
            <span class="mesName">联系电话：</span>
            <span>{{this.storeMes.storeTel}}</span>
          </li>
           <li>
            <span class="mesName">店铺名：</span>
            <span>{{this.storeMes.storeName}}</span>
          </li>
           <li>
            <span class="mesName">主要菜品：</span>
            <span>{{this.storeMes.storeMain}}</span>
          </li>
          <li>
            <span class="mesName">注册地址：</span>
            <span>{{this.storeMes.storeAddress}}</span>
          </li>
          <li>
            <span class="mesName">注册时间：</span>
            <span>{{this.storeMes.registerTime}}</span>
          </li>
          <li>
            <span class="mesName">营业时间：</span>
            <span>{{this.storeMes.storeHour}}</span>
          </li>
          <li>
            <span class="mesName">备注：</span>
            <span>{{this.storeMes.Remark}}</span>
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
      .post("/store/findStore",{
        storeId:"39"
      })
      .then(res => {
        console.log("获取店铺信息：", res.data.data);
        this.storeMes = res.data.data;
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