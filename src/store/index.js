import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* const foodItems = [
  {
    foodId:0,
    foodName: "超级至尊披萨1",
    price: 91,
    count:2,
    photourl: require('../assets/logo.png'),
    foodTypeId:1,
    foodState:1
  },
  {
    foodId:1,
    foodName: "超级至尊披萨2",
    price: 92,
    count:1,
    photourl: require('../assets/logo.png'),
    foodTypeId:2,
    foodState:1
  },
  {
    foodId:2,
    foodName: "超级至尊披萨3",
    price: 93,
    count:1,
    photourl: require('../assets/logo.png'),
    foodTypeId:3,
    foodState:1
  },
  {
    foodId:3,
    foodName: "超级至尊披萨4",
    price: 94,
    count:1,
    photourl: require('../assets/logo.png'),
    foodTypeId:4,
    foodState:1
  },
  {
    foodId:4,
    foodName: "超级至尊披萨5",
    price: 95,
    count:1,
    photourl: require('../assets/logo.png'),
    foodTypeId:5,
    foodState:1
  },
  {
    foodId:5,
    foodName: "超级至尊披萨6",
    price: 96,
    count:1,
    photourl: require('../assets/logo.png'),
    foodTypeId:6,
    foodState:1
  },
  {
    foodId:6,
    foodName: "超级至尊披萨7",
    price: 97,
    count:1,
    photourl: require('../assets/logo.png'),
    foodTypeId:7,
    foodState:1
  },
  {
    foodId:7,
    foodName: "超级至尊披萨8",
    price: 98,
    count:1,
    photourl: require('../assets/logo.png'),
    foodTypeId:1,
    foodState:1
  },
  {
    foodId:8,
    foodName: "超级至尊披萨9",
    price: 99,
    count:1,
    photourl: require('../assets/logo.png'),
    foodTypeId:2,
    foodState:2
  }
] */
/* const foodType = [
  {
    typeName: "菜品1",
    foodTypeId: 1
  },
  {
    typeName: "菜品2",
    foodTypeId: 2
  },
  {
    typeName: "菜品3",
    foodTypeId: 3
  },
  {
    typeName: "菜品4",
    foodTypeId: 4
  },
  {
    typeName: "菜品5",
    foodTypeId: 5
  },
  {
    typeName: "菜品6",
    foodTypeId: 6
  },
  {
    typeName: "菜品7",
    foodTypeId: 7
  },
] */


/* 主页 &订单 */
export default new Vuex.Store({
  state: {
    foodItems: [],
    foodType: [],
    shoppingCar: [],
    /* orderMng: [], */
    foodList: [],
    hOrderList: []
  },
  getters: {
    currentFoodItems: (state) => (s) => {
      return state.foodItems.filter(item => {
        return item.foodTypeId == s
      })
    },
    currentFoodType: (state) => (s) => {
      return state.foodType.filter(item => {
        return item.foodTypeName.indexOf(s) > -1
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
    addOrder(state, n) {
      state.shoppingCar.push(n)
    },

    /* orderDetail删除 */
    delOrderN(state, n) {
      var p
      state.shoppingCar.forEach((items, index) => {
        if (items.foodId == n) {
          p == index
          return
        }
      })
      state.shoppingCar.splice(p, 1)
    },
    /* 加入历史订单 */
    addOrderMng(state, n) {
      state.orderMng.push(n)
    },
    /* 历史订单删除 */
    delThisOrder(state, n) {
      var ever
      state.orderMng.forEach((items, index) => {
        if (items.foodId == n) {
          ever == index
          return
        }
      })
      state.orderMng.splice(ever, 1)
    },
    /* 传入菜品 */
    save_foodList(state, data) {
      state.foodItems = data
    },
    /* 传入菜类 */
    save_foodType(state, data) {
      state.foodType = data
    },
    save_orderData(state, data){
      state.hOrderList = data
    }
  },
  actions: {
    /* 模拟数据赋值 */
    /* getFoodItemsSync({ commit }) {
      setTimeout(function () {
        commit('getFoodItems', foodItems)
      },0)
    }, */
    /* getFoodTypeSync({ commit }) {
      setTimeout(function () {
        commit('getFoodType', foodType)
      }, 0)
    } */
  }
})
