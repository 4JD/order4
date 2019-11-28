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
                                <label>
                                    <input type="text" placeholder="手机号" >
                                </label>
                            </div>
                            <div class="icon1">
                                <label>
                                    <input type="password" placeholder="密码" >
                                </label>

                            </div>

                            <div class="bottom">
                                <input type="submit" value="登录" >
                            </div>
                            <p class="dibu">
                                <a  href="#">忘记密码</a>

                                <a href="#">注册账号</a>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>
    @import "../../assets/css/login&register.css";

</style>