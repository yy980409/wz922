<template>
    <div>
        <head-top ok="true" ></head-top>
        <el-card style="padding-top: 15px;">
            <el-form :inline="true"  class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="设备号">
                    <el-input  :disabled=disabled :placeholder=this.$route.query.device_id></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button v-show="!showSearch" type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button v-show="!showSearch"  type="text" @click="showSearch=true">[ 高级搜索 ]</el-button>
                </el-form-item>
                <Search @uploaddata="getQuery"  @commitSearch="onSubmit" @searchSwitch="showSearch=false"
                        :lines='lines' v-show="showSearch"></Search>
            </el-form>
        </el-card>



        <tableList :tableData="Data" :column="column" :count="count" :pagesize="limit" @CurrentChange="handleCurrent"></tableList>



    </div>
</template>

<script>
	import headTop from '../components/headTop';
	import Search from '@/components/Search';
	import tableList from '../components/tableList';
	import {postPMLumHistory} from "../api/getData";
	export default {
		name:"pm25LuminanceSingle",
		components: {
			tableList,
			headTop,Search
		},
		data(){
			return{
				//高级搜索
				disabled:true,
				query: [],
				showSearch:false,
				lines:[{name:'光照强度',type:'float',en:'luminance'},{name:'PM2.5',type:'float',en:'pm2_5'},{name:'PM10',type:'float',en:'pm10'}],

				//分页
				count:0,
				offset: 1,//页码
				limit: 15,//单页数据量
				Data:[],
				column:[
					{
						title: '设备号',
						key: 'device_id'
					},
					{
						title: '光照强度',
						key: 'luminance'
					},
					{
						title: 'PM2.5',
						key: 'pm2_5'
					},
					{
						title:'PM10',
						key:'pm10'
					},
					{
						title: '创建时间',
						key: 'time'
					},
				]
			}
		},
		methods:{
			async initialData(flag){
				if(flag){this.offset=1}//区别哪种方式跳转:分页 搜索 （如果是搜索则要重置页码
				var postResult=await postPMLumHistory({pageSize: this.limit, currentPage: this.offset,device_id:this.$route.query.device_id,queryString:this.query});

				this.Data=postResult.result;
				this.count=postResult.count;

			},
			handleCurrent(val){
				this.offset=val;
				let flag=false;
				this.initialData(flag);
			},
			getQuery(val){
				// console.log(val)
				this.query = val;
				this.initialData(true);
			},
			async onSubmit() {
				this.initialData(true);
			},
		},
		created() {
			this.initialData(true);
		},
		watch:{
			'$route.query.device_id':function(val){
				if(val!==undefined) {
					////////offset和currentPage不匹配问题
					this.initialData(true);
				}
			},
		},
	}
</script>

<style >
    .el-card__body {
    }
</style>
