<template>
	<div id="app">
		<h1>TODO-VueCLI</h1>
		<list />
		<todo />
	</div>
</template>

<script>
import list from './components/List.vue'
import todo from './components/CreateButton.vue'


export default {
	name: 'app',
	components:{
		list,
		todo

	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #6c5ce7;
	margin-top: 60px;
}

li {
	list-style: none;
}

h1 {
	color: #3EAF7C
}
</style>

