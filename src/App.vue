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
<<<<<<< HEAD
		list
		
=======
		list,
		todo

>>>>>>> 63c7d23b33fbdfaa1e417fd23a8807660ea3c3ef
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

