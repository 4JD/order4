<template>
  <div class="orderDetail">
    <h1>支付</h1>

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
            <button class="BtnStyle" type="button" @click="delOrder()">删除</button>
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

    <div class="pay-btn">
      <div>
        <p>合计： <span></span></p>
      </div>

      <div>
        <button class="BtnStyle" @click="PayBtn()">确认付款</button>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "orderDetail",
  components: {
    // HelloWorld
  },
  methods:{
    delOrder() {
     this.$confirm("确认删除?","提示",{
       confirmButtonText:'确认',
       cancelButtonText:'取消',
       type:"warning"
     }).then(() => {
       this.$message({
         type:'success',
         message:'删除成功',
         
       });
     }).catch(() => {
       this.$message({
         type:'info',
         message:'取消删除'
       })
     })
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/base.less";

.orderDetail{
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

.pay-btn{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  margin-left: 10%;
  border: 1px solid #d4d4d4;
  width: 80%;
  background: #E5E5E5;
}
</style>