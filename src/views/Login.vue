<template>
    <div class="login">
        <div class="login-box">
            <div>
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form class="login-form" :rules="rules" :model="loginForm" ref="loginFormRef">
                <el-form-item  prop="username">
                    <el-input placeholder="请输入账号" v-model="loginForm.username"
                              prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input show-password placeholder="请输入密码" v-model="loginForm.password"
                              prefix-icon="el-icon-goods"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: "",
                    password: '',
                },
                rules: {
                    username: [
                        {require: true, message: "请输入用户名", trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在2到15个字符', trigger: 'blur'}
                    ],
                    password: [
                        {require: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods:{
            reset(){
                //console.log(this);
                this.$refs.loginFormRef.resetFields()
            },
            login(){
                let that =this
                this.$refs.loginFormRef.validate(function (result) {
                      if(result){

                          that.axios.interceptors.request.use(config=>{
                              config.headers.auth=sessionStorage.getItem("token1")
                              return config
                          })
                          that.axios.post('/api/login1',that.loginForm).then(res=>{
                             console.log(res);
                             if(res.data.code===200){
                                 that.$message.success("登录成功")
                                 sessionStorage.setItem("token1",res.data.token1)
                                 setTimeout(function () {
                                     that.$router.push("/home")
                                 },2000)
                              
                             }else if(res.data.code===201){
                                 that.$message.error("登录失败")
                             }
                         })
                      }else{
                        /*  that.$message({
                              message: '用户名或密码格式错误 ',
                              center: true
                          });*/
                          that.$message({
                              showClose: true,
                              message: '用户名或密码格式错误',
                              type: 'error',
                              center:true
                          })
                      }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        height: 100%;
        background: #4b4b4b;

        .login-box {
            width: 600px;
            height: 400px;
            background: #f1f1f1;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;

            & > div {
                width: 150px;
                height: 150px;
                border: 1px silver solid;
                border-radius: 50%;
                background: #fd7600;
                box-shadow: 0 0 10px #00dd00;
                position: absolute;
                left: 50%;
                transform: translate(-50%, -25%);

                img {
                    width: 100%;
                    height: 100%;
                    /*border: 1px silver solid;*/
                    //img标签也可以 border-radius
                    border-radius: 50%;
                }
            }

            .login-form {
                box-sizing: border-box;
                width: 100%;
                padding: 0 40px;
                position: absolute;
                bottom: 30px;
            }

            .btns {
                text-align: right;
                padding-right: 40px;
            }
        }
    }
</style>