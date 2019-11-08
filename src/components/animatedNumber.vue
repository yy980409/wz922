<template>
    <div id="animated-number-demo">
        <p>{{ animatedNumber }}</p>
    </div>
</template>

<script>
	import TweenLite from "gsap";
	export default {
		name: "animatedNumber",
        props:['number','time'],
		data(){
			return{
				tweenedNumber: 0
			}
		},
		computed: {
			animatedNumber: function() {
				return this.tweenedNumber.toFixed(0);
			}
		},
		watch: {
			number: function(newValue) {
				TweenLite.to(this.$data, this.time, { tweenedNumber: newValue });
			}
	}
	}
</script>

<style scoped>

</style>
