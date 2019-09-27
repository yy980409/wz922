<template>
    <div class="header_container" >
<!--        {{this.$store.state.user}}-->
        <el-button @click="hh">退出</el-button>
        <el-button v-if="ok" type="primary" plain @click="back" style="margin-right: 15px">返回</el-button>
        <img :src="imgUrl" style="width:30px;" alt="">
        <p style="margin:15px;font-size: 25px;color:#1d90e6;">银翔科技智能运维平台</p>
        <el-breadcrumb separator="/" style="margin-right:auto;padding: 10px;">
			<el-breadcrumb-item :to="{ path: '/HomeMap' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" >
			<img :src="baseImgPath + adminInfo.avatar" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    export default {
    	data(){
    		return {
				imgUrl:require("../assets/img/5gg.png"),
    			baseImgPath,
                test:0,
    		}
    	},
    	created(){
    		if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		props: ['ok'],
		methods: {
			hh:function () {
				this.$store.dispatch('logout');
			},
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'signout'){

					// const res = await signout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
						this.$store.dispatch('logout');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
			back(){
				if (window.history.length <= 1) {
					this.$router.push({path:'/'})
					return false
				} else {
					this.$router.go(-1)
				}
			}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		/*background-color: #EFF2F7;*/
        background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
