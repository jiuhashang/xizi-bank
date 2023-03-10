<template>
  <el-container>
    <el-header>
      <div class="left">
        <h2>西子光能智慧能源管理平台</h2>
        <!-- <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#1890FF"
        @select="handleSelect"
        router>
        <el-menu-item index="/dashboard">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">资料收集</template>
          <el-menu-item index="/launch" v-show="menuId.indexOf('项目发起') !== -1">项目发起</el-menu-item>
          <el-menu-item index="/material" v-show="menuId.indexOf('材料补充') !== -1">材料补充</el-menu-item>
          <el-menu-item index="/added" v-show="menuId.indexOf('立项补充') !== -1">立项补充</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">审批中心</template>
          <el-menu-item index="/first" v-show="menuId.indexOf('项目初审') !== -1">项目初审</el-menu-item>
          <el-menu-item index="/review" v-show="menuId.indexOf('图纸复核') !== -1">图纸复核</el-menu-item>
          <el-menu-item index="/final" v-show="menuId.indexOf('项目终审') !== -1">项目终审</el-menu-item>
          <el-menu-item index="/share" v-show="menuId.indexOf('项目分享') !== -1">项目分享</el-menu-item>
          <el-menu-item index="/overview" v-show="menuId.indexOf('项目总览') !== -1">项目总览</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">综合管理</template>
          <el-menu-item index="/account" v-show="menuId.indexOf('账户管理') !== -1">账户管理</el-menu-item>
          <el-menu-item index="/role" v-show="menuId.indexOf('角色管理') !== -1">角色管理</el-menu-item>
          <el-menu-item index="/organization" v-show="menuId.indexOf('机构管理') !== -1">机构管理</el-menu-item>
          <el-menu-item index="/download" v-show="menuId.indexOf('下载管理') !== -1">下载管理</el-menu-item>
        </el-submenu>
      </el-menu> -->
      </div>
      <div class="right">
        <img :src="image" alt="">
        <span>{{ bankName }}</span>
        <el-button type="primary" @click="out">退出</el-button>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      out() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    },
    computed: {
      menuId() {
        return window.sessionStorage.getItem('menuId')
      },
      bankName() {
        return window.sessionStorage.getItem('bankName')
      },
      image() {
        return window.sessionStorage.getItem('image')
      }
    }
}
</script>

<style scoped>
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-header {
    height: 64px;
    display: flex;
    justify-content:space-between;
    border-bottom: 6px solid #1890FF;
  }
  .el-menu {
    margin-bottom: 15px;
  }
  .el-menu--horizontal {
    border-bottom: none !important;
  }
  .el-main {
    padding: 0;
    background-color: rgba(240, 242, 245, 1);
  }
  .left {
    display: flex;
  }
  .right {
    /* line-height: 64px; */
    margin-top: 8px;
  }
  h2 {
    margin: 11px 60px 11px 5px;
  }
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }
  .el-button {
    margin-left: 50px;
  }
</style>>
