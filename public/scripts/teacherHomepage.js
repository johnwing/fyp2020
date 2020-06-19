jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});


auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection('fileLink').onSnapshot(snapshot => {
      //setupGuides(snapshot.docs);
    }, err => console.log(err.message));
  } else {
    //setupUI();
    //setupGuides([]);
    $("body").html("Login is required.");
  }
});

var userUid;

const setupUI=(user) => {

	console.log(user.uid);
	userUid=user.uid;
  console.log(uuidv4());
  assignmentID='90c1d8d2-c638-4674-8c15-de7c61d87cfd';

}








