<template>
  <div id="app" class="layout">
    <Layout>
      <Sider class="layout-sidebar" ref="side1" hide-trigger collapsible collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="demo" theme="dark" :width="isCollapsed ? '78px' : '200px'" :class="menuitemClasses" @on-select="selectItem">
          <MenuItem name="demo">
              <Icon type="md-image"></Icon>
              <span>Demo</span>
          </MenuItem>
          <MenuItem name="code">
              <Icon type="md-code"></Icon>
              <span>Code</span>
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
    <Drawer width="70" placement="left" :closable="false" v-model="drawer">
      <Code />
    </Drawer>
  </div>
</template>

<script>
import Navigation from './components/navigation.vue';
import Code from './components/code.vue';
import { Layout, Sider, Menu, MenuItem, Icon, Content, Drawer } from "view-design";
import "view-design/dist/styles/iview.css";

console.log(Code)

export default {
  name: 'App',
  components: {
    Navigation, 
    Code,
    Layout, Sider, Menu, MenuItem, Icon, Content, Drawer
  },
  data(){
    return {
      theme: 'light',
      isCollapsed: true,
      drawer: false
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
    },
    selectItem(name){
      if(name === "code"){
        this.drawer = !this.drawer;
      }
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
  border: none;
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
  height: calc(100vh - 62px);
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
