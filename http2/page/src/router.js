// GraphQL
import Sign from "./components/sign";
import Search from "./components/search";
import MongoDB from "./components/mongodb";
// WebRTC
import GetUserMedia from "./components/webrtc/getUserMedia";
import RTCPeerConnection from "./components/webrtc/RTCPeerConnection";

export default {
  routes: [
    { 
      path: "/sign", component: Sign 
    },
    { 
      path: "/search", component: Search
    },
    { 
      path: "/mongodb", component: MongoDB
    },
    { 
      path: "/webrtc/getUserMedia", component: GetUserMedia
    },
    { 
      path: "/webrtc/RTCPeerConnection", component: RTCPeerConnection
    },
  ],
};