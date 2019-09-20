<template>
    <div>
<!--        {{tableData}}{{column}}-->
    <el-row>

            <el-table
                @row-click="baseAdd"
                :data="tableData"
                border
                stripe
                :default-sort = "{prop: 'dev_id', order: 'descending'}"
                tooltip-effect="dark"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    v-for="item in column"
                    :prop="item.key"
                    :key="item.key"
                    :label="item.title"
                    sortable
                >
                </el-table-column>
            </el-table>
    </el-row>
    <el-row>

        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="count">
            </el-pagination>
        </div>


    </el-row>
    </div>



</template>

<script>
	export default {
		name: "tableList",
		props: ['tableData','column','count','pagesize'],
        data(){
			return{
				currentPage: 1,//当前页码

            }
        },
        methods:{
			baseAdd(val){
			this.$emit('pushEvent',val);
            },
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.$emit('CurrentChange', val);

			},
        },
	}
</script>

<style scoped>

</style>
