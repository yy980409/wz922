<template>
    <div id="app" class="fillcontain">
<!--        <HelloWorld></HelloWorld>-->
		    <router-view></router-view>
    </div>
</template>

<script>
	import HelloWorld from './components/HelloWorld';
    export default {
		components: {
			HelloWorld
		},
    }
</script>

<style lang="less">
	@import './style/common';
</style>
