<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/welcome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="roleList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级">
                    <template slot-scope="scope" prop="level">
                        <el-tag type="success" v-if="scope.row.level==='一级'">一级</el-tag>
                        <el-tag  v-else-if="scope.row.level==='二级'">二级</el-tag>
                        <el-tag type="danger" v-else>三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "LimitList",
        data(){
            return {
                roleList:[]
            }

        },
        methods:{
            getRoleData(){

                this.axios({
                    url:"/api/getRoleData"
                }).then((res)=>{
                    console.log(res.data.data);
                    this.roleList=res.data.data
                }).catch((err)=>{
                    console.log(err);
                })
            }
        },
        created() {
            this.getRoleData()
        }
    }
</script>

<style scoped>
   .el-card{
       margin-top: 20px;
   }
</style>