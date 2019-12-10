<template>
	<div id="app">
	<h1>TODO Vue-CLI</h1>
		<list />
	</div>
</template>

<script>
	import list from './components/List.vue'
	
	export default{
		name:'app',
		components:{
			list
		}
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
