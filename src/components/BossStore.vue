<template>
  <div class="boss-store">
    <div @click="showStoreMsg">
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
  </div>
</template>

<script>

export default {
  name: "bossstore",
  template: {},
  props: {
    item: Object,
  },
  data() {
    return {
      
    };
  },
  methods: {
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
  margin: 5px 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  min-width: 250px;
  min-height: 280px;
  vertical-align: middle;
  cursor: pointer;
}
</style>