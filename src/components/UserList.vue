<template>
    <div>
<!--        面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/welcome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
<!--        卡片视图区-->
        <el-card >
<!--           搜索添加区域-->
<!--            通过row,col控制宽度-->
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="query" clearable @clear="reset">
                        <el-button slot="append" icon="el-icon-search" @click="ser"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" style="float: left" @click="addUser">添加用户</el-button>
                </el-col>
            </el-row>
<!-- 用户列表区域-->
            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="tel"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态" prop="state">
<!--                    作用域插槽,scope=userList-->
                    <template slot-scope="scope">
                        <el-switch  v-model="scope.row.state">
                        </el-switch>
                    </template>

                </el-table-column>
                <el-table-column label="操作" width="200">
                   <template slot-scope="scope">
                       <el-tooltip content="编辑" placement="top-start" :enterable="false">
                           <el-button type="primary" class="el-icon-edit" size="mini"></el-button>
                       </el-tooltip>
                       <el-tooltip content="删除" placement="top-start" :enterable="false">
                           <el-button type="warning" class="el-icon-delete" size="mini"></el-button>
                       </el-tooltip>
                       <el-tooltip content="分配角色" placement="top-start" :enterable="false">
                           <el-button type="danger" class="el-icon-setting" size="mini"></el-button>
                       </el-tooltip>
                   </template>
                </el-table-column>
            </el-table>
<!--            分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 3, 5, 7]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="4">
            </el-pagination>
        </el-card>
<!--        添加用户的对话框-->
        <el-dialog
                title="添加用户的基本信息"
                :visible.sync="dialogVisible"
                width="50%" @close="dialogRes">
<!--            主体区域-->
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="tel">
                    <el-input v-model="addForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="addForm.state"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-input v-model="addForm.role_name"></el-input>
                </el-form-item>
            </el-form>
<!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible=false ">取 消</el-button>
    <el-button type="primary" @click="addTrue">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data(){

            let checkEmail=(rule,value,cb)=>{
                if (!value) {
                    return callback(new Error('邮箱不能为空'));
                }
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if(reg.test(value)){
                    return cb()
                }
                cb(new Error("邮箱格式错误"))

            }
            let checkTel=(rule,value,cb)=>{
                if (!value) {
                    return callback(new Error('电话不能为空'));
                }
                let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if(reg.test(value)){
                    return cb()
                }
                cb(new Error("请输入正确的电话号码"))
            }
            return {
                queryInfo:{
                    pagenum:1,
                    pagesize:2
                },
                userList:[],
                query:"",
                dialogVisible:false,
                addForm:{
                    name:"",
                    email:"",
                    tel:"",
                    password:"",
                    state:"",
                    role_name:""
                },
                rules:{
                    name:[
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3,max:10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    password:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6,max:10, message: '长度在 6 到 10 个字符', trigger: 'blur'},
                    ],
                    tel:[
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                        { validator: checkTel, trigger: 'blur'}
                    ],
                    email:[
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        { validator: checkEmail, trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            getUserList(){
                this.axios.get("/api/getUserData",{
                    params:this.queryInfo
                }).then((res)=>{
                    console.log("res.data",res.data);
                    this.userList=res.data.data
                }).catch((err)=>{
                    console.log(err);
                })
            },
            handleSizeChange(newpage){
                console.log("handleSizeChange",newpage);
            },
            handleCurrentChange(v){
                console.log(" handleCurrentChange",v);
            },
            ser(){
               // console.log(123)
                let that=this
                let newarr=[]
                //只能搜索一次
                this.userList.forEach((v,i)=>{
                    if(v.name.search(that.query)!=-1){
                       newarr.push(this.userList[i])
                    }
                })
               // console.log(newarr);
                that.userList=newarr
            },
            reset(){
                this.getUserList()
            },
            addUser(){
                this.dialogVisible=true
            },
            addTrue(){
                let that=this
               this.$refs.addForm.validate((value)=>{
                   if(value){
                        let arr=[]
                        arr.push(that.addForm)
                       console.log("arr",arr);
                       that.userList=that.userList.concat(arr)
                       console.log(that.userList)
                        that.dialogVisible=false
                   }else{
                       return
                   }
               })
            },
            dialogRes(){
                this.$refs.addForm.resetFields()
            }

        },
        created() {
            this.getUserList()
        }

    }
</script>

<style scoped lang="less">
  .el-breadcrumb{
      margin-bottom: 15px;
  }
    .el-card{
        box-shadow: 0 2px 2px rgba(0,0,0,0.3);
    }
    .el-table{
        margin-top: 20px;
    }
    .el-pagination{
        margin-top: 20px;
    }
</style>