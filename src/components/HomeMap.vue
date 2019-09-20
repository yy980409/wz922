<template>
    <div class="back" >
        <headTop></headTop>
<!--        {{normalState}}{{errorState}}{{offlineState}}-->
<!--        {{centreData}}-->
<!--        <br><br>data1{{data1}}<br><br>data2{{data2}}-->

<!--        <el-button @click="testButt">地图变</el-button>-->


<!--        {{gridData}}<br>{{items}}<br>{{currentPageData}}-->
<!--        {{dynamicInfo}}{{info}}<br>{{ normalState}}<br>{{errorState}}<br>{{offlineState}}-->
<!--        <input v-model.number="testCount" type="number" step="20">-->
        <el-row :gutter="10" style="margin:10px;">
            <el-col :span="19">

                <el-card class="box-card1"  >
                    <el-col :span="2" >
                    <i class="el-icon-s-platform" ></i>
                    </el-col>
                    <el-col :span="22" >
                        <el-row >
                            <el-col :span="6" ><span class="aa">设备总数</span></el-col>
                            <el-col :span="6" ><span class="aa">离线设备数</span></el-col>
                            <el-col :span="6" ><span class="aa">故障设备数</span></el-col>
                            <el-col :span="6" ><span class="aa">传感器数据</span></el-col>
                        </el-row>
                        <el-row :span="22">
<!--                            <el-col :span="7" ><span class="bb">3<p>{{ animatedNumber }}</p></span></el-col>-->
                            <el-col :span="6" ><span class="bb"><p>{{animatedTotalNumber}}</p></span></el-col>
                            <el-col :span="6" ><span class="bb">{{animatedOfflineNum}}</span></el-col>

                            <el-col :span="6" ><span class="bb">{{animatedErrNum}}</span></el-col>
                            <el-col :span="6" ><span class="bb">{{animatedTotalData}}</span></el-col>

                        </el-row>
                    </el-col>


                </el-card>

            </el-col>

            <el-col :span="5" class="cc">
                <el-popover
                    placement="bottom"
                    width="600"
                    trigger="click"
                    visible-arrow="false"
                >

                    <el-table :data="currentPageData"  @row-click='handleErrorList'>
                        <el-table-column width="80" property="area" label="区域"></el-table-column>
                        <el-table-column width="120" property="name" label="设备号"></el-table-column>
                        <el-table-column width="250" property="error" label="故障信息"></el-table-column>
                        <el-table-column width="150" property="time" label="时间"></el-table-column>
                    </el-table>
                    <el-pagination
                        :current-page="currentPage"
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :total="errorFramePageCount"
                        layout="total, prev, pager, next"
                    ></el-pagination>

                        <el-button  slot="reference" class="box-button">
                            <el-col :span="2" style="margin-top: 10px">
                                <el-badge  :hidden="badgeSeen" :value="badgeValue" class="item">
                                    <i class="el-icon-message-solid" ></i>
                                </el-badge>
                            </el-col>
                            <el-col :span="20" :offset="2" class="cc" >
                                <div class="fade" v-if="!badgeSeen">
                                <transition name="fade" >
                                    <p class="pp" v-if="show"  key="1">{{data1.area}}设备{{data1.name}} {{data1.error}}</p>
                                    <p class="pp" v-if="!show" key="2">{{data2.area}}设备{{data2.name}} {{data2.error}}</p>

                                </transition>
                                </div>
                                <div class="fade" v-if="badgeSeen">
                                    <p class="pp" >设备无异常</p>
                                </div>
<!--                                <ul id="con1" ref="con1" :class="{anim:animate===true}" >-->
<!--                                    <li v-for='item in items'>-->
<!--                                        {{item.area}}设备 {{item.name}} {{item.error}}-->
<!--                                    </li>-->
<!--                                </ul>-->

                            </el-col>
                        </el-button>

                </el-popover>

            </el-col>
        </el-row>


    <el-row :gutter="20" style="margin:10px">
        <el-col :span="4">
            <el-container >
                <el-header height="30px" >设备列表</el-header>
                <el-main >

                    <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
                        <el-form :inline="true"  :model="formInline" class="demo-form-inline" >
                            <el-form-item >
                                <el-input v-model="formInline.device_id" placeholder="设备号"@keyup.enter.native="onSubmit"style="width:150px;margin-top: 10px;margin-left: 10px" ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" style="margin-top: 10px">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <el-menu style="margin: 0" class="main-menu" :default-openeds="['1']" :default-active="defaultActive" @select="handleList">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-s-tools"></i>设备</template>
                            <el-col :span="12"></el-col>

                            <el-col  :offset="2">
                            <el-tree :data="areaData"
                                     :props="defaultProps"
                                     @node-click="handleNodeClick"
                                     node-key="id"
                                     :default-expanded-keys="defaultOpenKey"
                                     accordion
                            ></el-tree>
                            </el-col>
<!--                            <el-menu-item v-for="item in info"-->
<!--                                          :key="item.device_id"-->
<!--                                          :index="item.device_id+''"-->
<!--                            >设备{{item.device_id}}-->
<!--                            </el-menu-item>-->
                        </el-submenu>
                    </el-menu>
                    </el-scrollbar>
                </el-main>

            </el-container>

        </el-col>

        <el-col :span="20">
            <el-container >
                <el-header height="30px">设备信息</el-header>
                <el-main>
                    <el-row :gutter="0" >
                    <el-col :span="18">
                        <div id="map1" class="" style="width: 100%;height:680px;"></div>
                    </el-col>
                    <el-col :span="6">
                        <div >
                            <el-card class="box-card3"  >

                                <el-divider > <span style="font-size: 18px;font-weight: bold">设备状态</span></el-divider>
                                <el-row >
                                    <!--//左框-->
                                    <el-col :span="9" style="text-align: right;font-weight: bold">
<!--                                        <el-row v-for="(i,index) in baseInfo.k1" :key="index">-->
<!--                                       {{i}}-->
<!--                                        </el-row>-->
                                        <el-row>设备号</el-row>
                                        <el-row v-for="(value,name) in dynamicInfo" :key="name">
                                            {{name}}
                                        </el-row>
                                    </el-col>
                                    <!--//右框-->
                                    <el-col :span="12" :offset = "0" style="text-align: left">
<!--                                        <el-row v-for="(i,index) in baseInfo.k2" :key="index">-->
<!--                                            <span style="text-align: left;font-weight: bold">:</span> {{i}}-->
<!--                                        </el-row>-->
                                        <el-row ><span style="text-align: left;font-weight: bold">:</span> {{current_id}}</el-row>
                                        <el-row v-for="(value,name) in dynamicInfo" :key="name">
                                            <span style="text-align: left;font-weight: bold">:</span> {{value}}
                                        </el-row>
                                    </el-col>
                                </el-row>




                                <!--//详情按钮-->
                                <div v-if="seen">
                                    <el-divider></el-divider>
                                <el-row >
                                    <el-col style="text-align: right">
                                        <el-button round @click="push" class="el-icon-info"> 详细信息</el-button>
                                    </el-col>
                                </el-row>
                                </div>

                            </el-card>

                        </div>


                    </el-col>
                </el-row></el-main>

            </el-container>



        </el-col>
    </el-row>


     <el-row>
         <el-col :span="4">
         </el-col>
     </el-row>
    </div>
</template>

<script>
	import {normalUrl,offlineUrl,errorUrl} from '../components/wifiIcon'
	import TweenLite from "gsap";
	import headTop from '../components/headTop';
	import { getErrorInfo,getArea,getDevSensors,getGPS,getLatesTemById,getLatestPowerById,
        getLatestWaterById,getDevCount} from '@/api/getData'
	import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/scatter'
	import 'echarts/lib/component/tooltip';
	import 'echarts/lib/component/title';
	import 'echarts/extension/bmap/bmap'
	import {getGPSByArea} from "../api/getData";
	export default {
		components:{
			headTop
        },
		data(){
			return {
				formInline:{
					device_id:null,
				},
				//////分区
                defaultTemp:[1],
				defaultOpenKey:[1],
                area:[],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				//故障框滚动动画、数据、列表值
                gridOrder:0,
                centreData:{name:"",area:"",error:"",time:""},
				animate:false,
                show:true,
                data1:{name:"",area:"",error:"",time:""},
                data2:{name:"",area:"",error:"",time:""},
				gridData: [
					// {name:"ns122229",area:"宝安区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"ns144449",area:"宝安区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"ns1",area:"南山区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"ns2",area:"南山区",error:"error2333 ",time:"2019.8.27 16:18:00"},
					// {name:"ba3",area:"宝安区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"ft4",area:"福田区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"lh5",area:"龙华区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"ns6",area:"南山区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"ns7",area:"南山区",error:"error2333 ",time:"2019.8.27 16:18:00"},
					// {name:"ba8",area:"宝安区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"ft9",area:"福田区",error:"error233 ",time:"2019.8.27 16:18:00"},
					// {name:"lh10",area:"龙华区",error:"error233 ",time:"2019.8.27 16:18:00"},
				],
                currentPageData:[],
                ////分页
				currentPage: 1,
				pageSize:6,
                // pageCount:12,

                //设备总数
				testCount:null,
                totalNum:0,
                totalData:0,
                offlineNum:0,
                errNum:0,
                //GPS信息
				info:[],
				center: [113.94117874959207,22.545135832607247],
				center2: [113.95,22.545135832607247],
                //动画数
				tweenedNumber:0,
                number:0,
				tweenedTotalNumber:0,
				tweenedTotalData:0,
				tweenedOfflineNum:0,
				tweenedErrNum:0,
                //当前id
                current_id:"",
                //按钮可视
                seen:false,
                //设备状态信息
                baseInfo:{
					k1:["设备号","温度","湿度","重合闸状态","防雷器状态","水浸状态"],
                    k2:["",""," ","","",""]
                },
                dynamicInfo:{"":""},
                //test
                ii:0,
				errorFrameTimer:"",
                timer:"",
				myChart:null,
                mapFrameId:'',
                mapFramecontent:'Loading',
            }
		},
        created(){
			this.initialData();

        },
		mounted(){
        //errorFrameTable第一页初始化
			for(var i=0;i<this.pageSize;i++){
				if(this.gridData[i]===null){console.log("break");break;}
				this.currentPageData[i]=this.gridData[i];
			}
			this.myChart = echarts.init(document.getElementById('map1'));
			this.initData(this.myChart);



		},
		methods: {
			testButt(){
				console.log('233');
				// this.myChart=echarts.init(document.getElementById('map1'));
				this.myChart.setOption({
					// bmap: {
					// 	// center: this.center2,
					// 	// zoom: 5,
					// 	// roam: true,
					// },
					series: [
						{
							name: '正常',
							data: this.normalState,
						},
						{
							name: '故障',
							data: this.errorState,

						},
						{
							name: '离线',
							data: this.offlineState,
						},


					]
				})
            },
			async onSubmit() {
				if (this.formInline.device_id === null||this.formInline.device_id === "") {

				} else {
					let ff=this.info.find((ele) => (ele.device_id.toString()===this.formInline.device_id));
					if(ff){
						this.handleList(this.formInline.device_id);
					}else{
						this.$message({
							message: '未找到设备'+this.formInline.device_id,
							type: 'warning'
						});
                    }


				}
			},
			async getAreas(){//分区初始化
				const area=await getArea({});
				this.area=area;
            },
            async getError(){//故障框

				//////故障初始化
				// const errorInfo=await getErrorInfo({});
				// let errorTemp=[];
				// errorInfo.forEach(item => {
				// 	let a={};
				// 	a.name=item.device_id;
				// 	a.area=item.area_name;
				// 	a.error=item.description;
				// 	a.time=item.create_time;
				// 	errorTemp.push(a);
				// });
				// let tempObj = Object.assign(errorTemp);
				// this.gridData=errorTemp;
				// this.items=tempObj;

				//errorFrameTable第一页初始化
				for(var i=0;i<this.pageSize;i++){
					if(this.gridData[i]===null){console.log("break");break;}
					this.currentPageData[i]=this.gridData[i];
				}
				//////故障框计时器
					this.errorFrameTimer=setInterval(this.scroll,3100);

            },
			async getGPSs(){////////获取GPS
				var GPS=await getGPS();
				this.info=GPS;
			},
            async getTotalInfo(){
				const cc = await getDevCount({});
				this.testCount=cc.totalNum;
				this.totalNum=cc.totalNum;
				this.totalData=cc.totalData;
				this.offlineNum=cc.offLineNum;
				this.errNum=cc.errNum;
            },
			async updateError(){
				//////故障初始化
				const errorInfo=await getErrorInfo({});
				let errorTemp=[];
				errorInfo.forEach(item => {
					let a={};
					a.name=item.device_id;
					a.area=item.area_name;
					a.error=item.description;
					a.time=item.create_time;
					errorTemp.push(a);
				});
				let tempObj = Object.assign(errorTemp);
				this.gridData=errorTemp;
				//故障表更新
				for(var i=0;i<this.pageSize;i++){
					if(this.gridData[i]===null){console.log("break");break;}
					this.currentPageData[i]=this.gridData[i];
				}
			},
            updateData(){
				console.log("DataUpdated");
				this.updateError();
				this.getTotalInfo();
				this.getGPSs();
				this.myChart.setOption({
					// bmap: {
					// 	// center: this.center2,
					// 	// zoom: 5,
					// 	// roam: true,
					// },
					series: [
						{
							name: '正常',
							type: 'scatter',
							data: this.normalState,
						},
						{
							name: '故障',
							type: 'scatter',
							data: this.errorState,

						},
						{
							name: '离线',
							type: 'scatter',
							data: this.offlineState,
						},


					]
				})
			},
			async initData(chart){////////初始化图表
                let ii=1;
				await this.getGPSs();
				var self=this;
				chart.setOption({
					title: {
						text: '设备总览',
						subtext: '单击进入状态',
						// sublink: 'http://www.pm25.in',
						left: 'center',
						textStyle: {
							color: '#fff'
						}
					},
					bmap: {
						center: this.center,
						zoom: 15,
						roam: true,
						mapStyle: {
							styleJson: [
								{
									"featureType": "building",
									"elementType": "labels.text.fill",
									"stylers": {
										"visibility": "off"
									}
								},
								{
									"featureType": "manmade",
									"elementType": "all",
									"stylers": {
										"visibility": "off"
									}
								},
								{
									"featureType": "poilabel",
									"elementType": "all",
									"stylers": {
										"visibility": "off"
									}
								},
								{
									"featureType": "road",
									"elementType": "all",
									"stylers": {}
								}
								// 		// {
								// 		// 	"featureType": "water",
								// 		// 	"elementType": "all",
								// 		// 	"stylers": {
								// 		// 		"color": "#044161"
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "land",
								// 		// 	"elementType": "all",
								// 		// 	"stylers": {
								// 		// 		"color": "#004981"
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "boundary",
								// 		// 	"elementType": "geometry",
								// 		// 	"stylers": {
								// 		// 		"color": "#064f85"
								// 		// 	}
								// 		// },
								// {
								// 	"featureType": "railway",
								// 	"elementType": "all",
								// 	"stylers": {
								// 		"visibility": "off"
								// 	}
								// },
								// 		// {
								// 		// 	"featureType": "highway",
								// 		// 	"elementType": "geometry",
								// 		// 	"stylers": {
								// 		// 		"color": "#004981"
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "highway",
								// 		// 	"elementType": "geometry.fill",
								// 		// 	"stylers": {
								// 		// 		"color": "#005b96",
								// 		// 		"lightness": 1
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "highway",
								// 		// 	"elementType": "labels",
								// 		// 	"stylers": {
								// 		// 		"visibility": "off"
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "arterial",
								// 		// 	"elementType": "geometry",
								// 		// 	"stylers": {
								// 		// 		"color": "#004981"
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "arterial",
								// 		// 	"elementType": "geometry.fill",
								// 		// 	"stylers": {
								// 		// 		"color": "#00508b"
								// 		// 	}
								// 		// },
								// 		{
								// 			"featureType": "poi",
								// 			"elementType": "all",
								// 			"stylers": {
								// 				"visibility": "off"
								// 			}
								// 		},
								// 		// {
								// 		// 	"featureType": "green",
								// 		// 	"elementType": "all",
								// 		// 	"stylers": {
								// 		// 		"color": "#056197",
								// 		// 		"visibility": "off"
								// 		// 	}
								// 		// },
								// 		{
								// 			"featureType": "subway",
								// 			"elementType": "all",
								// 			"stylers": {
								// 				"visibility": "off"
								// 			}
								// 		},
								// 		{
								// 			"featureType": "manmade",
								// 			"elementType": "all",
								// 			"stylers": {
								// 				"visibility": "off"
								// 			}
								// 		},
								// 		// {
								// 		// 	"featureType": "local",
								// 		// 	"elementType": "all",
								// 		// 	"stylers": {
								// 		// 		"visibility": "off"
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "arterial",
								// 		// 	"elementType": "labels",
								// 		// 	"stylers": {
								// 		// 		"visibility": "off"
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "boundary",
								// 		// 	"elementType": "geometry.fill",
								// 		// 	"stylers": {
								// 		// 		"color": "#029fd4"
								// 		// 	}
								// 		// },
								// 		// {
								// 		// 	"featureType": "building",
								// 		// 	"elementType": "all",
								// 		// 	"stylers": {
								// 		// 		"color": "#1a5787"
								// 		// 	}
								// 		// },
								// 		{
								// 			"featureType": "label",
								// 			"elementType": "all",
								// 			"stylers": {
								// 				"visibility": "off"
								// 			}
								// 		}
							]
						}
					},
					tooltip : {
						trigger: 'item',
						// formatter:'设备号:{b}<br/>状态:{a}'
						triggerOn:'mousemove',
						formatter: function (params, ticket, callback) {

							// let res='设备号: '+params.name+'<br>'+'&nbsp;&nbsp;&nbsp;&nbsp;状态: '+params.seriesName+'<br>';
							let res='<div style="text-align: right" class="left"><div>设备号: </div><div>状态: </div></div>'+'<div class="right"><div>'+params.name+'</div><div>'+params.seriesName+'</div></div>';

							if(params.seriesName==='离线'){
								return res;
                            }
                            if(self.mapFrameId!==params.name) {
								getDevSensors({device_id: params.name}).then(Promise => {
									// console.log(Promise.sensors);
									console.log(params);
									let left = '<div style="text-align: right" class="left"><div>设备号: </div><div>状态: </div>';
									let right = '<div class="right"><div>' + params.name + '</div><div>' + params.seriesName + '</div>';

									let temp = Promise.sensors;
									Object.keys(temp).forEach(function (key) {
										left += '<div>' + key + ': </div>';
										right += '<div>' + temp[key] + '</div>';
									});

									left += '</div>';
									right += '</div>';
									res = left + right;
									//回调函数更新框内信息
									callback(ticket, res);
									self.mapFramecontent=res;
									self.mapFrameId=params.name;
								});
                            }


                            return self.mapFramecontent;

							// return res+'<br><br><p style="text-align: center">loading...';

						}
					},
					series: [
						{//this.offlineState,
							name: '正常',
							type: 'scatter',
							coordinateSystem: 'bmap',
							symbol:normalUrl,
							data: this.normalState,
							symbolSize:20,
							// label: {
							// 	normal: {
							// 		formatter: '{b}',
							// 		position: 'bottom',
							// 		show: true
							// 	},
							// 	emphasis: {
							// 		show: true
							// 	},
							// },
							itemStyle: {
								normal: {
									color: '#519be6'
								}
							}
						},
						{
							name: '故障',
							type: 'scatter',
							rippleEffect:{
								period:1,
							},
							coordinateSystem: 'bmap',
							data: this.errorState,
							symbol:errorUrl,
							symbolSize:20,
							// label: {
							// 	normal: {
							// 		formatter: '{b}',
							// 		position: 'bottom',
							// 		show: true
							// 	},
							// 	emphasis: {
							// 		show: true
							// 	},
							// },
							itemStyle: {
								normal: {
									color: '#dd0009'
								}
							}
						},
						{
							name: '离线',
							type: 'scatter',
							coordinateSystem: 'bmap',
							data: this.offlineState,
							symbolSize:15,
							symbol:offlineUrl,
							// label: {
							// 	normal: {
							// 		formatter: '{b}',
							// 		position: 'bottom',
							// 		show: true
							// 	},
							// 	emphasis: {
							// 		show: true
							// 	},
							// },
							itemStyle: {
								normal: {
									color: '#373837'
								}
							}
						},


					]
				});
				this.myChart.on('click', this.butt);

				//数据更新
				this.timer=setInterval(this.updateData, 5000);
			},
			async initialData(){
				console.log("数据初始化");
				//分区初始化
				await this.getAreas();
				//故障框
                this.getError();
				//设备总信息
				this.getTotalInfo();


			},
			handleNodeClick(data) {
				if(data.children===undefined){
					this.handleList(data.label);
                }else{
					let temp=[];
					temp[0]=data.id;
					this.defaultTemp=temp;
                    // console.log(this.defaultTemp);
                }
			},
			scroll(){
				console.log("errorFrame",this.ii);
				// this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
				// setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
				// 	this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
				// 	this.items.shift();               //删除数组的第一个元素
				// 	this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
				// },2000)
                this.centreData=this.gridData[this.gridOrder];
                if((this.gridOrder+1)>=this.gridData.length){
					this.gridOrder=0;
                }else{
					this.gridOrder++;
                }


			},
			handleErrorList(val){
			    this.handleList(val.name);
            },
			/////////////////左侧设备框事件
			handleList(key){
				this.findInMap(key);
                this.shouwInList(key);
            },
            shouwInList(key){
                this.current_id=key;
            },
			findInMap(key){
				let ff=this.info.find((ele) => (ele.device_id.toString()===key));
				this.center=[ff.longitude,ff.latitude];

				var ecModel = this.myChart._model;
				var bmap = null;
				ecModel.eachComponent('bmap', function (bmapModel) {
					if(bmap == null){
						bmap = bmapModel.__bmap;
					}
				});
					bmap.panTo(new BMap.Point(ff.longitude, ff.latitude));
				// this.myChart.setOption({
				// 	bmap:{
				// 		center: this.center
				// 	}
				// });
            },
            butt(val){
				this.current_id=val.name.toString();
            },
			push(){
				var a={device_id:this.current_id};
				this.$router.push({ path:'/singleStatus',query: a});
			},
            convert(val){//////////数据转换
			var res = [];
				for (var i = 0; i < val.length; i++) {
					var temp=[];
                    temp [0]= val[i].longitude;
					if(temp){
						res.push({
							name: val[i].device_id,
							value: temp.concat(val[i].latitude)
						});
					}
                }
				return res;
            },
            async getListData(devId){//baseInfo无用 旧方案
                const temp=[];
                const TH=await getLatesTemById({device_id:devId});
                const power=await getLatestPowerById({device_id:devId});
				const water=await getLatestWaterById({device_id:devId});
                const sensors=await getDevSensors({device_id:devId});
                console.log(ttemp);
                const ttemp=sensors.sensors;
                this.dynamicInfo=ttemp;
				temp[0]=devId;
				temp[1]=TH.temperature+" "+"℃";
				temp[2]=TH.humidity+" "+"%RH";
				temp[3]=power.sta_H;
				// temp[4]
				temp[5]=water.status;
				this.baseInfo.k2=temp;

            },
			handleCurrentChange: function (val) {
				this.currentPage = val;
				this.currentPageData = [];
				for (var i = 0; i < this.pageSize; i++) {
					// if(this.gridData[i]===""){break;}
					this.currentPageData[i] = this.gridData[(val-1) * this.pageSize + i];
				}
			},

		},
		watch: {
			defaultTemp(newval,oldval) {
                // console.log(newval[0],oldval[0]);
                if(newval[0]===oldval[0]){
					let temp=[];
                	if(this.defaultOpenKey[0]===0){
						temp[0]=newval[0];
                    }else{
						temp[0]=0;
                    }
					this.defaultOpenKey=temp;
                }else{
					let temp=[];
					temp[0]=newval[0];
					this.defaultOpenKey=temp;
					// console.log(this.defaultOpenKey);
                }
			},
			////////////动画组
            centreData:function(newValue){
				if(newValue==null){
					return;
                }
			    this.show=!this.show;
			    if(this.show){
			    	this.data1=newValue;
                }else{
					this.data2=newValue;
                }
            },
			errNum: function(newValue) {
				TweenLite.to(this.$data, 0.5, {
					tweenedErrNum: newValue});
			},
			offlineNum: function(newValue) {
				TweenLite.to(this.$data, 0.5, {
					tweenedOfflineNum: newValue});
			},
			totalData: function(newValue) {
				TweenLite.to(this.$data, 12, {
					tweenedTotalData: newValue});
			},
			totalNum: function(newValue) {
				TweenLite.to(this.$data, 0.5, {
					tweenedTotalNumber: newValue});
			},
			testCount: function(newValue) {
				TweenLite.to(this.$data, 0.5, {
					tweenedNumber: newValue});
			},
            //////////////////
            current_id:function(newval,oldval){

				if(oldval===""){
				    this.seen=true;
				}
				if(oldval!==newval){
					this.getListData(newval);
                }
            },
			// items:function(){//////////////????????????????????????????未完成
			//     if(items.length>1){
			// 		this.errorFrameTimer=setInterval(this.scroll,3100);
            //
            //     }else{
			// 		clearInterval(this.errorFrameTimer);
			// 		console.log("destroyed");
			//     	if(items.length===0){
			//     		this.items={name:"无",area:"无",error:" 无 "};
            //         }
            //     }
            // },
			$route:function(val,oldval){//切换页面//////////////????????????????????????????未完成
				const currentPath=val.path.replace('/', '');
				const oldPath =oldval.path.replace('/', '');
				console.log("new: ",currentPath," old ",oldPath);
				if(currentPath !== "HomeMap" && oldPath === "HomeMap") {

					clearInterval(this.errorFrameTimer);
					console.log("Home errorFrameTimer destroyed");

				}
				if(currentPath === "HomeMap" && oldPath !== "HomeMap")
				{
					this.errorFrameTimer=setInterval(this.scroll,3100);
					console.log("back to home");
				}
			},

		},
		computed: {
			//状态
            normalState:function(){
				let temp=[];
				this.info.forEach(item => {
					if(item.status==="正常"){
						temp.push(item);
					}
				});
				return this.convert(temp);
			},
			offlineState:function(){
				let temp=[];
				this.info.forEach(item => {
					if(item.status==="离线"){
						temp.push(item);
					}
				});
				return this.convert(temp);
			},
			errorState:function(){
				let temp=[];
				this.info.forEach(item => {
					if(item.status==="故障"||item.status==="异常"){
						temp.push(item);
					}
				});
				return this.convert(temp);
			},
			//分区
			areaData:function(){
			    let temp=[];
                for(let i=0;i<this.area.length;i++){
                    let obj = {};
                    obj.label=this.area[i].area_name;
                    obj.id=i+1;
					obj.children=[];
                    this.info.forEach(item => {
                    	if(item.area===obj.label){
							obj.children.push({label:item.device_id});
                        }
                    });

                    temp.push(obj);
                }
                return temp;
            },
			////////////动画组
			animatedOfflineNum  : function() {
				return this.tweenedOfflineNum.toFixed(0);
			},
			animatedErrNum: function() {
				return this.tweenedErrNum.toFixed(0);
			},
			animatedTotalData: function() {
				return this.tweenedTotalData.toFixed(0);
			},
			animatedTotalNumber: function() {
				return this.tweenedTotalNumber.toFixed(0);
			},
                animatedCount: function() {
                    return this.tweenedNumber.toFixed(0);
                },
            ////////////////////////

			defaultActive: function(){
				return this.current_id+"";
			},
            addString:function(){
				return "设备"+this.current_id;
            },

			badgeValue:function(){
				if(this.gridData.length){
				return this.gridData.length;
				}
				if(this.gridData.length==="null"){
					return 0;
                }
            },
			badgeSeen:function () {
                if(this.gridData.length>0){
					return false;
                }else{
					return true;
                }
			},
            errorFramePageCount:function(){
				return this.gridData.length;
            }


		},
		beforeDestroy() {
			clearInterval(this.errorFrameTimer);
			console.log("finally destroyed");
		}


	}
</script>

<style scoped>
    .pp{
        position: absolute;
        width: 230px;
    }
    .fade{
        margin-top: 10px;
        margin-left: 20px;
        width: 230px;
        font-size: 20px;
        vertical-align: middle;
        white-space:normal;

    }
    .fade-enter-active {
        transition: all 1.5s ;
    }
    .fade-leave-active {
        transition: all 1.5s ;
    }
    .fade-enter
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(80px);
        opacity: 0;
    }
    .fade-leave-to{
        transform: translateY(-80px);
        opacity: 0;
    }
    .anim{
        transition: all 2s;
        margin-top: -95px;
    }
    #con1 li{
        margin-top: 15px;
        list-style: none;
        line-height: 20px;
        height: 80px;

    }
    .el-container{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04),5px -4px 6px rgba(0, 0, 0, .1);
        /*height: 770px;*/
        height: 750px;
    }
    .el-col {
        border-radius: 4px;
    }
    .el-header {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        vertical-align: middle;
        line-height: 30px;
        /*margin-bottom: 2px;*/
        text-align:left;
        border-bottom: 1px solid #e3e4e6;

    }
    .el-main {
        width: 100%;
        height: 100%;
        padding: 0;
        background-color:#ffffff;
        color: #333;
        /*text-align: center;*/
        line-height: 30px;
    }
    .el-icon-s-platform{
        font-size: 51px;
        color: #78c5ff;
    }
    .el-icon-message-solid{
        font-size: 51px;
        color: #ff9a7a;
    }
    .box-card1{
        background-color: #1e9fff;
        color: #ffffff;
        border-radius: 8px;
        height: 100px;
        text-align:left;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .box-card2{
        background-color: #ff5722;
        color: #ffffff;
        border-radius: 8px;
        height: 100px;
        text-align:left;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .box-button{
        background-color: #ff5722;
        color: #ffffff;
        border-radius: 8px;
        height: 100px;
        width: 100%;
        text-align:left;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .aa{
        font-size: 18px;
        vertical-align: top;
    }
    .bb{
        font-size: 22px;
        vertical-align: top;
    }
    .cc{

        font-size: 20px;
        vertical-align: middle;
        overflow: hidden;
        white-space:normal;
    }
    .back{
        /*background-color: #edeef0;*/
    }

    .default-scrollbar {
        width: 100%;
        height: 100%;
    }
    .flex-scrollbar {
        width: auto;
        height: auto;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    .el-scrollbar__wrap.default-scrollbar__wrap {
        overflow-x: auto;
    }
    .el-scrollbar__view.p20-scrollbar__view {
        padding: 20px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
    }
</style>
<!--<style lang="less">-->
<!--    @import '../style/mixin';-->
<!--    .map1{-->
<!--        display: flex;-->
<!--        justify-content: center;-->
<!--    }-->
<!--</style>-->
