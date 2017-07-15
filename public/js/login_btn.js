function login(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		// User is signed in.
		window.location.href = 'dashboard'
	  } else {
		// No user is signed in.
		window.location.href = 'login'
	  }
	});
}