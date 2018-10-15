import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


export const ticketSold = functions.firestore.document('invitados/{userId}').onUpdate( async (change, context) => {

    const newValue = change.after.data();

    if (newValue.pagoAprobado) {
        const disponiblesRef = admin.firestore().collection('disponibles').doc('AizDic8wYjJmuvUwrQmU');
        const disponiblesValues   = await disponiblesRef.get();
        const writeResult         = await disponiblesRef.set({disponibles: disponiblesValues.data().disponibles - 1, fake: disponiblesValues.data().fake - 1});
        return writeResult;
    }

    return null;

});

export const invitadoDe = functions.firestore.document('invitados/{userId}').onCreate( (snap, context) => {
  
  const newValue = snap.data();
  const nombre = newValue.nombre;

  const accessRef = admin.firestore().collection('access').where("user", "==", context.params.userId).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      admin.firestore().collection('invitados').doc(context.params.userId).update({'invitadoDe': doc.data().owner})
      .then(() => console.log(`Updated invitadoDe ${doc.data().owner} to ${context.params.userId}`))
      .catch(err => {
        console.log('Error getting documents', err);
        return true;
      });
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  return null;

});