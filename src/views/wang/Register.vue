<template>
    <div class="agileits-main">
        <div class="w3top-nav">

            <div class="w3top-nav-left">
<!--                <h1>dwaf</h1>-->
            </div>
            <div class="clear"></div>
        </div>
        <div class="header-main">
            <h2>注册</h2>

            <form class="header-bottom">
                <div class="header-right w3agile">
                    <div class="header-left-bottom agileinfo">
                        <div >
                            <div class="icon1">

                                <label>
                                    <input type="text" placeholder="用户名" v-model="username" maxlength="11">
                                </label>

                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="text" onkeypress="return event.keyCode>=48&&event.keyCode<=57" placeholder="手机号" v-model="usertel" maxlength="11">
                                </label>

                            </div>

                            <div class="icon1">

                                <label>
                                    <input type="text"  onkeypress="return event.keyCode>=48&&event.keyCode<=57" id="yanzheng"  style="width: 40%"  placeholder="请输入验证码" v-model="yanzheng" maxlength="6">
                                </label>
                                <el-button round :disabled="upAndDown"   @click="yanzhengma">{{yanzhengTitle}}</el-button>

<!--                                <button type="button"  :value="yanzhengTitle" class="yz-btn" @click="yanzhengma">点击验证码</button>-->
                            </div>




                            <div class="icon1">

                                <label>
                                    <input type="password"  placeholder="密码" v-model="password" maxlength="12">
                                </label>

                            </div>
                            <div class="icon1">

                                    <label>
                                        <input type="password" placeholder="确认密码" v-model="passwordAgain" maxlength="12">
                                    </label>


                            </div>
                            <div class="bottom">
                                <input type="button" value="注册" @click="register" >
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
      name: "Register",
      data(){
        return{
          username:"",//用户名
          password:"",//密码
          passwordAgain:"",//确认密码
          errText:false,//提示信息显示或隐藏
          errCont:"",//提示内容
          yanzheng:"",//验证码
          usertel:"",//用户手机号
          code:"",
          yanzhengTitle:"点击获取验证码",
          upAndDown:false



        }
      },

      methods:{
        register(){
          if (this.username==""){
            this.errText=true;
            this.errCont="用户名不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else  if(this.usertel==""){
            this.errText=true;
            this.errCont="手机号不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else if(this.yanzheng==""){
            this.errText=true;
            this.errCont="验证码不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }
          else if (this.password==""){
            this.errText=true;
            this.errCont="密码不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)

          }else  if(this.password!=this.passwordAgain){

            this.errText=true;
            this.errCont="两次密码值不一样";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }

          else if (this.usertel.length!=11){
            this.errText=true;
            this.errCont="手机号长度需要11位";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }
          else if (this.password.length<6){
            this.errText=true;
            this.errCont="密码长度必须6-12位";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }
          else{
            this.axios.post("/telCode",{
              tel:this.usertel,
              code:this.yanzheng
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
                   },2000);
                   throw '验证码错误'
                 }

              })
              .then(()=>{
                this.axios.post("/register",{
                  ownerName: this.username,
                  password : this.password,
                  ownerAddress :"霞飞路",
                  ownerSex :"男",
                  ownerRemark :"",
                  userTel :this.usertel
                })
                  .then((res)=>{
                    console.log("res",res)
                    // if (res.data.code) {
                    //   this.$router.replace("/login")
                    // }else if (res.data.code) {
                    //   this.errText=true;
                    //   this.errCont="还未发送验证码";
                    //   setTimeout(()=>{
                    //     this.errText=false;
                    //   },2000)
                    //   throw '还未发送验证码'
                    // }

                  })

            })

              .catch(err=>{
                console.log(err)
              })



            // //   .then((res)=>{
            // //   if (res.data.state==1){
            // //     this.errText=true;
            // //     this.errCont="注册成功";
            // //     setTimeout(()=>{
            // //       this.errText=false;
            // //        this.$router.replace("/login")
            // //     },2000)
            // //   }
            // //   else  if (res.data.state==2){
            // //     this.errText=true;
            // //     this.errCont="账户已存在";
            // //     setTimeout(()=>{
            // //       this.errText=false;
            // //     },2000)
            // //   }
            // // })
          }

        },
        yanzhengma(){
          console.log("点击验证码");

          if (this.usertel==""){
            this.errText=true;
            this.errCont="手机号不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else {
            this.axios.post("/sendMessage",{
              userTel:this.usertel
            })
              .then((res)=>{
                console.log(res);
                if (res.data.code==200){
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
                },2000);
                throw '系统维护'
              }
              else if(res.data.code==1001) {
                this.errText=true;
                this.errCont="手机号已注册";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
                throw '手机号已注册'
              }
              else if(res.data.code==1003) {
                this.errText=true;
                this.errCont="验证码发送失败，请重试";
                setTimeout(()=>{
                  this.errText=false;
                },2000);
                throw '验证码发送失败，请重试'
              }
              else if(res.data.code==1004) {
                this.errText=true;
                this.errCont="手机号格式错误";
                setTimeout(()=>{
                  this.errText=false;
                },2000);
                throw '手机号格式错误'
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
        }
        }
    }

</script>

<style scoped>
    @import "../../assets/css/login&register.css";
</style>