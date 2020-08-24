<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#167bd8"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="height: 100vh;">
      <el-submenu :index="1">
          <template slot="title">
              <span slot="title">首页</span>
          </template>
      </el-submenu>
      <el-submenu :index="2">
          <template slot="title">
              <span slot="title">工资管理</span>
          </template>
      </el-submenu>
      <el-submenu :index="3">
          <template slot="title">
              <span slot="title">员工管理</span>
          </template>
      </el-submenu>
  </el-menu>
</template>

<style lang="scss" scoped>
  .el-menu {
        border: none;
  }
  .el-menu-vertical-demo {
    width: 200px;
    min-height: 400px;
  }
</style>
