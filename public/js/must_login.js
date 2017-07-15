firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
	// No user is signed in.
	window.location.href = 'login'
  }
});