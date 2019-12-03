<template>
    <div class="box">
        <fieldset class="layui-elem-field site-demo-button" style="margin-top: 30px;">
            <legend>店铺收益</legend>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>

            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>

        </fieldset>

        <fieldset class="layui-elem-field site-demo-button" style="margin-top: 30px;">
            <legend>二维码收益</legend>

            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>


            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </fieldset>


        <fieldset class="layui-elem-field site-demo-button" style="margin-top: 30px;">
            <legend>利润</legend>

            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>

            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </fieldset>
    </div>
</template>


<script>



  export default {
    name: "Administrators",
    components: {


    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]

      }
    },
  }
</script>


<style scoped lang="less">

    .box{
        width: 800px;
        margin-left: 10px;
    }
    legend{
        font-size: 30px;
        margin-left: 30px;
    }
    .el-table{
        margin-bottom: 20px;

    }

    fieldset{
        margin-bottom: 30px;
        padding: 30px;

    }

</style>