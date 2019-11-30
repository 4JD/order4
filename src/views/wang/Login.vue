<template>


    <div class="agileits-main">


        <div class="w3top-nav">

            <div class="w3top-nav-left">
                <h1>dwaf</h1>

            </div>
            <div class="clear"></div>
        </div>


        <div class="header-main">
            <h2>登录</h2>
            <form class="header-bottom">
                <div class="header-right w3agile">
                    <div class="header-left-bottom agileinfo">
                        <div>
                            <div class="icon1">
                                <label >
                                    <input type="text" placeholder="手机号"  v-model="username">
                                </label>

                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="password" placeholder="密码" v-model="password" >
                                </label>
                            </div>

                            <div class="bottom">
                                <input type="button" value="登录"  @click="login">
                            </div>
                            <p class="dibu">
                                <a  href="/ForgetPass" >忘记密码</a>

                                <a href="/register" >注册账号</a>
                            </p>
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
        name: "login",
      data(){
          return{
            username:"",
            password:"",
            errText:false,
            errCont:""
          }
      },
      methods:{
          // getLogin(){
          //   this.axios.post("/register",{
          //     //传递的参数
          //     userName:this.username,
          //     userPassword: this.password
          //   }).
          //     then((res)=>{
          //       console.log(res.data)
          //       // if (res.data.state){
          //       //   var token = res.data.token;
          //       //   sessionStorage.setItem("token", token);
          //       //   var url = this.$route.query.redirect;
          //       //   url = url ? url : "/";
          //       //   this.$router.replace(url)
          //       // }else {
          //       //     console.log("登录失败")
          //       // }
          //   }).catch(err=>{
          //     console.log(err)
          //   })
          // },
        login(){

            if (this.username==1&&this.password==1){
              console.log("登录成功")
            }
            else if(this.username=="") {
              this.errText=true;
              this.errCont="账号不能为空";
              setTimeout(()=>{
                this.errText=false;
              },2000)
            }else if (this.password=="") {
              this.errText=true;
              this.errCont="密码不能为空";
              setTimeout(()=>{
                this.errText=false;
              },2000)
            }else {
              this.errText=true;
              this.errCont="账号密码错误";
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