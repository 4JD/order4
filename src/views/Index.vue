<template>
  <div class="index">
    <h1>点餐</h1>
    <!-- 左侧导航 -->
    <div class="index-nav">
      <ul>
        <li class="typeList" 
        :class="activeClass == index ? 'active':'back'"
        v-for="(item,index) in currentFoodType('')" 
        :key="index" 
        @click="chooseType(item.typeId); getItem(index)">
        {{item.typeName}}</li>
      </ul>

      <div class="navBottom">
        <router-link to="/orderdetail">
          <button type="button" class="BtnStyle"> 前往付款 >> </button>
        </router-link>
      </div>
    </div>

    <!-- 菜单 -->
    <div class="index-main">
      <div
        class="index-item-box"
        v-for="(item,index) in currentFoodItems(newIndex)"
        :key="index"
      >
        <div class="foodItems">
          <div class="index-items-img">
            <img alt="Vue logo" :src="item.photourl" />
          </div>
          <div class="underImg">
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex"

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
      newIndex: 1,
      activeClass: 0
    };
  },
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["currentFoodItems", "currentFoodType"])
  },
  created() {
    this.getFoodItemsSync(), this.getFoodTypeSync()
    this.save_foodList({a : 2})

    /* 获取数据 */
    /* this.axios
    .post("/foodType/foodTypeList", {
      "storeId": "1"
    })
    .then(res => {
      var myData = res.data.data
      var foodItems = []
      myData.forEach((items) => {
        var newFood = {}
        newFood.foodId = myData.foodId

        foodItems.push(newFood)
      })
    
      this.save_foodList(foodItems)

      console.log(res)
    })
    .catch(err => {
      console.log(err)
    }) */
  },
  methods: {
    ...mapActions(["getFoodItemsSync", "getFoodTypeSync",]),
    ...mapMutations(["addOrder","save_foodList"]),
    c1: function(item) {
      this.drawer = true
      this.item1 = item
      console.log(item)
    },
    add(){
      this.item1.count += 1
    },
    subs(){
      if(this.item1.count > 1){
        this.item1.count -= 1
      }
    },
    addFoodBtn() {
      console.log("aaaa",this.item1)
      this.addOrder(this.item1)

      this.$message({
        showClose: true,
        message:"成功添加",
        type:"success"
      })
      this.drawer = false
    },
    chooseType(e){
      this.newIndex = e
    },
    getItem(index){
      this.activeClass = index
    },
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/base.less";

ul li {
  list-style: none;
}

.active{
  color: #fff;
  font-size: 18px;
  background: @BtnColor;
  transform: translateX(20px);
  transition: .3s ease-in-out;
}
.back{
  transform: translateX(0);
  transition: .3s ease-in-out;
  background: #23262e;
  color: #fff;
}

.index{
  h1{
    margin-left: 200px;
    margin-top: 20px;
  }
}

.index-nav {
  width: 100px;
  float: left;
  margin-top: 40px;

  .typeList:hover{
    cursor: pointer;
  }

  button{
    color: #dd0000;
  }
  .navBottom{
    margin-top: 40px;
  }

  li {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border:1px solid #fff;
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

  .underImg{
    line-height: 40px;
  }

  span {
    color: #dd0000;
    font-size: 20px;
  }
}
.index-item-box:hover{
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
</style>