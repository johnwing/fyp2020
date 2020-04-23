// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});



//Set DOM Elements
//const login=document.querySelector('.guides');
const loginhtml = document.querySelectorAll('.loginclass');
const logouthtml = document.querySelectorAll('.logoutclass');
//const accountDetails = document.querySelector('.account-details');
//const adminItems = document.querySelectorAll('.admin');

//setup content in different situation
const setupUI = (user) => {
  //console.log(user.uid);
  	if (user) 
  	{
	    // account info
	 	console.log("good");
	 	// toggle user UI elements
	    loginhtml.forEach(item => item.style.display = 'block');
	    logouthtml.forEach(item => item.style.display = 'none');

	} 
	else 
	{
	    // clear account info
		console.log("bad");
		// toggle user UI elements
	    loginhtml.forEach(item => item.style.display = 'none');
	    logouthtml.forEach(item => item.style.display = 'block');

	}
};


console.log("OK");

