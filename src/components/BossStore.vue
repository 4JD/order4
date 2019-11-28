<template>
  <div class="boss-store">
    <div v-for="(item, index) in storelist" data-storeid="index" :key="index" class="storebox" @click="showStoreMsg">
      <div class="storeimg">
        <img src="../assets/images/store1.jpg" alt="店铺图片" />
      </div>
      <div class="storemsg">
        <p>店铺名称:{{item.storeName}}</p>
        <p>主营类型:{{item.storeMainType}}</p>
        <p>联系人:{{item.storeLinkPople}}</p>
        <p>联系方式:{{item.storeLinkTel}}</p>
        <!-- 
        <p>营业时间:{{item.storeHour}}</p>
        <p>门面地址:{{item.storeAddress}}</p>
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
      /*  
      param: 新增店铺的点击事件
      */
      newStore() {
          console.log(document.getElementsByClassName("newstorebox"));
        //   var storeboxheight = document.getElementsByClassName("storebox")[1].scrollHeight;
        //   var storeboxwidth = document.getElementsByClassName("storebox")[1].scrollWidth;
        
      },
      /*  
      param: 点击查看店铺详情页
      */
      showStoreMsg() {
        
      }
  }
};
</script>

<style lang="less" scoped>
.boss-store {
    text-align: left;
}
.storebox {
    .storeimg img {
        width: 150px;
        height: 150px;
        margin: 5px;
        // border: 1px solid rosybrown;
        border-radius: 50%;
    }
    .storemsg {
      p {
        margin: 5px 0;
      }
    }
text-align: center;
display: inline-block;
  flex-wrap: wrap;
  margin: 10px 0 0 10px;
  box-shadow: 0 0 3px gray;
  min-width: 250px;
  min-height: 280px;
  vertical-align: middle;
  cursor: pointer;
}
.newstorebox {
    font-size: 70px;
    line-height: 280px;
}
</style>