<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-image style="width: 65%;" :src="url" :preview-src-list="srcList"></el-image>
      </el-col>
      <el-col :span="12" class="Mes">
        <ul class="mesList">
          <li>
            <div class="mesName">管理员：</div>
            <div class="mesValue">{{this.storeMes.ownerId}}</div>
          </li>
          <li>
            <div class="mesName">联系电话：</div>
            <div class="mesValue">{{this.storeMes.storeTel}}</div>
          </li>
           <li>
            <div class="mesName">店铺名：</div>
            <div class="mesValue">{{this.storeMes.storeName}}</div>
          </li>
           <li>
            <div class="mesName">主要菜品：</div>
            <div class="mesValue">{{this.storeMes.storeMain}}</div>
          </li>
          <li>
            <div class="mesName">注册地址：</div>
            <div class="mesValue">{{this.storeMes.storeAddress}}</div>
          </li>
          <li>
            <div class="mesName">注册时间：</div>
            <div class="mesValue">{{this.storeMes.registerTime}}</div>
          </li>
          <li>
            <div class="mesName">营业时间：</div>
            <div class="mesValue">{{this.storeMes.storeHour}}</div>
          </li>
          <li>
            <div class="mesName">备注：</div>
            <div class="mesValue">{{this.storeMes.Remark}}</div>
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
    var userId = sessionStorage.getItem('userId');
    this.axios
      .post("/store/findStore",{
        storeId:String(userId)
      })
      .then(res => {
        // console.log("获取店铺信息：", res.data.data);
        this.storeMsg = res.data.data;
      })
      .catch(err => {
        // console.log(err);
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
.mesName {
  display: inline-block;
  width: 50%;
  float: left;
  text-align: right;
}
.mesValue {
  display: inline-block;
  width: 45%;
  float: right;
  text-align: left;
}
ul li {
  line-height: 40px;
}
</style>