<template>
    <div>
        <head-top></head-top>
        <el-tabs v-model="tabActiveName"  type="border-card" >
             <el-tab-pane label="重合闸批量控制" name="first" style="height: 750px;">
                 <powerControl></powerControl>
             </el-tab-pane>

            <el-tab-pane label="风扇批量控制" name="second" style="height: 750px">
                <fanControl></fanControl>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
	import powerControl from '../components/powerControl';
	import fanControl from '../components/fanControl';
	import headTop from '../components/headTop';
	export default {
		name: "deviceControl",
		components: {
			fanControl,powerControl,headTop
		},
		data(){
			return{
				tabActiveName:'first',
            }
        },
        methods:{

        }
	}
</script>

<style scoped>


</style>
