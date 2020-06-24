
var assignmentID="";
//init Setting
assignmentID="f1b924d6-10c3-4747-8efd-751db118b170";
let targetAssignmentDbRef=db.collection("assignmentForm").where("assignmentID","==","f1b924d6-10c3-4747-8efd-751db118b170");
let getDoc=targetAssignmentDbRef.get().then(snapshot =>{
	if(snapshot.empty)
	{
		//return to the 
		alert("Something Wrong");
	}else
	{
		snapshot.forEach(doc => {
      		console.log(doc.id, '=>', doc.data());
      		$("#assignmentTopic").text(doc.data().assignmentTopic);
      		if(doc.data().assignmentDescription !== "")
      		{
      			$("#assignmentDescription").text(doc.data().assignmentDescription);
      		}
    	});
	}
}).catch(err => {
    console.log('Error getting document', err);
})


//save assignment topic to question list
var questionList=[];
let questionID;
let i=-1;
let assignmentQuestionRelationDbRef=db.collection("assignmentQuestionRelation").where("assignmentID","==",assignmentID);
assignmentQuestionRelationDbRef.get().then(collections =>{
	collections.forEach(collection =>{
		console.log(collection.data().questionID);
		questionID=collection.data().questionID;
		let questionDbRef=db.collection("questions").doc(questionID);
		questionDbRef.get().then(doc=>{
			i=i+1;
			questionList[i]=doc.data();
		}).then(()=>hello());
	})
})


function hello()
{
	console.log(questionList[i]);
	let questionTable=document.createElement("div");
	questionTable.class="d-flex justify-content-between";
	let questionTopic=document.createElement("h5");
	questionTopic.class="mb-1";
	questionTopic.innerHTML=questionList[i].questionName;

	if(questionList[i].questionType=="Mutiple Choice")
	{
		let j=0;
		questionList[i].answerFilter.answerFilter.forEach(option => {
			let p=document.createElement("p");
			let checkBoxInput=document.createElement("input");
			checkBoxInput.setAttribute("type","checkbox");
			checkBoxInput.setAttribute("value",j);
			checkBoxInput.setAttribute("name",i+"_"+j);
			let checkboxLabel=document.createElement("label");
			checkboxLabel.setAttribute("for",i+"_"+j);
			checkboxLabel.innerText=option;
			p.innerHTML+=checkBoxInput;
			p.innerHTML+=checkboxLabel;
			questionTopic.appendChild(p);
			j=j+1;
		})

		/*
		let answerOption=document.createElement("input");
		answerOption.class="";
		answerOption.setAttribute();
		*/
	}
	else {
			let inputTextbox=document.createElement("input");
			inputTextbox.class="form-control";
			inputTextbox.setAttribute("name",i+"_"+1);
			questionTopic.appendChild(inputTextbox);
	}
	questionTable.innerHTML+=questionTopic;
	let questionDisplay=document.getElementById("questionDisplay").innerHTML;
	questionDisplay.innerHTML+=questionTable;





	/*
	questionList.foreach((question)=>{
		console.log(question);
	})
	*/

}
//console.log("HI"+questionList);



	