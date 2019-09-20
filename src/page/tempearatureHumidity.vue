<template>
    <div>
        <head-top ></head-top>
        <div style="margin-top: 20px;margin-left: 20px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="设备号">
                <el-input v-model="formInline.device_id" placeholder="设备号"@keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        </div>

        <tableList :tableData="Data" :column="column" :count="count" :pagesize="limit" @CurrentChange="handleCurrent" @pushEvent="push"></tableList>

    </div>
</template>

<script>
	import headTop from '../components/headTop';
    import tableList from '../components/tableList';
	import {getLatestPM,getLatesTemCount,getLatesTem,getLatestLuminance} from '@/api/getData';
	export default {
		name: "tempearatureHumidity",
		components: {
			tableList,
			headTop,
		},
		data(){
			return{
				formInline:{
					device_id:null,
                },


                test:null,
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
                        title:'光照强度',
                        key:'luminance'
                    },
                    {
                    	title:'PM2.5',
                        key:'pm2_5'

                    },
                    {
                        title:'PM10',
                        key:'pm10'
                    },
                    {
						title: '创建时间',
						key: 'create_time'
					}
				]
			}
		},
        methods:{
			push(val){
				var aim=val.device_id.toString()
                this.alal(aim);
				this.$router.push({ path:'/temperatureSingle',query: val});
			},
			async initialData(){
				var Count=await getLatesTemCount();
				this.count=Count;
                const TAH = await getLatesTem({limit: this.limit, offset: this.offset});
				const Lum = await getLatestLuminance({limit: this.limit, offset: this.offset});
				const PM = await getLatestPM({limit: this.limit, offset: this.offset});
                this.Data = [];
                for(let i=0;i<TAH.length;i++){
                	let temp={};
					const TAHData = TAH[i];
					const LumData = Lum[i];
                    const PMData = PM[i];
					var newArr = Object.assign(TAHData,LumData,PMData);
					this.Data.push(newArr);
                }
				this.Data.forEach(item =>{
					this.DataCache.push(item);
				});

            },
			handleCurrent(val){
				this.offset=val;
				this.initialData();

            },
            alal(val){
				this.$message('跳转到设备'+val);
            },
			async onSubmit() {
				if (this.formInline.device_id === null||this.formInline.device_id === "") {
					this.Data = this.DataCache;
				} else {
					const ff = this.DataCache.find((ele) => (ele.device_id.toString() === this.formInline.device_id));
					let f = [];
					f.push(ff);
					this.Data = f;
				}
			}
        },
		mounted() {
			this.initialData();
		},

	}
</script>

<style scoped>

</style>
