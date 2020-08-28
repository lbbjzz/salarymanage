<template>
  <div>
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#e9f1f5"
    text-color="#404040"
    active-text-color="#FFCC33"
    style="height: 100vh;">
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
                      @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
  </div>
</template>

<script>

export default {
  // created () {
  //   this.menulist = this.menu
  // },
  computed: {
    noChildren () {
      return this.menu.filter(item => !item.children)
    },
    hasChildren () {
      return this.menu.filter(item => item.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
    // menu () {
    //   return this.$store.state.tab.menu
    // }
  },
  data () {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      menu: [
        {
          path: '/home',
          name: 'Home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          label: '基础信息管理',
          icon: 's-management',
          children: [
            {
              path: '/department',
              name: 'department',
              label: '部门管理',
              icon: 'office-building',
              url: 'Profile/DepartmentManage/DepartmentManage'
            },
            {
              path: '/class',
              name: 'class',
              label: '岗位管理',
              icon: 'suitcase',
              url: 'Profile/ClassManage/ClassManage'
            },
            {
              path: '/employee',
              name: 'employee',
              label: '员工信息管理',
              icon: 'postcard',
              url: 'Profile/EmployeeManage/EmployeeManage'
            }
          ]
        },
        {
          label: '工资',
          icon: 'coin',
          children: [
            {
              path: '/salaryManage',
              name: 'salaryManage',
              label: '工资项目管理',
              icon: 'date',
              url: 'salaryManage/SalaryManage/SalaryManage'
            },
            {
              path: '/fixed',
              name: 'fixed',
              label: '固定工资管理',
              icon: 'coin',
              url: 'salaryManage/FixedSalaryManage/FixedSalaryManage'
            },
            {
              path: '/import_data',
              name: 'ImportData',
              label: '项目数据录入',
              icon: 'edit-outline',
              url: 'salaryManage/importData/ImportData'
            },
            {
              path: '/salarySettlement',
              name: 'salarySettlement',
              label: '工资结算',
              icon: 'coin',
              url: 'salaryManage/SalarySettlement/FixedSalarySettlement'
            }
          ]
        },
        {
          label: '报表管理',
          icon: 'user',
          children: [
            {
              path: '/salarySearch',
              name: 'salarySearch',
              label: '工资查询报表',
              icon: 'tickets',
              url: 'FormManage/SalarySearchForm/SalarySearchForm'
            },
            {
              path: '/salaryPrint',
              name: 'salaryPrint',
              label: '打印工资条',
              icon: 'printer',
              url: 'FormManage/SalaryPrint/SalaryPrint'
            },
            {
              path: '/salaryStatistics',
              name: 'salaryStatistics',
              label: '工资统计报表',
              icon: 's-data',
              url: 'FormManage/SalaryStatistics/SalaryStatistics'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu (item) {
      this.$router.push({ name: item.name })
      // this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-menu {
        border: none;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
