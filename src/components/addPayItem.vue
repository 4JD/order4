<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" id="addPay">
      <i class="el-icon-upload el-icon--right"></i>添加支出
    </el-button>

    <el-dialog title="请在下方添加支出" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="支出类型">
          <el-select v-model="form.payType" placeholder="请选择支出类型">
            <el-option
              v-for="(item,index) in payTypes"
              :key="index"
              :label="item.addpayTypeName"
              :value="item.addpayTypeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体用途">
          <el-input type="text" v-model="form.payUse"></el-input>
        </el-form-item>
        <el-form-item label="支出金额">
          <el-input
            v-model="form.price"
            autocomplete="off"
            type="number"
            onkeypress="return event.keyCode>=48&&event.keyCode<=57"
          ></el-input>
        </el-form-item>
        <el-form-item label="支出备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="returnpay">取 消</el-button>
        <el-button type="primary" @click="addPay">确 定</el-button>
      </div>
      <el-alert :title="errCont" type="error" v-show="errText"></el-alert>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/formatDate.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      payTypes: [],
      errText: false,
      errCont: "",
      form: {
        price: "",
        payType: "",
        remark: "",
        payUse: ""
      }
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  created() {
    this.axios
      .post("/payType/findAllType")
      .then(res => {
        console.log("获取支付类型信息：", res.data);
        // this.tableData = res.data.data.list;
        this.payTypes = res.data.data;
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    returnpay() {
      this.dialogFormVisible = false;
      (this.form.price = ""), (this.form.remark = "");
    },
    addPay() {
      console.log(this.form.payType);
      if (this.form.price == "") {
        this.errText = true;
        this.errCont = "金额不能为空";
        setTimeout(() => {
          this.errText = false;
        }, 2000);
      } else {
        this.$emit("add", {
          addpayTypeName: this.form.payType,
          addpayPrice: this.form.price,
          addpayRemark: this.form.remark,
          addpayUse: this.form.payUse
        });
        this.dialogFormVisible = false;

        // var price = Number(this.form.price);
        // console.log(typeof price);
        // console.log(typeof this.form.payType);
        // console.log(typeof this.form.payUse);
        // // console.log(typeof price);
        // this.axios
        //   .post("/pay/addPay", {
        //     userName: "admin",
        //     addpayTypeId: this.form.payType,
        //     addpayPrice: price,
        //     addpayName: "随便用",
        //     addpayUse: this.form.payUse,
        //     addpayRemark:this.form.remark
        //   })
        //   .then(res => {
        //     console.log("获取添加信息：", res.data);

        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }

      this.form.payType = "";
      this.form.payUse="";
      this.form.price = "";
      this.form.remark = "";
    }
  }
};
</script>

<style scoped>
.el-dialog__header .el-dialog__title {
  font-size: 24px;
}
.el-select {
  width: 80%;
}
.el-textarea {
  width: 80%;
  text-align: center;
}
#addPay {
  float: left;
}
.el-button {
  background: #ff9a00;
  border-color: #ff9a00;
}
.el-button:hover {
  background: #ec9005;
  border-color: #ec9005;
}
</style>