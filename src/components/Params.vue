<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/welcome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-alert
                    title="注意：只允许为第三级分类设置相关参数"
                    type="warning"
                    show-icon :closable="false">
            </el-alert>
            <el-row class="fl">
                <el-col :span="4">
                    <span style="display: block;width: 100%;height: 40px;text-align: center;line-height: 40px;">选择商品分类</span>
                </el-col>
                <el-col :span="16">
                    <el-cascader
                            v-model="selectshow"
                            :options="paramsList"
                            :props="props"
                            style="float: left;width: 40%"
                    ></el-cascader>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="动态参数" name="first">
                    <el-button type="primary">动态参数</el-button>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="second">
                    <el-button type="primary">静态属性</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Params",
        data(){
            return {
                paramsList: [],
                props:{
                 value:"",
                 label:"name",
                 children:"children"
                },
                selectshow:[],
                activeName:"first"
            }
        },
        methods:{
            getparams(){
                this.axios.post('/api/getparams').then((res)=>{
                    console.log(res.data.data);
                    this.paramsList=res.data.data
                }).catch((err)=>{
                    console.log(err);
                })
            },
            handleClick(){
                console.log(this.activeName)
            }
        },
        created() {
          this.getparams()
        }
    }
</script>

<style scoped>
   .el-card{
       margin-top: 20px;
   }
    .fl{
        margin: 20px 0;
    }

</style>