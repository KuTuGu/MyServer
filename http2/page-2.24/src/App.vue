<template>
  <div id="app" class="layout">
    <Layout>
      <Sider class="layout-sidebar" ref="side1" hide-trigger collapsible collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" :width="isCollapsed ? '78px' : '200px'" :class="menuitemClasses">
          <MenuItem name="1-1">
              <Icon type="ios-navigate"></Icon>
              <span>Option 1</span>
          </MenuItem>
          <MenuItem name="1-2">
              <Icon type="ios-search"></Icon>
              <span>Option 2</span>
          </MenuItem>
          <MenuItem name="1-3">
              <Icon type="ios-settings"></Icon>
              <span>Option 3</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Navigation class="layout-header-bar" :theme="theme" :collapsedSider="collapsedSider" :rotateIcon="rotateIcon" />
        <Content class="content">
          <router-view></router-view>
        </Content>
        <Footer class="layout-footer">2020-2021 &copy; KuTuGu</Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Navigation from './components/navigation.vue';
import { Layout, Sider, Menu, MenuItem, Icon, Content } from "view-design";
import "view-design/dist/styles/iview.css";

export default {
  name: 'App',
  components: {
    Navigation,
    Layout, Sider, Menu, MenuItem, Icon, Content
  },
  data(){
    return {
      theme: 'light',
      isCollapsed: true
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
		},
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : '',
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1000px;
}
.overflowHidden{
  display: inline-block;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis; 
  white-space: nowrap;
}

/* layout style */
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-sidebar{
  position: relative;
  margin: 0;
  top: 60px;
  left: 0;
}
.layout-footer{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon{
    transition: all .3s;
}
.menu-item{
  position: fixed;
  left: 0;
  top: 60px;
  height: calc(100vh - 60px);
  transition: width .2s ease-in-out;
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease-in-out;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(3px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
.content{
  min-height: calc(100vh - 122px);
  margin: 80px 20px 0 20px;
  background: #fff;

}
</style>
