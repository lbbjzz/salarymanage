<template>
  <header>
    <div class="header-left" @click="goIndex" v-bind:title="message">东软企业工资管理系统</div>
    <div class="header-right">
      <div>
        <el-dropdown placement="bottom-start">
          <img class="user-img" src="../assets/logo.png"/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  data () {
    return {
      message: '回到首页'
    }
  },
  methods: {
    goIndex () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    logOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    background: linear-gradient(to right, #167bd8, #fff);
    color: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  .header-left {
    font-size: 22px;
    font-weight: bolder;
    margin-left: 10px;
    display: block;
    cursor: pointer;
  }
  .user-img {
    height: 45px;
    width: 45px;
  }
  .header-right {
    margin-left: 80%;
    cursor: pointer;
  }
  .edittool {
    display: none;
  }
  .header-left:hover+div{
    display: block;
    color: #000;
  }
</style>
