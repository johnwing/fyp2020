const guideList = document.querySelector('#upload-assignment');
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection('fileLink').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => console.log(err.message));
  } else {
    setupUI();
    //setupGuides([]);
  }
});

var userUid;

const setupUI=(user) => {

	console.log(user.uid);
	userUid=user.uid;
}

const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <!--div class="collapsible-header grey lighten-4"> ${guide.link} </div-->
          <div class="collapsible-body white"> <a href=${guide.link}>${guide.name} </a></div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
  
};
var storageRef = firebase.storage().ref();




var selectedFile;

$("#file-uploader").on("change",function(event)
{
	selectedFile=event.target.files[0];
	alert(userUid);
}
)


$("#uploadFile").on("click",function()
{
	//alert($("#file-uploader").val());
	var filename=selectedFile.name;
	storageRef = firebase.storage().ref(filename);
	console.log("Name"+filename);
	var uploadTask=storageRef.put(selectedFile);
	


// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    db.collection('fileLink').doc().set({
      name: filename,
      user: userUid,
      link: downloadURL
    });
  })	

});


} 


	);
