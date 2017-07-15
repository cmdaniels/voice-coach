function signout(){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful. Redirect to index.
	  window.location.href = '/'
	}).catch(function(error) {
	  // An error happened.
	  alert(error)
	});
};