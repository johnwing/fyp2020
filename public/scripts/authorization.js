//value init
var navBarHtml=`<!--Login Navbar-->
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <a class="navbar-brand" href="#">
    <img src="bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
    Bootstrap
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>  
      <button class="btn btn-outline-success my-2 my-sm-0" id="loginButton" type="button" style="display:none">Login</button>
      <button class="btn btn-outline-success my-2 my-sm-0" id="logoutButton" type="button" style="display:none">Logout</button>
    </form>
  </div>
</nav>`;
//setup the topbar of the webpage
const setUpNavBar=()=>
{
//login - new version
  $("#loginButton").on("click", function()
  {
    /*
    console.log("googleLogin");
    //sign in by redirecting to the sign-in page
    auth.signInWithRedirect(provider);
    auth.getRedirectResult().then(function(result) {
      //console.log
      
    if (result.credential) 
    {

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
      //console.log(token);
      // The signed-in user info.
      var user = result.user;
      //console.log("TOKEN"+token);
      
    }
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
    */
    window.location.replace("/testFirebaseUI.html");
  })

// logout
  $("#logoutButton").on("click",function(){
    auth.signOut();
    alert("Logout");
    console.log("Logout");
  });
}



//REAL START

let appendixList=document.createElement("div");
appendixList.innerHTML=navBarHtml;
  $("body").prepend(appendixList);
  $("body").css("padding-top", "65px");
setUpNavBar();


// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    $("#logoutButton").show();
    $("#loginButton").hide();
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      checkUserRegister(user);
    });
    /*
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => console.log(err.message));
    */
  } else {
    $("#logoutButton").hide();
    $("#loginButton").show();
    //setupUI();
    //setupGuides([]);
    
    if(window.location.pathname != "/login.html" && window.location.pathname != "/testFirebaseUI.html")
    {
      alert("Login is Required!");
      window.location.replace("/login.html");
    }
 

    //
  }
})


const checkUserRegister=(user)=>{

  console.log(user.providerData);
  //alert(user.uid);

}



