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
                                    <input type="text" placeholder="手机号" >
                                </label>
                            </div>
                            <div class="icon1">
                                <label>
                                    <input type="password" placeholder="密码">
                                </label>
                            </div>
                            <div class="icon1">
                                <form action="">
                                    <label>
                                        <input type="password" placeholder="确认密码">
                                    </label>
                                </form>

                            </div>
                            <div class="bottom">
                                <input type="submit" value="注册" >
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
        name: "Register"
    }
</script>

<style scoped>
    @import "../../assets/css/login&register.css";
</style>