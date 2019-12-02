<template>
  <div class="centerStore">
    <el-row>
      <el-col :span="24">
        <h2>风采展示</h2>
      </el-col>
      <el-col :span="24">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in urls" :key="item">
            <el-image  :src="item" ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="详细信息" name="first">
        <StoreMes></StoreMes>
      </el-tab-pane>
      <el-tab-pane label="二维码" name="second">
        <Erweima></Erweima>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StoreMes from "@/components/StoreMes.vue";
import Erweima from "@/components/Erweima.vue";
export default {
  name: "storecenter",
  components: {
    Erweima,
    StoreMes
  },
  data() {
    return {
      urls: [
        require("@/assets/images/store1.jpg"),
        require("@/assets/images/store2.jpg"),
        require("@/assets/images/store2.jpg"),
        require("@/assets/images/store2.jpg")
      ],
      activeName: "first"
    };
  },

  methods: {
  
  }
};
</script>

<style lang="less" >
@import '../assets/css/base.less';

.centerStore {
  text-align:center;
}
.el-row {
  width: 90%;
  margin: 2% auto;
}

.infinite-list-wrapper {
  height: 300px;
}

.erweima {
  width: 50%;
  float: right;
  margin: 0 auto;
  img {
    width: 20%;
  }
}
.el-tabs__item {
  font-size: 20px;
}
.el-tabs {
  width: 90%;
  margin: 2% auto;
}
</style>