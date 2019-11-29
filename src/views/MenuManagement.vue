<template>
  <div class="app-MenuManagement">
    <!-- 添加分类的弹出层 -->
    <!-- <div class="addtagzhezhao">
          
    </div>-->

    <!-- 第一部分 ，菜品标签添加管理 -->
    <div class="menutag">
      <div class="menutag-top">
        <button type="button" class="addtag" @click="addtag">添加分类</button>
        <p class="alltag">共{{foodTypeList.length}}个菜品</p>
      </div>
      <div class="menutag-bottom">
        <div v-for="(item, index) in foodTypeList" :key="index" class="tag">
          <i class="deltagbtn el-icon-close" data-num="index"></i>
          {{item.foodTypeName}}
        </div>
      </div>
    </div>
    <!-- 第二部分，菜品管理 -->
    <div class="menu">
      <!-- 菜品管理上半部分，添加与搜索 -->
      <div class="menu-top">
        <!-- 搜索框部分 -->
        <div class="search">
          <input type="text" name id="searchtxt" placeholder="请输入搜索菜品名..." />
          <i class="el-icon-search searchBtn"></i>
        </div>
        <!-- 添加按钮 -->
        <button class="addmenu">添加</button>
      </div>
      <!-- 菜品管理下部分，菜品标签和菜品内容 -->
      <div class="menu-bottom">
        <!-- 菜品标签 -->
        <div class="menutaglist">
          <div
            v-for="(item, index) in foodTypeList"
            :key="index"
            class="taglist"
          >{{item.foodTypeName}}</div>
        </div>
        <!-- 菜品内容 -->
        <div class="menubox">
          <div v-for="(item, index) in foodList" :key="index" class="foodlist">
            <div class="foodlist-img">
              <img :src="item.foodPhoto" alt="菜品图片" />
            </div>
            <div class="foodlist-edit">
              <button type="button" class="editFood">编辑</button>
              <button type="button" class="delFood">删除</button>
            </div>
            <div class="foodlist-msg">
              <h3>{{item.foodName}}</h3>
              <p>{{item.foodRemark}}</p>
              <p>价格:{{item.foodLargePrice}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 菜品标签模拟数据
var foodTypeList = [
  {
    foodTypeId: 1,
    foodTypeName: "新品",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 2,
    foodTypeName: "小炒",
    foodTypeState: 1,
    foodTypeRemark: "该菜品小炒类型，如小煎鸭，干煸四季豆等"
  },
  {
    foodTypeId: 3,
    foodTypeName: "汤类",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 4,
    foodTypeName: "干锅",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 5,
    foodTypeName: "米饭",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 6,
    foodTypeName: "特色",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 7,
    foodTypeName: "素材",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 8,
    foodTypeName: "凉拌菜",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 9,
    foodTypeName: "炖菜",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 10,
    foodTypeName: "面食",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  },
  {
    foodTypeId: 11,
    foodTypeName: "特色",
    foodTypeState: 1,
    foodTypeRemark: "该菜品为刚上新的标签"
  }
];
// 菜品数据
var foodList = [
  {
    foodId: "1",
    foodName: "名称1",
    foodType: "新品",
    foodLargePrice: 120,
    foodPhoto: require("../assets/logo.png"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "2",
    foodName: "名称2",
    foodType: "小炒",
    foodLargePrice: 120,
    foodPhoto: require("../assets/logo.png"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "3",
    foodName: "名称3",
    foodType: "新品",
    foodLargePrice: 160,
    foodPhoto: require("../assets/logo.png"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "4",
    foodName: "名称4",
    foodType: "新品",
    foodLargePrice: 120,
    foodPhoto: require("../assets/logo.png"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "5",
    foodName: "名称5",
    foodType: "新品",
    foodLargePrice: 120,
    foodPhoto: require("../assets/logo.png"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "6",
    foodName: "名称6",
    foodType: "新品",
    foodLargePrice: 120,
    foodPhoto: require("../assets/logo.png"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "7",
    foodName: "名称7",
    foodType: "新品",
    foodLargePrice: 120,
    foodPhoto: require("../assets/logo.png"),
    foodRemark: "这是一段菜品简介"
  }
];

export default {
  name: "menumanagement",
  props: {},
  data() {
    return {
      foodTypeList,
      foodList
    };
  },
  methods: {
    addtag() {}
    /* //   禁止底层滑动
      closeBodyScroll() {
	  window.lockMaskScrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
	  document.body.classList.add('addtagzhezhao');
	  document.body.style.top = -window.lockMaskScrollTop + "px";
    },
    // 打开底层滑动
    openBodyScroll() {
	  if (document.body.classList.contains('addtagzhezhao')) {
		document.body.classList.remove('addtagzhezhao');
		document.scrollingElement.scrollTop = window.lockMaskScrollTop;
	  }	
	}, */
  }
};
</script>

<style lang="less" scoped>
// 总体
.app-MenuManagement {
  text-align: left;
}
// 菜品标签的添加与删除部分
.menutag {
  width: 90%;
  box-shadow: 0 0 5px gray;
  padding: 10px;
  margin: 20px auto;
  .menutag-top {
    //   统计所有标签
    .alltag {
      text-align: left;
    }
    // 添加标签
    .addtag {
      cursor: pointer;
      float: right;
      border: none;
      padding: 5px 10px;
      outline: none;
      font-size: 16px;
      background: #ff9a00;
      border-radius: 3px;
      color: white;
    }
  }
  .menutag-bottom {
    // justify-content: space-around;
    display: flex;
    flex-wrap: wrap;
    .tag {
      // display: inline-block;
      position: relative;
      padding: 5px 15px;
      border: 1px solid gray;
      border-radius: 3px;
      margin: 10px;
      i {
        position: absolute;
        top: 0;
        right: 0;
        display: none;
        color: red;
        cursor: pointer;
      }
      &:hover i {
        display: block;
      }
    }
  }
}
// 菜品管理，添加菜品部分
.menu {
  width: 90%;
  box-shadow: 0 0 5px gray;
  padding: 10px;
  margin: 0 auto;
  // 菜品管理上半部分内容
  .menu-top {
    text-align: left;
    // 添加按钮
    .addmenu {
      cursor: pointer;
      border: none;
      padding: 5px 20px;
      outline: none;
      font-size: 16px;
      background: #ff9a00;
      border-radius: 3px;
      color: white;
    }
    // 搜索部分
    .search {
      height: 30px;
      line-height: 30px;
      width: 250px;
      float: right;
      position: relative;
      input {
        border: 1px solid gray;
        border-radius: 15px;
        width: 100%;
        height: 100%;
        text-indent: 10px;
      }
      .searchBtn {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 25px;
        cursor: pointer;
        color: gray;
        padding: 0 10px;
        line-height: 30px;
      }
    }
  }
  //   菜品管理下班部分内容
  .menu-bottom {
    //   background: pink;
    margin-top: 10px;
    //   左侧菜品导航
    .menutaglist {
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      text-align: center;
      float: left;
      width: 100px;
      .taglist {
        height: 30px;
        line-height: 30px;
      }
    }
    //   右侧内容
    .menubox {
      margin-left: 120px;
      min-height: 400px;
      .foodlist {
        //   background: pink;
          margin: 10px 0;
        .foodlist-img {
          float: left;
          width: 200px;
          height: 200px;
          img {
            width: 90%;
            height: 90%;
            vertical-align: middle;
          }
        }
        .foodlist-edit {
            float: right;
        }
        .foodlist-msg {
            min-height: 200px;
        }
      }
    }
  }
}

// 添加菜品标签的弹出层
// 遮罩
.addtagzhezhao {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.329);
  z-index: 999;
}
</style>