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