<template>	
	<Menu id="navigation" mode="horizontal" :theme="theme" active-name="1">
			<MenuItem name="0" @click.native="collapsedSider">
				<Icon :class="rotateIcon"  :style="{margin: '0 20px'}" type="md-menu"></Icon>
			</MenuItem>
			<Submenu name="1">
					<template slot="title">
							<Icon type="logo-buffer" />
							GraphQL
					</template>
					<MenuGroup title="User">
						<router-link to="/sign">
							<MenuItem name="1-1">
								Sign up/in
							</MenuItem>
						</router-link>
					</MenuGroup>
					<MenuGroup title="Info">
						<router-link to="/search">
							<MenuItem name="1-2">
								Search
							</MenuItem>
						</router-link>
					</MenuGroup>
					<MenuGroup title="MongoDB">
						<router-link to="/mongodb">	
							<MenuItem name="1-3">
								Manage
							</MenuItem>
						</router-link>
					</MenuGroup>
			</Submenu>
			<Submenu name="2">
					<template slot="title">
							<Icon type="ios-videocam-outline" />
							WebRTC
					</template>
					<MenuGroup title="getUserMedia">
						<router-link to="/webrtc/getUserMedia">
							<MenuItem name="2-1">
								basic
							</MenuItem>
						</router-link>
					</MenuGroup>
					<MenuGroup title="RTCPeerConnection">
						<router-link to="/webrtc/RTCPeerConnection">
							<MenuItem name="2-2">basic</MenuItem>
						</router-link>
					</MenuGroup>
					<MenuGroup title="RTCDataChannel">
						<router-link to="/webrtc/RTCDataChannel">
							<MenuItem name="2-3">basic</MenuItem>
						</router-link>	
					</MenuGroup>
			</Submenu>
			<router-link to="/webgl">
				<MenuItem name="3">
					<Icon type="ios-brush-outline" />
					WebGL
				</MenuItem>
			</router-link>
			<router-link to="/blog">
				<MenuItem name="4">
					<Icon type="ios-book-outline" />
					Blog
				</MenuItem>
			</router-link>
	</Menu>
</template>

<script>
import { Menu, MenuItem, MenuGroup, Submenu, Icon } from 'view-design';

export default {
    name: 'Navigation',
    components: {
        Menu, Icon, MenuItem, MenuGroup, Submenu
    },
    props: {
			theme: {
				type: String,
				default: 'light'
			},
			collapsedSider: {
				type: Function,
				default: () => {}
			},
			rotateIcon: {
				type: Array,
				default: () => []
			}
		},
}
</script>

<style scoped>
#navigation{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.rotate-icon{
  transform: rotate(-90deg);
}
a{
	color: black;
}
</style>
