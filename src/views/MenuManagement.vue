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
          :value="item.foodTypeId"
        >{{item.foodTypeName}}</option>
      </select>
      <input type="text" placeholder="请输入菜品简介..." class="isaddfoodRemark" />
      <input type="number" name="isaddfoodpricex" class="isaddfoodpricex" placeholder="请输入菜品价格..." />
      <el-upload
        class="upload-demo"
        action="abcdefg"
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        name="uploadimages"
        :limit="1"
        :file-list="fileList"
        :http-request="enteraddfoodList"
        list-type="picture"
        :auto-upload="false"
      >
        <el-button class="clickupload" size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb；如：</div>
      </el-upload>

      <div class="enterorclose">
        <button type="button" class="closeaddfood" @click="closeaddfoodbox">取消</button>
        <button type="button" class="enteraddfood" @click="uploadImages">确定</button>
      </div>
    </div>
    <!-- 编辑菜品的弹框 -->
    <div class="editfoodbox">
      <span class="closeeditfoodbox" @click="closeeditfoodbox">
        <i class="el-icon-close"></i>
      </span>
      <h3>编辑菜品</h3>
      <input type="text" class="editfoodname"   v-model="editFoodMsg.foodName"/>
      菜品种类:
      <select name="editfoodtype" class="editfoodtype"  v-model="editFoodMsg.foodTypeId">
        <option
          v-for="(item, index) in foodTypeList"
          :key="index"
          :value="item.foodTypeId"
        >{{item.foodTypeName}}</option>
      </select>
      菜品状态：
      <select
        class="foodstate"
        :data-foodid="editFoodMsg.foodId"
        v-model="editFoodMsg.foodState"
      >
        <option value="1">在售</option>
        <option value="2">已售完</option>
        <option value="3">下架</option>
      </select>
      <input
        type="number"
        name="editfoodpricex"
        class="editfoodpricex"
        v-model="editFoodMsg.foodPrice"
        
      />
      <input
        type="text"
        name="editfoodremark"
        class="editfoodremark"
        v-model="editFoodMsg.foodRemark"
      />
      <el-upload
        ref="uploadedit"
        class="upload-demo"
        action="abcdk"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :http-request="editfoodimg"
        :file-list="fileList"
        list-type="picture"
        :auto-upload="false"
      >
        <el-button size="small" type="primary" class="uploadeditimg">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

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
            :data-index="item.foodTypeId"
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
                <p>{{item.foodRemark}}...</p>
                <!-- .substr(0,15) -->
                <p class="price">￥{{item.foodPrice}}</p>
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
    foodTypeId: "新品",
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    foodState: 1
  },
  {
    foodId: "2",
    foodName: "名称2",
    foodTypeId: 1,
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    foodState: 2
  },
  {
    foodId: "3",
    foodName: "名称3",
    foodTypeId: 1,
    foodPrice: 160,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介",
    foodState: 3
  },
  {
    foodId: "4",
    foodName: "名称4",
    foodTypeId: 1,
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    foodState: 1
  },
  {
    foodId: "5",
    foodName: "名称5",
    foodTypeId: 2,
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    foodState: 1
  },
  {
    foodId: "6",
    foodName: "名称6",
    foodTypeId: 1,
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介",
    foodState: 2
  },
  {
    foodId: "7",
    foodName: "名称7",
    foodTypeId: 1,
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark:
      "这是一段菜品简介,辣的爽，辣的棒，辣的呱呱叫，快来尝，快来试，永生不能忘。",
    foodState: 1
  },
  {
    foodId: "8",
    foodName: "名称8",
    foodTypeId: 1,
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介",
    foodState: 1
  },
  {
    foodId: "9",
    foodName: "名称9",
    foodTypeId: 1,
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介",
    foodState: 1
  },
  {
    foodId: "10",
    foodName: "名称10",
    foodTypeId: 1,
    foodPrice: 120,
    foodPhoto: require("../assets/images/store1.jpg"),
    foodRemark: "这是一段菜品简介",
    foodState: 2
  }
];
// 获取当前登录人员id
const userId = sessionStorage.getItem("userId");
console.log("当前登录人员id",userId);

export default {
  name: "menumanagement",
  props: {},
  data() {
    return {
      // 渲染的菜品种类数据
      foodTypeList,
      // 渲染的菜品数据
      foodList: allFoodList,
      // 删除的菜品ID
      delFoodId: -1,
      // 删除的菜品种类ID
      delFoodTypeId: -1,
      // 存储图片地址
      fileList: [
        /* {
          name: "food.jpeg",
          url: require("../assets/images/store1.jpg")
        } */
      ],
      // 编辑的菜品信息
      editFoodMsg: {},
      // 默认的菜品种类id
      modifiedFoodTypeId: -1,
      // 上传的图片内容
      myfile: "",
      // 当前登录人员id
      userId,
      // 当前登录店铺信息
      storeMsg: {},
    };
  },
  methods: {
    // 获取数据
    getDate() {
      /* ----------------------------------查找店铺信息的AJAX开始------------------------------ */
      this.axios
        .post("/store/findStore", {
          // 参数 店铺id
          storeId: String(this.userId)
        })
        .then(res => {
          console.log("查找当前登录的店铺信息：",res);
          // 给当前登录店铺信息赋值
          this.storeMsg = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
      /* ----------------------------------查找店铺信息的AJAX结束------------------------------ */
      // -------------------获取菜品标签的 AJAX 开始--------------------------------------
      this.axios
        .post("/foodType/foodTypeList", {
          // 参数 店铺id
          storeId: String(this.userId)
        })
        .then(res => {
          // console.log(res.data);
          // console.log(res.data.data);
          // 给数据菜品种类复制
          this.foodTypeList = res.data.data;
          // 给第一个复制
          this.modifiedFoodTypeId = String(res.data.data[0].foodTypeId);
          console.log("当前第一个商品种类ID",this.modifiedFoodTypeId);
        })
        .catch(err => {
          console.log(err);
        });

      // ------------------------获取菜品标签的 AJAX 结束---------------------------------
      // ------------------------获取菜品的 AJAX 开始--------------------------------------
      this.axios
        .post("/food/foodList", {
          // 参数 菜品种类 id
          foodTypeId: String(this.modifiedFoodTypeId)
        })
        .then(res => {
          console.log("菜品信息",res);
          console.log("菜品列表url", res.data.data.url);
          console.log("菜品列表s", res.data.data.foods);
          const newFoodList = [];
          for (var i = 0; i < res.data.data.foods.length; i++) {
            var a = {
              foodId: res.data.data.foods[i].foodId,
              foodName: res.data.data.foods[i].foodName,
              foodPhoto: res.data.data.url + res.data.data.foods[i].foodPhoto,
              foodPrice: res.data.data.foods[i].foodPrice,
              foodRemark: res.data.data.foods[i].foodRemark,
              foodState: res.data.data.foods[i].foodState,
              foodTypeId: res.data.data.foods[i].foodTypeId,
              foodTypeName: res.data.data.foods[i].foodTypeName,
              saleId: res.data.data.foods[i].saleId,
              saleState: res.data.data.foods[i].saleState,
              tasteId: res.data.data.foods[i].tasteId
            };
            newFoodList.push(a);
          }
          // 给菜品列表复制
          this.foodList = newFoodList;
          console.log("当前的渲染的菜品数据信息:",this.foodList);
        })
        .catch(err => {
          console.log(err);
        });

      // -------------------------获取菜品的 AJAX 结束-------------------------------------
    },
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

          /* ---------------------------删除菜品的AJAX 开始------------------------------ */
          this.axios
            .post("/food/deleteFood", {
              // 参数 删除的foodid
              foodId: String(this.delFoodId)
            })
            .then(res => {
              console.log(res);
              // 跟新数据
              this.getDate();
            })
            .catch(err => {
              console.log(err);
            });

          /* ---------------------------删除菜品的AJAX 结束-------------------------------- */
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
          // 调用 删除菜品种类的 ajax ---------------
          this.axios
            .post("/foodType/deleteFoodType", {
              // 参数 菜品种类 id
              foodTypeId: String(this.delFoodTypeId)
            })
            .then(res => {
              console.log(res);
              // 更新数据
              this.getDate();
              //
            })
            .catch(err => {
              console.log(err);
            });
          // 调用 删除菜品种类的AJAX结束---------------
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
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你新添加的种类是: " + value
          });
          if (value != null) {
            // 利用 AJAX 为表里添加分类------------
            this.axios
              .post("/foodType/addFoodType", {
                // 参数 菜品种类 id

                foodTypeName: String(value),
                storeId: String(this.storeMsg.storeId),
                foodTypeRemark: "我是菜品备注"
              })
              .then(res => {
                console.log("新增菜品种类返回的数据：",res);
                // 更新数据
                this.getDate();
                // 给菜品列表复制
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            const h = this.$createElement;
            this.$message({
              message: h("p", null, [h("span", null, "内容不可以为空 ")])
            });
          }

          // -----------------------------

          // this.foodTypeList.push(value);
          // console.log(value, this.foodTypeList);
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
    // 上传添加菜品图片图片
    enteraddfoodList(uploadimg) {
      console.log(uploadimg.file);
      this.myfile = uploadimg.file;
      // 点击确定过后要进行的操作
      // 获取菜品名称
      const addfoodName = document.getElementsByClassName("isaddfoodName")[0]
        .value;
      // 清空
      document.getElementsByClassName("isaddfoodName")[0].value = "";
      // 获取菜品种类
      const addfoodType = document.getElementsByClassName("isaddfoodType")[0]
        .value;
      // 获取菜品 简介
      const addfoodRemark = document.getElementsByClassName(
        "isaddfoodRemark"
      )[0].value;
      // 清空
      document.getElementsByClassName("isaddfoodRemark")[0].value = "";
      // 获取菜品价格
      const addfoodPrice = document.getElementsByClassName("isaddfoodpricex")[0]
        .value;
      // // 获取菜品图片名字
      // const addfoodImg = document.getElementsByClassName("upload-demo")[0]
      //   .value;

      // 新的文件数组
      let addFoodFormDate = new FormData();
      addFoodFormDate.append("foodName", addfoodName);
      addFoodFormDate.append("foodTypeId", addfoodType);
      addFoodFormDate.append("foodRemark", addfoodRemark);
      addFoodFormDate.append("foodPrice", addfoodPrice);
      addFoodFormDate.append("myFile", this.myfile);

      /* -----------------------------------------------确定添加菜品的接口 开始-------------------------------------------- */
      this.axios
        .post("/food/addFood", addFoodFormDate, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("添加菜品的数据", res);
          this.$message(res.data.msg);
          // 更新数据
          this.getDate();
        })
        .catch(err => {
          console.log(err);
        });
      /* -----------------------------------------------确定添加菜品的接口 结束-------------------------------------------- */

      // 与点击遮罩层一样的作用
      this.closezhezhao();
    },
    // 上传添加菜品图片图片
    uploadImages() {
      this.$refs.upload.submit();
    },
    // 搜索菜品
    searchFood() {
      // 获取搜索框里的内容
      const searchTxt = document.getElementById("searchtxt").value;
      // 判断当搜索框里面的内容不为空时进行的操作
      if (searchTxt != "") {
        // 输出搜索框里的内容
        console.log("搜索框中的内容:",searchTxt);
        // 执行的AJAX操作 将搜索出来的data 赋值给 foodList
        //
        /* -----------------------搜索菜品的AJAX 开始----------------------------- */
        this.axios
          .post("/food/findFood", {
            // 店铺id
            storeId: String(this.storeMsg.storeId),
            // 搜索的菜品名
            foodName: searchTxt
          })
          .then(res => {
            // console.log("菜品列表url", res.data.data.url);
            // console.log("菜品列表s", res.data.data.foods);
            const newFoodList = [];
            for (var i = 0; i < res.data.data.foods.length; i++) {
              var a = {
                foodId: res.data.data.foods[i].foodId,
                foodName: res.data.data.foods[i].foodName,
                foodPhoto: res.data.data.url + res.data.data.foods[i].foodPhoto,
                foodPrice: res.data.data.foods[i].foodPrice,
                foodRemark: res.data.data.foods[i].foodRemark,
                foodState: res.data.data.foods[i].foodState,
                foodTypeId: res.data.data.foods[i].foodTypeId,
                foodTypeName: res.data.data.foods[i].foodTypeName,
                saleId: res.data.data.foods[i].saleId,
                saleState: res.data.data.foods[i].saleState,
                tasteId: res.data.data.foods[i].tasteId
              };
              newFoodList.push(a);
            }
            // 跟新渲染的数据
            this.foodList = newFoodList;
            console.log("搜到的数据：", this.foodList);
            // 搜索到了之后清空搜索框
            document.getElementById("searchtxt").value = "";
          })
          .catch(err => {
            console.log(err);
          });
        /* -----------------------搜索操的AJAX 结束 */

        // 操作完之后清空搜索框
        // document.getElementById("searchtxt").value = "";
      }
    },
    // 编辑菜品
    editFood(data, $event) {
      // 将编辑里要展示的数据变为当前点击那个的
      this.editFoodMsg = data;
      // 编辑菜品弹框的显示
      document
        .getElementsByClassName("editfoodbox")[0]
        .classList.remove("none");
      document.getElementsByClassName("editfoodbox")[0].classList.add("show");
      // 遮罩层的显示
      document.getElementsByClassName("zhezhao")[0].classList.remove("none");
      document.getElementsByClassName("zhezhao")[0].classList.add("show");
      console.log("当前编辑的菜品信息:",this.editFoodMsg);
      console.log("当前编辑菜品的标签",$event);
    },
    // 编辑菜品上传图片
    editfoodimg(editfile) {
      console.log("编辑时用到的file文件", editfile.file);
      console.log("当前编辑的数据", this.editFoodMsg);
      const editFoodFormDate = new FormData();
      editFoodFormDate.append("foodId",this.editFoodMsg.foodId);
      editFoodFormDate.append("foodName",this.editFoodMsg.foodName);
      editFoodFormDate.append("foodPrice",this.editFoodMsg.foodPrice);
      editFoodFormDate.append("foodRemark",this.editFoodMsg.foodRemark);
      editFoodFormDate.append("foodTypeId",this.editFoodMsg.foodTypeId);
      editFoodFormDate.append("myFile",editfile.file);
      /* ------------------------------编辑菜品的数据 开始------------------------------------- */
      this.axios
        .post("/food/editFood", editFoodFormDate, {
          header: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("编辑菜品后返回的数据", res);
          this.$message(res.data.msg);
          // 更新数据
          this.getDate();
          // 关闭遮罩层
          this.closezhezhao();
        })
        .catch(err => {
          console.log(err);
        });
      /* ------------------------------编辑菜品的数据 结束------------------------------------- */
    },
    // 点击 编辑菜品 确认按钮按钮点击
    entereditfood() {
      this.$refs.uploadedit.submit();
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

      // 获取当前的选择种类的 id
      const typeId = e.target.getAttribute("data-index");
      this.modifiedFoodTypeId = typeId;

      // 更新数据
      this.getDate();
    },
    // 以下 为传输图片时的代码
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 传输照片结束
    // 点击取消添加菜品按钮时
    closeaddfoodbox() {
      // 与点击遮罩层一样的作用
      this.closezhezhao();
    },
    // 点击关闭编辑菜品按钮时，取消编辑按钮点击
    closeeditfoodbox() {
      this.closezhezhao();
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
  },
  mounted() {
    // 给第一个菜品种类列表添加样式
    document.getElementsByClassName("taglist")[0].classList.add("istag");
    // 默认的菜品id
    /* this.modifiedFoodTypeId = this.foodTypeList[0].foodTypeId;
    console.log(this.modifiedFoodTypeId); */
  },
  created() {
    // 获取数据
    this.getDate();
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
  color: #000;
  text-align: left;
  min-width: 620px;
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
      min-height: 450px;
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
      height: 450px;

      .foodlist {
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
          margin-right: 30px;
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
  // 图片的上传按钮
  .uploadeditimg {
    padding: 0 10px;
    height: 30px;
  }
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
    width: 95px;
    display: inline-block;
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