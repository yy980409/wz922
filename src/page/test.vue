<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div>

        <el-table
            :data="tableData"
            border
            stripe
            :default-sort = "{prop: 'device_id', order: 'descending'}"
            tooltip-effect="dark"
            @row-click="add"
            highlight-current-row
            style="width: 100%">
            <el-table-column
                v-for="item in columns1"
                :prop="item.key"
                :key="item.key"
                :label="item.title"
                sortable
            >
            </el-table-column>

        </el-table>
    </div>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="15"
            layout="total, prev, pager, next"
            :total="count">
        </el-pagination>
    </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import {getLatesTem,getLatesTemCount} from '@/api/getData'
	export default {
		methods: {
			butt(){
			this.cc++;
			this.$router.push({ path:'/singleStatus'})
            },
			async initData(){
				try{
					//this.info=data.data;
                    this.getUsers();
				}catch(err){
					console.log('获取数据失败', err);
				}
			},
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex === 2) {
					return 'success-row';
				}
				return '';
			},
			add(val){
				this.$router.push({ path:'/singleStatus',query: val});
            },
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.offset = val;
				this.initData();
				console.log(val);
			},
			async getUsers(){
                var UserCount=await getLatesTemCount();
				this.count=UserCount;
                try{
                	const Users =await getLatesTem({limit:this.limit, offset:this.offset}) ;
					this.tableData = [];
					Users.forEach(item => {
						// const tableData = {};
						const tableData = item;
						// tableData.device_id = item.device_id;
						// tableData.temperature=item.temperature;
						// tableData.humidity = item.humidity;
						// tableData.fan_speed = item.fan_speed;
						// tableData.fan_on_off = item.fan_on_off;
						// tableData.createTime = item.createTime;
						this.tableData.push(tableData);
					})
                }catch(err){
                	console.log(err)
                }

			}
		},
        created(){
			this.initData();
        },
		mounted () {
        },
		data () {
            return{
            	cc:0,
            	tableData:[],
				countData:0,
				currentRow: null,
				offset: 1,
				limit: 15,
				count: 0,
				currentPage: 1,
            	info:null,
				columns1: [
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
						title: '风扇转速',
						key: 'fan_speed'
					},
					{
						title: '风扇状态',
						key: 'fan_on_off'
					},
					{
						title: '创建时间',
						key: 'createTime'
					}

				],
				data1: [
					{
						name: '王小明',
						age: 18,
						address: '北京市朝阳区芍药居'
					},
					{
						name: '张小刚',
						age: 25,
						address: '北京市海淀区西二旗'
					},
					{
						name: '李小红',
						age: 30,
						address: '上海市浦东新区世纪大道'
					},
					{
						name: '周小伟',
						age: 26,
						address: '深圳市南山区深南大道'
					}
				],

            }
        },
		components: {
			headTop,
		},
	}
</script>

<style lang="less">
    @import '../style/mixin';
    .explain_text{
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }
</style>
