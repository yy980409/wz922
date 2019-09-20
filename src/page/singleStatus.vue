<template>
    <div class="fillcontain" style="background-color: #f4f5f7;;min-height: 1000px">
        <head-top ok="true" :count="tt"></head-top>
<!--        {{card2row}}<br><br>{{card}}<br><br>{{card2row2}}-->
        <el-divider >设备号</el-divider>
        <el-row :gutter="0" type="flex" justify="center" class="row-bg">

            <el-col :span="10" >
<!--                <el-card class="box-card1" style="height: 360px;background-color: #f3f4f6;" body-style=padding:5px >-->
<!--                <el-col :span="16" style="border-radius: 8px;background-color: #fcfcfc;">-->
                <el-card class="box-card1"   >
                    <el-col :span="16" >
                    <lineMap id="line2" :info="temperature" name="温度"></lineMap>
                </el-col>
                <el-col :span="8" >

                    <div style="height:330px;width:500px;display: table-cell;vertical-align:middle;text-align: center;">
                        <p style="color:#1d90e6;font-size:30px;">最新数据</p>
                        <p style="color:#1d90e6;font-size:30px;">{{temperature[0][1]}}℃</p>
                        <p style="color:#a9aaff;font-size:30px;"></p>
<!--                        <p style="color:#a9aaff;font-size:20px;">更新于:{{}}</p>-->
                    </div>

                </el-col>
                </el-card>

            </el-col>


            <el-col :span="10" style="">
            <el-card class="box-card2"  >
            <el-col :span="16" >
                <lineMap id="line3" :info="humidity" name="湿度" ></lineMap>
            </el-col>

            <el-col :span="8">
                <div style="height:330px;width:500px;display: table-cell;vertical-align:middle;text-align: center;">
                <p style="color:#1d90e6;font-size:30px;">最新数据</p>
                <p style="color:#1d90e6;font-size:30px;">{{humidity[0][1]}}%RH</p>
                <p style="color:#1d90e6;font-size:30px;"></p>
<!--                <p style="color:#a9aaff;font-size:20px;">更新于:</p>-->
                </div>
            </el-col>
            </el-card>
            </el-col>
        </el-row>




        <el-row :gutter="0" type="flex" justify="center" class="row-bg2"
                v-for="(row,Rindex) in card2row"
                :key="Rindex"
        >
            <el-col :span="5" v-for="(cc,index) in row"
                    :key="index"

            >








                    <el-card   class="box-card3-1"  >
                        <el-col :span="8" style="margin-top: 15px;">
                            <div class="title" >

                                <i class="el-icon-cpu" style="color: #1c8de0;"></i>
                                {{cc.title}}

                            </div>
                        </el-col>


                        <el-col :span="1">
                    <span style="
                    padding:20px 0px 90px 0px;
                    margin-top: 0px;
                    border-left: 1px solid #e3e4e6;
                    font-size: 0;
                    "></span>
                        </el-col>


                        <el-col :span="16"style="margin-top: 15px" >

                    <span class="subtitle" >
                            <el-row style="" :class="{num1:cc.subtitles.length===1,num2:cc.subtitles.length===2,num3:cc.subtitles.length===3,num4:cc.subtitles.length===4}">
                                <el-col v-for="(ccolumn,ccoIndex) in cc.subtitles" :span="12" :key="ccoIndex" >
                                     <span style="font-weight: bold;font-size: 18px">{{ccolumn.subtitle}}:<br></span>
                                     <span style="font-size: 16px">{{ccolumn.data}}<br></span>
                                </el-col>
                            </el-row>

                        <el-popover
                            v-if="cc.title==='重合闸'"
                            placement="top"
                            width="300"
                            trigger="click"
                            class="box-card3-1"
                        >
                             <div   style="text-align: center;font-size: 20px;">
                        <div class="demonstration" >重合闸开关</div>
                        <el-button @click="rebootPower" >重启</el-button>
                        <el-switch
                            v-model="powerSwitch"
                            active-text="合闸"
                            inactive-text="分闸"
                            @change="handlePowerSwitch"
                        >

                        </el-switch>

                    </div>
b
                            <el-button  slot="reference" style="margin-left: 160px">233</el-button>
                        </el-popover>

                        <el-popover
                            v-if="cc.title==='风扇'"
                            placement="top"
                            width="300"
                            trigger="click"
                            class="box-card3-1"
                            style="background-color: #1d90e6;"
                        >
                             <div   style="text-align: center;font-size: 20px;">
                        <span class="demonstration" >风扇转速</span><br>
                        <el-switch
                            v-model="autoOpen"
                            active-text="手动控制"
                            inactive-text="自动控制"
                            inactive-color="#409EFF"
                            @change="handleFanAuto"

                        >
                        </el-switch><br>
                        <el-switch
                            v-if="autoOpen"
                            v-model="sliderOpen"
                            active-text="开"
                            inactive-text="关"
                            @change="handleFanSwitch"

                        >
                        </el-switch>
                        <el-slider v-if="andOpen" class="FanDefalut" v-model="fanSpeed" @change="handleFanSpeed" ></el-slider>
                    </div>


                            <el-button  slot="reference">233</el-button>
                        </el-popover>




                    </span>
                        </el-col>
                        <!--                    border: 1px solid #e3e4e6;-->
                    </el-card >
            </el-col>




        </el-row>
<!--        <el-divider>设备信息</el-divider>-->
<div v-if="false">
        <el-row :gutter="0" type="flex" justify="center" class="row-bg2"
                v-for="(row,Rindex) in card2row"
                :key="Rindex"
        >
            <el-col :span="5" v-for="(cc,index) in row"
                    :key="index"

            >
                <el-popover

                    placement="top"
                    width="300"
                    trigger="click"
                    class="box-card3-1"
                    style="background-color: #1d90e6;"
                >
                    <div  v-if="cc.title==='风扇'" style="text-align: center;font-size: 20px;">
                        <span class="demonstration" >风扇转速</span><br>
                        <el-switch
                            v-model="autoOpen"
                            active-text="手动控制"
                            inactive-text="自动控制"
                            inactive-color="#409EFF"
                            @change="handleFanAuto"

                        >
                        </el-switch><br>
                        <el-switch
                            v-if="autoOpen"
                            v-model="sliderOpen"
                            active-text="开"
                            inactive-text="关"
                            @change="handleFanSwitch"

                        >
                        </el-switch>
                        <el-slider v-if="andOpen" class="FanDefalut" v-model="fanSpeed" @change="handleFanSpeed" ></el-slider>
                    </div>

                    <div  v-if="cc.title==='重合闸'" style="text-align: center;font-size: 20px;">
                        <div class="demonstration" >重合闸开关</div>
                        <el-button @click="rebootPower">重启</el-button>
                        <el-switch
                            v-model="powerSwitch"
                            active-text="合闸"
                            inactive-text="分闸"
                            @change="handlePowerSwitch"
                        >

                        </el-switch>

                    </div>

                <el-button  slot="reference" class="box-card3-1"  >
                    <el-col :span="8" style="margin-top: 15px;">
                    <div class="title" >

                        <i class="el-icon-cpu" style="color: #1c8de0;"></i>
                        {{cc.title}}

                    </div>
                    </el-col>


                    <el-col :span="1">
                    <span style="
                    padding:20px 0px 90px 0px;
                    margin-top: 0px;
                    border-left: 1px solid #e3e4e6;
                    font-size: 0;
                    "></span>
                    </el-col>


                    <el-col :span="16"style="margin-top: 15px" >
                    <span class="subtitle" >
<!--                            <el-col  v-for='(row,rowIndex) in cc.subtitles' :key="rowIndex" :class="{on:cc.subtitles[0].length==2,off:cc.subtitles[0].length!=2}" >-->
<!--                            <el-row  v-for="(column,coIndex) in row" :key="coIndex" :class="{oon:column.length==1,ooff:column.length!=1}">-->
<!--                                <el-col v-for="(ccolumn,ccoIndex) in column" :span="12" :key="ccoIndex" >-->
<!--                         <span style="font-weight: bold;font-size: 18px">{{ccolumn.subtitle}}:<br></span>-->
<!--                        <span style="font-size: 16px">{{ccolumn.data}}<br></span>-->
<!--                                </el-col>-->

<!--                                </el-row>-->
<!--                            </el-col>-->

                            <el-row style="" :class="{num1:cc.subtitles.length===1,num2:cc.subtitles.length===2,num3:cc.subtitles.length===3,num4:cc.subtitles.length===4}">
                                <el-col v-for="(ccolumn,ccoIndex) in cc.subtitles" :span="12" :key="ccoIndex" >
                                     <span style="font-weight: bold;font-size: 18px">{{ccolumn.subtitle}}:<br></span>
                                     <span style="font-size: 16px">{{ccolumn.data}}<br></span>
                                </el-col>
                            </el-row>


                    </span>
                    </el-col>
                    <!--                    border: 1px solid #e3e4e6;-->
                </el-button >
                </el-popover>
            </el-col>

        </el-row>
        </div>
<div v-if="false">

        <el-divider><p style="font-size: 25px"> 设备控制</p></el-divider>


        <el-row :gutter="0" type="flex" justify="center" class="row-bg2"
                v-for="(row,Rindex) in card2row2"
                :key="(Rindex+1)*2"
        >
            <el-col :span="5" v-for="(cc,index) in row"
                    :key="index"
            >
                <el-card class="box-card4">
                    <div  v-if="cc.title==='风扇'" style="text-align: center;font-size: 20px;">
                        <span class="demonstration" >风扇转速</span><br>
                        <el-switch
                            v-model="autoOpen"
                            active-text="手动控制"
                            inactive-text="自动控制"
                            inactive-color="#409EFF"
                            @change="handleFanAuto"

                        >
                        </el-switch><br>
                        <el-switch
                            v-if="autoOpen"
                            v-model="sliderOpen"
                            active-text="开"
                            inactive-text="关"
                            @change="handleFanSwitch"

                        >
                        </el-switch>
                        <el-slider v-if="andOpen" class="FanDefalut" v-model="fanSpeed" @change="handleFanSpeed" ></el-slider>
                    </div>

                    <div  v-if="cc.title==='重合闸'" style="text-align: center;font-size: 20px;">
                        <div class="demonstration" >重合闸开关</div>
                        <br>
                        <el-button @click="rebootPower">重启</el-button>
                        <el-switch
                            v-model="powerSwitch"
                            active-text="合闸"
                            inactive-text="分闸"
                            @change="handlePowerSwitch"
                        >

                        </el-switch>

                    </div>

                    <el-button slot="reference" class="box-card3-1"  >
                        <el-col :span="8" style="margin-top: 15px;">
                            <div class="title" >

                                <i class="el-icon-cpu" style="color: #1c8de0;"></i>
                                {{cc.title}}

                            </div>
                        </el-col>


                        <el-col :span="1">
                    <span style="
                    padding:20px 0px 90px 0px;
                    margin-top: 0px;
                    border-left: 1px solid #e3e4e6;
                    font-size: 0;
                    "></span>
                        </el-col>


                        <el-col :span="16"style="margin-top: 15px" >
                    <span class="subtitle" >
<!--                            <el-col  v-for='(row,rowIndex) in cc.subtitles' :key="rowIndex" :class="{on:cc.subtitles[0].length==2,off:cc.subtitles[0].length!=2}" >-->
                        <!--                            <el-row  v-for="(column,coIndex) in row" :key="coIndex" :class="{oon:column.length==1,ooff:column.length!=1}">-->
                        <!--                                <el-col v-for="(ccolumn,ccoIndex) in column" :span="12" :key="ccoIndex" >-->
                        <!--                         <span style="font-weight: bold;font-size: 18px">{{ccolumn.subtitle}}:<br></span>-->
                        <!--                        <span style="font-size: 16px">{{ccolumn.data}}<br></span>-->
                        <!--                                </el-col>-->

                        <!--                                </el-row>-->
                        <!--                            </el-col>-->

                            <el-row style="" :class="{num1:cc.subtitles.length===1,num2:cc.subtitles.length===2,num3:cc.subtitles.length===3,num4:cc.subtitles.length===4}">
                                <el-col v-for="(ccolumn,ccoIndex) in cc.subtitles" :span="12" :key="ccoIndex" >
                                     <span style="font-weight: bold;font-size: 18px">{{ccolumn.subtitle}}:<br></span>
                                     <span style="font-size: 16px">{{ccolumn.data}}<br></span>
                                </el-col>
                            </el-row>


                    </span>
                        </el-col>
                        <!--                    border: 1px solid #e3e4e6;-->
                    </el-button >
                    </el-card>
            </el-col>





        </el-row>
</div>




<!--        <p style="font-size: 30px;color:#ff76fd">已经摸了 {{tt}} 秒的鱼了</p>-->


<!--        <div class="tt" style="padding: 0px;-->
<!--            width:500px;-->
<!--            height:200px;-->
<!--            text-align:center;-->
<!--            background-color:#F69;-->

<!--            display: table-cell;-->
<!--            vertical-align:middle">啦啦啦</div>-->



    </div>
</template>

<script>
	import headTop from '../components/headTop';
	import lineMap from '../components/lineMap';
	import {fanAutoOff,fanAutoOn,reStartPower,fanSpeed,fanOpen,fanClose,getDevAllInfo,getTemHum,powerOff,powerOn} from '@/api/getData';
	export default {
		name: "singleStatus",
		components: {
			headTop,
			lineMap,
		},
        data()  {
			return {
				//风扇、重合闸
				autoOpen:true,//初始值，后续值不由他控制
                sliderOpen:true,//初始值，后续值不由他控制
				fanSpeed:56,
				powerSwitchAuto:true,//初始值，后续值不由他控制
				powerSwitch:true,//初始值，后续值不由他控制
                //设备号
				status:null,
				device_id:null,
                //分页数据

                //图表数据
                timeValue:[],
				temperature:[[]],
				humidity:[[]],
                Tlimit:10,
                Toffset:1,
                // card数据
                card:[
                    // {title:"水浸",subtitles:[{subtitle:"状态",data:"正常"},{subtitle:"状态",data:"正常"},{subtitle:"状态",data:"正常"}]},
                    // {title:"重合闸",subtitles:[{subtitle:"状态",data:"开"},{subtitle:"状态",data:"开"},{subtitle:"电流",data:"12A"},{subtitle:"电流",data:"12A"}]},
                    // {title:"防雷器",subtitles:[{subtitle:"状态",data:"233"}]},
                    //
					// {title:"防雷器",subtitles:[{subtitle:"状态",data:"233"},{subtitle:"状态",data:"233"}]},


                ],
                cardTest:[],

                //test
                tt:0,
                timer:'',
				test:[],

			}
        },

        methods:{
			async updateLine(){
				this.tt+=5;
				console.log("singleFrame");
				this.getLineDate();
				this.getCardData();
			},
            async getCardData(){
				const allInfo=await getDevAllInfo({device_id:this.device_id});
				// this.cardTest=allInfo;
				let ttemp=[];
                Object.keys(allInfo).forEach(key =>{
					let temp={};
					temp.title=key;
					temp.subtitles=[];
					Object.keys(allInfo[key]).forEach(kk =>{
						let tt={};
						tt.subtitle=kk;
						tt.data=allInfo[key][kk];
						temp.subtitles.push(tt);
                    });
					ttemp.push(temp);
                });
				this.card=ttemp;

				//风扇按钮更新
				let ff=this.card.find((ele) => (ele.title.toString()==="风扇"));
				if(ff) {
					this.fanSpeed = Number(ff.subtitles[0].data);
					if (this.fanSpeed === 0) {
						this.sliderOpen = false;
					}
				}
				//重合闸
					let fff = this.card.find((ele) => (ele.title.toString() === "重合闸"));
					if (fff) {
						this.powerSwitch = fff.subtitles[0].data === '合' ? true : false;
					}




			},
            async getLineDate(){
				const timeStatus =await getTemHum({device_id:this.device_id,limit:this.Tlimit, offset:this.Toffset}) ;
				this.temperature=[];
				this.humidity=[];
				for(var i=0;i<timeStatus.length;i++){
					var temp=[];
					var humi=[];

					temp[0]=this.timeStamp(timeStatus[i].create_time);
					temp[1]=parseFloat(timeStatus[i].temperature);
					humi[0]=this.timeStamp(timeStatus[i].create_time);
					humi[1]=parseFloat(timeStatus[i].humidity);
					this.temperature.push(temp);
					this.humidity.push(humi);
				}
            },
			async initData(){
				//拿数据
				this.status=this.$route.query;
				this.device_id=this.$route.query.device_id;
				this.timer=setInterval(this.updateLine, 5000);
				try{
					this.getLineDate();
                    this.getCardData();

				}catch(err){
					console.log('获取数据失败', err);
				}finally {

				}
			},
			timeStamp(time){
				var date = time.toString();
				date = date.substring(0,19);
				date = date.replace(/-/g,'/');
				var timestamp = new Date(date).getTime();
				return timestamp;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.offset = val;
				this.getUsers();
				console.log(val);
			},
			async rebootPower(){
				console.log("233");
				await reStartPower({device_id:this.device_id});
            },
            async handleFanSpeed(val){
				await fanSpeed({device_id:this.device_id,fan_speed:this.fanSpeed});
				console.log(val);
            },
			async handlePowerSwitch(val){
                if(val===true){//关=>开
                	await powerOn({device_id:this.device_id});
                }else{
					await powerOff({device_id:this.device_id});
                }
            },
			async handleFanSwitch(val){
				if(val===true){//关=>开
					await fanOpen({device_id:this.device_id});
				}else{
					await fanClose({device_id:this.device_id});
				}
            },
			async handleFanAuto(val){
				if(val===true){//关=>开,
					await fanAutoOn({device_id:this.device_id});
				}else{
					await fanAutoOff({device_id:this.device_id});
				}
            }


        },
        computed:{
			card2row:function(){
				const uu=this.card;
				const column=4;
				const row=Math.ceil(uu.length/ column);

				const uuu=[];

				let uuuu=[];
				for(let i=0;i<uu.length;i++){//卡片分行
					// if(uu[i].title==='风扇'||uu[i].title==='重合闸'){
					// 	if((i+1)>=uu.length){
					// 		uuu.push(uuuu);
					// 		uuuu=[];
                    //     }
					// 	continue;
                    // }
					uuuu.push(uu[i]);
					if(uuuu.length>=column||(i+1)>=uu.length){
						uuu.push(uuuu);
						uuuu=[];
					}


                }
				// for(let i=0;i<row;i++){//卡片分行
				// 	const uuuu=[];
                //
				// 	for(let j=0;j<column;j++){
				// 		if(uu[column*i+j]===null){break;}
				// 		if(uu[column*i+j].title==='风扇'||uu[column*i+j].title==='重合闸'){continue;}
				// 		console.log(uu[column*i+j].title,233);
				// 		uuuu.push(uu[column*i+j]);
                //
				// 	}
				// 	uuu.push(uuuu);
				// }


				return uuu
			},
			card2row2:function(){
				const uu=this.card;
				const column=4;
				const row=Math.ceil(uu.length/ column);

				const uuu=[];

				let uuuu=[];
				for(let i=0;i<uu.length;i++){//卡片分行
					if(uu[i].title!=='风扇'&&uu[i].title!=='重合闸'){
						if((i+1)>=uu.length){
							uuu.push(uuuu);
							uuuu=[];
						}
						continue;
					}
					uuuu.push(uu[i]);
					if(uuuu.length>=column||(i+1)>=uu.length){
						uuu.push(uuuu);
						uuuu=[];
					}


				}

				return uuu
			},
			andOpen:function(){
				if(this.autoOpen&&this.sliderOpen){
					return true
                }else{
					return false
                }
            }

        },
        mounted() {
                console.log(this.temperature);


			    this.device_id=this.$route.query.device_id;
			    if(this.device_id!==null) {
					this.initData();
				}
			},
        watch:{
			// '$route.query.device_id':function(val){//切换页面
			// 	if(val!==undefined) {
			// 		this.initData();
			// 	}else
            //     {
			// 		clearInterval(this.timer);
			// 		console.log("destroyed");
            //     }
            // },
			$route:function(val,oldval){//切换页面//////////////????????????????????????????未完成
				const currentPath=val.path.replace('/', '');
				const oldPath =oldval.path.replace('/', '');
				if(currentPath !== "singleStatus" && oldPath === "singleStatus") {

					clearInterval(this.timer);
					console.log("singleStatus destroyed");

				}
				if(currentPath === "singleStatus" && oldPath !== "singleStatus")
				{
					this.initData();
					console.log("back to singleStatus");
				}
			},

        },
		beforeDestroy() {
			clearInterval(this.timer);
			console.log("finally destroyed");
		}
		}




</script>

<style scoped>

    .num1{
        margin-left:90px;
        margin-top: -30px;
    }
    .num2{
        margin-left:20px;
        margin-top: -30px;
    }
    .num3{
        margin-left: 15px;
        margin-top: -25px;
    }
    .num4{
        margin-top: -20px;
    }
    .on{
        margin-top: -15px;
    }
    .off .oon{
        margin-left:70px;
    }
    .row-bg {
        padding-top: 10px ;
    }
    .row-bg2 {
        padding-top: 5px ;
    }
    .box-card3-1{
        min-height: 140px;;
    }
    .box-card4{
        min-height: 160px;;
    }
    .title{

        height:70px;
        display: table-cell;
        vertical-align:middle;
        font-size: 20px;
        font-weight: bold;
        color: #1c8de0;
        text-align:center;
        white-space:normal;
        width:110px;
    }
    .subtitle{
        height:70px;
        width:500px ;
        display: table-cell;
        vertical-align:middle;
        font-size: 14px;
        color: #1c8de0;
        text-align:center;
        line-height: 25px

    }
</style>
