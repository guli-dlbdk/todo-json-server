<template>
	<div id="list">
		<section>
			<b-table :data="todos" :columns="columns">
				<template slot-scope="props">
					<b-table-column field="id" label="ID" customKey="id" width="40" numeric>
						{{ props.row.id }}
					</b-table-column>

					<b-table-column field="title" label="Title">
						{{ props.row.title }}
					</b-table-column>

					<b-table-column field="content" label="Content">
						{{ props.row.content }}
					</b-table-column>

					<b-table-column field="due_date" label="Date">
						{{ props.row.due_date }}
					</b-table-column>

					<b-table-column field="checked" label="Checked">
						<input type="checkbox" id="checkbox" v-model="todos.checked">
					</b-table-column>

					<b-table-column field="button" label="Delete">
						<button class="btn btn-danger" @click="deleteTodo(id)">Delete</button>
					</b-table-column>

				</template>
			</b-table>
		</section>
	</div>
</template>


<!-- <template>
	<div id="list">
		<section>

			<b-tabs>
				<b-tab-item label="Table">
					<b-table
						:data="data"
						:columns="columns"
						:checked-rows.sync="checkedRows"
						:is-row-checkable="(row) => row.id"
						checkable
						>
					</b-table>
				</b-tab-item>

				
			</b-tabs>
		</section>
		
	</div>
	
</template> -->






<script>
	import axios from 'axios';
	
	const baseURL = "http://localhost:3000/todos";

	export default {    
		name: 'list',
		data() {
			return {
				todos: [],
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
		async created() {
			try {
				const res = await axios.get(baseURL);
				this.todos = res.data;
			} catch(e) {
				console.error(e)
			}
		},
		methods: {
			async deleteTodo(event, id){ //event is not a must
				try{//wait todo id
					await axios.delete(baseURL+'/'+id ); 
					//catch different todoid and add new todolist
					this.todos = this.todos.filter(function(todo){
						return todo.id != id; 
					});
				}catch(error){ 
					console.log(error);
				}
				
			},
			async addTodo() {
				const res = await axios.post(baseURL, { title: this.title, content: this.content
					, due_date: this.due_date, checked: this.checked, userId: this.userId });
				//wait res data and if data is available >>return ok - else >> return error
				if(res.status != 200){
					console.log("error"); 
					return; 
				}
				//data show in component
				this.todos = [...this.todos, res.data];
				//clean form
				this.title = '';
				this.content = '';
				this.due_date = '';
				this.checked = '';
				this.userId = '';
			},

			async editTodo(id){ //event is not a must
				try{//wait todo id
					await axios.put(baseURL+'/'+id ); 
					//catch different todoid and add new todolist
					this.todos = this.todos.filter(function(todo){
						return todo.id != id; 
					});
				}catch(error){ 
					console.log(error);
				}
				
			},
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