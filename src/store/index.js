import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const foodItems = [
  {
    foodId:0,
    foodName: "超级至尊披萨1",
    price: 91,
    count:2,
    photourl: require('../assets/logo.png'),
    typeId:1,
    foodState:1
  },
  {
    foodId:1,
    foodName: "超级至尊披萨2",
    price: 92,
    count:1,
    photourl: require('../assets/logo.png'),
    typeId:2,
    foodState:1
  },
  {
    foodId:2,
    foodName: "超级至尊披萨3",
    price: 93,
    count:1,
    photourl: require('../assets/logo.png'),
    typeId:3,
    foodState:1
  },
  {
    foodId:3,
    foodName: "超级至尊披萨4",
    price: 94,
    count:1,
    photourl: require('../assets/logo.png'),
    typeId:4,
    foodState:1
  },
  {
    foodId:4,
    foodName: "超级至尊披萨5",
    price: 95,
    count:1,
    photourl: require('../assets/logo.png'),
    typeId:5,
    foodState:1
  },
  {
    foodId:5,
    foodName: "超级至尊披萨6",
    price: 96,
    count:1,
    photourl: require('../assets/logo.png'),
    typeId:6,
    foodState:1
  },
  {
    foodId:6,
    foodName: "超级至尊披萨7",
    price: 97,
    count:1,
    photourl: require('../assets/logo.png'),
    typeId:7,
    foodState:1
  },
  {
    foodId:7,
    foodName: "超级至尊披萨8",
    price: 98,
    count:1,
    photourl: require('../assets/logo.png'),
    typeId:1,
    foodState:1
  },
  {
    foodId:8,
    foodName: "超级至尊披萨9",
    price: 99,
    count:1,
    photourl: require('../assets/logo.png'),
    typeId:2,
    foodState:2
  }
]
const foodType = [
  {
    typeName: "菜品1",
    typeId:1
  },
  {
    typeName: "菜品2",
    typeId:2
  },
  {
    typeName: "菜品3",
    typeId:3
  },
  {
    typeName: "菜品4",
    typeId:4
  },
  {
    typeName: "菜品5",
    typeId:5
  },
  {
    typeName: "菜品6",
    typeId:6
  },
  {
    typeName: "菜品7",
    typeId:7
  },
]


/* 主页 &订单 */
export default new Vuex.Store({
  state: {
    foodItems: [],
    foodType: [],
    shoppingCar: [],
    orderMng: [],
    foodList:[]
  },
  getters: {
    currentFoodItems: (state) => (s) => {
      return state.foodItems.filter(item => {
        return item.typeId == s
      })
    },
    currentFoodType: (state) => (s) => {
      return state.foodType.filter(item => {
        return item.typeName.indexOf(s) > -1
      })
    }
  },
  mutations: {
    getFoodItems(state, n) {
      state.foodItems = n
    },
    getFoodType(state, n) {
      state.foodType = n
    },
    /* 添加购物车 */
    addOrder(state,n){
      state.shoppingCar.push(n)
    },

    /* 删除 */
    delOrderN(state,n){
      state.shoppingCar.slice(n,1)
    },
    /* 加入历史订单 */
    addOrderMng(state,n){
      state.orderMng.push(n)
    },

    save_foodList(state, data){
      state.foodList = data
    }
  },
  actions: {
    getFoodItemsSync({ commit }) {
      setTimeout(function () {
        commit('getFoodItems', foodItems)
      },0)
    },
    getFoodTypeSync({ commit }) {
      setTimeout(function () {
        commit('getFoodType', foodType)
      },0)
    }
  }
})
