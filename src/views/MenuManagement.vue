<template>
  <div class="app-MenuManagement">
    <!-- 遮罩层 -->
    <div class="zhezhao" @click="closezhezhao"></div>
    <!-- 添加菜品的弹框 -->
    <div class="addfoodbox">
      <span class="closeaddfoodbox" @click="closeaddfoodbox">
        <i class="el-icon-close"></i>
      </span>
      <h3>添加菜品</h3>
      <input type="text" placeholder="请输入菜品名称..." class="isaddfoodName" />
      菜品类型:
      <select name="isaddfoodType" class="isaddfoodType">
        <option
          v-for="(item, index) in foodTypeList"
          :key="index"
          :value="item.foodTypeName"
        >{{item.foodTypeName}}</option>
      </select>
      <input type="text" placeholder="请输入菜品备注..." class="isaddfoodRemark" />
      <input type="number" name="isaddfoodprice" class="isaddfoodprice" placeholder="请输入菜品价格..." />
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit="1"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button class="clickupload" size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb；如：</div>
      </el-upload>

      <div class="enterorclose">
        <button type="button" class="closeaddfood" @click="closeaddfoodbox">取消</button>
        <button type="button" class="enteraddfood" @click="enteraddfoodList">确定</button>
      </div>
    </div>
    <!-- 编辑菜品的弹框 -->
    <div class="editfoodbox">
      <span class="closeeditfoodbox" @click="closeeditfoodbox">
        <i class="el-icon-close"></i>
      </span>
      <h3>编辑菜品</h3>
      <input type="text" class="editfoodname" value="菜名" />
      菜品种类:
      <select name="editfoodtype" class="editfoodtype" value="菜品种类">
        <option
          v-for="(item, index) in foodTypeList"
          :key="index"
          :value="item.foodTypeName"
        >{{item.foodTypeName}}</option>
      </select>
      <input type="number" name="editfoodprice" class="editfoodprice" value="110" />
      <input type="text" name="editfoodremark" class="editfoodremark" value="菜品备注" />
      菜品图片:
      <br />
      <div class="editfoodimg">
        <img src="../assets/images/store1.jpg" alt />
        <input type="file" name="editimg" class="editimg" />
      </div>

      <div class="enterorcloseedit">
        <button type="button" class="closeeditfood" @click="closeeditfoodbox">取消</button>
        <button type="button" class="entereditfood" @click="entereditfood">确定</button>
      </div>
    </div>

    <!-- 第一部分 ，菜品标签添加管理 -->
    <div class="menutag">
      <div class="menutag-top">
        <button type="button" class="addtag" @click="addFoodType">添加分类</button>
        <p class="alltag">共{{foodTypeList.length}}个菜品</p>
      </div>
      <div class="menutag-bottom">
        <div v-for="(item, index) in foodTypeList" :key="index" class="tag">
          <!-- 删除菜品种类的按钮 -->
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
        <button class="addmenu" @click="addFood">添加</button>
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
            :data-index="index"
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
                <button
                  type="button"
                  class="editFood"
                  :data-id="item.foodId"
                  @click="editFood(item,$event)"
                >编辑</button>
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
      // 存储图片地址
      fileList: [
        {
          name: "food.jpeg",
          url: require("../assets/images/store1.jpg")
        }
      ]
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
        cancelButtonText:
          "取消" /* 
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
          console.log(value, this.foodTypeList);
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
      // 添加菜品弹框的显示
      document.getElementsByClassName("addfoodbox")[0].classList.remove("none");
      document.getElementsByClassName("addfoodbox")[0].classList.add("show");
      // 遮罩层的显示
      document.getElementsByClassName("zhezhao")[0].classList.remove("none");
      document.getElementsByClassName("zhezhao")[0].classList.add("show");
    },
    // 搜索菜品
    searchFood() {
      // 获取搜索框里的内容
      const searchTxt = document.getElementById("searchtxt").value;
      // 判断当搜索框里面的内容不为空时进行的操作
      if (searchTxt != "") {
        // 输出搜索框里的内容
        console.log(searchTxt);
        // 执行的AJAX操作 将搜索出来的data 赋值给 foodList

        // 操作完之后清空搜索框
        document.getElementById("searchtxt").value = "";
      }
    },
    // 编辑菜品
    editFood(data, $event) {
      // 编辑菜品弹框的显示
      document
        .getElementsByClassName("editfoodbox")[0]
        .classList.remove("none");
      document.getElementsByClassName("editfoodbox")[0].classList.add("show");
      // 遮罩层的显示
      document.getElementsByClassName("zhezhao")[0].classList.remove("none");
      document.getElementsByClassName("zhezhao")[0].classList.add("show");
      console.log(data);
      console.log($event);
      /* document.getElementsByClassName("editfoodbox")[0].innerHTML=`<span class="closeeditfoodbox" @click="closeeditfoodbox">
        <i class="el-icon-close"></i>
      </span>
      <h3>编辑菜品</h3>
      <input type="text" class="editfoodname" value="菜名">
      菜品种类:
      <select name="editfoodtype" class="editfoodtype" value="菜品种类">
         <option
          v-for="(item, index) in foodTypeList"
          :key="index"
          :value="item.foodTypeName"
        >{{item.foodTypeName}}</option>
      </select>
      <input type="number" name="editfoodprice" class="editfoodprice" value="110">
      <input type="text" name="editfoodremark" class="editfoodremark" value="菜品备注">
      菜品图片: <br>
      <div class="editfoodimg">
        <img src="../assets/images/store1.jpg" alt="">
        <input type="file" name="editimg" class="editimg">
      </div>
      
      <div class="enterorcloseedit">
        <button type="button" class="closeeditfood" @click="closeeditfoodbox">取消</button>
        <button type="button" class="entereditfood" @click="entereditfood">确定</button>
      </div>`; */
    },
    // 点击菜品类型，渲染相应的数据
    getTagFood(e) {
      // 将所有的菜品种类标签去掉 样式class
      // 获取所有 菜品种类标签
      var allTypeTag = document.getElementsByClassName("taglist");
      // 循环将所有菜品种类标签的 class 去掉
      for (var k = 0; k < allTypeTag.length; k++) {
        // 移除 class名字
        allTypeTag[k].classList.remove("istag");
      }
      // 给当前点击的标签添加 class名字
      e.target.classList.add("istag");
      console.log(allTypeTag);
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
    },
    // 以下 为传输图片时的代码
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 传输照片结束
    // 点击确认添加菜品按钮时
    enteraddfoodList() {
      this.$confirm("确定新添加这条菜品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          // 点击确定过后要进行的操作

          // 与点击遮罩层一样的作用
          this.closezhezhao();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    // 点击取消添加菜品按钮时
    closeaddfoodbox() {
      // 与点击遮罩层一样的作用
      this.closezhezhao();
    },
    // 点击关闭编辑菜品按钮时，取消编辑按钮点击
    closeeditfoodbox() {
      this.closezhezhao();
    },
    // 点击 确认 编辑按钮点击
    entereditfood() {
      this.$confirm("确定更改这条菜品信息吗?", "提示", {
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
    // 点击遮罩层时
    closezhezhao() {
      // 添加产品的弹窗关闭
      document.getElementsByClassName("addfoodbox")[0].classList.remove("show");
      document.getElementsByClassName("addfoodbox")[0].classList.add("none");
      // 遮罩层的关闭
      document.getElementsByClassName("zhezhao")[0].classList.remove("show");
      document.getElementsByClassName("zhezhao")[0].classList.add("none");
      // 编辑菜品弹框的关闭
      document
        .getElementsByClassName("editfoodbox")[0]
        .classList.remove("show");
      document.getElementsByClassName("editfoodbox")[0].classList.add("none");
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
// 确定标签颜色
.el-button.el-button--default.el-button--small.el-button--primary {
  background: #ff9a00;
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
      .istag {
        color: #ff9a00;
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

// 遮罩层
.zhezhao {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: none;
  left: 0;
  background: rgba(0, 0, 0, 0.329);
  z-index: 999;
}

// 添加菜品的样式
.addfoodbox {
  display: none;
  // 标题
  h3 {
    text-align: center;
  }
  // 点击上传
  .clickupload {
    padding: 5px 10px;
    background: #13ce66;
    border: none;
    margin: 5px 0;
  }

  // 图片的边框勾勾
  .el-upload-list--picture.el-upload-list__item-status-label {
    background: #ff9a00;
  }
  padding: 20px;
  box-sizing: border-box;
  width: 400px;
  height: 420px;
  box-shadow: 0 0 5px #000;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  background: white;
  input[type="text"],
  input[type="number"] {
    display: block;
    height: 30px;
    width: 100%;
    margin: 10px auto;
    border: none;
    box-shadow: 0 0 2px black;
    text-indent: 10px;
  }
  select {
    outline: none;
    width: 100px;
    height: 30px;
    border: none;
    box-shadow: 0 0 2px black;
    option {
      width: 100%;
      height: 30px;
      text-align: center;
      border: 1px solid black;
    }
  }
  // 关闭添加菜品的弹框
  .closeaddfoodbox {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    color: black;
    padding: 10px;
    cursor: pointer;
  }
  // 菜品添加的确定与取消按钮
  .enterorclose {
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
    .closeaddfood {
      background: gray;
    }
    .enteraddfood {
      float: right;
      background: #ff9a00;
      margin-right: 10px;
    }
  }
}
// 编辑菜品的弹框
.editfoodbox {
  display: none;
  padding: 20px;
  box-sizing: border-box;
  width: 400px;
  height: 420px;
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
  h3 {
    text-align: center;
  }
  input[type="text"],
  input[type="number"] {
    display: block;
    height: 30px;
    width: 100%;
    margin: 10px auto;
    border: none;
    box-shadow: 0 0 2px black;
    text-indent: 10px;
  }
  // 选择菜品种类
  select {
    width: 100px;
    height: 30px;
    border: none;
    box-shadow: 0 0 2px black;
    outline: none;
    option {
      width: 100%;
      height: 30px;
      text-align: center;
      border: 1px solid black;
      outline: none;
    }
  }
  // 关闭编辑菜品的弹框
  .closeeditfoodbox {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    color: black;
    padding: 10px;
    cursor: pointer;
  }
  // 编辑下的图片
  .editfoodimg {
    position: relative;
    img {
      width: 120px;
      height: 120px;
      vertical-align: middle;
      margin: 0 50px;
    }
    input[type="file"] {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-left: 20px;
      align-items: flex-end;
      width: 80px;
      color: white;
    }
  }

  // 编辑菜品下的取消与确认按钮
  .enterorcloseedit {
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
    .closeeditfood {
      background: gray;
    }
    .entereditfood {
      float: right;
      background: #ff9a00;
      margin-right: 10px;
    }
  }
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