<template>
  <div>
    <el-row>
      <el-col :span="24" class="Mes">
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
          <li v-for="item in urls" :key="item.ind" class="infinite-list-item erweimaList">
            <h4>第{{item.ind}}桌</h4>
            <img :src="item.imgUrl" alt />
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="addEr">
        <div>
          <h3>点击下方上传二维码</h3>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <img src="@/assets/images/erweima/1.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: "erweima",

  data() {
    return {
      imageUrl: "",
      urls: [
        {
          ind: 1,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        },
        {
          ind: 2,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        },
        {
          ind: 3,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        },
        {
          ind: 4,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        },
        {
          ind: 5,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        },
        {
          ind: 6,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        },
        {
          ind: 7,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        },
        {
          ind: 8,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        },
        {
          ind: 9,
          imgUrl: require('@/assets/images/erweima/1.jpg')
        }
      ]
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传二维码图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.mesList {
  width: 30%;
  float: left;
  text-align: right;
}
ul li {
  line-height: 40px;
}
.infinite-list {
  height: 300px;
}
.erweimaList {
  width: 25%;
  float: left;
  box-shadow: 2px 2px 4px lightgray;
  img {
    width: 60%;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.addEr h3 {
  color: rgb(116, 191, 221);
}
</style>