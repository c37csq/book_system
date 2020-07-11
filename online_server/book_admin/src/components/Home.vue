<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/Avatar.jpg" alt />
        <span>图书推荐系统后台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠按钮区域 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          :router="true"
          text-color="#fff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          active-text-color="#409eff"
          :default-active="$route.path"
        >
          <el-submenu :index="item.title" :key="item.id" v-for="item in menuList">
            <template slot="title">
              <i :class="item.class"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="childItem.path"
              v-for="childItem in item.children"
              :key="childItem.title"
            >
              <template slot="title">
                <i :class="childItem.class"></i>
                <span>{{ childItem.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuList from '../config/menu.config.js'
export default {
  data () {
    return {
      // 是否折叠
      isCollapse: false,
      menuList: menuList
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      // 点击按钮切换菜单折叠与展开
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  user-select: none;
  > div {
    height: 100%;
    display: flex;
    align-items: center;
    span {
      margin-left: 18px;
    }
    img {
      height: 100%;
      width: 60px;
      border-radius: 50%;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.25em;
  cursor: pointer;
}
</style>
