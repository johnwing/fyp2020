
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


// listen for auth status changes
var userID;
auth.onAuthStateChanged(user => {
  if (user) 
  {
  	userID=user.uid;
  }
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

$("#startAssignmentButton").on("click",function(){
	if($("#question"+0).length)
	{
		$("#question"+0).show();
		$("#startAssignmentButton").hide();
	}

})


function hello()
{
	let tempi=i;
	console.log(questionList[tempi]);
	let questionTable=document.createElement("div");
	questionTable.setAttribute("id","question"+tempi);
	questionTable.setAttribute("class","justify-content-between questionInPage");
	questionTable.style.display="none";
	questionTable.innerHTML=`<h3>Question `+(tempi+1)+`</h3>`;
	let questionTopic=document.createElement("h5");
	questionTopic.class="mb-1";
	questionTopic.innerText=questionList[tempi].questionName;

	if(questionList[tempi].questionType=="Mutiple Choice")
	{
		let j=0;
		questionList[tempi].answerFilter.answerFilter.forEach(option => {
			//let div=document.createElement("div");
			//div.setAttribute("id","question"+j);
			let p=document.createElement("br");
			let checkBoxInput=document.createElement("input");
			checkBoxInput.setAttribute("type","checkbox");
			checkBoxInput.setAttribute("value",j);
			checkBoxInput.setAttribute("name","question_"+tempi);
			let checkboxLabel=document.createElement("label");
			checkboxLabel.setAttribute("class","font-weight-light");
			checkboxLabel.setAttribute("for","question_"+tempi);
			checkboxLabel.innerText=option;

			questionTopic.appendChild(p);
			questionTopic.appendChild(checkBoxInput);
			questionTopic.appendChild(checkboxLabel);
			//questionTopic.appendChild(div);
			
			j=j+1;
		})

		/*
		let answerOption=document.createElement("input");
		answerOption.class="";
		answerOption.setAttribute();
		*/
	}
	else {
			let br=document.createElement("br");
			let inputTextbox=document.createElement("textarea");
			inputTextbox.setAttribute("class","form-control");
			inputTextbox.setAttribute("name","question_"+tempi);
			questionTopic.appendChild(br);
			questionTopic.appendChild(inputTextbox);
	}
	let br=document.createElement("br");
	let nextQuestionButton=document.createElement("button");
	nextQuestionButton.setAttribute("class","btn btn-info");
	nextQuestionButton.innerText="Next Question";
	
	let previousQuestionButton=document.createElement("button");
	previousQuestionButton.setAttribute("class","btn btn-secondary");
	previousQuestionButton.innerText="Previous Question";

	let reviewLaterDiv=document.createElement("div");
	reviewLaterDiv.innerHTML=`
	<div class="input-group mb-3">
	  <div class="input-group-prepend">
	    <div class="input-group-text">
	      <input type="checkbox" value=`+tempi+` aria-label="Checkbox for following text input">
	    </div>
	  </div>
	  <div class="form-control">Tick this checkbox for reminding double check before submit.</div>
	</div>`;



	questionTopic.appendChild(br);
	questionTopic.appendChild(br);
	questionTopic.appendChild(reviewLaterDiv);
	
	if(tempi>0)
	{
		questionTopic.appendChild(previousQuestionButton);		
	}
	questionTopic.appendChild(nextQuestionButton);
	questionTable.appendChild(questionTopic);
	let questionDisplay=document.querySelector("#page");
	questionDisplay.appendChild(questionTable);
	console.log(questionTable);

	previousQuestionButton.addEventListener("click",(e)=>
    {
    	//alert(questionList[tempi].questionName);
    	$("#question"+(tempi)).hide();
    	$("#question"+(tempi-1)).show();
    })




	nextQuestionButton.addEventListener("click",(e)=>
    {
    	//alert(questionList[tempi].questionName);
    	$("#question"+(tempi)).hide();
    	$("#question"+(tempi+1)).show();
    	let answeredValue=[];
    	if(questionList[tempi].questionType=="Mutiple Choice")
    	{
			$('input[name=question_'+tempi+']:checked').each(function()
			{
			  answeredValue.push($(this).val());
			});
			  		
    	}
    	else
    	{
    		answeredValue.push($("textarea[name=question_"+tempi+"]").val());
    	}
    	console.log(answeredValue);  
    	//let update
    	let saveAnswerDB=db.collection("studentAnswer").doc(userID+assignmentID+tempi);
    	let saveAnswerAction=saveAnswerDB.set({answer : answeredValue});
    	console.log('Added document with ID: ', saveAnswerAction.id);
    	



    	if($("#question"+(tempi+1)).length<=0)
    	{
    		let endDiv=document.createElement("div");
    		endDiv.setAttribute("class","container-fluid border border-secondary");
    		endDiv.setAttribute("id","question"+(tempi+1));
    		endDiv.innerText="All Questions have been answered. Click Sumbit to exit."
    		
//display answer
	      let appendixList=document.createElement("table");
	      appendixList.setAttribute("class","table table-striped");
	      appendixList.id="questionList";
	      //let th1=document
	      appendixList.innerHTML=
	        `<thead>
	          <th scope="col">#</th>
	          <th scope="col">Question</th>
	          <th scope="col">Your Answer</th>
	          <th scope="col">Edit</th>
	        </thead>
	          `;
	      let tbody=document.createElement("tbody");      
	      let questionNo=0;
	      for(questionNo=0;questionNo<=tempi;questionNo++)
	      {
	          let tr=document.createElement("tr");
	          let th=document.createElement("th");
	          th.setAttribute("scope","row");
	          let noOfQuestion=questionNo+1;
	          th.innerHTML=noOfQuestion;
	          let td2=document.createElement("td");
	          td2.innerText=questionList[questionNo].questionName;
	          let td3=document.createElement("td");
	          let answeredValue=[];
				if(questionList[questionNo].questionType=="Mutiple Choice")
		    	{
					$('input[name=question_'+questionNo+']:checked').each(function()
					{
					  answeredValue.push($(this).val());
					});
					  		
		    	}
		    	else
		    	{
		    		answeredValue.push($("textarea[name=question_"+questionNo+"]").val());
			    }
			  td3.innerText=answeredValue;
			  let td4=document.createElement("td");
			  tr.append(th,td2,td3,td4);
			  tbody.appendChild(tr);
			}

			appendixList.appendChild(tbody);




    		let endButton=document.createElement("button");
    		endButton.setAttribute("class","btn btn-info");
    		endButton.innerText="Submit";
    		let br=document.createElement("br");
    		let previousQuestionButton2=document.createElement("button");
			previousQuestionButton2.setAttribute("class","btn btn-secondary");
			previousQuestionButton2.innerText="Previous Question";
    		endDiv.appendChild(br);
    		endDiv.appendChild(appendixList);
    		endDiv.appendChild(br);
    		endDiv.appendChild(previousQuestionButton2);
    		endDiv.appendChild(endButton);
    		endDiv.appendChild(br);
    		$("#question"+(tempi)).after(endDiv);
    		previousQuestionButton2.addEventListener("click",(e)=>{
    			$("#question"+(tempi+1)).hide();
    			$("#question"+(tempi)).show();
    		})
    	}
    })
}

	