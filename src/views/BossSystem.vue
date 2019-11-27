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
              收益比例
            </div>
          </nav>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main class="innerbox">
          <div class="meaninner" v-show="showMean==1">
            <BossStore></BossStore>
          </div>
          <div class="meaninner" v-show="showMean==2">
            <BossShowStoreMsg></BossShowStoreMsg>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 名下所有店铺信息查看，管理店铺
import BossStore from "../components/BossStore";
// 店铺收入比例信息
import BossShowStoreMsg from "../components/BossShowStoreMsg";

export default {
  name: "appBoss",
  components: {
    //   名下所有店铺信息
    BossStore,
    //   店铺收入比例信息
    BossShowStoreMsg
  },
  data() {
    return {
        // tab 选项卡显示值
      showMean: 1,
        //   老板名称
        bossName: "master boss",
    };
  },
  methods: {
    checkMean(e) {
        // 获取自定的值显示哪一方
        // console.log(Number(e.target.getAttribute("data-show")));
        // 移除其他菜单的ID属性
        document.getElementById("checkmean").removeAttribute("id");
        // 给当前标签添加 ID 属性
        e.target.setAttribute("id","checkmean");
        // 修改显示的tab 内容的值
        this.showMean = Number(e.target.getAttribute("data-show"));
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
  }
}
</style>