<template>
  <div class="orderMng">
    <h1>历史订单</h1>
    <div class="ordered-mng">
      <div class="ordered-item">
        <div class="item-top">
          <div class="edx">
            <p>2019-10-16 11:45:32</p>
          </div>
          <div class="edx">
            <p>
              订单号:
              <span>1515165145</span>
            </p>
          </div>

          <div class="del-btn">
            <button class="BtnStyle" type="button">删除</button>
          </div>
        </div>

        <div class="item-order">
          <div>
            <img alt="Vue logo" src="../assets/logo.png" />
          </div>
          <div>
            <h3>超级至尊披萨</h3>
            <p>
              <span>12</span>号桌
            </p>
          </div>
          <div>
            <p>
              <span>93</span> 元
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
/* import { mapState, mapMutations } from "vuex"; */

export default {
  name: "orderDetail",
  data(){

  },
  components: {
    // HelloWorld
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/base.less";

.orderMng{
  h1{
    margin-left: 10%;
  }
}

.ordered-mng {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ordered-item {
  width: 80%;
  text-align: center;
  border: 1px solid #d4d4d4;
  margin-top: 30px;

  .item-top {
    background: #f1f1f1;
    height: 50px;

    p {
      color: #3c3c3c;
    }
  }
}
.item-top,
.item-order {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.item-order {
  height: 110px;
}

.item-order img {
  width: 100px;
  height: 100px;
}
</style>