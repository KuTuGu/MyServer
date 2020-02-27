import GetVue from "./components/getVue";
import Sign from "./components/sign";
import Search from "./components/search";
import Audio from "./components/webrtc/getUserMedia/audio";

const PATH = [
  "/", "/mongodb",
  "/webrtc/getUserMedia/video",
  "/webrtc/getUserMedia/screen",
]

export default {
  routes: PATH.map(p => ({
    path: p, component: GetVue
  })).concat([
    { path: "/sign", component: Sign },
    { path: "/search", component: Search },
    { path: "/webrtc/getUserMedia/audio", component: Audio },
  ])
};