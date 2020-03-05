// GraphQL
import Sign from "./components/sign";
import Search from "./components/search";
import MongoDB from "./components/mongodb";
// WebRTC
import GetUserMedia from "./components/webrtc/getUserMedia";

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

  ],
};