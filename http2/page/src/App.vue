<template>
  <div id="app" class="layout">
    <Layout>
      <Sider class="layout-sidebar" ref="side1" hide-trigger collapsible collapsed-width="78" v-model="isCollapsed">
        <Menu theme="dark" :width="isCollapsed ? '78px' : '200px'" id="menu" :class="menuitemClasses" @on-select="selectItem">
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
    <Drawer width="70" placement="left" :draggable='true' :closable="false" v-model="drawer">
      <Code />
    </Drawer>
  </div>
</template>

<script>
import Navigation from './components/navigation.vue';
import Code from './components/code.vue';
import VueJSON from "./vue.json";

export default {
  name: 'App',
  components: {
    Navigation, Code,
  },
  data(){
    return {
      theme: 'light',
      isCollapsed: true,
      drawer: false,
      firstTip: 0,
      path: {
        "/": "src/components/hello.vue",
        "/sign": "src/components/sign.vue",
        "/search": "src/components/search.vue",
        "/mongodb": "src/components/mongodb.vue",
        "/webrtc/getUserMedia/video": "src/components/webrtc/getUserMedia/video.vue",
        "/webrtc/getUserMedia/audio": "src/components/webrtc/getUserMedia/audio.vue",
        "/webrtc/getUserMedia/screen": "src/components/webrtc/getUserMedia/screen.vue",
        "/webrtc/RTCPeerConnection/local": "src/components/webrtc/RTCPeerConnection/local.vue",
        "/webrtc/RTCPeerConnection/remote": "src/components/webrtc/RTCPeerConnection/remote.vue",
        "/webrtc/RTCDataChannel/local": "src/components/webrtc/RTCDataChannel/local.vue",
        "/webrtc/RTCDataChannel/remote": "src/components/webrtc/RTCDataChannel/remote.vue",
        "/webgl": "src/components/webgl.vue",
      },
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
  mounted(){
    this.$store.commit('updateContent', VueJSON[this.path[this.$route.path]]);
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
  },
  watch: {
    "$route.path": function(newVal){
      this.$store.commit('updateContent', VueJSON[this.path[newVal]]);
    },
    "drawer": function(newVal){
      if(newVal && !this.firstTip){
        this.$Notice.info({
          title: 'CodeMirror usage Tip',
          desc: `<ul>
            <li>Tab: autocomplete</li><br />
            <li>Ctrl-F/Cmd-F: Start searching</li><br />
            <li>Ctrl-G/Cmd-G: Find next search result</li><br />
            <li>Shift-Ctrl-G/Shift-Cmd-G: Find previous</li><br />
            <li>Shift-Ctrl-F/Cmd-Option-F: Replace</li><br />
            <li>Shift-Ctrl-R/Shift-Cmd-Option-F: Replace all</li><br />
            <li>Shift-Ctrl-G/Shift-Cmd-G: Find previous</li><br />
            <li>Alt-F: Persistent search (dialog doesn't autoclose, enter to find next, Shift-Enter to find previous)</li><br />
            <li>Alt-G: Jump to line</li>
          </ul>`,
          duration: 0
        });
        this.$Notice.info({
          title: "Dynamic rendering",
          desc: `<ul><br />
            <li>You can add <a href="https://www.iviewui.com/" target="_blank">iview-ui</a> internally</li><br />
            <li>Some components can't be modified</li><br />
          </ul>`,
          duration: 0
        });
        this.firstTip++;
      }
    },
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
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-sidebar{
  position: relative;
  margin: 0;
  /* top: 60px; */
  left: 0;
  padding-top: 60px;
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
#menu{
  position: fixed;
  left: 0;
  height: calc(100vh - 82px);
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
  min-height: calc(100vh - 128px);
  margin: 80px 20px 0 20px;
  background-color: #506b9e;
}
</style>
