
userPresent = document.querySelector('.userPresent');



const setupUI = (user) => {
  //console.log(user.uid);
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      console.log(doc);  
      const html = `
        <div>Logged in as ${user}</div>      `;
      userPresent.innerHTML = html;
      console.log("good");

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