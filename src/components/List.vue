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
					<td scope="row" class="d-none">{{todo.id}}</td>
					<td scope="row">{{todo.title}}</td>
					<td scope="row">{{todo.content}} </td>
					<td scope="row">{{todo.due_date}} </td>
					<td><input type="checkbox" id="checkbox" v-model="todo.checked">
					<td scope="row">
						<button type="button" class="btn btn-success btn-sm" v-on:click="editTodo($event,todo.id)">Edit</button>
					</td>
					<td scope="row">
						<button type="button" class="btn btn-danger btn-sm" v-on:click="deleteTodo($event,todo.id)">Delete</button>
					</td>
					
				</tr>
			</tbody>
		</table>
	</div>

	
	<div>
		<form>
			<button class="btn btn-info btn-sm" v-on:click="addTodo">Create Todo</button><br>
			Title:<br>
			<input v-model="title" required>
			<br><br>
			Content:<br>
			<input v-model="content" required>
			<br><br>
			Due_date:<br>
			<input v-model="due_date" required>
			<br><br>
			Checked:<br>
			<input v-model="checked" required>
			<br><br>
			userId:<br>
			<input v-model="userId" required>
			<br><br>
		</form> 
	</div> 

</div>
</template>








<script>
	import axios from 'axios';
	
	const baseURL = "http://localhost:3000/todos";

	export default {    
		name: 'list',
		data() {
			return {
				todos: [],
				todo: {},
				id:'',
				title:'',
				content:'',
				due_date:'',
				checked:'',
				userId:'',
				columns: [
					{
						field: 'id',
						label: 'ID',
						width: '40',
						numeric: true
					},
					{
						field: 'title',
						label: 'Title',
					},
					{
						field: 'content',
						label: 'Content',
					},
					{
						field: 'due_date',
						label: 'Due Date',
						centered: true
					},
					{
						field: 'checkbox',
						label: 'Checked',
					},
					{
						field: 'userId',
						label: 'UserID',
						numeric: true
					},
					{
						field:'button',
						label:'Delete'
					}
				]

				}
			
		},

		created(){
			this.getTodo();
			console.log('getTodo called.');	
		},

		methods: {
			async getTodo(){
				try{
					const res = await axios.get(baseURL);
					this.todos = res.data;
					console.log(res);
				}catch(e){
					console.error("Todo yok");

				}
			},

			async addTodo() {
				// veritabanina ekle
				try{
					const res = await axios.post(baseURL, { title: this.title, content: this.content
						, due_date: this.due_date, checked: this.checked, userId: this.userId });
					console.log(res);
					if(res.status != 201){
						console.log("Todo oluşturulamadı"); 
						return status; 
					}
					//componente ekle		
					this.todos = [...this.todos, res.data];

					//formu temizle
					this.title = '';
					this.content = '';
					this.due_date = '';
					this.checked = '';
					this.userId = '';
				}catch(e){
					console.error(e);
				}
			},

			async deleteTodo(event, id){ 
				// veritabanindan sil
				try{
					const res = await axios.delete(baseURL+'/'+id ); 
					console.log(res,id)
					// gorsel olarak sil - componentin listesinden
					this.todos = this.todos.filter(function(todo){
						return todo.id != id;

					});
				}catch(error){ 
					//console.log("silme islemi"); 
					console.log(error);
				}				
			},

			async editTodo(event, id){ 
				//veritabanı güncelle
				try{
					const res = await axios.get(baseURL+'/'+id);

					//const res = await axios.put(baseURL+'/'+id); 
					console.log(res.data);
					this.todos = this.todos.filter(function(todo){
						if(todo.id == id){
							todo.title = this.todo.title;
							todo.content = this.todo.content;
							todo.due_date = this.todo.due_date;
							todo.checked = this.todo.checked
						}

					});
				}		
				catch(error){ 
					//console.log("güncelleme islemi"); 
					console.log("error");
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