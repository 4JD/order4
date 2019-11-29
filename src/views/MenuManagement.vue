<template>
  <div class="app-MenuManagement">
    <!-- 添加分类的弹出层 -->
    <!-- <div class="addtagzhezhao">
          
    </div>-->

    <!-- 第一部分 ，菜品标签添加管理 -->
    <div class="menutag">
      <div class="menutag-top">
        <button type="button" class="addtag" @click="addFoodType">添加分类</button>
        <p class="alltag">共{{foodTypeList.length}}个菜品</p>
      </div>
      <div class="menutag-bottom">
        <div v-for="(item, index) in foodTypeList" :key="index" class="tag">
          <i
            class="deltagbtn el-icon-close"
            data-num="index"
            @click="delFoodType"
            :data-id="item.foodTypeId"
          ></i>
          <!-- 换接口时 data-id 变为里面的值 item.foodTypeId -->
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
          <i class="el-icon-search searchBtn" @click="searchFood"></i>
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
            :data-tagvalue="item.foodTypeName"
            @click="getTagFood"
          >{{item.foodTypeName}}</div>
        </div>
        <!-- 菜品内容 -->
        <div class="menubox">
          <div class="menuinnerbox">
            <div v-for="(item, index) in foodList" :key="index" class="foodlist">
              <div class="foodlist-img">
                <img :src="item.foodPhoto" alt="菜品图片" />
              </div>
              <div class="foodlist-edit">
                <button type="button" class="editFood" :data-id="item.foodId" @click="editFood">编辑</button>
                <button type="button" class="delFood" :data-id="item.foodId" @click="delFood">删除</button>
              </div>
              <div class="foodlist-msg">
                <h3>{{item.foodName}}</h3>
                <p>{{item.foodRemark.substr(0,15)}}...</p>
                <p class="price">￥{{item.foodLargePrice}}</p>
              </div>
            </div>
            <!-- 底部提示已经到底了，商品 -->
            <div class="innerboxbottom">已经到底了。。。</div>
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
  }
];

// 渲染用到的菜品数据
var allFoodList = [
  {
    foodId: "1",
    foodName: "名称1",
    foodType: "新品",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。"
  },
  {
    foodId: "2",
    foodName: "名称2",
    foodType: "小炒",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。"
  },
  {
    foodId: "3",
    foodName: "名称3",
    foodType: "新品",
    foodLargePrice: 160,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "4",
    foodName: "名称4",
    foodType: "新品",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。"
  },
  {
    foodId: "5",
    foodName: "名称5",
    foodType: "干锅",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。"
  },
  {
    foodId: "6",
    foodName: "名称6",
    foodType: "新品",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "7",
    foodName: "名称7",
    foodType: "汤类",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。"
  },
  {
    foodId: "8",
    foodName: "名称8",
    foodType: "干锅",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "9",
    foodName: "名称9",
    foodType: "干锅",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介"
  },
  {
    foodId: "10",
    foodName: "名称10",
    foodType: "干锅",
    foodLargePrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介"
  }
];

export default {
  name: "menumanagement",
  props: {},
  data() {
    return {
      // 渲染的菜品类型数据
      foodTypeList,
      // 渲染的菜品数据
      foodList: allFoodList,
      // 删除的菜品ID
      delFoodId: -1,
      // 删除的菜品种类ID
      delFoodTypeId: -1,
    };
  },
  methods: {
    // 删除菜品
    delFood(e) {
      this.$confirm("此操作将删除这条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // 获取删除的商品ID 并复制给 this.delFoodId
          this.delFoodId = Number(e.target.getAttribute("data-id"));
          console.log(Number(e.target.getAttribute("data-id")));
          // 删除数据
          for (var i = 0; i < this.foodList.length; i++) {
            if (this.foodList[i].foodId == this.delFoodId) {
              this.foodList.splice(i, 1);
              // console.log("删除成功", this.foodList);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除菜分类
    delFoodType(e) {
      this.$confirm("确定删除此种菜品类型吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          // 获取删除的商品标签 ID 并复制给 this.delFoodId
          this.delFoodTypeId = Number(e.target.getAttribute("data-id"));
          console.log(Number(e.target.getAttribute("data-id")));
          // 删除菜品种类数据
          for (var i = 0; i < this.foodTypeList.length; i++) {
            if (this.foodTypeList[i].foodTypeId == this.delFoodTypeId) {
              this.foodTypeList.splice(i, 1);
              console.log("删除成功", this.foodList);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加菜品种类标签
    addFoodType() {
      this.$prompt("请输入种类名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",/* 
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确" */
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你新添加的种类是: " + value
          });
          // value 新添加的种类值
          
          this.foodTypeList.push(value);
          console.log(value,this.foodTypeList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 添加菜品
    addFood() {
      
    },
    // 搜索菜品
    searchFood() {},
    // 编辑菜品
    editFood() {},
    // 点击菜品类型，渲染相应的数据
    getTagFood(e) {
      // 新建一个菜品数据
      var newfoodList = [];
      // 获取菜品类型标签值
      var foodTag = e.target.innerText;
      // 将是为该菜品类型的菜品，重新push进新的菜品数据数组里
      allFoodList.forEach(function(item) {
        if (item.foodType == foodTag) {
          newfoodList.push(item);
          console.log(item.foodType, "是一样的");
        }
      });
      // 将新的菜品数据赋值给展示菜品列表里
      this.foodList = newfoodList;
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
// 总体
.app-MenuManagement {
  text-align: left;
  min-width: 400px;
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
      cursor: pointer;
      min-height: 350px;
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
      overflow: hidden;
      // 提示菜单已到底部
      .innerboxbottom {
        text-align: center;
        color: gray;
      }
      .menuinnerbox {
        width: 103%;
        height: 100%;
        overflow: auto;
      }
      margin-left: 120px;
      height: 350px;

      .foodlist {
        //   background: pink;
        margin: 10px 0;
        .foodlist-img {
          float: left;
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
        .foodlist-edit {
          padding: 10px 20px;
          float: right;
          // 编辑 删除按钮
          button {
            border: none;
            padding: 3px 10px;
            color: #fff;
            letter-spacing: 2px;
            display: block;
            margin: 10px 0;
          }
          // 编辑按钮
          .editFood {
            background: #ff9a00;
          }
          // 删除按钮
          .delFood {
            background: red;
          }
        }
        .foodlist-msg {
          margin-left: 120px;
          min-height: 100px;
          line-height: 30px;
          // 内容中的文字说明
          .price {
            color: #ff9a00;
          }
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