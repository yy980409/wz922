<template>
    <div>
        <head-top></head-top>
        <el-card style="padding-top: 15px;">
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="设备号">
                <el-input :clearable="clearable" v-model="device_idInForm" placeholder="设备号"@keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="showSearch=!showSearch">高级搜索</el-button>
            </el-form-item>
            <Search @uploaddata="getQuery" :lines='lines' v-show="showSearch"></Search>
        </el-form>
        </el-card>


        <tableList :tableData="Data" :column="column" :count="count" :pagesize="limit" @CurrentChange="handleCurrent" @pushEvent="push"></tableList>

    </div>
</template>

<script>
	import headTop from '../components/headTop';
	import Search from '@/components/Search';
    import tableList from '../components/tableList';
	import {postTemHumLatest} from '@/api/getData';
	export default {
		name: "tempearatureHumidity",
		components: {
			tableList,
			headTop,Search
		},
		data(){
			return{
				//高级搜索
				clearable: true,
                query: [],
				showSearch:false,
                lines:[{name:'温度',type:'float',en:'temperature'},{name:'风速',type:'int',en:'fan_speed'},{name:'湿度',type:'float',en:'humidity'}],
                //低级搜索
				device_idInForm:'',
                //分页
                count:0,
				offset: 1,//页码
				limit: 15,//单页数据量
                DataCache:[],//用于搜索缓存
				Data:[],
				column:[
					{
						title: '设备号',
						key: 'device_id'
					},
					{
						title: '温度',
						key: 'temperature'
					},
					{
						title: '湿度',
						key: 'humidity'
					},
                    {
                        title:'风扇转速',
                        key:'fan_speed'
                    },
                    {
						title: '创建时间',
						key: 'create_time'
					},
				]
			}
		},
        methods:{
			push(val){
				var aim=val.device_id.toString()
                this.alal(aim);
				this.$router.push({ path:'/temperatureSingle',query: val});
			},
			async initialData(flag){
				if(flag){this.offset=1}//区别哪种方式跳转:分页 搜索 （如果是搜索则要重置页码
				var postResult=await postTemHumLatest({pageSize: this.limit, currentPage: this.offset,device_id:this.device_idInForm,queryString:this.query});

				this.Data=postResult.result;
				this.count=postResult.count;
            },
			handleCurrent(val){
				this.offset=val;
				let flag=false;
				this.initialData(flag);

            },
            alal(val){
				this.$message('跳转到设备'+val);
            },
			async onSubmit() {
				this.initialData(true);
			},
            getQuery(val){
				// console.log(val)
				this.query = val;
				this.initialData(true);
            }
        },
		mounted() {
			this.initialData(true);
		},
        watch:{
			device_idInForm:function () {
				this.onSubmit();
			}


        }
	}
</script>

<style scoped>

</style>
