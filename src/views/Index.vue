<template>
  <div class="index">
    <h1>点餐</h1>
    <!-- 左侧菜类导航 -->
    <div class="index-nav">
      <ul>
        <li
          class="typeList"
          :class="activeClass == index ? 'active':'back'"
          v-for="(item,index) in currentFoodType('')"
          :key="index"
          @click="chooseType(item.foodTypeId); getItem(index)"
        >{{item.foodTypeName}}</li>
      </ul>

      <div class="navBottom">
        <router-link to="/orderdetail">
          <button type="button" class="BtnStyle">
            前往付款
            <i class="el-icon-right"></i>
          </button>
        </router-link>
      </div>
    </div>

    <!-- 菜品 -->
    <div class="index-main">
      <div class="index-item-box" v-for="(item,index) in currentFoodItems(newIndex)" :key="index">
        <div class="foodItems">
          <div class="index-items-img">
            <img alt="Vue logo" :src="item.foodPhoto" />
          </div>
          <div class="underImg">
            <h3>{{item.foodName}}</h3>
            <p>
              <span>{{item.foodPrice}}</span>元
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
                  <p>{{item1.foodPrice}}元</p>
                  <div class="count-btn">
                    <button type="button" @click="subs()">-</button>
                    <span>{{item1.count}}</span>
                    <button type="button" @click="add()">+</button>
                  </div>
                  <p>{{item1.foodPrice * item1.count}}</p>
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
    <div class="nomore">
      <p>没有更多了...</p>
    </div>
  </div>
</template>

<script>
// 获取当前登录人员id
const userId = sessionStorage.getItem("userId");
/* console.log("当前登录人员id",userId); */

/* import IndexItems from "@/components/IndexItems.vue"; */
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

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
      item1: {},
      newIndex: 5,
      activeClass: 0,
      // 当前登录人员id
      userId,
      // 当前登录店铺信息
      storeMsg: {}
    };
  },
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["currentFoodItems", "currentFoodType"])
  },
  created() {
    /* ----------------------------------查找店铺信息的AJAX开始------------------------------ */
    this.axios
      .post("/store/findStore", {
        // 参数 店铺id
        storeId: String(this.userId)
      })
      .then(res => {
        /* console.log("查找当前登录的店铺信息：",res); */
        // 给当前登录店铺信息赋值
        this.storeMsg = res.data.data;
        /* console.log("当前店铺信息",this.storeMsg) */
      });
    /* .catch(err => {
          console.log(err);
        }); */
    /* ----------------------------------查找店铺信息的AJAX结束------------------------------ */
    /* this.getFoodItemsSync(), this.getFoodTypeSync()  */
    /* this.save_foodList({ a : 2 }) */

    /*  获取菜品数据 */
    this.axios
      .post("/food/foodList", {
        foodTypeId: String(this.newIndex)
      })
      .then(res => {
        const newFoodList = [];
        for (var i = 0; i < res.data.data.foods.length; i++) {
          var a = {
            foodId: res.data.data.foods[i].foodId,
            foodName: res.data.data.foods[i].foodName,
            foodPhoto: res.data.data.url + res.data.data.foods[i].foodPhoto,
            foodPrice: res.data.data.foods[i].foodPrice,
            foodRemark: res.data.data.foods[i].foodRemark,
            foodState: res.data.data.foods[i].foodState,
            foodTypeId: res.data.data.foods[i].foodTypeId,
            foodTypeName: res.data.data.foods[i].foodTypeName,
            saleId: res.data.data.foods[i].saleId,
            saleState: res.data.data.foods[i].saleState,
            tasteId: res.data.data.foods[i].tasteId
          };
          newFoodList.push(a);
        }
        /* console.log(newFoodList); */

        /* 数据传入vuex */
        var myData = newFoodList;
        var foodItems = [];
        myData.forEach(items => {
          var newFood = {};
          newFood.foodId = items.foodId;
          newFood.foodName = items.foodName;
          newFood.foodPhoto = items.foodPhoto;
          newFood.foodPrice = items.foodPrice;
          newFood.foodTypeId = items.foodTypeId;
          newFood.count = 1;
          newFood.foodState = items.foodState;
          newFood.deskNum = 1;
          newFood.foodNum = 1;
          newFood.storeId = 61;

          foodItems.push(newFood);
        });
        /* console.log("foodItems", foodItems); */
        this.save_foodList(foodItems);
        /* console.log(res); */
      });
    /* .catch(err => {
        console.log(err);
      }); */

    /*  获取菜类数据 */
    this.axios
      .post("/foodType/foodTypeList", {
        storeId: String(this.userId)
      })
      .then(res => {
        /* 数据传入vuex */
        var myTypeData = res.data.data;
        var foodType = [];
        myTypeData.forEach(items => {
          var newFoodType = {};
          newFoodType.foodTypeId = items.foodTypeId;
          newFoodType.foodTypeName = items.foodTypeName;
          newFoodType.foodTypeState = items.foodTypeState;

          foodType.push(newFoodType);
        });
        /* console.log("foodType", foodType); */
        this.save_foodType(foodType);
        /* console.log(res); */
      });
    /* .catch(err => {
        console.log(err);
      }); */
  },
  methods: {
    ...mapActions(["getFoodItemsSync", "getFoodTypeSync"]),
    ...mapMutations(["addOrder", "save_foodList", "save_foodType"]),
    c1: function(item) {
      this.drawer = true;
      this.item1 = item;
      /* console.log(item); */
    },
    add() {
      this.item1.count += 1;
    },
    subs() {
      if (this.item1.count > 1) {
        this.item1.count -= 1;
      }
    },
    addFoodBtn() {
      /* console.log("加入", this.item1); */
      this.addOrder(this.item1);

      this.$message({
        showClose: true,
        message: "成功添加",
        type: "success"
      });
      this.drawer = false;
    },
    chooseType: function(foodTypeId) {
      this.newIndex = foodTypeId;

      this.axios
        .post("/food/foodList", {
          foodTypeId: String(this.newIndex)
        })
        .then(res => {
          const newFoodList = [];
          for (var i = 0; i < res.data.data.foods.length; i++) {
            var a = {
              foodId: res.data.data.foods[i].foodId,
              foodName: res.data.data.foods[i].foodName,
              foodPhoto: res.data.data.url + res.data.data.foods[i].foodPhoto,
              foodPrice: res.data.data.foods[i].foodPrice,
              foodRemark: res.data.data.foods[i].foodRemark,
              foodState: res.data.data.foods[i].foodState,
              foodTypeId: res.data.data.foods[i].foodTypeId,
              foodTypeName: res.data.data.foods[i].foodTypeName,
              saleId: res.data.data.foods[i].saleId,
              saleState: res.data.data.foods[i].saleState,
              tasteId: res.data.data.foods[i].tasteId
            };
            newFoodList.push(a);
          }
          /* console.log(newFoodList); */

          /* 数据传入vuex */
          var myData = newFoodList;
          var foodItems = [];
          myData.forEach(items => {
            var newFood = {};
            newFood.foodId = items.foodId;
            newFood.foodName = items.foodName;
            newFood.foodPhoto = items.foodPhoto;
            newFood.foodPrice = items.foodPrice;
            newFood.foodTypeId = items.foodTypeId;
            newFood.count = 1;
            newFood.foodState = items.foodState;
            newFood.deskNum = 1;

            foodItems.push(newFood);
          });
          /* console.log("foodItems", foodItems); */
          this.save_foodList(foodItems);
          /* console.log(res); */
        });
      /* .catch(err => {
          console.log(err);
        }); */
    },
    getItem(index) {
      this.activeClass = index;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/base.less";

ul li {
  list-style: none;
}

.active {
  color: #fff;
  font-size: 18px;
  background: @BtnColor;
  transform: translateX(20px);
  transition: 0.3s ease-in-out;
}
.back {
  transform: translateX(0);
  transition: 0.3s ease-in-out;
  background: #23262e;
  color: #fff;
}

.index {
  h1 {
    margin-left: 200px;
    margin-top: 20px;
  }
}

.index-nav {
  width: 100px;
  float: left;
  margin-top: 40px;
  margin-left: 50px;

  .typeList:hover {
    cursor: pointer;
  }

  button {
    color: #dd0000;
  }
  .navBottom {
    margin-top: 40px;
  }

  li {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #fff;
  }
}

.index-main {
  margin-top: 30px;
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
  line-height: 40px;
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
  line-height: 25px;
  cursor: pointer;
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

  .underImg {
    line-height: 40px;
  }

  span {
    color: #dd0000;
    font-size: 20px;
  }
}
.index-item-box:hover {
  box-shadow: 0 0 7px gray;
}

.index-items-img img {
  width: 120px;
  height: 120px;
}

.index-item-box {
  margin-left: 10px;
  margin-top: 10px;
  /* padding: 0 10px; */
  overflow: hidden;
  /* display: flex;
        flex-wrap: wrap; */
}
.nomore {
  color: #808080;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}
</style>