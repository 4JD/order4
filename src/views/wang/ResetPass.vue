<template>
    <div class="agileits-main">
        <div class="w3top-nav">

            <div class="w3top-nav-left">
                <h1>dwaf</h1>
            </div>
            <div class="clear"></div>
        </div>
        <div class="header-main">
            <h2>重置</h2>
            <form class="header-bottom">
                <div class="header-right w3agile">
                    <div class="header-left-bottom agileinfo">
                        <div >
                            <div class="icon1">

                                <label>
                                    <input type="password" placeholder="输入密码" v-model="password">
                                </label>


                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="password" placeholder="确认密码" v-model="passwordAgain">
                                </label>

                            </div>

                            <div class="bottom">

                                <input type="button" value="确认修改" @click="change" >
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
        name: "resetPass",
      data(){
        return{

          telNumber:"",
          password:"",
          passwordAgain:"",

          errText:false,
          errCont:""

        }
      },
      methods:{
        change(){
          if (this.password==""||this.passwordAgain==""){
                this.errText=true;
                this.errCont="两项不能为空";
                setTimeout(()=>{
                  this.errText=false;
                },2000)
          }else if (this.password!=this.passwordAgain) {
            this.errText=true;
            this.errCont="两次输入不一样";
            setTimeout(()=>{
              this.errText=false;
            },2000)
          }else if (this.password==this.passwordAgain) {
             this.axios.post("/updatePassword",{
               userTel:sessionStorage.getItem("userTel"),
               userPassword:this.password
             })
               .then((res)=>{
                 console.log(res)
                 this.errText=true;
                 this.errCont="修改成功";
                 setTimeout(()=>{
                   this.errText=false;
                   var url = this.$route.query.redirect;
                   url = url ? url : "/login";
                   this.$router.replace(url)
                 },2000)
               })
          }

        }
      }
    }
</script>

<style scoped>
    @import "../../assets/css/login&register.css";
</style>