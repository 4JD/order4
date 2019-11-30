<template>
    <div class="agileits-main">
        <div class="w3top-nav">

            <div class="w3top-nav-left">
                <h1>dwaf</h1>
            </div>
            <div class="clear"></div>
        </div>
        <div class="header-main">
            <h2>找回密码</h2>
            <form class="header-bottom">
                <div class="header-right w3agile">
                    <div class="header-left-bottom agileinfo">
                        <div >
                            <div class="icon1">

                                <label>
                                    <input type="text" placeholder="手机号"   v-model="telNumber">
                                </label>

                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="text" class="yanzheng"  style="width: 60%" placeholder="请输入验证码" v-model="yanzheng">
                                </label>

                                <button class="yz-btn">获取验证码</button>
                            </div>

                            <div class="bottom">
                                <input type="button" value="确认" @click="forget">
                            </div>

                        </div>
                    </div>
                </div>
            </form>
            <el-alert
                    :title="errCont"
                    type="error"
                    v-show="errText"
            >
            </el-alert>
        </div>

    </div>
</template>

<script>
    export default {
        name: "forget-pass",
      data(){
        return{
          telNumber:"",
          yanzheng:"",
          errText:false,
          errCont:""
        }
      },
      methods:{
        forget(){

          if (this.username==1&&this.password==1){
            console.log("登录成功")
          }
          else if(this.telNumber=="") {
            this.errText=true;
            this.errCont="账号不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else if (this.yanzheng=="") {
            this.errText=true;
            this.errCont="验证码不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else {
            this.errText=true;
            this.errCont="验证码错误";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }
        }
      }
    }
</script>

<style scoped>
    @import "../../assets/css/login&register.css";
</style>