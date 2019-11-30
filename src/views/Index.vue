<template>
  <div class="index">
    <!-- 左侧导航 -->
    <div class="index-nav">
      <ul>
        <li @click="chooseType" v-for="(item,index) in currentFoodType(searchfoodType)" :key="index">{{item.typeName}}</li>
      </ul>

      <div class="navBottom">
        <router-link to="/orderdetail">
          <button type="button" class="BtnStyle">前往付款 >></button>
        </router-link>
      </div>
    </div>

    <!-- 菜单 -->
    <div class="index-main">
      <div
        class="index-item-box"
        v-for="(item,index) in currentFoodItems(searchfoodItems)"
        :key="index"
      >
        <div class="foodItems">
          <div class="index-items-img">
            <img alt="Vue logo" :src="item.photourl" />
          </div>
          <div>
            <h3>{{item.foodName}}</h3>
            <p>
              <span>{{item.price}}</span>元
            </p>
            <el-button class="BtnStyle" @click="c1(item)" type="primary">购买</el-button>
            <el-drawer
              class="slide-right"
              title="确认购买信息"
              :visible.sync="drawer"
              :with-header="false"
            >
              <div class="forsurePay">
                <div>
                  <h3>菜名：</h3>
                  <p>单价：</p>
                  <p>数量：</p>
                  <p>总价：</p>
                </div>
                <div>
                  <h3>{{item1.foodName}}</h3>
                  <p>{{item1.price}}元</p>
                  <div class="count-btn">
                    <button type="button" @click="subs()"> - </button>
                    <span> {{item1.count}} </span>
                    <button type="button" @click="add()"> + </button>
                  </div>
                  <p>{{item1.price * item1.count}}</p>
                </div>
              </div>
              <div class="forsure-btn">
                <button :plain="true" class="BtnStyle" @click="addFoodBtn()">确认点餐</button>
              </div>
            </el-drawer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import IndexItems from "@/components/IndexItems.vue"; */
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Index",
  components: {
    /* IndexItems */
  },
  data() {
    return {
      searchfoodItems: "",
      searchfoodType: "",
      drawer: false,
      item1: {}
    };
  },
  computed: {
    ...mapState(["foodItems", "foodType"]),
    ...mapGetters(["currentFoodItems", "currentFoodType"])
  },
  created() {
    this.getFoodItemsSync(), this.getFoodTypeSync();
  },
  methods: {
    ...mapActions(["getFoodItemsSync", "getFoodTypeSync"]),
    c1: function(item) {
      this.drawer = true;
      this.item1 = item;
      console.log(item)
    },
    addFoodBtn(item1) {
      console.log(item1)  //unde

      this.$message({
        showClose: true,
        message:"成功添加",
        type:"success"
      })
      this.drawer = false;
    },
    chooseType(e,state){
      console.log(e.target)
      console.log(state.foodItems)
      /* var chooseFood = [] */
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/base.less";

ul li {
  list-style: none;
}

.index-nav {
  width: 100px;
  position: fixed;
  top: 50px;
  left: 0;

  button{
    color: #dd0000;
  }
  .navBottom{
    margin-top: 40px;
  }

  li {
    width: 100px;
    height: 60px;
    background: #cacaca;
    line-height: 60px;
    text-align: center;
  }
}

.index-main {
  margin-left: 170px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}

/* 左滑确认购买 */
.forsurePay {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid @BtnColor;
}
.forsure-btn {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.count-btn button {
  width: 25px;
  height: 25px;
  border: none;
  background: #ff9a00;
  outline: none;
  border-radius: 50%;
  color: #fff;
}
.count-btn button:hover {
  box-shadow: 0 0 5px gray;
}

/* 菜单 */
.foodItems {
  width: 200px;
  height: 270px;
  border: 1px solid #8f8f8f;
  text-align: center;
  padding: 10px 0;
  float: left;
  margin-top: 10px;
  margin-left: 10px;

  span {
    color: #dd0000;
    font-size: 20px;
  }
}

.index-items-img img {
  width: 120px;
  height: 120px;
}

.index-item-box {
  /* padding: 0 10px; */
  overflow: hidden;
  /* display: flex;
        flex-wrap: wrap; */
}
</style>