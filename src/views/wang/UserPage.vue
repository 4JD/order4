<template>

    <div class="warp">

        <div class="header">
            <div  class="head-cont" >
                <h1>点餐管理系统</h1>

                <div class="adminedit">
                    <a href="/login" >退出</a>
                </div>

            </div>
        </div>

        <div class="main">
            <div class="main-left">

                <ul>
                    <li :class="{on :com==='index'}" @click="com='index'">
                        <i class="el-icon-thumb"></i>
                        <a href="javascript:;">柜台点餐</a>
                    </li>

                    <li :class="{on:com==='orderMngDetail'}" @click="com='orderMngDetail'">
                        <i class="el-icon-discount"></i>
                        <a href="javascript:;" >
                            历史订单
                        </a>
                    </li>

                    <li :class="{on: com==='menuManagement'}" @click="com='menuManagement'">
                        <i class="el-icon-coordinate"></i>
                        <a href="javascript:;" >
                            菜品管理
                        </a>
                    </li>

                    <li  @click=secondMenu>
                        <i class="el-icon-bank-card"></i>
                        <a href="javascript:;"  >
                            财务管理
                            <i :class="[upAndDown ? 'el-icon-caret-right' : 'el-icon-caret-bottom']"></i>
                        </a>
                    </li>

                    <li class="second" v-show="second" :class="{on: com==='payment'}"  @click="com='payment'">
                        <i class="el-icon-document-remove"></i>
                        <a href="javascript:;" >支出</a>
                    </li>

                    <li class="second" v-show="second" :class="{on: com==='inCome'}"  @click="com='inCome'">
                        <i class="el-icon-document-add"></i>
                       <a href="javascript:;" >收入</a>
                    </li>

                    <li class="second"  v-show="second" :class="{on: com==='Financial'}"  @click="com='Financial'">
                        <i class="el-icon-guide"></i>
                        <a href="javascript:;" >盈利</a>
                    </li>

                    <li  @click="com='worker'"  :class="{on: com==='worker'}" >
                        <i class="el-icon-office-building"></i>
                        <a href="javascript:;"> 员工管理</a></li>
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
    import income from "../Income"
    import  index from  "../Index"
    import  orderMngDetail from "../OrderMngDetail"
    import  worker from  "../Worker"
    import  menuManagement from  "../MenuManagement"
    import payment from "../Payment"
    import  inCome from "../Income"
    import   Financial from  "../Financial"

  export default {
    name: "UserPage",
    components: {
      income,
      index,
      worker,
      orderMngDetail,
      menuManagement,
      payment,
      inCome,
      Financial
    },
      data() {
      return {
        com:"index",
        second:false,
        secondColor:"",
        upAndDown:"true"

      }
    },
    methods:{
      quit(){
        this.$router.replace("/login")
      },  handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      secondMenu(){
        this.second=!this.second;
        this.upAndDown=!this.upAndDown
      }

    }
  }
</script>

<style scoped lang="less">
    @import '../../assets/css/resize.css';

    .warp{
        overflow-y: hidden;
        overflow-x: hidden;
    }

    i{
        font-size: 16px;
        color: white;
        padding-right: 5px;
    }
    .header{
        background-color: #23262E;
        width: 100%;
        height: 50px;
        /*border: #04c9f9 1px solid;*/
        line-height: 50px;
    }

    .main{
        width: 100%;
        position: absolute;
        top: 50px;
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
        background-color: #23262E;


        li{
            width: 100%;
            height: 50px;
            line-height: 50px;
            /*border: 1px skyblue solid;*/
            text-align: center;
            font-size: 16px;

            a{

                color: white;
                font-size: 16px;

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
            /*background: #3D3D3E;*/
        }

        li:first-child{
            border-top: 2px solid #ff9a00;
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
        background: white;
    }

    .head-cont{
        width: 95%;
        margin: 0 auto;
        height:50px;
        line-height: 50px;
        text-align: center;
        position: relative;
        /*border: 1px darkcyan dashed;*/
        h1{
            color: white;
            letter-spacing: 2px;
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            font-weight: bold;
            font-size: 1.5em;
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
        background:#ff9a00;
    }

    .adminedit{
        position: absolute;
        top: 0;
        right: 10px;
        width: 100px;
        a{
                color: white;
        }
        a:hover{
            color: #ff9a00;
        }
    }




    /*.head-left,.header-right {*/
    /*    height: 60px;*/
    /*    !*border: 1px darkcyan dashed;*!*/
    /*    font-size:26px ;*/
    /*    display: inline-block;*/
    /*}*/

    /*.head-left{*/
    /*    width: 400px;*/
    /*    float: left;*/

    /*}*/
    /*.head-right{*/
    /*    !*border: 1px skyblue solid;*!*/
    /*    width: 240px;*/
    /*    margin-left: -400px;*/
    /*    float: right;*/
    /*    a{*/
    /*        padding:0 30px;*/
    /*    }*/
    /*}*/
</style>