<template>
<div id="list">
	<div class="table-responsive table-sm">
		<table class="table">
			<thead class="thead-dark">
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Content</th>
					<th scope="col">Due Date</th>
					<th scope="col">Checked</th>
					<th scope="col"></th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>

				<tr v-for= "(todo, index) in todos" :key="index" :data="todo">
					<td scope="row">{{todo.title}}</td>
					<td scope="row">{{todo.content}} </td>
					<td scope="row">{{todo.due_date}} </td>
					<td><input type="checkbox" id="checkbox" v-model="todo.checked">
					<td scope="row"><button type="button" class="btn btn-success btn-sm">Edit</button></td>
					<td scope="row"><button type="button" class="btn btn-danger btn-sm" v-on:click="deleteTodo">Delete</button></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div>
		<button v-on:click="addTodo">Create Todo</button>
		<form>
			Title:<br>
			<input v-model="title" name="firstname" value="Mickey">
			<br><br>
			Content:<br>
			<input v-model="content" name="lastname" value="Mouse">
			<br><br>
			Due_date:<br>
			<input v-model="due_date" name="lastname" value="Mouse">
			<br><br>
			Checked:<br>
			<input v-model="checked" name="lastname" value="Mouse">
			<br><br>
			userId:<br>
			<input v-model="userId" name="lastname" value="Mouse">
			<br><br>
		</form> 
	</div>	
</div>


	
</template>

<script>
	import axios from 'axios'
	const baseURL = "http://localhost:3000/todos"

	export default {
	name: 'list',
	data() {
		return {
		todos: [],
		title:'',
		content:'',
		due_date:'',
		checked:'',
		userId:''
		}
	},
	async created() {
		try {
		const res = await axios.get(baseURL)
		this.todos = res.data;
		} catch(e) {
		console.error(e)
		}
	},

	methods: {
	async addTodo() {
	const res = await axios.post(baseURL, { title: this.title, content: this.content, 
	due_date: this.due_date, checked: this.checked, userId: this.userId })

	this.todos = [...this.todos, res.data]
	

	this.title = ''
	this.content = ''
	this.due_date = ''
	this.checked = ''
	this.userId = ''

		},

	async deleteTodo(){
	const res = await axios.post(baseURL, { title: '', content: '', due_date: '', checked: '', userId: ''})
	this.todos = [res.data]

	}
	}
}
</script>





<style scoped>
#list {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #6c5ce7;
  margin-top: 60px;
}

li {
  list-style: none;
}

h3 {
  color: #343A40
}
</style>

