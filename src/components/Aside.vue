<template>
        <el-menu
                :collapse="isCollapse"
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
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
</template>

<script>

export default {
  created () {
    this.menulist = this.menu
  },
  computed: {
    noChildren () {
      return this.menu.filter(item => !item.children)
    },
    hasChildren () {
      return this.menu.filter(item => item.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    },
    menu () {
      return this.$store.state.tab.menu
    }
  },
  data () {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      menu: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          label: '基础信息管理',
          icon: 's-management',
          children: [
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '部门管理',
              icon: 'office-building',
              url: 'Book/Bookmanage'
            },
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '岗位管理',
              icon: 'suitcase',
              url: 'Book/Bookmanage'
            },
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '员工信息管理',
              icon: 'postcard',
              url: 'Book/Bookmanage'
            }
          ]
        },
        {
          label: '工资',
          icon: 'coin',
          children: [
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '工资项目管理',
              icon: 'date',
              url: 'Book/Bookmanage'
            },
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '固定工资管理',
              icon: 'coin',
              url: 'Book/Bookmanage'
            },
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '项目数据录入',
              icon: 'edit-outline',
              url: 'Book/Bookmanage'
            },
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '工资结算',
              icon: 'coin',
              url: 'Book/Bookmanage'
            }
          ]
        },
        {
          label: '报表管理',
          icon: 'user',
          children: [
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '工资查询报表',
              icon: 'tickets',
              url: 'Book/Bookmanage'
            },
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '打印工资条',
              icon: 'printer',
              url: 'Book/Bookmanage'
            },
            {
              path: '/bookmanage',
              name: 'bookmanage',
              label: '工资统计报表',
              icon: 's-data',
              url: 'Book/Bookmanage'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu (item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
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
