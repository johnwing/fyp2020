jQuery.validator.setDefaults({
	debug: true,
	success: "valid"
});

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

const setupUI=(user) => {

	console.log(user.uid);
	userUid=user.uid;


}

//setup the assignment List
const setupAssignmentList=(data) =>
{
	let editTable=$("#assignmentList");
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
			let deleteButton=document.createElement("button");
			deleteButton.setAttribute("class","btn btn-info justify-content-end");
			deleteButton.setAttribute("type","button");
			deleteButton.innerHTML="Delete";
			let editButton=document.createElement("button");
			editButton.setAttribute("class","btn btn-info justify-content-end");
			editButton.setAttribute("type","button");
			editButton.innerHTML="Edit";

			td3.appendChild(editButton);
			td3.append(" ");
      		td3.appendChild(deleteButton);
			tr.appendChild(th);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);

			deleteButton.addEventListener("click",(e)=>
			{
			let id= doc.id;
			db.collection('assignmentForm').doc(id).delete();
			tr.remove();
			});
			editTable.append(tr);

		});

	}
	else
	{
		editTable.innerHTML=("NULL");
	}


}









