const functions = require("firebase-functions");
const admin = require("firebase-admin");
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);
admin.initializeApp();

exports.documentWriteListener = functions.firestore
  .document("CASOS/{documentUid}")
  .onWrite((change, context) => {
    if (!change.before.exists)
      admin.firestore().doc("CASOS/sizeCollection").update({
        numberOfDocs: increment,
      });
    else if (!change.after.exists)
      admin.firestore().doc("CASOS/sizeCollection").update({
        numberOfDocs: decrement,
      });
    return;
  });

/* exports.calculateStats = functions.https.onCall(async (data, context) => {
  return "Hellouda";
}); */
