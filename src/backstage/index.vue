<template>
	<el-row class="container">
		<el-col :span="24" class="header">
		    <el-col :span="20" class="logo">
				<img src="" /> <span><i class="txt">租房后台管理系统系统</i></span>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link userinfo-inner"><img :src="'http://localhost:8080/picture/'+userInfo.headImg" /> {{userInfo.name}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main ">
			<aside class='iconfont'>
				 <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					theme="dark" unique-opened router>
					<template v-for="(item,index) in menu" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="item.is_over=='0'" :key="item.id">
							<template slot="title"><i :class="'icon '+item.icon"></i>{{item.menu_name}}</template>
							<el-menu-item :route="{'name':child.path}" v-for="child in item.childMenus" :index="child.path" v-if="!child.hidden" :key="child.id">
								<i :class="'icon '+child.icon"></i>{{child.menu_name}}                
							</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.is_over=='1'&&item.childMenus.length==0" :key="item.id" :index="item.path"><i :class="'icon '+item.icon"></i>{{item.menu_name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
			    <div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.id">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition>
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import uuid from 'node-uuid'
   export default{
	 data() {
			return {  
				msg:"",
			    //sysUserName:'xzp',
				"id":uuid.v4(),
				sysUserAvatar:'23',
				menu:{}
			}						
	 },
		methods:{
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
        		console.log(this.sysUserAvatar)
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					localStorage.removeItem('userInfo');
					_this.$router.push('/backstage/login');
				}).catch(() => {
				}); 
			}
		},
	　　mounted(){
			this.$http.post("http://127.0.0.1:8080/housingrental/menuController/getMenuTree.do",{
				userid:'20180102'
			},{
				emulateJSON : true
			}).then(res=>{
				this.menu=res.data.menu;
				console.log(this.menu)
			},error=>{
				this.msg=error;
			});
			if(!this.userInfo){
				this.$router.push("/backstage/login")
			}
		},
		computed:{
			userInfo(){
				return JSON.parse(localStorage.getItem("userInfo"));
			}
		}
   }
</script> 
<style scoped lang="scss">
.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #1F2D3D;
			color: #c0ccda;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				.userinfo-inner {
					color: #c0ccda;
					cursor: pointer;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				font-size: 22px;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color: #20a0ff
				}
			}
		}
		.main {
			background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				width: 230px;
			}
			.icon{
				margin:0 10px;
			}
			.content-container {
				background: #f1f2f7;
				position: absolute;
				right: 0px;
				top: 0px;
				bottom: 0px;
				left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>