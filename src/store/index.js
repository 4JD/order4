import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    delHorder(state, n) {
      var p
      state.hOrderList.forEach((items, index) => {
        if (items.foodId == n) {
          p == index
          return
        }
      })
      state.shoppingCar.splice(p, 1)
    },
    /* 加入历史订单 */
    /* addOrderMng(state, n) {
      state.orderMng.push(n)
    }, */
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
