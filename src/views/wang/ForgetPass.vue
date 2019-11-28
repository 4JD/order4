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
                                    <input type="text" placeholder="手机号" >
                                </label>

                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="text" class="yanzheng"  style="width: 60%" placeholder="请输入验证码">
                                </label>

                                <button class="yz-btn">获取验证码</button>
                            </div>

                            <div class="bottom">
                                <input type="submit" value="确认">
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "forget-pass"
    }
</script>

<style scoped>
    @import "../../assets/css/login&register.css";
</style>