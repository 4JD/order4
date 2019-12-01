<template>
  <div class="boss-store">
    <div class="storeNumber">{{number+1}}号店铺</div>
    <div class="storeimg">
      <!-- <img src="../assets/images/store1.jpg" alt="店铺图片" /> -->
      <img :src="item.storeImg" alt="店铺图片" />
    </div>
    <div class="storemsg">
      <p>店铺名称:{{item.storeName}}</p>
      <p>主营类型:{{item.storeMainType}}</p>
      <p>联系人:{{item.storeLinkPople}}</p>
      <p>联系方式:{{item.storeLinkTel}}</p>
      <!-- 
        <p>营业时间:{{item.storeHour}}</p>
        <p>门面地址:{{item.storeAddress}}</p>
      <p>店铺备注:{{item.storeRemark}}</p>-->
    </div>
    <div class="caozuo">
      <button class="editstore" @click="showStoreMsg">编辑</button>
      <button class="delstore" @click="delStore">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "bossstore",
  template: {},
  props: {
    item: Object,
    number: Number,
  },
  data() {
    return {};
  },
  methods: {
    /*  
      param: 点击查看店铺详情页
      */
    showStoreMsg() {
      this.$emit("showStoreMsg", this.item);
    },
    /* 删除店铺， */
    delStore() {
      // 参数为数据的id
      this.$emit("delStoreC", this.item.storeId);
    }
  }
};
</script>

<style lang="less" scoped>
.boss-store {
  position: relative;
  text-align: left;
}
.storebox {
  .storeimg img {
    width: 150px;
    height: 150px;
    margin: 5px;
    margin-top: 20px;
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
  margin: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  min-width: 250px;
  min-height: 280px;
  vertical-align: middle;
  cursor: pointer;
}
// 店铺编号
.storeNumber {
  font-size: 16px;
  position: absolute;
  left: 0;
  top: 0;
  color: #ff9a00;
  padding: 5px;
}
// 按钮
.caozuo {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  button {
    width: 60px;
    height: 30px;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  // 编辑
  .editstore {
    background: gray;
  }
  // 删除
  .delstore {
    float: right;
      background: #ff9a00;
      margin-right: 20px;
  }

}
</style>