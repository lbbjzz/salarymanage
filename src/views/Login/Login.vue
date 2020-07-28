<template>
    <div class="login">
        <!--        登陆主体-->
        <el-form ref="loginFormRef" :model="form" class="login-form" :rules="rules">
            <h3 class="title">企业工资管理系统</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号">
                    <i slot="prefix" class="el-icon-user input-icon"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off"
                          placeholder="密码">
                    <i slot="prefix" class="el-icon-lock input-icon"></i>
                </el-input>
            </el-form-item>
        </el-form>

        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © lbbjzz Group All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-size: cover;
        /*background-image: url("");*/
        background-color: skyblue;
    }

    .title {
        margin: 0 auto 30px auto;
        text-align: center;
        color: #707070;
    }

    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 300px;
        padding: 25px 25px 5px 25px;
        box-shadow: 0 0 35px darkblue;

        .el-input {
            height: 38px;

            input {
                height: 38px;
            }
        }

        .input-icon {
            height: 39px;
            width: 14px;
            margin-left: 2px;
        }

    }

    .el-login-header {
        position: fixed;
        top: 0;
        width: 100%;
        text-align: right;

    }

    .el-login-footer {
        height: 40px;
        line-height: 40px;
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 12px;
        letter-spacing: 1px;
    }

</style>
