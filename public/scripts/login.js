jQuery.validator.setDefaults({
	debug: true,
	success: "valid"
});






// website setup
auth.onAuthStateChanged(user => {
	setUpNavBar();
	if (user) 
	{
		
		user.getIdTokenResult().then(idTokenResult => {
			user.admin = idTokenResult.claims.admin;
			setupUI(user);
			});
	} else 
	{

	}
});

var userUid;

const setupUI=(user) => {

	console.log(user.uid);
	userUid=user.uid;


}

/*
$("#loginButton").on("click",function()
{
	if(userUid)
	{
		alert(userUid);
	}
})
*/

