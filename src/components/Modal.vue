<template>
<div id="list">

	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class="modal-container">

				<div class="modal-header">
				<slot name="header">
					default header
				</slot>
				</div>

				<div class="modal-body">
				<slot name="body">
					default body
				</slot>
				</div>

				<div class="modal-footer">
				<slot name="footer">
					default footer
					<button class="modal-default-button" @click="$emit('close')">
						OK
					</button>
				</slot>
				</div>
			</div>
			</div>
		</div>
	</transition>
	<!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->

	
		
	<h3 slot="header">custom header</h3>

	<!-- Modal Login  -->
	<div id="loginUser">
		<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title" id="loginModalLabel">Sign in</h3>
						<button typ<template>
<div id="list">

	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
			<div class="modal-container">

				<div class="modal-header">
				<slot name="header">
					default header
				</slot>
				</div>

				<div class="modal-body">
				<slot name="body">
					default body
				</slot>
				</div>

				<div class="modal-footer">
				<slot name="footer">
					default footer
					<button class="modal-default-button" @click="$emit('close')">
						OK
					</button>
				</slot>
				</div>
			</div>
			</div>
		</div>
	</transition>
	<!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->

	
		
	<h3 slot="header">custom header</h3>

	<!-- Modal Login  -->
	<div id="loginUser">
		<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
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
						<button type="submit" v-on:click="login(email,password)">Login</button>
						<modal v-if="showModal" @close="showModal = false" />
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
</template>



<script>
	import axios from 'axios';

	const baseUserURL = 'http://localhost:3000/users';

	export default {    
		name: 'modal',
		data() {
			return {
				id: '',
				email: '',
				password: '',
				users: [],
				user: {},
				isActive: false,
				showModal: false
			}
	
		},
		methods: {
			async logOut(isActive){
				try{
					const res = await axios.get(baseUserURL+'?isActive='+isActive)
					console.log('is active kim?',res.data);
					this.users = res.data;
					this.user.isActive = false;
					await axios.patch(baseUserURL+'/'+this.user.id, {isActive: this.user.isActive});
					console.log('logOut',this.user.isActive);
			}catch(e){
				console.log('Hata--', e);
			}



			}

	}
}

</script>

en="true">&times;</span>
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
						<button type="submit" v-on:click="login(email,password)">Login</button>
						<modal v-if="showModal" @close="showModal = false" />
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
</template>



<script>
	import axios from 'axios';

	const baseUserURL = 'http://localhost:3000/users';

	export default {    
		name: 'modal',
		data() {
			return {
				id: '',
				email: '',
				password: '',
				users: [],
				user: {},
				isActive: false,
				showModal: false
			}
	
		},
		methods: {
			async logOut(isActive){
				try{
					const res = await axios.get(baseUserURL+'?isActive='+isActive)
					console.log('is active kim?',res.data);
					this.users = res.data;
					this.user.isActive = false;
					await axios.patch(baseUserURL+'/'+this.user.id, {isActive: this.user.isActive});
					console.log('logOut',this.user.isActive);
			}catch(e){
				console.log('Hata--', e);
			}



			}

	}
}

</script>

