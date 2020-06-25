
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
	let tempi=i;
	console.log(questionList[tempi]);
	let questionTable=document.createElement("div");
	questionTable.setAttribute("id","question"+tempi);
	questionTable.setAttribute("class","justify-content-between questionInPage");
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
			checkBoxInput.setAttribute("name",tempi+"_"+j);
			let checkboxLabel=document.createElement("label");
			checkboxLabel.setAttribute("class","font-weight-light");
			checkboxLabel.setAttribute("for",tempi+"_"+j);
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
			inputTextbox.setAttribute("name",tempi+"_"+1);
			questionTopic.appendChild(br);
			questionTopic.appendChild(inputTextbox);
	}
	let br=document.createElement("br");
	let nextQuestionButton=document.createElement("button");
	nextQuestionButton.setAttribute("class","btn btn-info");
	nextQuestionButton.innerText="Next Question";

	questionTopic.appendChild(br);
	questionTopic.appendChild(nextQuestionButton);
	questionTable.appendChild(questionTopic);
	let questionDisplay=document.querySelector("#page");
	questionDisplay.appendChild(questionTable);
	console.log(questionTable);

	nextQuestionButton.addEventListener("click",(e)=>
    {
    	alert(questionList[tempi].questionName);
    })

    //questionTable.setAttribute("style","display: none");



	/*
	questionList.foreach((question)=>{
		console.log(question);
	})
	*/

}
//console.log("HI"+questionList);

function displayQuestions()
{

}




//test page divide
'use strict';

var numberOfItems = $('#page .list-group').length; // Get total number of the items that should be paginated
var limitPerPage = 4; // Limit of items per each page
$('#page .list-group:gt(' + (limitPerPage - 1) + ')').hide(); // Hide all items over page limits (e.g., 5th item, 6th item, etc.)
var totalPages = Math.round(numberOfItems / limitPerPage); // Get number of pages
$(".pagination").append("<li class='current-page active'><a href='javascript:void(0)'>" + 1 + "</a></li>"); // Add first page marker

// Loop to insert page number for each sets of items equal to page limit (e.g., limit of 4 with 20 total items = insert 5 pages)
for (var kk = 2; kk <= totalPages; kk++) {
  $(".pagination").append("<li class='current-page'><a href='javascript:void(0)'>" + kk + "</a></li>"); // Insert page number into pagination tabs
}

// Add next button after all the page numbers  
$(".pagination").append("<li id='next-page'><a href='javascript:void(0)' aria-label=Next><span aria-hidden=true>&raquo;</span></a></li>");

// Function that displays new items based on page number that was clicked
$(".pagination li.current-page").on("click", function() {
  // Check if page number that was clicked on is the current page that is being displayed
  if ($(this).hasClass('active')) {
    return false; // Return false (i.e., nothing to do, since user clicked on the page number that is already being displayed)
  } else {
    var currentPage = $(this).index(); // Get the current page number
    $(".pagination li").removeClass('active'); // Remove the 'active' class status from the page that is currently being displayed
    $(this).addClass('active'); // Add the 'active' class status to the page that was clicked on
    $("#page .list-group").hide(); // Hide all items in loop, this case, all the list groups
    var grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page number that was clicked on

    // Loop through total items, selecting a new set of items based on page number
    for (var kk = grandTotal - limitPerPage; kk < grandTotal; kk++) {
      $("#page .list-group:eq(" + kk + ")").show(); // Show items from the new page that was selected
    }
  }

});

// Function to navigate to the next page when users click on the next-page id (next page button)
$("#next-page").on("click", function() {
  var currentPage = $(".pagination li.active").index(); // Identify the current active page
  // Check to make sure that navigating to the next page will not exceed the total number of pages
  if (currentPage === totalPages) {
    return false; // Return false (i.e., cannot navigate any further, since it would exceed the maximum number of pages)
  } else {
    currentPage++; // Increment the page by one
    $(".pagination li").removeClass('active'); // Remove the 'active' class status from the current page
    $("#page .list-group").hide(); // Hide all items in the pagination loop
    var grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page that was selected

    // Loop through total items, selecting a new set of items based on page number
    for (var kk = grandTotal - limitPerPage; kk < grandTotal; kk++) {
      $("#page .list-group:eq(" + kk + ")").show(); // Show items from the new page that was selected
    }

    $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass('active'); // Make new page number the 'active' page
  }
});

// Function to navigate to the previous page when users click on the previous-page id (previous page button)
$("#previous-page").on("click", function() {
  var currentPage = $(".pagination li.active").index(); // Identify the current active page
  // Check to make sure that users is not on page 1 and attempting to navigating to a previous page
  if (currentPage === 1) {
    return false; // Return false (i.e., cannot navigate to a previous page because the current page is page 1)
  } else {
    currentPage--; // Decrement page by one
    $(".pagination li").removeClass('active'); // Remove the 'activate' status class from the previous active page number
    $("#page .list-group").hide(); // Hide all items in the pagination loop
    var grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page that was selected

    // Loop through total items, selecting a new set of items based on page number
    for (var kk = grandTotal - limitPerPage; kk < grandTotal; kk++) {
      $("#page .list-group:eq(" + kk + ")").show(); // Show items from the new page that was selected
    }

    $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass('active'); // Make new page number the 'active' page
  }
});
	