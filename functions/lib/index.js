"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
exports.ticketSold = functions.firestore.document('invitados/{userId}').onUpdate((change, context) => __awaiter(this, void 0, void 0, function* () {
    const newValue = change.after.data();
    if (newValue.pagoAprobado) {
        const disponiblesRef = admin.firestore().collection('disponibles').doc('AizDic8wYjJmuvUwrQmU');
        const disponiblesValues = yield disponiblesRef.get();
        const writeResult = yield disponiblesRef.set({ disponibles: disponiblesValues.data().disponibles - 1, fake: disponiblesValues.data().fake - 1 });
        return writeResult;
    }
    return null;
}));
//# sourceMappingURL=index.js.map