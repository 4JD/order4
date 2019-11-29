<template>
  
</template>

<script>
export default {
  name: "IndexItems",
  props: ['info'],
  /* directives: {
    "focus": {
      inserted(el) {
        el.focus()
      }
    }
  } */
};
</script>

<style lang="less" scoped>
    @import '../assets/css/base.less';

    .foodItems {
        width: 200px;
        height: 270px;
        border: 1px solid #8f8f8f;
        text-align: center;
        padding: 10px 0;
        float: left;
        margin-top: 10px;
        margin-left: 10px;

        span{
            color: #dd0000;
            font-size: 20px;
        }
    }

    .index-items-img img {
        width: 120px;
        height: 120px;
    }

    .index-item-box{
        /* padding: 0 10px; */
        overflow: hidden;
        /* display: flex;
        flex-wrap: wrap; */
    }
</style>
