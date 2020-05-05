<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/welcome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-col :span="6">
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <el-table :data="roleList" border stripe>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                         <el-row v-for="(item1,index1) in scope.row.children" :class="['bbot','vcenter',index1===0?'btop':'']">
<!--                             渲染一级权限-->
                             <el-col :span="5">
                                 <el-tag>
                                     {{ item1.authName }}
                                 </el-tag>
                                  <i class="el-icon-caret-right"></i>
                             </el-col>
<!--                             渲染二级权限-->
                             <el-col :span="19">
                                 <el-row v-for="(item2,index2) in item1.children" :class="['bbot',index1===0?'btop':'']">
                                     <el-col :span="5">
                                         <el-tag type="success">
                                             {{ item2.authName }}
                                         </el-tag>
                                         <i class="el-icon-caret-right"></i>
                                     </el-col>
                                     <el-col :span="19">
                                         <el-tag type="warning" v-for="(item3,index3) in item2.children" closable
                                         @close="removeLimit">
                                             {{ item3.authName }}
                                         </el-tag>
                                     </el-col>
                                 </el-row>

                             </el-col>
                         </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="name"></el-table-column>
                <el-table-column label="角色描述" prop="dec"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-setting" @click="getTree">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
<!--        分配权限的对话框-->
        <el-dialog
                :visible.sync="dialogVisible"
                width="30%"
                >
            <el-tree :data="limitdata" :props="defaultProps" show-checkbox default-expand-all></el-tree>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "RolesList",
        data(){
            return {
                roleList:[],
                dialogVisible:false,
                limitdata:[],
                defaultProps:{
                    label:"authName",
                    children:"children"
                },

            }
        },
        methods:{
            getData(){
                this.axios({
                    url:"/api/getdata"
                }).then((res)=>{
                    console.log(res.data.data);
                    this.roleList=res.data.data
                }).catch((err)=>{
                    console.log(err);
                })
            },
            removeLimit(){
                this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            getTree(){
                this.axios.get('/api/gettree').then((res)=>{
                    console.log(res.data.data);
                    this.limitdata=res.data.data
                    this.dialogVisible=true
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped>
    .el-card{
        margin-top: 20px;
    }
    .el-table{
        margin-top: 20px;
    }
    .el-tag{
        margin: 10px;
    }
    .btop{
        border-top: 1px solid gainsboro;
    }
    .bbot{
       border-bottom: 1px solid gainsboro;
    }
    .vcenter{
        display: flex;
        align-items: center;
    }
</style>