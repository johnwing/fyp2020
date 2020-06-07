
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    /*db.collection('fileLink').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => console.log(err.message));*/
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




$('#questionType').on("change",function()
{
	//$('#questionType').html("");
	var questionType=$(this).val();
	//$(".questions").css("display", "none");
	console.log(questionType);
	var answerFilterContent='';

	if(questionType=="mc")
	{
		answerFilterContent='<div class="mc form-check questions" id="mc" style="display:block"> <p>Instructions:</p> <p>Tick the box(es) that gives the marks. Write down the represent answer of the choice next to the checkbox.</p> Number of Choice: <select class="form-control" id="noOfmcChoice"> <option disabled selected="selected">--Number of Choice--</option><option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> </select> <div id="mcChoiceList"> </div> </div>';
	}else if(questionType=="fillInTheBlank")
	{
		answerFilterContent='<div class="fillInTheBlank form-check questions" id="fillInTheBlank" style="display:block"> <p>Instructions:</p> <p>Write down the possible answer(s) below for auto-marking. If you do not need auto-marking, select "0" in the number of possible solution.</p> Number of the Possible Answer(s): <select class="form-control" id="noOfFillInTheBlankChoice"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> </select> <div id="fillInTheBlankList"> </div> </div>';
	}
	else if(questionType=="shortQ")
	{

	}
	else if(questionType=="longQ")
	{

	}
	$('#answerFilter').html(answerFilterContent);


	
});



$('#answerFilter').on("change",'#noOfmcChoice',function()
{
	$('#mcChoiceList').html("");
	var i=0;
	var n=parseInt($('#noOfmcChoice').val());
	//alert(n);
	for(i=0;i<n;i++)
	{
		var answerChar=String.fromCharCode(i+65);
		$('#mcChoiceList').append('<p><input type="checkbox"  value="'+i+'" class="mcAnswer" > '+answerChar+') <input type="text" class="radioInputAnswer id='+i+'"></p>');
	}
	console.log("ok");
})


$('#answerFilter').on("change",'#noOfFillInTheBlankChoice',function()
{
	$('#mcChoiceList').html("");
	var i=0;
	var n=parseInt($('#noOfFillInTheBlankChoice').val());
	//alert(n);
	for(i=0;i<n;i++)
	{
		$('#mcChoiceList').append('<p><input type="text" class="radioInputAnswer id='+i+'"></p>');
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




