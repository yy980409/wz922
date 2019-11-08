<template>
    <div>
        <head-top ok="true" ></head-top>
        <el-card style="padding-top: 15px;">
            <el-form :inline="true"  class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="设备号">
                    <el-input :disabled=disabled :placeholder=this.$route.query.device_id></el-input>
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
	import {postRecloseHistory} from "../api/getData";
	export default {
		name: "recloseSingle",
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
				lines:[
					{name:'重合闸状态',type:'string',en:'Sta_H'},
					{name:'实时电流',type:'float',en:'I'},
					{name:'额定电流',type:'float',en:'Ie'},
					{name:'实时漏电流',type:'float',en:'Iz'},
					{name:'漏电动作值',type:'float',en:'Izset'},
					{name:'实时电压',type:'float',en:'U'},
					{name:'过压动作值',type:'float',en:'Uov'},
					{name:'欠压动作值',type:'float',en:'Ulv'},
					{name:'过流次数',type:'float',en:'CurErrCnt'},
					{name:'漏电次数',type:'float',en:'LKErrCnt'},
					{name:'断电次数',type:'float',en:'VOffCnt'},
					{name:'欠压次数',type:'float',en:'VlErrCnt'},
					{name:'过压次数',type:'float',en:'VhErrCnt'},
				],
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
						title: '重合闸状态',
						key: 'sta_H'
					},
					{
						title: '实时电流',
						key: 'i'
					},
					{
						title: '额定电流',
						key: 'ie'
					},
					{
						title:'实时漏电流',
						key:'iz'
					},
					{
						title: '漏电动作值',
						key: 'izset'
					},{
						title: '实时电压',
						key: 'u'
					},
					{
						title: '过压动作值',
						key: 'uov'
					},
					{
						title: '欠压动作值',
						key: 'ulv'
					},
					{
						title:'过流次数',
						key:'curErrCnt'
					},
					{
						title: '漏电次数',
						key: 'lkerrCnt'
					},{
						title: '断电次数',
						key: 'voffCnt'
					},{
						title: '欠压次数',
						key: 'vlErrCnt'
					},{
						title: '过压次数',
						key: 'vhErrCnt'
					},{
						title: '创建时间',
						key: 'time'
					},
				]
			}
		},
		methods:{
			async initialData(flag){
				if(flag){this.offset=1}//区别哪种方式跳转:分页 搜索 （如果是搜索则要重置页码
				var postResult=await postRecloseHistory({pageSize: this.limit, currentPage: this.offset,device_id:this.$route.query.device_id,queryString:this.query});
                console.log(postResult);
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
