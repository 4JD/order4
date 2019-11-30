<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>店铺中心</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h2>风采展示</h2>
      </el-col>
      <el-col :span="24">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in urls" :key="item">
            <h3 class="medium"><el-image  :src="item" alt=""></el-image></h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="详细信息" name="first">
      <StoreMes></StoreMes>
    </el-tab-pane>
    <el-tab-pane label="二维码" name="second">
      <Erweima></Erweima>
    </el-tab-pane>

  </el-tabs>
    
  </div>
</template>

<script>
import StoreMes from '@/components/StoreMes.vue'
import Erweima from '@/components/Erweima.vue'
export default {
  name: "storecenter",
  components: {
    Erweima,
    StoreMes
  },
  data() {
    return {
      urls: [ 
        require('@/assets/images/store1.jpg'),
        require('@/assets/images/store2.jpg'),
        require('@/assets/images/store2.jpg'),
        require('@/assets/images/store2.jpg')     
      ],
       activeName: 'first'
    };
  },
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="less" >
.el-row {
  width: 90%;
  margin: 2% auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.infinite-list-wrapper {
  height: 300px;
}

.erweima {
  width: 50%;
  float: right;
  margin: 0 auto;
  img {
    width: 20%;
  }
}
.el-tabs__item {
  font-size: 20px;
}
.el-tabs {
  width: 90%;
  margin: 2% auto;
}
</style>