<template>
  <div class="orderDetail">
    <h1>支付</h1>
    <div class="timord">
      <div class="edx">
        <p>2019-10-16 11:45:32</p>
      </div>
      <div class="edx">
        <p>
          订单号:
          <span>1515165145</span>
        </p>
      </div>
    </div>

    <div class="ordered-mng">
      <div class="ordered-item" v-for="(item,index) in shoppingCar" :key="index">
        <div class="item-top">
          <div class="del-btn">
            <button class="BtnStyle" type="button" @click="delOrder(item.foodId)">删除</button>
          </div>
        </div>

        <div class="item-order">
          <div>
            <img alt="Vue logo" :src="item.photourl" />
          </div>
          <div class="lineH">
            <h3>{{item.foodName}}</h3>
            <p>
              <span>12</span>号桌
            </p>
          </div>
          <div class="lineH">
            <p>
              数量：
              <span>{{item.count}}</span>
            </p>
            <p>
              <span>{{item.count * item.price}}</span> 元
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 确认付款 -->
    <div class="pay-btn">
      <div>
        <p>
          合计：
          <span>{{countNum}}</span> 元
        </p>
      </div>
      <div>
        <button class="BtnStyle" @click="payBtn()">确认付款</button>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapMutations } from "vuex";

export default {
  name: "orderDetail",
  data() {
    return {
      arr: [0]
    };
  },
  components: {
    // HelloWorld
  },
  computed: {
    ...mapState(["shoppingCar"]),
    countNum() {
      var d = 0;
      this.shoppingCar.forEach(item => {
        d += item.count * item.price;
      });
      return d;
    }
  },
  methods: {
    ...mapMutations(["delOrderN","addOrderMng"]),
    /* 删除 */
    delOrder(foodId) {
      console.log(foodId)
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delOrderN(foodId)
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    /* 付款 */
    payBtn(){
      this.addOrderMng(this.item)
      console.log("加入",this.orderMng)
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/base.less";

.orderDetail {
  h1,
  .edx {
    margin-left: 10%;
  }
}

.timord{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10%;
  margin-top: 10px;
  border: 1px solid #d4d4d4;
  width: 80%;
  background: #e5e5e5;
  height: 50px;
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
  margin-top: 20px;

  .item-top {
    background: #f1f1f1;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;

    p {
      color: #3c3c3c;
    }
  }
}

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

.lineH{
  line-height: 30px;
}

.pay-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  margin-left: 10%;
  border: 1px solid #d4d4d4;
  width: 80%;
  background: #e5e5e5;
  height: 50px;
}
</style>