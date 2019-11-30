<template>
  <div class="boss-storemsg" id="container" @click="showImages">
      <div v-for="(item,index) in storelist" :key="index">
          <h1>{{item.storeName}}</h1>
      </div>
  </div>
</template>

<script>
export default {
  name: "bossshowstoremsg",
  template: {},
  props: {
      storelist: Object,
  },
  data() {
    return {

    };
  },
  methods: {
    showImages() {
     console.log(typeof(this.storelist));
    },
  }
};
</script>