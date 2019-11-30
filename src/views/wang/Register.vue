<template>
    <div class="agileits-main">
        <div class="w3top-nav">

            <div class="w3top-nav-left">
                <h1>dwaf</h1>
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
                                    <input type="text" placeholder="用户名" v-model="username">
                                </label>

                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="text" placeholder="手机号" v-model="usertel">
                                </label>

                            </div>

                            <div class="icon1">

                                <label>
                                    <input type="text"   style="width: 60%" placeholder="请输入验证码" v-model="yanzheng">
                                </label>

                                <button class="yz-btn">获取验证码</button>
                            </div>

                            <div class="icon1">

                                <label>
                                    <input type="password" placeholder="密码" v-model="password">
                                </label>

                            </div>
                            <div class="icon1">

                                    <label>
                                        <input type="password" placeholder="确认密码" v-model="passwordAgain">
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
          username:"",
          password:"",
          passwordAgain:"",
          errText:false,
          errCont:"",
          yanzheng:"",
          usertel:""



        }
      },

      methods:{
          register(){
            if (this.username==""){
              this.errText=true;
              this.errCont="账号不能为空";
              setTimeout(()=>{
                this.errText=false;
              },2000)
            }else  if(this.usertel==""){
              this.errText=true;
              this.errCont="用户名不能为空";
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

            }else {
              this.errText=true;
              this.errCont="账号已存在";
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