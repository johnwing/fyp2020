    var config = {
      apiKey: "AIzaSyDfdXMCk4_oo5UGkiA20IYoPGE6sKvstzk",
      authDomain: "cuhkfyp2020.firebaseapp.com",
      databaseURL: "https://cuhkfyp2020.firebaseio.com",
      projectId: "cuhkfyp2020",
      storageBucket: "cuhkfyp2020.appspot.com",
      messagingSenderId: "12732194759",
      appId: "1:12732194759:web:c18707b920f409bde0c3e2",
      measurementId: "G-TM10H85S0Y"
  };
    firebase.initializeApp(config);
    
    // make auth and firestore references
    const auth = firebase.auth();
    const db = firebase.firestore();
    const functions = firebase.functions();
    var provider = new firebase.auth.GoogleAuthProvider();

    // update firestore settings
    db.settings({ timestampsInSnapshots: true });


    