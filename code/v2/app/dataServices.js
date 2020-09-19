// import * as firebase from 'firebase';
// import 'firebase/firestore';

// export const getPhoneNumber = (token) => {
//     return new Promise((resolve, reject) => {
//         fetch('https://graph.accountkit.com/v1.3/me/?access_token=' + token, {})
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 if (responseJson !== null) {
//                     resolve(responseJson);
//                 } else {
//                     let data = {
//                         status: 'Error'
//                     }
//                     resolve(data)
//                 }
//             }).catch(err => {
//                 let data = {
//                     status: 'Error'
//                 }
//                 resolve(data);
//             })
//     })
// }

// export const getUserInfo = (phone_number) => {
//     return new Promise((resolve, reject) => {
//         // Check whether phone number exist in database
//         firebase.firestore().collection("users")
//             .where("phone_number", "==", phone_number)
//             .onSnapshot(querySnapshot => {
//                 let userInfo = querySnapshot.docs.map(doc => doc.data());
//                 console.log('userInfo');
//                 console.log(userInfo);
//                 if (userInfo !== null) {
//                     resolve(userInfo);
//                 } else {
//                     let data = {
//                         status: 'Error'
//                     }
//                     resolve(data)
//                 }
//             })
//     })
// }

// export const checkUserExist = (phone_number) => {
//     return new Promise((resolve, reject) => {
//         var docRef = firebase.firestore().collection("users").doc(phone_number);
//         docRef.get().then(function (thisDoc) {
//             if (thisDoc.exists) {
//                 //user is already there, then update
//                 let data = {
//                     status: true
//                 }
//                 resolve(data);
//             }
//             else {
//                 //no user found
//                 let data = {
//                     status: false
//                 }
//                 resolve(data);
//             }
//         })
//             .catch(function (error) {
//                 let data = {
//                     status: 'Error',
//                     message: error
//                 }
//                 resolve(data);
//             });
//     })
// }

// export const createUser = (userInfo) => {
//     return new Promise((resolve, reject) => {
//         var docRef = firebase.firestore().collection("users").doc(userInfo.phone_number);
//         docRef.get().then(function (thisDoc) {
//             if (thisDoc.exists) {
//                 //user is already there, then update
//                 console.log('user is already there, then update');
//                 docRef.update(userInfo);
//             }
//             else {
//                 //new user
//                 console.log('new user');
//                 docRef.set(userInfo);
//             }
//             let data = {
//                 status: 'success'
//             }
//             resolve(data);
//         })
//             .catch(function (error) {
//                 let data = {
//                     status: 'error'
//                 }
//                 resolve(data);
//             });
//     })
// }

// export const filterUserList = (location, bloadType) => {
//     console.log('location, bloadType');
//     console.log(location);
//     var userRef = firebase.firestore().collection("users");
//     var filterUser = userRef.where("location", "==", 'Puttur');
//     var allUser = userRef
//     return new Promise((resolve, reject) => {
//         // userRef
//         // .where("location", "==", 'Puttur')
//         location
//             ?
//             filterUser.onSnapshot(querySnapshot => {
//                 let userList = querySnapshot.docs.map(doc => doc.data());
//                 resolve(userList);
//             })
//             :
//             userRef.onSnapshot(querySnapshot => {
//                 let userList = querySnapshot.docs.map(doc => doc.data());
//                 resolve(userList);
//             })
//     })
// }