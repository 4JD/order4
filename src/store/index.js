import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const foodItems = [
  {
    foodName: "超级至尊披萨1",
    price: 91,
    count:2,
    photourl: require('../assets/logo.png')
  },
  {
    foodName: "超级至尊披萨2",
    price: 92,
    count:1,
    photourl: require('../assets/logo.png')
  },
  {
    foodName: "超级至尊披萨3",
    price: 93,
    count:1,
    photourl: require('../assets/logo.png')
  },
  {
    foodName: "超级至尊披萨4",
    price: 94,
    count:1,
    photourl: require('../assets/logo.png')
  },
  {
    foodName: "超级至尊披萨5",
    price: 95,
    count:1,
    photourl: require('../assets/logo.png')
  },
  {
    foodName: "超级至尊披萨6",
    price: 96,
    count:1,
    photourl: require('../assets/logo.png')
  },
  {
    foodName: "超级至尊披萨7",
    price: 97,
    count:1,
    photourl: require('../assets/logo.png')
  },
  {
    foodName: "超级至尊披萨8",
    price: 98,
    count:1,
    photourl: require('../assets/logo.png')
  },
  {
    foodName: "超级至尊披萨9",
    price: 99,
    count:1,
    photourl: require('../assets/logo.png')
  }
]
const foodType = [
  {
    typeName: "菜品1"
  },
  {
    typeName: "菜品1"
  },
  {
    typeName: "菜品1"
  },
  {
    typeName: "菜品1"
  },
  {
    typeName: "菜品1"
  },
  {
    typeName: "菜品1"
  },
  {
    typeName: "菜品2"
  },
]


/* 主页 &订单 */
const moduleIndexFood = {
  state: {
    foodItems: [],
    foodType: [],
  },
  getters: {
    currentFoodItems: (state) => (s) => {
      return state.foodItems.filter(item => {
        return item.foodName.indexOf(s) > -1
      })
    },
    currentFoodType: (state) => (s) => {
      return state.foodType.filter(item => {
        return item.typeName.indexOf(s) > -1
      })
    },
    getCount: (state) => (s) => {
      return state.foodItems.filter(item => {
        return item.count.indexOf(s) > -1
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
    increment(state,n){
      state.count += n
    },
    decrement(state,n){
      state.count -= n
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
}

export default new Vuex.Store({
  /* 主页 &订单 */
  modules: {
    moduleIndexFood
  }
})
