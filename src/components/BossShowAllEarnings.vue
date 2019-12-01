<template>
  <div class="bossshowallearnings">
    <div class="onestoremsg">
      <div class="onestoreimg">
        <img src="../assets/images/store2.jpg" alt="店铺图片" />
      </div>
      <div class="onstoreremark">
        <p>店铺名字: {{item.storeName}}</p>
        <p>主营类型:{{item.storeMainType}}</p>
        <p>营业时间:{{item.storeHour}}</p>
        <p>门面地址:{{item.storeAddress}}</p>
      </div>
    </div>

    <!-- 图表内容 -->
    <div class="echarts"></div>
  </div>
</template>

<script>
export default {
  name: "bossshowallearnings",
  props: {
    item: Object
  },
  data() {
    return {};
  },
  methods: {},

};
</script>


<style lang="less">
.earningsbox {
  text-align: left;
  width: 90%;
  margin-left: 5%;
  min-width: 450px;
  min-height: 200px;
  flex-wrap: wrap;
  box-shadow: 0 0 5px gray;
  display: inline-block;
  .onestoremsg {
    .onestoreimg {
      // background: pink;
      width: 200px;
      height: 170px;
      float: left;
    }
    .onestoreimg img {
      width: 150px;
      height: 150px;
      margin: 0 20px;
    }
    .onstoreremark {
      margin-left: 200px;
      min-width: 100px;
    }
  }
}
</style>