<template>
  <div class="orderMng">
    <h1>历史订单</h1>
    <div class="ordered-mng">
      <div class="ordered-item">
        <div v-for="(item,index) in hOrderList" :key="index" class="item-top">
          <div class="edx">
            <p>{{dateFormat(item.orderTime)}}</p>
          </div>
          <div class="edx">
            <p>
              订单号:
              <span>{{item.orderNum}}</span>
            </p>
          </div>

          <div class="del-btn">
            <button class="BtnStyle" type="button" @click="delBtn">删除</button>
          </div>
        </div>

        <div class="item-order" v-for="(item,index) in shoppingCar" :key="index">
          <div>
            <img alt="Vue logo" :src="item.photourl" />
          </div>
          <div>
            <h3>{{item.foodName}}</h3>
            <p>
              <span>{{item.deskNum}}</span>号桌
            </p>
          </div>
          <div>
            <p>
              <span>{{item.count * item.foodPrice}}</span> 元
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapMutations } from "vuex";

export default {
  name: "orderMngDetail",
  data() {
    return {
      
    };
  },
  components: {
    // HelloWorld
  },
  computed: {
    ...mapState(["shoppingCar","hOrderList"])
  },
  methods:{
    ...mapMutations(["delThisOrder","save_orderData"]),
    delBtn(){

    },
    dateFormat: function(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = date.getMonth() + 1 < 10 ? "0" +
       (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
    }
  },
  created() {
    /* 店铺Id */
    this.axios
    .post("/user/placeOrder2", {
      "deskNum":"12",    //桌号
      "foodOrders":[    //菜品列表
        {
          "foodId":1,   //菜品Id
          "foodNum":1   //菜品数量
        },
        {
          "foodId":2,
          "foodNum":1
        }
      ],
      "orderRemark":"不吃辣",    //备注
      "storeId":"1"
    })
    .then(res => {
      var myOrderData = res.data.data
      var orderData = [ ]
      myOrderData.forEach((items) => {
        var neworderData = {};
        neworderData.orderNum = items.orderNum
        neworderData.deskNum = items.deskNum
        neworderData.orderTime = items.orderTime
        neworderData.storeId = items.storeId
        neworderData.orderRemark = items.orderRemark

        orderData.push( neworderData )
      })
      console.log("orderData",orderData)
      this.save_orderData( orderData )

      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/base.less";

.orderMng {
  h1 {
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