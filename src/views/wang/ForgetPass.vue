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
                                    <input type="text" maxlength="11" placeholder="手机号"   v-model="telNumber">
                                </label>

                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="text" class="yanzheng"  maxlength="6" style="width: 40%" placeholder="请输入验证码" v-model="code">
                                </label>

                                <el-button round :disabled="upAndDown"   @click="yanzhengma">{{yanzhengTitle}}</el-button>
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
          errCont:"",
          code:"",
          yanzhengTitle:"点击获取验证码",
          upAndDown:false

        }
      },
      methods:{
        forget(){

          if(this.telNumber=="") {
            this.errText=true;
            this.errCont="账号不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else if (this.code=="") {
            this.errText=true;
            this.errCont="验证码不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }
          else {
            this.axios.post("/telCode",{
              tel:this.telNumber,
              code:this.code
            })
              .then((res)=>{
              console.log(res);
              if (res.data.code==1001){
                this.errText=true;
                this.errCont="还未发送验证码";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '还未发送验证码'
              }else if (res.data.code==1002){
                this.errText=true;
                this.errCont="验证码超时";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '验证码超时'
              }
              else if (res.data.code==1003){
                this.errText=true;
                this.errCont="验证码错误";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '验证码错误'
              }else if (res.data.code==200){
                sessionStorage.setItem("userTel", this.telNumber);
                this.$router.replace("/resetPass")
              }
              else if (res.data.code==1005){
                this.errText=true;
                this.errCont="此号码今日验证次数用完";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '此号码今日验证次数用完'
              }
              else if (res.data.code==1006){
                this.errText=true;
                this.errCont="今日验证次数用完";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '今日验证次数用完'
              }
            })
              


          }
        },
        yanzhengma(){


          if (this.telNumber==""){
            this.errText=true;
            this.errCont="手机号不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else {
            this.axios.post("/forgetPassword",{
              userTel:this.telNumber
            }).then((res)=>{

              console.log(res);
               if(res.data.code==200){
                this.yanzhengTitle="一分钟后可再次发送";
                this.upAndDown=true;
                setTimeout(()=>{
                  this.yanzhengTitle="点击获取验证码";
                  this.upAndDown=false
                },60000)
              }
              else if (res.data.code==1002) {
                this.errText=true;
                this.errCont="系统维护";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '系统维护'
              }
              else if(res.data.code==1001) {
                this.errText=true;
                this.errCont="手机号不存在";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '手机号不存在'
              }
              else if(res.data.code==1003) {
                this.errText=true;
                this.errCont="验证码发送失败，请重试";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '验证码发送失败，请重试'
              }
              else if(res.data.code==1004) {
                this.errText=true;
                this.errCont="手机号格式错误";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '手机号格式错误'
              }
            })
          }
        }
      }
    }
</script>

<style scoped>
    @import "../../assets/css/login&register.css";
</style>