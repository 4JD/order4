<template>
  <div class="index-item-box">
    <div class="foodItems">
      <div class="index-items-img">
        <img alt="Vue logo" src="../assets/logo.png" />
      </div>
      <div>
        <h3>{{info.foodName}}</h3>
        <p><span>{{info.price}}</span>元</p>
        <button class="BtnStyle">购买</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexItems",
  props: ['info']
};
</script>

<style lang="less" scoped>
    @import '../assets/css/base.less';

    .foodItems {
        width: 200px;
        height: 270px;
        border: 1px solid #8f8f8f;
        text-align: center;
        padding: 10px 0;
        float: left;
        margin-top: 10px;
        margin-left: 10px;

        span{
            color: #dd0000;
            font-size: 20px;
        }
    }

    .index-items-img img {
        width: 120px;
        height: 120px;
    }

    .index-item-box{
        /* padding: 0 10px; */
        overflow: hidden;
        /* display: flex;
        flex-wrap: wrap; */
    }
</style>
