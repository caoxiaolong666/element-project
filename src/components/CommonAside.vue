<!--  -->
<template>
  <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" default-active="2" active-text-color="#ffd04b">
    <h3 v-if="!isCollapse">哈哈乐后台管理系统</h3>
    <h3 v-else>哈哈</h3>
    <el-menu-item v-for="item in noChildren" :key="item.id" :index="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu index="index" v-for="item in hasChildren" :key="item.id">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "",
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menu() {
      return this.$store.state.tab.menu
    }
  },
  data() {
    return {
      // asideMenu: [
      //   {
      //     id: 1,
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home"
      //   },
      //   {
      //     id: 2,
      //     path: "/video",
      //     name: "video",
      //     label: "视频管理",
      //     icon: "video-play"
      //   },
      //   {
      //     id: 3,
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "user"
      //   },
      //   {
      //     id: 4,
      //     label: "其他",
      //     name: "other",
      //     icon: "location-outline",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "页面1",
      //         icon: "setting"
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2s",
      //         label: "页面2",
      //         icon: "setting"
      //       }
      //     ]
      //   }
      // ]
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit("selectMenu", item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
