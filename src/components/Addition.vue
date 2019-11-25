
<template>
	<div class="addition">
		<h3>Addition</h3>
		<label>a</label>
		<input type="text" v-model="a"/><br>
		<label>b</label>
		<input type="text" v-model="b"/><br>
		<label>a + b = </label>
		<span>{{summation}}</span>    

	</div>
</template>

<script>
	export default {
		name: 'addition',
			data() {
				return {
						a: 0,
						b: 0
				}
		},
		computed: {
				summation() {
						return parseInt(this.a) + parseInt(this.b);
				}
		}
}
 
</script>


<style scoped>
 
div {
		background-color: lightblue;
		height: 150px;
		padding-top: 10px;
}
 
</style>



