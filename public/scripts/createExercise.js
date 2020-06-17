
jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});


$('form[id="assignmentForm"]').validate({
  rules: {
    assignmetTopic: 'required',

  },
  messages: {
    assignmetTopic: 'This field is required!!',
  },
  submitHandler: function(form) {
    
    form.submit();

  }
});


$('form[id="questionForm"]').validate({
  rules: {
    questionType: 'required',
    questionName: 'required',
    'mcAnswer[]':
    {
      required: true
    }
  },
  messages: {
    questionType: 'This field is required!!',
    questionName: 'This field is required!!',
    'mcAnswer[]':
    {
      required: 'At Least One Tick!'
    }
  },
  errorPlacement: function(error, element) {
                if (element.attr("name") == "mcAnswer[]") {
                    error.appendTo("#mcAnswerError");
                } else {
                    error.insertAfter(element);
                }
            },
  submitHandler: function(form) {
    
    form.submit();

  }
});




const uploadDoc = document.querySelector('#addAttachmentList');
var assignmentID;
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection('fileLink').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => console.log(err.message));
    db.collection('questions').onSnapshot(snapshot => {
      setUpQuestionList(snapshot.docs);
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
  assignmentID='90c1d8d2-c638-4674-8c15-de7c61d87cfd';

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


    });
    uploadDoc.appendChild(appendixList);


  } else {
    uploadDoc.innerHTML = `<ul class="list-group">Nothing is added.</ul>`;
  }
  //alert(uploadDoc.innerHTML);
};

const setUpQuestionList=(data)=>
{
  $('#addQuestionList').html("");
  if(data.length)
  {

    let appendixList=document.createElement("table");
    appendixList.setAttribute("class","table table-striped");
    appendixList.id="questionList";
    //let th1=document
    appendixList.innerHTML=
      `<thead>
        <th scope="col">#</th>
        <th scope="col">Question</th>
        <th scope="col">Type</th>
        <th scope="col">Answer Filter</th>
        <th scope="col">Delete</th>
      </thead>
        `;
    let tbody=document.createElement("tbody");
    



    let noOfQuestion=0;
    data.forEach(doc => {
      const guide = doc.data();
      let tr=document.createElement("tr");
      let th=document.createElement("th");
      th.setAttribute("scope","row");
      noOfQuestion=noOfQuestion+1;
      th.innerHTML=noOfQuestion;
      let td3=document.createElement("td");
     // td.setAttribute("class","left");
      
      td3.innerHTML=guide.questionType;
      //+`<br/>`+doc.id;+

      let td2=document.createElement("td");
      td2.innerHTML=guide.questionName;

      let td4=document.createElement("td");
      if(guide.questionType=="Mutiple Choice")
      {
        td4.append("Option(s)");
        let ul=document.createElement("ol");
        ul.setAttribute("type","A");
        //let li=document.createElement("li");

        let answerFilter=guide.answerFilter;
        
        for(var i=0;i<answerFilter.answerFilter.length;i++)
        {
          let li=document.createElement("li");
          li.innerHTML=answerFilter.answerFilter[i];
          //answer.push(String.fromCharCode(parseInt(answerFilter.answer[i])+65)); 
          //li.innerHTML=String.fromCharCode(parseInt(answerFilter.answer[i])+65);          
          ul.append(li);
        }
        td4.append(ul);
        let answer=[];
        for(var i=0;i<answerFilter.answer.length;i++)
        {
          answer.push(String.fromCharCode(parseInt(answerFilter.answer[i])+65));
        }
        td4.append("Answer: "+answer);
        //td4.innerHTML=answer;
        console.log(answer);

      }
      else
      {
        
      }

      

      let td5=document.createElement("td");

      let deleteButton=document.createElement("button");
      deleteButton.setAttribute("class","btn btn-info justify-content-end");
      deleteButton.setAttribute("type","button");
      deleteButton.innerHTML="Delete";




      td5.appendChild(deleteButton);
      tr.append(th,td2,td3,td4,td5);

      deleteButton.addEventListener("click",(e)=>
      {
        let id= doc.id;
        db.collection('questions').doc(id).delete();

        tr.remove();
      });

      tbody.appendChild(tr);
    });
    appendixList.appendChild(tbody);
    //appendixList.append()
    $('#addQuestionList').append(appendixList);

  }
  else
  {
    $('#addQuestionList').html(`<p>No Question is added yet!</p>`);
  }
  
}





//generate random key
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


//generate 



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


var questionType="";
//Create Question
$('#questionType').on("change",function()
{
  //$('#questionType').html("");
  questionType=$(this).val();
  //$(".questions").css("display", "none");
  console.log(questionType);
  var answerFilterHTMLContent='';

  if(questionType=="Mutiple Choice")
  {
    //answerFilterHTMLContent=' <div id="mcChoiceList"> </div> </div>';
      $('#answerFilter').html("");
      let questionDiv=document.createElement("div");
      questionDiv.setAttribute("class","mc form-check questions");
      
      let instructions=document.createElement("p");
      instructions.innerHTML=`Instructions: Tick the box(es) that gives the marks. 
      Write down the represent answer of the choice next to the checkbox.`;

      let noOfChoice=document.createElement("select");
      noOfChoice.id="noOfmcChoice";
      noOfChoice.class='form-control required';
      noOfChoice.setAttribute("required","required");
      noOfChoice.setAttribute("name","noOfmcChoice");
      let preSelectedOption=document.createElement("option");
      preSelectedOption.setAttribute("disabled","disabled");
      preSelectedOption.setAttribute("selected","selected");
      preSelectedOption.innerHTML="--Number of Choice--";
      noOfChoice.appendChild(preSelectedOption);
      var noOfChoiceArray=[1,2,3,4,5,6,7];
      for (var i=1;i<=7;i++)
      {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        noOfChoice.appendChild(option);        
      }
      let mcFilterList=document.createElement("div");
      mcFilterList.id="mcChoiceList";

      questionDiv.appendChild(instructions);
      questionDiv.appendChild(noOfChoice);
      questionDiv.appendChild(mcFilterList);
      $('#answerFilter').append(questionDiv);


  }else if(questionType=="Fill-In-The-Blanks")
  {
    answerFilterHTMLContent='<div class="fillInTheBlank form-check questions" id="fillInTheBlank" style="display:block"> <p>Instructions:</p> <p>Write down the possible answer(s) below for auto-marking. If you do not need auto-marking, select "0" in the number of possible solution.</p> Number of the Possible Answer(s): <select class="form-control required" id="noOfFillInTheBlankChoice" name="noOfFillInTheBlankChoice"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> </select> <div id="fillInTheBlankList"> </div> </div>';
    $('#answerFilter').html(answerFilterHTMLContent);
  }
  else if(questionType=="Short Question")
  {
    $('#answerFilter').html("");
  }
  else if(questionType=="Long Question")
  {
    $('#answerFilter').html("");
  }
  


  
});



$('#answerFilter').on("change",'#noOfmcChoice',function()
{
  $('#mcChoiceList').html("");
  $('#mcChoiceList').append(`<div id="mcAnswerError"></div> `);
  var i=0;
  var n=parseInt($('#noOfmcChoice').val());
  alert(n);
  for(i=0;i<n;i++)
  {
    var answerChar=String.fromCharCode(i+65);

    $('#mcChoiceList').append('<p><input type="checkbox"  value="'+i+'" class="mcAnswer" name="mcAnswer[]" > '+answerChar+') <input type="text" class="radioInputAnswer required" id='+i+' name="radioInputAnswer'+i+'"></p>');
  }
  //console.log("ok3");
})


$('#answerFilter').on("change",'#noOfFillInTheBlankChoice',function()
{
  $('#fillInTheBlankList').html("");
  var i=0;
  var n=parseInt($('#noOfFillInTheBlankChoice').val());
  //alert(n);
  for(i=0;i<n;i++)
  {
    $('#fillInTheBlankList').append('<p><input type="text" class="fillInTheBlank required" id='+i+' name="fillInTheBlank'+i+'"></p>');
  }
  console.log("ok");

})

$('#answerFilter').on("change",'.mcAnswer',function()
{
  var selectedValue=[];
  $('.mcAnswer:checked').each(function()
  {
    selectedValue.push($(this).val());
  });
  console.log(selectedValue);


})
 
var questionId="";
$('#addQuestion').on("click",function()
{
  //alert("hi");
  if($("#questionForm").valid())
  {
    var questionName=$("#questionName").val();
    var questionType=$("#questionType").val();
    var answerObject={};
    if(questionType=="Fill-In-The-Blanks")
    {
      var n=parseInt($('#noOfFillInTheBlankChoice').val());   
      
      answerObject["Number of Filter"]=n;
      for(var i=0;i<n;i++)
      {

        answerObject[i]=$("#"+i.toString()).val();
        console.log("#"+i.toString());
        //alert($("#"+i.toString()).val());
      }
      let questionData={
        questionName: questionName,
        questionType: questionType,
        answerFilter: answerObject
      }
      let addDoc = db.collection('questions').add(questionData).then(ref => {
      
      console.log('Added document with ID: ', ref.id);
      //questionId=ref.id;
      //alert( questionId);
      });


      
    }
    else if(questionType=="Mutiple Choice")
    {
      var n=parseInt($('#noOfmcChoice').val());
      answerObject["Number of Filter"]=n;
      let mcAnswerValue=[];
      $.each($("input[name='mcAnswer[]']:checked"), function(){            
                mcAnswerValue.push($(this).val());
            });
      answerObject["answer"]=mcAnswerValue;
      let answerFilterValue=[];
      for(var i=0;i<n;i++)
      {
        answerFilterValue.push($("#"+i.toString()).val());
        //answerObject[i]=$("#"+i.toString()).val();
        //console.log("#"+i.toString());
        //alert($("#"+i.toString()).val());
      }
      answerObject["answerFilter"]=answerFilterValue;
      let questionData={
        questionName: questionName,
        questionType: questionType,
        answerFilter: answerObject
      }
      let addDoc = db.collection('questions').add(questionData).then(ref => {
      
      console.log('Added document with ID: ', ref.id);
      //questionId=ref.id;
      //alert( questionId);
      });




    }
    else
    {
      let questionData={
        questionName: questionName,
        questionType: questionType
      }
      let addDoc = db.collection('questions').add(questionData).then(ref => {
      
      console.log('Added document with ID: ', ref.id);
      //questionId=ref.id;
      //alert( questionId);
      });

    }
  }
});


function addQuestion(questionData,callback)
{
  questionId="";
  let addDoc = db.collection('questions').add(questionData).then(ref => {
    
    console.log('Added document with ID: ', ref.id);
    questionId=ref.id;

  });
};
    




