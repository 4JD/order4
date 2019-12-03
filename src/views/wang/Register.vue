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
                                    <input type="text" placeholder="用户名" v-model="username" maxlength="11">
                                </label>

                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="text" placeholder="手机号" v-model="usertel" maxlength="11">
                                </label>

                            </div>

                            <div class="icon1">

                                <label>
                                    <input type="text"   style="width: 60%" placeholder="请输入验证码" v-model="yanzheng" maxlength="4">
                                </label>

                                <button class="yz-btn" @click="yanzhengma">获取验证码</button>
                            </div>

                            <div class="icon1">

                                <label>
                                    <input type="password" placeholder="密码" v-model="password" maxlength="11">
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
          code:""



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
          }else{

            this.axios.post("./register",{
              username: this.username,
              userPassword: this.userPassword,
              yanzheng:this.yanzheng,
              address:"霞飞路",
              sex:"男"

            }).then((res)=>{
              if(res.data.yanzheng==false){
                this.errText=true;
                this.errCont="验证码错误";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
              }
              else  if (res.data.state==1){
                this.errText=true;
                this.errCont="注册成功";
                setTimeout(()=>{
                  this.errText=false;
                   this.$router.replace("/login")
                },2000)
              }
              else  if (res.data.state==2){
                this.errText=true;
                this.errCont="账户已存在";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
              }
            })
          }

        },
        yanzhengma(){
          if (this.usertel==""){
            this.errText=true;
            this.errCont="手机号不能为空";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else {
            this.axios.post("/yanzheng",{
              userTel:this.usertel
            }).then(()=>{

            })
          }
        }
        }
    }

</script>

<style scoped>
    @import "../../assets/css/login&register.css";
</style>