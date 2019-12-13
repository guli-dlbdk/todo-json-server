import Vue from 'vue'
import App from './App.vue'





Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

// async login(email,password){
// 	try{
// 		const res = await axios.get(baseUserURL+'?email='+email); 
// 		if(res.statusText == 'OK'){
// 			this.user = res.data[0];
// 			console.log('password:', password);
// 			console.log('User:', this.user.isActive);
// 			console.log('res data[0] password:', this.user.password);

// 			if(this.user.password == password){
// 				try{
// 					this.isActive = true;
// 					await axios.patch(baseUserURL+'/'+this.user.id, { isActive: this.isActive });
// 					console.log('User isActive:', this.user.isActive);
// 					this.email = '';
// 					this.password = '';
// 				}
// 				catch(e){
// 					console.log('password yanlış',e)
// 				}
				
// 			}
// 		}	
// 	}catch(e){
// 		console.error(e);

// 	}
// 	this.email = '';
// 	this.password = '';
	
// }




// async login(email,password){
// 	try{
// 		const res = await axios.get(baseUserURL+'?email='+ email); 
// 		if(res.statusText == 'OK'){
// 			console.log('res',res);
// 			this.user = res.data[0];
// 			console.log('res', this.user.name);

// 			if(this.user.password === password){
// 				await axios.patch('http://localhost:3000/users'+'/'+this.user.id,{ isActive:true });	
// 				console.error('User password', this.user.password); 
// 			}		
// 		}
// 	}catch(e){
// 		console.log('email veya şifre yanlış', e);
// 		// this.email = '';
// 		// this.password = '';
// 	}
	
// }
// var user = users.filter(function (user) {
// 		return (user.email == email && user.password == password);
// 	});
// 	if(user == null){
// 		console.log('user yok', user);
//}


