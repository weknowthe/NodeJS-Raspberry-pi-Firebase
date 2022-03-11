var admin = require("firebase-admin");
const r = require('array-gpio');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 

});
///F:\node-firebase\nodejs+firebase-adminsdk

//-----Fix Error---------------------------
const settings = { timestampsInSnapshots: true};
admin.firestore().settings(settings);
//-----Fix Error---------------------------
var db = admin.firestore();

///door in 
//lock out

let sw = r.Input(11 ,{index:'pin'});
//let led = r.Output(33, 35, {index:'pin'});
 
r.watchInput(function (){
  // if sw[11] is ON, led[33] will turn ON
  if(sw[11].isOn){ 	 
	//led[33].on();
    dbUpdate(false);
    console.log(" physical pin 11 is on i.e door closed  successfully");
  }
  else{
    dbUpdate(true);
    console.log(" physical pin 11 is off i.e door opened  successfully");
   }  
  
});


function dbUpdate(isDoorOpen) {
  compartmentData = {
              "isDoorOpen":isDoorOpen   
          }      
  db.collection("compartment").doc("fEZpA9XkhK4zh9RGEoKQ").update(compartmentData).then(ref => {
        console.log("db update successfully");
        return "promise";
      })
      .catch(err => {
        console.log("Error on logout",err);     
      });
  };
  