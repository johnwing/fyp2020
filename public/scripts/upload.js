const setupGuides(user)
{

}

const setupUI = (user) => {

  if (user) {
  console.log(user.email); 
     // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      console.log(doc);  
      const html = `
        <div>Logged in as ${user}</div>      `;
      userPresent.innerHTML = html;


    });
    db.collection('users').doc(user.uid).set({
      email: user.email
    });

    // toggle user UI elements
    //loggedInLinks.forEach(item => item.style.display = 'block');
    //loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    userPresent.innerHTML = '';
    // toggle user elements
    //adminItems.forEach(item => item.style.display = 'none');
    //loggedInLinks.forEach(item => item.style.display = 'none');
    //loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};




$(document).ready(function() {






var totalQuestion=0;
userPresent = document.querySelector('.userPresent');

  function addOption2(el)
  {
    /*
    var name= parseInt($(this).val());
    var newOption=document.createElement("input");
    newOption.setAttribute("name",name);
    newOption.setAttribute("type","radio");
    newOption.setAttribute("class","radioInputAnswer");
    alert(name);
    newOption.innerHTML='<input type="text" ><br/>';
      event.target.before(newOption);
*/


  }
$('.radioAddOption').click(
  function()
  {
    var name= parseInt($(this).val())+0;
    var newOption=document.createElement("input");
    newOption.setAttribute("name",name);
    newOption.setAttribute("type","radio");
    newOption.setAttribute("class","radioInputAnswer");
    alert(name);
    var textbox=document.createElement("input");
    textbox.setAttribute("type","text");
    textbox.setAttribute("class","radioInputAnswer");
    event.target.before(newOption);
    newOption.after(textbox);
  }
  )


//update the radio value
$('.radioInputAnswer').on("focusout",
  function()
  {
    $(this).prev().val($(this).val());
    alert($(this).prev().val());
    //alert($(this).prev().attr('name'));
    //alert($('#huey').val());
  }
  );


$('#formSubmit').on("click",function()
    {
      alert($('#huey').val());
    }
  );












function setupGuides()
{
  
}





function writeUserData(userId, name, email, imageUrl) {
  db.ref('users/' + userId).set({
    email: email
  });
}










});
