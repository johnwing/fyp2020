const uploadDoc = document.querySelector('#addAttachmentList');
var exerciseID=1;
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
    setupGuides([]);
  }
});



var userUid;

const setupUI=(user) => {

	console.log(user.uid);
	userUid=user.uid;
  console.log(uuidv4());

}
const setupGuides = (data) => {
    uploadDoc.innerHTML="";
  //var uploadDoc=$('#addAttachmentList');
  if (data.length) {


    let appendixList=document.createElement("ul");
    appendixList.setAttribute("class","list-group");


    //let html = '<ul class="list-group">';
    data.forEach(doc => {
      const guide = doc.data();
      let li=document.createElement("li");
      li.setAttribute("class","list-group-item");
      let documentLink=document.createElement("a");
      documentLink.setAttribute("href",guide.link);
      documentLink.innerHTML=guide.name;
      let deleteButton=document.createElement("button");
      deleteButton.setAttribute("class","btn btn-info justify-content-end");
      deleteButton.setAttribute("type","button");
      deleteButton.innerHTML="Delete";

      li.appendChild(documentLink);
      li.appendChild(deleteButton);
      appendixList.appendChild(li);
      //let myArray = Object.values(doc);
      //deleteFile
      deleteButton.addEventListener("click",(e)=>
      {
        let id= doc.id;
        let deleteFile=storageRef.child(guide.salt+guide.name);
        deleteFile.delete().then(function() {
            // File deleted successfully
            console.log("OK");
          }).catch(function(error) {
            console.log(" Uh-oh, an error occurred!");
          });
        db.collection('fileLink').doc(id).delete();

        li.remove();
      });

/*
      const li = `
        <li>
          <!--div class="collapsible-header grey lighten-4"> ${guide.link} </div-->
          <div class="list-group-item"> 
            <p><a href=${guide.link}>${guide.name} </a> </p>
            <button class="btn btn-info" type='button'> Delete </button>
          </div>
        </li>
      `;
      html += li;
      */
    });
    //html += '</ul>';
    //uploadDoc.innerHTML = html;
    uploadDoc.appendChild(appendixList);


  } else {
    uploadDoc.innerHTML = `<ul class="list-group">Nothing is added.</ul>`;
  }
  //alert(uploadDoc.innerHTML);
};


//generate random key
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


//--fileUpload
var selectedFile;
var storageRef = firebase.storage().ref();
$("#file-uploader").on("change",function(event)
{
  selectedFile=event.target.files[0];
  //alert(userUid);
})
$("#uploadFile").on("click",function()
{
  var filename=selectedFile.name;
  //Create a folder to prevent the same name upload
  var salt=uuidv4();
  storageRef = firebase.storage().ref(salt+filename);
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
        link: downloadURL,
        salt: salt
      });
    })  

  });
  

});

