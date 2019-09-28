<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 200px">

            <el-col :span="12" :offset="7">
            <p class="a" >To be continued</p>
            </el-col>

        </el-row>

    </div>
</template>

<script>
	import headTop from '../components/headTop';
	export default {
		name: "deviceControl",
		components: {
			headTop,
		},
		data(){
			return{
				styleObject: {
					color: '#ff9357',
					fontSize: '123px',
				},
                aa:0,

			}
        },
        methods:{
			scroll:function () {
                let color = this.styleObject.color;
                let temp =Number(parseInt(color.substr(1),16).toString(10));
                temp+=61440;
                if(temp>=16777215)temp=0;
				temp=parseInt(temp,10).toString(16);
				let tt='#'+temp;
				this.styleObject.color=tt;
				console.log(tt)

			}
        },
        mounted(){
			// setInterval(this.scroll,50)

		}
	}
</script>

<style scoped>
    .a{
        background-image: linear-gradient(to right,#ff5722, #ff9357);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 150px;
    }
</style>
