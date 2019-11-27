<template>
  <div class="index">
    <!-- 左侧导航 -->
    <div class="index-nav">
      <ul>
        <li>菜品1</li>
        <li>菜品1</li>
        <li>菜品1</li>
        <li>菜品1</li>
        <li>菜品1</li>
        <li>菜品1</li>
      </ul>
    </div>

    <div class="index-main">
      <IndexItems v-for="(item,index) in foodItems" :key="index" :info="item"></IndexItems>
    </div>
  </div>
</template>

<script>
import IndexItems from "@/components/IndexItems.vue";

const foodItems = [
    {
        foodName:"超级至尊披萨2",
        price: 96
    },
    {
        foodName:"超级至尊披萨",
        price: 96
    },
    {
        foodName:"超级至尊披萨",
        price: 96
    },
    {
        foodName:"超级至尊披萨",
        price: 96
    },
    {
        foodName:"超级至尊披萨",
        price: 96
    },
    {
        foodName:"超级至尊披萨",
        price: 96
    },
    {
        foodName:"超级至尊披萨",
        price: 96
    },
    {
        foodName:"超级至尊披萨",
        price: 96
    },
    {
        foodName:"超级至尊披萨",
        price: 96
    },
]

export default {
  name: "Index",
  components: {
    IndexItems
  },
  data() {
      return {
          foodItems: []
      }
  },
  created() {
      this.foodItems = foodItems
  }
};
</script>

<style lang="less" scoped>
    @import '../assets/css/base.less';

ul li {
  list-style: none;
}

.index-nav {
  width: 150px;
  position: fixed;
  top: 50px;
  left: 0;

  li {
    width: 150px;
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
</style>