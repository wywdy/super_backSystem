<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/welcome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row style="margin-bottom: 20px">
                <el-col>
                    <el-button type="primary" style="float: left" @click="showdia">添加分类</el-button>
                </el-col>
            </el-row>
            <tree-table :data="productData" :columns="columns" :selection-type="false"
            :expand-type="false" show-index index-text="#" border :show-row-hover="false">
               <template slot="istrue" slot-scope="scope">
                   <i class="el-icon-success" v-if="scope.row.isok===true" style="color:#00dd00;font-size: 20px"></i>
                   <i class="el-icon-error" v-else style="color:#00dd00;font-size: 20px"></i>
               </template>
                <template slot="order" slot-scope="scope">
                    <el-tag v-if="scope.row.od===0">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.od===1">二级</el-tag>
                    <el-tag type="danger" v-else>三级</el-tag>
                </template>
                <template slot="btn">
                    <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                </template>
            </tree-table>
        </el-card>
<!--        添加分类modal-->
        <el-dialog
                title="添加分类"
                :visible.sync="dialogVisible"
                width="50%"
               >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="分类名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-input v-model="form.parentname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "product",
        data(){
            return {
                productData:[],
                columns:[
                    {label:"分类名称",prop:"name"},
                    {label:"是否有效",prop:"isok",type:"template",template:"istrue"},
                    {label:"排序",prop:"ord",type:"template",template:"order"},
                    {label:"操作",type:"template",template:"btn"},
                ],
                dialogVisible:false,
                form:{
                    name:"",
                    parentname:""
                }
            }
        },
        methods:{
            getProducts(){
                this.axios.get('/api/getProduct1').then((res)=>{
                    console.log(res.data.data);
                    this.productData=res.data.data
                }).catch((err)=>{
                    console.log(err);
                })
            },
            showdia(){
                this. dialogVisible=true
            }
        },
        created() {
            this.getProducts()
        }

    }
</script>

<style scoped>
    .el-card{
        margin-top: 20px;
    }
</style>