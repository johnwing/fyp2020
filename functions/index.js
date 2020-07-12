const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUser(data.id).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      student: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin4`
    }
  }).catch(err => {
    return err;
  });
});

exports.deleteAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUser(data.id).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
      student: false
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin99`
    }
  }).catch(err => {
    return err;
  });
});