// Lets admins reset another user's password. Deploy: firebase deploy --only functions (needs the Blaze plan).
const {onCall,HttpsError}=require("firebase-functions/v2/https");
const admin=require("firebase-admin"); admin.initializeApp();
exports.adminSetPassword=onCall(async req=>{
  if(!req.auth) throw new HttpsError("unauthenticated","Sign in first.");
  const me=await admin.firestore().doc("users/"+req.auth.token.email.split("@")[0]).get();
  if(!me.exists||me.data().role!=="admin") throw new HttpsError("permission-denied","Admins only.");
  const {username,password}=req.data||{};
  if(!/^[a-z0-9_]{3,20}$/.test(username||"")||!password) throw new HttpsError("invalid-argument","Bad input.");
  const u=await admin.auth().getUserByEmail(username+"@users.headline.app");
  await admin.auth().updateUser(u.uid,{password:"pin-"+password+"-"+username});
  return {ok:true};
});
