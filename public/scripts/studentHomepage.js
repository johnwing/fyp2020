jQuery.validator.setDefaults({
	debug: true,
	success: "valid"
});
/*
var user = firebase.auth().currentUser;
var credential;

// Prompt the user to re-provide their sign-in credentials

user.reauthenticateWithCredential(credential).then(function() {
  // User re-authenticated.
}).catch(function(error) {
  // An error happened.
});
*/

// website setup
auth.onAuthStateChanged(user => {
	if (user) {
		user.getIdTokenResult().then(idTokenResult => {
		user.admin = idTokenResult.claims.admin;
		setupUI(user);
		});
		db.collection('assignmentForm').onSnapshot(snapshot => {
			setupAssignmentList(snapshot.docs);
		}, err => console.log(err.message));
			} else {
			//setupUI();
			//setupGuides([]);
			$("body").html("Login is required.");
		}
	});

var userUid;
var adminEmail;
const setupUI=(user) => {
	console.log(user.uid);
	userUid=user.uid;
	adminEmail=user.email;

}
/*
const deleteAdminRole = functions.httpsCallable('deleteAdminRole');
  deleteAdminRole({ email: 'a@b.com', id: 'DttUEgwAM9QOLn0lmezfO8Rpjj33'
 }).then(result => {
    console.log(result);
  });
*/

const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: 'a@b.com', id: 'DttUEgwAM9QOLn0lmezfO8Rpjj33'
 }).then(result => {
    console.log(result);
  });


//firebase.auth().currentUser.getIdToken(1);


//setup the assignment List
const setupAssignmentList=(data) =>
{	
	let editTable=$("#assignmentList");
	editTable.html("");
	if(data.length)
	{
		let i=0;
		data.forEach(doc => {
			let guide=doc.data();
			i=i+1;
			let tr=document.createElement("tr");
			let th=document.createElement("th");
			th.class="row";
			th.innerHTML=i;
			let td1=document.createElement("td");
			td1.innerHTML=guide.assignmentTopic;
			let td2=document.createElement("td");
			td2.innerHTML=guide.assignmentDescription;
			let td3=document.createElement("td");

			let startAssignmentButton=document.createElement("button");
			startAssignmentButton.setAttribute("class","btn btn-info justify-content-end");
			startAssignmentButton.setAttribute("type","button");
			startAssignmentButton.innerHTML="Start Assignment";

			let waitForMarking=document.createElement('div');
			waitForMarking.setAttribute("class","");
			//waitForMarking.setAttribute
			

			

      		td3.appendChild(startAssignmentButton);
      		td3.append(" ");

			tr.appendChild(th);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);

			startAssignmentButton.addEventListener("click", (e)=>
			{
				let id= guide.assignmentID;
				$.cookie('assignmentID', id);  
				window.location.replace("studentResponse.html");
			})



			editTable.append(tr);

		});

	}
	else
	{
		editTable.innerHTML=("NULL");
	}


}




//create new assignment
$("#createNewAssignment").on("click",function()
{
	$.removeCookie('assignmentID');
	window.location.replace("createExercise.html");


})
