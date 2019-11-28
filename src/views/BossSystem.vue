<template>
  <div class="app-boss">
    <el-container>
      <!-- 头部 -->
      <el-header class="header" style="height: 50px;">{{bossName}}的管理系统</el-header>
      <el-container class="inner">
        <!-- 左侧导航 -->
        <el-aside style="width: 200px;" class="left-nav">
          <nav>
            <div class="mean" id="checkmean" @click="checkMean" data-show="1">
              <i class="el-icon-thumb"></i>
              店铺管理
            </div>
            <div class="mean" @click="checkMean" data-show="2">
              <i class="el-icon-set-up"></i>
              店铺详情
            </div>
            <div class="mean" @click="checkMean" data-show="3">
              <i class="el-icon-set-up"></i>
              收益比例
            </div>
          </nav>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main class="innerbox">
          <!-- 店铺管理 -->
          <div class="meaninner" v-show="showMean==1">
            <BossStore
              v-for="(item, index) in storelist"
              :item="item"
              data-storeid="index"
              :key="index"
              class="storebox"
            ></BossStore>
            <div class="storebox newstorebox" @click="newStore">
              <i class="el-icon-circle-plus-outline"></i>
            </div>
          </div>
          <!-- 店铺详情 -->
          <div class="meaninner" v-show="showMean==2">
            <div class="storesearch">
              <input type="text" placeholder="请输入搜索店铺名...">
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <BossShowAllEarnings
              v-for="(item,index) in storelist"
              :key="index"
              :item="item"
              :storelist="storelist"
              class="earningsbox"
            ></BossShowAllEarnings>
          </div>
          <!-- 收益比例 -->
          <div class="meaninner" v-show="showMean==3">
            <BossShowStoreMsg
              :storelist="storelist"
            ></BossShowStoreMsg>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 名下所有店铺信息查看，管理店铺
import BossStore from "../components/BossStore";
// 每店铺收益详情 
import BossShowAllEarnings from "../components/BossShowAllEarnings";
// 店铺收入比例信息
import BossShowStoreMsg from "../components/BossShowStoreMsg";
// 数据
var storelist = [
  {
    storeId: 1,
    storeImg: "../assets/logo.png",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeName: "内江牛肉面",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 2,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 3,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 4,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 5,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 6,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  },
  {
    storeId: 7,
    storeImg: "../assets/logo.png",
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 19999.0,
    storeExpend: 9999.0
  }
];

export default {
  name: "appBoss",
  components: {
    //   名下所有店铺信息
    BossStore,
    // 每店铺收益详情 
    BossShowAllEarnings,
    //   店铺收入比例信息
    BossShowStoreMsg,

  },
  data() {
    return {
      // tab 选项卡显示值
      showMean: 1,
      //   老板名称
      bossName: "master boss",
      storelist
    };
  },
  methods: {
    checkMean(e) {
      /*  
        获取自定的值显示哪一方
      */
      // console.log(Number(e.target.getAttribute("data-show")));
      // 移除其他菜单的ID属性
      document.getElementById("checkmean").removeAttribute("id");
      // 给当前标签添加 ID 属性
      e.target.setAttribute("id", "checkmean");
      // 修改显示的tab 内容的值
      this.showMean = Number(e.target.getAttribute("data-show"));
    },
    /*  
      param: 新增店铺的点击事件
    */
    newStore() {
      console.log(document.getElementsByClassName("newstorebox"));
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
// 头部
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #23262e;
  color: white;
  letter-spacing: 2px;
}
// 内容
.inner {
  // 左侧导航
  .left-nav {
    min-height: 550px;
    background: #23262e;
    position: fixed;
    left: 0;
    top: 50px;

    nav {
      width: 100%;
      .mean {
        width: 100%;
        height: 50px;
        background: #23262e;
        line-height: 50px;
        color: white;
        letter-spacing: 2px;
      }
      #checkmean {
        background: #ff9a00;
      }
    }
    // background: lightblue;
  }
  // 右侧内容
  .innerbox {
    margin-top: 50px;
    margin-left: 200px;
    min-width: 200px;
    // background: lightcoral;
    .newstorebox {
      font-size: 70px;
      line-height: 280px;
      color: #ff9a00;
      text-align: center;
      display: inline-block;
      flex-wrap: wrap;
      margin: 5px 5px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
      min-width: 250px;
      min-height: 280px;
      vertical-align: middle;
      cursor: pointer;
    }
    // 店铺详情
    .earningsbox {
      margin: 10px 0;
    }
  }
}
</style>