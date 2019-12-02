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
					<td>
						<input type="checkbox" class="checkbox" v-model="todo.checked">
					</td>
					<td scope="row">
						<!-- Button trigger Edit modal -->
						<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#editModal"  v-on:click="editForm($event,todo.id)">Edit</button>
					</td>
					<td scope="row">
						<button type="button" class="btn btn-danger btn-sm" v-on:click="deleteTodo($event,todo.id)">Delete</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>


	<!-- Modal Create Todo -->
	<div id="addTodo">
		<!-- Button trigger Create(add) modal -->
		<button type="button" class="btn btn-success" data-toggle="modal" data-target="#addModal">Create Todo</button><br>
		<!-- Modal -->
		<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="addModalLabel">Create Todo</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form>
							Title:<br>
							<input v-model="title" required>
							<br><br>
							Content:<br>
							<input v-model="content" >
							<br><br>
							Due_date:<br>
							<input v-model="due_date" >
							<br><br>
							Checked:<br>
							<input v-model="checked" >
							<br><br>
							userId:<br>
							<input v-model="userId" >
							<br><br>
						</form> 
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
						<button type="button" class="btn btn-primary" aria-hidden="true" v-on:click="addTodo(id)">Kaydet</button>
					</div>
					</div>
				</div>
			</div>
		</div>


	
	

	<!-- Modal Edit Todo -->
	<div id="editTodo">
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="editModalLabel">Edit Todo</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form>
							Id:<br>
							<input v-model="id" required>
							<br><br>
							Title:<br>
							<input v-model="title" required>
							<br><br>
							Content:<br>
							<input v-model="content" >
							<br><br>
							Due_date:<br>
							<input v-model="due_date" >
							<br><br>
							Checked:<br>
							<input v-model="checked" >
							<br><br>
							userId:<br>
							<input v-model="userId" >
							<br><br>
						</form> 
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
						<button type="button" class="btn btn-primary" aria-hidden="true" v-on:click="editTodo(id)">Kaydet</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	

</div>
	
	

		<!-- <form>
			<button type="button" class="btn btn-dark" v-on:click="editTodo(id)">Edit Todo</button>
			<button type="button" class="btn btn-success" v-on:click="addTodo()">Create Todo</button><br>
			Id:<br>
			<input v-model="id" required>
			<br><br>
			Title:<br>
			<input v-model="title" required>
			<br><br>
			Content:<br>
			<input v-model="content" >
			<br><br>
			Due_date:<br>
			<input v-model="due_date" >
			<br><br>
			Checked:<br>
			<input v-model="checked" >
			<br><br>
			userId:<br>
			<input v-model="userId" >
			<br><br>
		</form>  -->



</template>



<script>
	import axios from 'axios';
	
	const baseURL = "http://localhost:3000/todos";

	export default {    
		name: 'list',
		data() {
			return {
				isCardModalActive: false,
				todos: [],
				todo: { },
				id:'',
				title:'',
				content:'',
				due_date:'',
				checked:'',
				userId:'',
				username: '',
				email: '',
				password: '',
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
					console.log(res,id);
					// gorsel olarak sil - componentin listesinden
					this.todos = this.todos.filter(function(todo){
						return todo.id != id;

					});
				}catch(error){ 
					console.log(error);
				}				
			},

			async editForm(event, id){ 
				try{//todo getir
					const res = await axios.get(baseURL+'/'+id);
					if(res.status == 200){
						console.log("Response:: ", res.statusText); 
					}
					//response verilerini forma yazdır
					this.id = res.data.id;
					this.title = res.data.title;
					this.content = res.data.content;
					this.due_date = res.data.due_date;
					this.checked = res.data.checked;
					this.userId = res.data.userId;
					console.log("Edit Form Todo-- ", res.data); 
				}		
				catch(error){ 
					console.log("error");
				}
			},
			async editTodo(id){
				try{//formda olan verileri put metoduna yolla
					const res = await axios.put(baseURL+'/'+id, {id: this.id, title: this.title, content: this.content, 
						due_date: this.due_date, checked: this.checked, userId: this.userId} )
					if(res.status == 200){
						console.log(res.statusText);

						//put yapılan verileri json dosyasından getTodo() ile ekrana yaz	 
						this.getTodo();

						//edit yapıldıktan sonra formu temizle
						this.id = '';
						this.title = '';
						this.content = '';
						this.due_date = '';
						this.checked = '';
						this.userId = '';
					}
				}catch(error){
					console.log('Hata oluştu.', error)
				}	
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