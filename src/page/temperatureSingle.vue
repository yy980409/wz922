<template>
    <div>
    <head-top ok="true" ></head-top>
    <tableList :tableData="Data" :column="column" :count="count" :pagesize="limit" @CurrentChange="handleCurrent"></tableList>



    </div>
</template>

<script>
	import headTop from '../components/headTop';
	import tableList from '../components/tableList';
	import {getTemHum,getTemHumCount} from '@/api/getData';
	export default {
		name: "temperatureSingle",
		components: {
			tableList,
			headTop,
		},
		data(){
			return{
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
						title: '温度',
						key: 'temperature'
					},
					{
						title: '湿度',
						key: 'humidity'
					},
                    {
                        title: '光照强度',
                        key:'233'
                    },
					{
						title: '创建时间',
						key: 'create_time'
					}
				]
			}
		},
		methods:{
			async initialData(){
				var devId=this.$route.query.device_id;
				var Count=await getTemHumCount({device_id:devId});
				this.count=Count;
				const Users =await getTemHum({device_id:devId,limit:this.limit, offset:this.offset});
				this.Data = [];
				Users.forEach(item => {
					const tableData = item;
					this.Data.push(tableData);
				})
			},
			handleCurrent(val){
				this.offset=val;
				this.initialData();
			}
		},
		created() {
			this.initialData();
		},
		watch:{
			'$route.query.device_id':function(val){
				if(val!==undefined) {
					////////offset和currentPage不匹配问题
					this.offset=1;
					this.initialData();
				}
			},
		},
	}
</script>

<style scoped>

</style>
