<template>
    <el-container class="wrap">
        <el-header>
            <div>
                <img src="../../public/img/1.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="exit">退出</el-button>
        </el-header>
        <el-container>
            <el-aside  :width="isTrue?'64px':'200px'">
               <my-slider  @check-toggle="cek"></my-slider>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import myslider from '@/components/Myslider.vue'
    export default {
        name: "Home",
        data(){
            return {
                isTrue:false
            }
        },
        methods:{
            exit(){
                let that=this
                this.$confirm('是否确定退出', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    sessionStorage.clear()
                    that.$router.push('/login')
                })

            },
            cek(i){
                console.log(123)
                console.log(i);
                this.isTrue=i
            }

        },
        components:{
            "my-slider":myslider
        },

    }
</script>

<style scoped lang="less">
    .wrap{
        height: 100%;
        min-width: 1000px;
    }
    .el-header{
        background: #373d31;
        padding-left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: 20px;
        &>div{
            display: flex;
            align-items: center;
            span{
                margin-left: 20px;
            }
        }
    }
    .el-aside{
        background: #333744;
      /*  width: 220px!important;*/
    }
    .el-main{
        background: #EAEDF1;

    }
</style>