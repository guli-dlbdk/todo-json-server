<template>
<div id="list">
	<div id="navbar" class="navbar-menu">
		<div class="navbar-start">
			<div class="btn-group" role="group" aria-label="Basic example">
				<!-- Button trigger register modal -->
				<button v-show="!user.isActive" type="button" class="btn btn-secondary" data-toggle="modal" data-target="#userModal">Register</button><br>
				<!-- Button trigger login modal -->
				<button v-show="!user.isActive" type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">Login</button><br>
				<h1 v-show="user.isActive" type="text">{{user.name}}</h1><br>
				<button v-show="user.isActive" type="button" class="btn btn-danger" @click="logOut(user.isActive)">Log out</button>
			</div>
		</div>
	</div>
	
	<div v-show="user.isActive">

		<div  class="table-responsive table-sm">
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
					<tr v-for= "(todo, index) in todos" :key="index" :data="todo" v-show="user.id==todo.userId">
						<td scope="row" class="d-none">{{todo.id}}</td>
						<td scope="row">{{todo.title}}</td>
						<td scope="row">{{todo.content}} </td>
						<td scope="row">{{todo.due_date}} </td>
						<td scope="row">
							<input type=checkbox  v-model="todo.checked">
						</td>
						<td scope="row">
							<!-- Button trigger edit modal -->
							<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#editModal"  @click="editForm($event,todo.id)">Edit</button>
						</td>
						<td scope="row">
							<button type="button" class="btn btn-danger btn-sm" @click="deleteTodo($event,todo.id)">Delete</button>
						</td>
					</tr>
				</tbody>
			</table>
			<!-- Button trigger Create(add) modal -->
			<button type="button" class="btn btn-success" data-toggle="modal" data-target="#addModal">Create Todo</button><br>
		
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
							Title<br>
							<input v-model="title" required>
							<br><br>
							Content<br>
							<input v-model="content" >
							<br><br>
							Due_date<br>
							<input type="date" v-model="due_date" >
							<br><br>
							Checked<br>
							<input v-model="checked" >
							<br><br>
						</form> 
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" aria-hidden="true" data-dismiss="modal" @click="editTodo(id)">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>



	<!-- Modal Create Todo -->
	<div id="addTodo">
		
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
							<input type="date" v-model="due_date" >
							<br><br>
							Checked:<br>
							<input v-model="checked" >
							<br><br>
			
						</form> 
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" aria-hidden="true" data-dismiss="modal" @click="addTodo(user.id)">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Login  -->
	<div id="loginUser">
		<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
			

			<div v-if="!user.isActive" class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h3 class="modal-title" id="loginModalLabel">Sign in</h3>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<form class="login" @submit.stop.prevent="login">
								<br>
								<input required v-model="email" type="email" placeholder="Email"/>
								<br><br>
								<input required v-model="password" type="password" placeholder="Password"/>
								<hr/>
								
							</form>
						</div>
						<div class="modal-footer">
							<button type="submit" data-dismiss="modal" @click="login(email,password)">Login</button>
						</div>
					</div>
			
			</div>
		
		
		</div>
	</div>

	<!-- Modal Register -->
	<div id="addUser">
		<!-- Modal -->
		<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="userModalLabel">Create User</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="register">
							<label for="name">Name</label>
							<div>
								<input id="name" type="text" v-model="name" required autofocus>
							</div>
							<label for="email" >Email</label>
							<div>
								<input id="email" type="email" v-model="email" required>
							</div>
							<label for="password">Password</label>
							<div>
								<input id="password" type="password" v-model="password" required>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<div>
							<button type="submit" data-dismiss="modal"  @click="addUser">Register</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



</div>
</template>



<script>
	import axios from 'axios';
	
	const baseTodoURL = 'http://localhost:3000/todos';
	const baseUserURL = 'http://localhost:3000/users';

	export default {    
		name: 'list',
		data() {
			return {
				todos: [],
				id: '',
				title: '',
				content: '',
				due_date: '',
				checked: false,
				userId: '',
				users: [],
				user: {},
				name: '',
				email: '',
				password: '',
				isActive: false,
				show: false,
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
						type: String
					},
					{
						field: 'content',
						label: 'Content',
						type: String
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
					const res = await axios.get(baseTodoURL);
					this.todos = res.data;
					//console.log(res);
				}catch(e){
					console.error('Todo yok');

				}
			},

			async addTodo(userId) {
				// veritabanina ekle
				try{
					const res = await axios.post(baseTodoURL, { title: this.title, content: this.content
						, due_date: this.due_date, checked: this.checked, userId: userId });
					console.log(res);
					if(res.status != 201){
						console.log('Todo oluşturulamadı'); 
						return status; 
					}
					//componente ekle		
					this.todos = [...this.todos, res.data];

					//formu temizle
					this.title = '';
					this.content = '';
					this.due_date = '';
					this.checked = '';
					//this.userId = '';
				}catch(e){
					console.error(e);
				}
			},

			async deleteTodo(event, id){ 
				// veritabanindan sil
				try{
					const res = await axios.delete(baseTodoURL+'/'+id ); 
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
					const res = await axios.get(baseTodoURL+'/'+id);
					if(res.status == 200){
						console.log('Response:: ', res.statusText); 
					}
					//response verilerini forma yazdır
					this.id = res.data.id;
					this.title = res.data.title;
					this.content = res.data.content;
					this.due_date = res.data.due_date;
					this.checked = res.data.checked;
					this.userId = res.data.userId;
					console.log('Edit Form Todo-- ', res.data); 
				}		
				catch(error){ 
					console.log('error');
				}
			},
			async editTodo(id){
				try{//formda olan verileri put metoduna yolla
					const res = await axios.put(baseTodoURL+'/'+id, { id: this.id, title: this.title, content: this.content, 
						due_date: this.due_date, checked: this.checked, userId: this.userId } )
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
			},

			async addUser(){
				try{
					const res = await axios.post(baseUserURL, { name: this.name, email: this.email, password: this.password, isActive: false });
					if(res.data.email != 201){
						return res.statusText; 
					}
					//componente ekle		
					this.users = [...this.users, res.data];

					//formu temizle
					this.name = '';
					this.email = '';
					this.password = '';
				}catch(e){
					console.error(e);
				}
			},

			async login(email,password){
				try{
					const res = await axios.get(baseUserURL+'?email='+email); 
					if(res.data.length != 0){
						this.user = res.data[0];
						if(this.user.password == password){
							this.user.isActive = true;
							this.email = '';
							this.password = '';
							await axios.patch(baseUserURL+'/'+this.user.id, { isActive: this.user.isActive });
							console.log('Login:', this.user.isActive);
						}
					}
				}catch(e){
					console.error('Hata:', e);
				}
			},

			async logOut(isActive){
				try{
					const res = await axios.get(baseUserURL+'?isActive='+isActive)
					console.log('is active kim?',res.data);
					this.users = res.data;
					this.user.isActive = false;
					await axios.patch(baseUserURL+'/'+this.user.id, {isActive: this.user.isActive});
					console.log('logOut',this.user.isActive);
					//formu temizle
					this.email = '';
					this.password = '';
				}catch(e){
					console.log('Hata--', e);
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
  color: #714DD2
}
h2 {
  color: #343A40
}

.bounce-enter-active {
	animation: bounce-in .5s;
}
.bounce-leave-active {
	animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.5);
	}
	100% {
		transform: scale(1);
	}
}
</style>
