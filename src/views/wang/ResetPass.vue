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
                                    <input type="text" placeholder="输入密码">
                                </label>


                            </div>
                            <div class="icon1">

                                <label>
                                    <input type="text" placeholder="确认密码">
                                </label>

                            </div>

                            <div class="bottom">

                                <input type="submit" value="确认修改" >
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
        name: "resetPass"
    }
</script>

<style scoped>
    @import "../../assets/css/login&register.css";
</style>