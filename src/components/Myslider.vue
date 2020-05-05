<template>
    <div>
        <div class="toggle-btn" @click="toggles">|||</div>
        <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                unique-opened :collapse="isCollapse" :collapse-transition="false"
                router >
            <el-submenu v-for="(item,index) in menuList" :index="item.id+''">
                <template slot="title">
                    <i :class="icons[index]"></i>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="value in item.children" :index="value.path">
                    <i class="el-icon-menu" ></i>
                    <span>{{value.name}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>

</template>

<script>
    export default {
        name: "Myslider",
        data(){
            return {
                menuList:[ ],
                icons:["el-icon-s-flag","el-icon-s-claim","el-icon-s-opportunity",
                "el-icon-s-open","el-icon-share"],
                isCollapse:false
            }
        },
        methods:{
            getMenuList(){
                this.axios.post("/api/getMenuList").then((res)=>{
                    //console.log(res)
                    this.menuList=res.data.data
                })
            },
            toggles(){
                this.isCollapse=!this.isCollapse
                let val=this.isCollapse
               // console.log(val);
                this.$emit("check-toggle",val)
            }
        },
        created() {
            this.getMenuList()
        }
    }
</script>

<style scoped lang="less">
    .toggle-btn{
        background: #4a5064;
        font-size: 20px;
        color: gainsboro;
        letter-spacing: 0.2em;
        line-height: 26px;
        cursor: pointer;
    }
    .el-menu{
        border-right:none;
    }
    .el-menu-item{
      padding-left: 80px!important;
  }
</style>