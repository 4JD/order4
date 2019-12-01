<template>
  <div class="app-boss">
    <!-- 内容布局 -->
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
              <i class="el-icon-notebook-2"></i>
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
              :number="index"
              data-storeid="index"
              :key="index"
              class="storebox"
              @delStoreC="delStore"
              @showStoreMsg="showStoreMsg"
            ></BossStore>

            <div class="storebox newstorebox" @click="newStore">
              <i class="el-icon-circle-plus-outline"></i>
            </div>
          </div>

          <!-- 店铺详情 -->
          <div class="meaninner" v-show="showMean==2">
            <div class="storesearch">
              <input type="text" placeholder="请输入搜索店铺名..." />
              <i class="searchBtn el-icon-search"></i>
            </div>
            <!-- 回到顶部 -->
            <a href="#top" class="gotop">
              <i class="el-icon-caret-top"></i>
            </a>
            <!-- 店铺信息组件 -->
            <BossShowAllEarnings
              v-for="(item,index) in storelist"
              :key="index"
              :item="item"
              class="earningsbox"
            ></BossShowAllEarnings>
          </div>

          <!-- 收益比例 -->
          <div class="meaninner" v-show="showMean==3">
            <BossShowStoreMsg :storelist="storelist"></BossShowStoreMsg>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 店铺详细信息 -->
    <div class="storedetailbox">
      <span class="closestoredetailbox" @click="closestoredetailbox">
        <i class="el-icon-close"></i>
      </span>
      <h2>店铺详情</h2>
      <div class="storehead">
        <img :src="showstoredetailmsg.storeImg" alt="门店图片" />
      </div>
      <div class="msgbox">
        名 &nbsp;&nbsp; 称:
        <input type="text" v-model="showstoredetailmsg.storeName" />
        <br />账 &nbsp;&nbsp; 号:
        <input type="text" v-model="showstoredetailmsg.storeUser" />
        <br />密 &nbsp;&nbsp; 码:
        <input type="password" v-model="showstoredetailmsg.storePassword" />
      </div>
      <div class="elsemsg">
        <br />负 责 人:
        <input type="text" v-model="showstoredetailmsg.storeLinkPople" />
        联系方式:
        <input type="text" v-model="showstoredetailmsg.storeLinkTel" />
        <br />营 业 段:
        <input type="hour" v-model="showstoredetailmsg.storeHour" />
        主营食品:
        <input type="text" v-model="showstoredetailmsg.storeMainType" />
        <br />地 &nbsp;&nbsp; 址:
        <input type="address" v-model="showstoredetailmsg.storeAddress" />
        <br />
      </div>
      <div class="closeorenter">
        <button type="button" class="closestoredetail" @click="closestoredetailbox">取消</button>
        <button type="button" class="enterstoredetail" @click="enterstoredetailbox">确认</button>
      </div>
    </div>
    <!-- 遮罩 -->
    <div class="zhezhao" @click="closezhezhao"></div>
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
    storeImg: require("../assets/images/store1.jpg"),
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeName: "内江牛肉面",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 999.0,
    storeExpend: -199.0,
    storeUser: "fairy-liyu",
    storePassword: "1291010010"
  },
  {
    storeId: 2,
    storeImg: require("../assets/images/store1.jpg"),
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张二娃",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 999.0,
    storeExpend: -199.0,
    storeUser: "fairy-liyu",
    storePassword: "1291010010"
  },
  {
    storeId: 3,
    storeImg: require("../assets/images/store1.jpg"),
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "风车车",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 999.0,
    storeExpend: -199.0,
    storeUser: "fairy-liyu",
    storePassword: "1291010010"
  },
  {
    storeId: 4,
    storeImg: require("../assets/images/store1.jpg"),
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "main宝儿",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 999.0,
    storeExpend: -199.0,
    storeUser: "fairy-liyu",
    storePassword: "1291010010"
  },
  {
    storeId: 5,
    storeImg: require("../assets/images/store1.jpg"),
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "东来阁",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 999.0,
    storeExpend: -199.0,
    storeUser: "fairy-liyu",
    storePassword: "1291010010"
  },
  {
    storeId: 6,
    storeImg: require("../assets/images/store1.jpg"),
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 999.0,
    storeExpend: -199.0,
    storeUser: "fairy-liyu",
    storePassword: "1291010010"
  },
  {
    storeId: 7,
    storeImg: require("../assets/images/store1.jpg"),
    storeName: "内江牛肉面",
    storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
    storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    storeLinkPople: "张富贵",
    storeLinkTel: "19191891881",
    storeHour: "9:00-23:00",
    storeMainType: "面食品",
    storeIncome: 999.0,
    storeExpend: -199.0,
    storeUser: "fairy-liyu",
    storePassword: "1291010010"
  }
];
// -------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------

export default {
  name: "appBoss",
  components: {
    //   名下所有店铺信息
    BossStore,
    // 每店铺收益详情
    BossShowAllEarnings,
    //   店铺收入比例信息
    BossShowStoreMsg
  },
  data() {
    return {
      // tab 选项卡显示值
      showMean: 1,
      //   老板名称
      bossName: "master boss",
      storelist,
      // 显示店铺详情弹框的信息
      showstoredetailmsg: {
        storeId: 1,
        storeImg: require("../assets/images/store1.jpg"),
        storeAddress: "四川省.成都市.高新区.天府二街.云华路333号",
        storeName: "内江牛肉面",
        storeRemark: "辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
        storeLinkPople: "张富贵",
        storeLinkTel: "19191891881",
        storeHour: "9:00-23:00",
        storeMainType: "面食品",
        storeIncome: 19999.0,
        storeExpend: 9999.0,
        storeUser: "fairy-liyu",
        storePassword: "1291010010"
      }
    };
  },
  methods: {
    // 右击左边的tab选项卡事件
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
      this.$confirm("确定新建一个店铺吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "新建成功!"
          });
          // 点击确定过后要进行的操作

          // 与点击遮罩层一样的作用
          this.closezhezhao();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消新建"
          });
        });
    },
    /*  
    点击每个店铺，店铺详细信息显示
    */
    showStoreMsg(item) {
      this.showstoredetailmsg = item;
      // 遮罩层的打开
      document.getElementsByClassName("zhezhao")[0].classList.remove("none");
      document.getElementsByClassName("zhezhao")[0].classList.add("show");
      // 店铺详情弹窗 的打开
      document
        .getElementsByClassName("storedetailbox")[0]
        .classList.remove("none");
      document
        .getElementsByClassName("storedetailbox")[0]
        .classList.add("show");
    },
    /* 删除相应的店铺 */
    delStore(delstoreid) {
      // delstoreid为删除的数据的id
      console.log(delstoreid);
      this.$confirm("确定删除该店铺吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // 点击确定过后要进行的操作

          // 与点击遮罩层一样的作用
          this.closezhezhao();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    /*
    关闭店铺详情弹窗  
    */
    closestoredetailbox() {
      //  点击相当于遮罩层点击功能
      this.closezhezhao();
    },
    /*  
    店铺详情的弹窗的确认按钮
    */
    enterstoredetailbox() {
      this.$confirm("确定更改该店铺信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          // 点击确定过后要进行的操作

          // 与点击遮罩层一样的作用
          this.closezhezhao();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    /* 
    遮罩层的点击事件
    */
    closezhezhao() {
      // 遮罩层的关闭
      document.getElementsByClassName("zhezhao")[0].classList.remove("show");
      document.getElementsByClassName("zhezhao")[0].classList.add("none");
      // 店铺详情弹窗 的关闭
      document
        .getElementsByClassName("storedetailbox")[0]
        .classList.remove("show");
      document
        .getElementsByClassName("storedetailbox")[0]
        .classList.add("none");
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
  z-index: 99;
  position: fixed;
  left: 0;
  text-align: center;
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
    min-height: 1000px;
    background: #23262e;
    position: fixed;
    left: 0;
    top: 50px;
    text-align: center;
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
      line-height: 340px;
      color: #ff9a00;
      text-align: center;
      display: inline-block;
      flex-wrap: wrap;
      margin: 15px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
      min-width: 250px;
      min-height: 340px;
      vertical-align: middle;
      cursor: pointer;
    }
    // 店铺详情
    // 店铺详情下的搜索
    .storesearch {
      margin: 10px 0;
      text-align: right;
      position: relative;
      padding-right: 5%;
      font-size: 16px;
      height: 30px;
      input {
        height: 100%;
        width: 30%;
        border-radius: 15px;
        text-indent: 10px;
        border: 1px solid #000;
      }
      .searchBtn {
        position: absolute;
        top: 0;
        font-size: 20px;
        color: #000;
        line-height: 30px;
        width: auto;
        right: 7%;
      }
    }
    // 店铺详情下的回到顶部
    .gotop {
      position: fixed;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: white;
      background: #ff9a00;
      border-radius: 50%;
      bottom: 20px;
      right: 20px;
    }
    // 店铺详情下的每一个组件，店铺组件
    .earningsbox {
      margin: 10px auto;
      margin-left: 5%;
    }
  }
}
// 每个店铺详情店铺信息
.storedetailbox {
  display: none;
  width: 600px;
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 5px #000;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  background: white;
  // 标题
  h2 {
    text-align: center;
  }
  // 关闭详情页弹窗的按钮
  .closestoredetailbox {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    color: black;
    padding: 10px;
    cursor: pointer;
  }
  // 店铺图片
  .storehead {
    width: 150px;
    height: 150px;
    float: left;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  // 名称 用户名 密码 等信息
  .msgbox {
    margin-left: 170px;
    input {
      height: 30px;
      width: 80%;
      margin: 10px 0;
      border: none;
      box-shadow: 0 0 2px black;
      text-indent: 10px;
    }
  }
  .elsemsg {
    input {
      height: 30px;
      width: 35%;
      margin: 5px 0;
      border: none;
      box-shadow: 0 0 2px black;
      text-indent: 10px;
    }
    // 地址
    input[type="address"] {
      width: 87%;
    }
  }
  // 取消和确定按钮
  .closeorenter {
    padding: 10px;
    width: 100%;
    button {
      width: 60px;
      height: 30px;
      border: none;
      outline: none;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
    .closestoredetail {
      background: gray;
    }
    .enterstoredetail {
      float: right;
      background: #ff9a00;
      margin-right: 10px;
    }
  }
}

// 遮罩层
.zhezhao {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: none;
  left: 0;
  background: rgba(0, 0, 0, 0.329);
  z-index: 900;
}
// 显示
.show {
  display: block;
}
// 隐藏
.none {
  display: none;
}
</style>