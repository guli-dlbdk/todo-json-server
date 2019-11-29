<template>
	<div id="app">
		<h1>TODO-VueCLI</h1>
		<list />
	</div>
</template>

<script>
import list from './components/List.vue'


export default {
	name: 'app',
	components:{
		list
		
	}
}
</script>

<style scoped>
#app {
	color: #6c5ce7;
	margin-top: 60px;
}


h1 {
	color: #3EAF7C
}
</style>

