<template>
	<div id="todo">
		<section>
			<button class="button is-primary is-medium"
				@click="isComponentModalActive = true">
				Launch component modal
			</button>

			<b-modal :active.sync="isComponentModalActive"
					has-modal-card
					trap-focus
					aria-role="dialog"
					aria-modal>
				<modal-form v-bind="formProps"></modal-form>
			</b-modal>
		</section>
	</div>	
</template>



<script>
	import axios from 'axios';
	const baseURL = "http://localhost:3000/todos"
	const ModalForm = {
		props: ['email', 'password'],
		template: `
			<form action="">
				<div class="modal-card" style="width: auto">
					<header class="modal-card-head">
						<p class="modal-card-title">Login</p>
					</header>
					<section class="modal-card-body">
						<b-field label="Email">
							<b-input
								type="email"
								:value="email"
								placeholder="Your email"
								required>
							</b-input>
						</b-field>

						<b-field label="Password">
							<b-input
								type="password"
								:value="password"
								password-reveal
								placeholder="Your password"
								required>
							</b-input>
						</b-field>

						<b-checkbox>Remember me</b-checkbox>
					</section>
					<footer class="modal-card-foot">
						<button class="button" type="button" @click="$parent.close()">Close</button>
						<button class="button is-primary">Login</button>
					</footer>
				</div>
			</form>
		`
	}
	export default {
		name: 'todo',
		components: {
			ModalForm
		},
		data() {
			return {
				isComponentModalActive: false,
				formProps: {
					id:'',
					title:'',
					content:'',
					due_date:'',
					checked:'',
					userId:'',
					email: 'evan@you.com',
					password: 'testing'
				},
				todos: []
				
			}
		},
		methods: {
			async addTodo() {
			
				const res = await axios.post(baseURL, { title: this.title, content: this.content
					, due_date: this.due_date, checked: this.checked, userId: this.userId });
				if(res.status != 200){
					console.log("error"); 
					return; 
				}
				this.todos = [...this.todos, res.data];
				
				this.title = '';
				this.content = '';
				this.due_date = '';
				this.checked = '';
				this.userId = '';
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


<!-- 
<template>
	<div id="list">
		<b-table :data="todos" :columns="columns">
			<template>
				<b-table-column custom-key="actions">
					<button class="button is-danger is-light">Delete
						<b-icon icon="delete" size="is-small"></b-icon>
					</button>
					<template slot="delete" slot-scope="data">
						<div class="form-group">
							<b-form-input type="text" class="form-control w-100" size="sm" v-model.lazy="data.item.name">
							</b-form-input>
						</div>
					</template>

				</b-table-column>

				
			</template>
			
		</b-table>

		
		
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
					<td scope="row"><button type="button" class="btn btn-success btn-sm" v-on:click="editTodo($event,todo.id)">Edit</button></td>
					<td scope="row">
						<button type="button" class="btn btn-danger btn-sm" v-on:click="deleteTodo($event,todo.id)">Delete</button>
					</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div>
			<form>
				<button type="button" class="btn btn-danger btn-sm" v-on:click="addTodo()">Add Todo</button>
				Title:<br>
				<input v-model="title" type="title"  required>
				<br><br>
				Content:<br>
				<input v-model="content" name="lastname"  required>
				<br><br>
				Due_date:<br>
				<input v-model="due_date" name="lastname"  required>
				<br><br>
				Checked:<br>
				<input v-model="checked" name="lastname"  required>
				<br><br>
				userId:<br>
				<input v-model="userId" name="lastname"  required>
				<br><br>
			</form> 
		</div>  
	</div>

	
</template>
 -->