<template>
    <div>
    <div :id="id" class="" style="width: 100%;height:350px;"></div>
    </div>
</template>






<script>
	import echarts from 'echarts/lib/echarts';
	import 'echarts/lib/chart/line';
	import 'echarts/lib/component/tooltip';
	import 'echarts/lib/component/title';
	export default {
		name: "lineMap",
		props: ['info','id','name','boundaryGap'],
        data(){
		    return {

            }
        },
        methods:{
			async drawLine(dataIn){
				this.myChart =await echarts.init(document.getElementById(this.id));
				this.myChart.setOption({
					title: {
						text: this.name,
						left: 'center',
						textStyle:{
							fontSize:30,
                            color:'#1d90e6'
                        },
					},
					tooltip : {
						trigger: 'axis',
						// formatter: '{b0}: {c0}<br />{b1}: {c1}'
					},
					xAxis : {
						type : 'time',
						splitLine: {
							show: false
						},
					},
					yAxis : {
						type : 'value',
						splitLine: {
							show: true
						},
						min: function(value) {
							return value.min - 2;
						},
						max: function(value) {
							return value.max + 2;
						}
					},
					series : {
						name:this.name,
						type:'line',
						smooth:true,
						color:'#1d90e6',
						areaStyle: {

							normal: {color:'#1d90e6',shadowColor: 'rgba(0, 0, 0, 0.5)',
								shadowBlur: 10},
						},
						data:dataIn,
						// data:[[1522306819000, 2],  [1522307019000, 3], [1522307219000, 4], [1522307419000, 5],[1522307630000, 6], [1522307830000, 7], [1522308030000, 8], [1522308230000, 9]]
						// data:[10, 12, 21, 54, 260, 830, 710]
					}


				});
            }
        },
		mounted() {
			this.drawLine(this.info);
        },
		watch: {
			info: function (){
				this.drawLine(this.info);
			}
		},


	}
</script>

<style scoped>

</style>
