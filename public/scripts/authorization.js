//Set DOM Elements
//const login=document.querySelector('.guides');
//const loginhtml = document.querySelectorAll('.loginclass');
//øconst logouthtml = document.querySelectorAll('.logoutclass');
//const accountDetails = document.querySelector('.account-details');
//const adminItems = document.querySelectorAll('.admin');



// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    /*
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => console.log(err.message));
    */
  } else {
    setupUI();
    //setupGuides([]);
  }
})


//status
//var loginstatus

//google signup
const googleSignupForm = document.querySelector('#google-signup-form');
googleSignupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("googleLogin");

  //sign in by redirecting to the sign-in page
  auth.signInWithRedirect(provider);
  auth.getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
    console.log(token);
  }
  // The signed-in user info.
  var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...

    console.log(errorMessage);
  });


});


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

