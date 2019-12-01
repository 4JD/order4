<template>
    <div class="warp">

        <div class="header">
            <div  class="head-cont" >

                <div class="head-left">
                    <img  class="log" src="../../assets/images/wang/tick.png" alt="">
                    XXXX管理系统

                </div>

                <div class="head-right">

                    <img  class="icon " src="" alt="头像">

                    <a href="javascript:;">姓名</a>

                    <a href="javascript:;">注销</a>

                </div>
            </div>
        </div>

        <div class="main">
            <div class="main-left">

                <ul>
                    <li>
                        <a href="javascript:;" @click="com=''">用户信息</a>
                    </li>

                    <li>
                        <a href="javascript:;" @click="com=''">
                            收银情况
                        </a>

                    </li>


                </ul>
            </div>
            <div class="main-right">

                <keep-alive>
                    <!-- is 等于哪个组件名，就在这渲染哪个组件 -->
                    <component :is="com"></component>

                </keep-alive>

            </div>
        </div>
    </div>
</template>


<script>



  export default {
    name: "Administrators",
    components: {


    },
    data() {
      return {
        com: 'users',
        second:false

      }
    },
  }
</script>

<style scoped lang="less">
    @import '../../assets/css/resize.css';

    *{
        color: white;
    }
    .warp{
        overflow-y: hidden;
        overflow-x: hidden;
    }

    .header{
        background-color: #343335;
        width: 100%;
        height: 80px;
        /*border: #04c9f9 1px solid;*/
        line-height: 80px;
    }

    .main{
        width: 100%;
        position: absolute;
        top: 80px;
        bottom: 0;
        left: 0;
        /*overflow: auto;*/
        margin-bottom: 20px;

    }
    .main-left{
        top: 0;
        position: absolute;
        bottom: 0;
        /*background: #ee4540;*/
        /*border: 1px #3be8b0  solid;*/
        width: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #272729;




        li{
            width: 200px;
            height: 60px;
            line-height: 60px;
            /*border: 1px skyblue solid;*/
            text-align: center;
            font-size: 20px;

            a{

                color: white;


            }
            a:link{
                color: white;
            }
            a:visited{
                color: white;
            }
            a:hover{
                opacity: 1;
            }
        }
        li:hover{
            background: #3D3D3E;
        }

    }
    .main-right{
        min-width: 600px;
        left: 200px;
        top:0;
        right: 0;
        position: absolute;
        bottom: 0;

        overflow-x: hidden;

    }

    .head-cont{
        width: 95%;
        margin: 0 auto;
        height:80px;
        line-height: 80px;
        /*border: 1px darkcyan dashed;*/

    }

    .head-left,.header-right {
        height: 60px;
        /*border: 1px darkcyan dashed;*/
        font-size:24px ;
        display: inline-block;
    }

    .head-left{
        width: 400px;
        float: left;

    }
    .head-right{
        /*border: 1px skyblue solid;*/
        width: 240px;
        margin-left: -400px;
        float: right;
        a{
            padding:0 30px;
        }
    }
    .icon{
        margin-right: 20px;
        width:50px ;
        height: 50px;
        border-radius: 50%;
    }


    .log{
        width: 60px;
        height: 60px;
        vertical-align: middle;
    }
    .on{
        background:#3D3D3E;
    }
</style>