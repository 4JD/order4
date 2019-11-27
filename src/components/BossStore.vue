<template>
  <div class="boss-store">
    <div v-for="(item, index) in storelist" data-storeid="index" :key="index" class="storebox">
      <div class="storeimg">
        <img src="../assets/logo.png" alt="店铺图片" />
      </div>
      <div class="storemsg">
        <p>店铺名称:{{item.storeName}}</p>
        <p>主营类型:{{item.storeMainType}}</p>
        <!-- <p>联系人:{{item.storeLinkPople}}</p>
        <p>联系方式:{{item.storeLinkTel}}</p>
        <p>门面地址:{{item.storeAddress}}</p>
        <p>营业时间:{{item.storeHour}}</p>
        <p>店铺备注:{{item.storeRemark}}</p> -->
      </div>
      <!-- <div>收入：{{item.storeIncome}}，支出{{item.storeExpend}}</div> -->
    </div>
    <div class="storebox newstorebox" @click="newStore">
      <i class="el-icon-circle-plus-outline"></i>
    </div>
  </div>
</template>

<script>
var storelist = [
  {
    storeId: 1,
    storeImg: "../assets/logo.png",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeName: "内江牛肉面",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 2,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 3,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 4,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 5,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 6,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 7,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  }
];

export default {
  name: "bossstore",
  template: {},
  data() {
    return {
      storelist
    };
  },
  methods: {
      newStore() {
          console.log(document.getElementsByClassName("newstorebox"));
      },
  }
};
</script>

<style lang="less" scoped>
* {
    text-align: left;
}
.storebox {
    text-align: center;
  display: inline-block;
  width: 300px;
  margin: 20px 0 0 30px;
  box-shadow: 0 0 5px black;
}
</style>