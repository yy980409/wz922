<template>
    <div>
        <el-row style="padding-top: 0">
            <el-col :offset="2" :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <span></span><!--{{checkedList}}-->
                        <span class="custom-tree-node">
                        <p style="font-weight: bold;font-size: 20px">风扇设备</p>
                        <p>设备总数: {{totalDev}}</p>
                        <p>筛选后: {{leaf}}</p>
                        <p style="color: #ff213f">已选择: {{checkedList.length}}</p></span>
                    </div>
                    <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                    </el-input>
                    <el-tree
                        :data="devices"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        @check="handleCheck"
                        :filter-node-method="filterNode"
                        ref="tree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                         <span>{{ node.label }}</span>
                        <div v-if="node.level===1" >
                            <span style="font-weight: bold">自动控制</span>
                            <span style="font-weight: bold">风扇开关</span>
                            <span style="font-weight: bold">转速</span>
                        </div>
                         <div v-if="node.isLeaf===true" >
                             <span style="margin-right: 35px" :class="{open:data.fan.auto==='开',close:data.fan.auto==='关'}">
                                 {{data.fan.auto}}</span>
                             <span style="margin-right: 35px" :class="{open:data.fan.switch==='开',close:data.fan.switch==='关'}">
                                 {{data.fan.switch}}</span>
                             <span>{{data.fan.speed}}</span>



                        </div>
                     </span>

                    </el-tree>
                </el-card>

            </el-col>
            <el-col :offset="0" :span="3" >
                <div  style="display: flex;justify-content:center" >
                    <i class="el-icon-d-arrow-right" :class="{arrowRight:checkedList.length!==0}"></i>
                </div>
            </el-col>
            <el-col :offset="0" :span="8">
                <el-card
                    class="box-card2"
                    v-loading="checkedList.length===0"
                    element-loading-text="请选择设备"
                    element-loading-spinner="el-icon-setting"
                >
                    <div   style="text-align: center;font-size: 20px;">
                        <span class="ctrlTitle" >风扇控制</span><br>
                        <el-switch
                            v-model="autoOpen"
                            active-text="手动控制"
                            inactive-text="自动控制"
                            inactive-color="#409EFF"
                            @change="handleFanAuto"

                        >
                        </el-switch><br>
                        <el-switch
                            style="margin-top: 40px"
                            v-if="autoOpen"
                            v-model="sliderOpen"
                            active-text="开"
                            inactive-text="关"
                            @change="handleFanSwitch"

                        >
                        </el-switch>
                        <el-slider
                            style="margin-top: 40px"
                            v-if="andOpen"
                            class="FanDefalut"
                            v-model="fanSpeed"
                            @change="handleFanSpeed" ></el-slider>
                    </div>




                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
	export default {
		name: "fanControl",
		data(){
			return{
				autoOpen:true,//初始值，后续值不由他控制
				sliderOpen:true,//初始值，后续值不由他控制
				fanSpeed:56,
				filterText:'',
				info:[36,37,38,39],
				checkedList:[],
				devices:[
					{
						id: 0,
						label:'全选',
						children:[{
							id: 1,
							label: '南山区',
							children: [{
								id: 34,
								label: '粤海社区',
								children: [{
									id: 35,
									label: '深圳大学',
									children:[
										{
											id: 37,
											label: '羽毛球场',
											children:[
												{
													id: 105,
													label: '二级 2-1',
													fan:{
														switch:'关',
														auto:'开',
														speed:'30'
													}
												}, {
													id: 108,
													label: '二级 2-1',
													fan:{
														switch:'开',
														auto:'开',
														speed:'30'
													}
												}
											]
										},
										{
											id: 38,
											label: '师院A座',
											children:[
												{
													id: 106,
													label: '二级 2-1',
													fan:{
														switch:'关',
														auto:'开',
														speed:'30'
													}
												}
											]
										},
										{
											id: 39,
											label: '图书馆',
											children:[
												{
													id: 107,
													label: '二级 2-1',
													fan:{
														switch:'开',
														auto:'关',
														speed:'80'
													}
												}
											]
										}
									],
								}]
							}]
						}, {
							id: 2,
							label: '福田区',
							children: [{
								id: 104,
								label: '二级 2-1',
								fan:{
									switch:'开',
									auto:'开',
									speed:'30'
								}
							}, {
								id: 103,
								label: '二级 2-2',
								fan:{
									switch:'开',
									auto:'开',
									speed:'30'
								}
							}]
						}, {
							id: 3,
							label: '宝安区',
							children: [{
								id: 102,
								label: '二级 3-1',
								fan:{
									switch:'开',
									auto:'开',
									speed:'30'
								}
							}, {
								id: 101,
								label: '二级 3-2',
								fan:{
									switch:'开',
									auto:'开',
									speed:'30'
								}
							}]
						},{
							id: 4,
							label: '罗湖区',
							children: [{
								id: 36,
								label: '罗湖小学',
								children: [{
									id: 100,
									label: '二级 3-2',
									fan:{
										switch:'开',
                                        auto:'开',
                                        speed:'30'
                                    }
								}]
							}]
						},

						]
					},],
				leaf:0,//筛选后的数目
				totalDev:0,//设备总数
			}
		},
		methods:{
			test(aa,num){
				if(num===1){//node
					console.log(this.$refs.tree.getNode(aa.key));
				}else if(num===2){//data
					console.log(this.$refs.tree.getNode(aa.id).key);
				}

			},
			handleCheck(){
				this.checkedList = [];
				let temp = this.$refs.tree.getCheckedNodes(true);
				for( const i of temp){
					if(this.info.indexOf(this.$refs.tree.getNode(i.id).parent.key)!==-1)
						this.checkedList.push(i.label);
				}

			},
			handleFanSwitch(val){
				console.log(val);
			},
			handleFanAuto(){
				console.log('weikaifa');
			},
			handleFanSpeed(){
				console.log('weikaifa');
            },
			filterNode(value, data) {

				// if(this.$refs.tree.getNode(data.id).isLeaf&&this.$refs.tree.getNode(data.id).visible)this.leaf++;
				if (!value) {//输入为空
					if(this.info.indexOf(this.$refs.tree.getNode(data.id).parent.key)!==-1){
						// this.$refs.tree.getNode(data.id).visible=false;
						if(this.$refs.tree.getNode(data.id).isLeaf)this.leaf++;
						return true;
					}
				}else{
					if(this.info.indexOf(this.$refs.tree.getNode(data.id).parent.key)!==-1 && data.label.indexOf(value) !== -1){
						if(this.$refs.tree.getNode(data.id).isLeaf)this.leaf++;
						return true;
					}

				}
				// if (!value) return this.info.indexOf(data.id)!==-1;
				// this.leaf++;
				// return this.info.indexOf(data.id) !== -1 && data.label.indexOf(value) !== -1;
			}
		},
		mounted(){
			this.$refs.tree.filter();
			this.totalDev=this.leaf;
		},
		watch: {
			filterText(val) {
				// console.log(this.tree)
				this.leaf=0;
				this.$refs.tree.filter(val);
			}
		},
        computed:{
			andOpen:function(){
				if(this.autoOpen&&this.sliderOpen){
					return true
				}else{
					return false
				}
			}
        }
	}
</script>

<style scoped>

    .ctrlTitle{
        display: flex;
        justify-content:center;
        font-weight: bold;
    }
    .box-card{
        width: 100%;
        height: 680px;
        overflow:scroll;
    }
    .box-card2{
        width: 100%;
        height: 300px;
        overflow:scroll;
        margin-top: 150px;
    }
    .item {
        margin-bottom: 18px;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    span.open{
        color: #00c000;
    }
    span.close{
        color:red;
    }
    .el-icon-d-arrow-right{
        font-size: 50px;
        padding-top: 300px;
        color: #ffffff;
        transition: all 0.5s;
    }
    .arrowRight{
        color: #4db3ff;
    }
</style>
