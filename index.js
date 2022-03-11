var admin = require("firebase-admin");
//const r = require('array-gpio');

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

/* 
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
  
*/

var wpi = require('node-wiring-pi');
wpi.setup('wpi');

var pinNum_GPIO_0_Phy_11 = 0;//gpio 0 Phy num 11
var pinNum_GPIO_2_Phy_13 = 2;//gpio 2 Phy num 13
var pinNum_GPIO_3_Phy_15 = 3;//gpio 3 Phy num 15
var pinNum_GPIO_7_Phy_07 = 7;//gpio 7 Phy num 07

wpi.pinMode(pinNum_GPIO_0_Phy_11, wpi.OUTPUT);
wpi.pinMode(pinNum_GPIO_2_Phy_13, wpi.OUTPUT);
wpi.pinMode(pinNum_GPIO_3_Phy_15, wpi.OUTPUT);
wpi.pinMode(pinNum_GPIO_7_Phy_07, wpi.OUTPUT);


 
let observerComp1 = db.collection('compartment').where('compartmentId', '==', 'comp1')
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {     
      if (change.type === 'modified') {
        console.log(' DoorOpen data: ', change.doc.data().isDoorOpen);		
		if(change.doc.data().isDoorOpen){
			wpi.digitalWrite(pinNum_GPIO_0_Phy_11, wpi.HIGH);
		}else{
			wpi.digitalWrite(pinNum_GPIO_0_Phy_11, wpi.LOW);
		}		
      }
     
    });
  });

let observerComp2 = db.collection('compartment').where('compartmentId', '==', 'comp2')
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {     
      if (change.type === 'modified') {
			console.log(' DoorOpen data: ', change.doc.data().isDoorOpen);		
			if(change.doc.data().isDoorOpen){
				wpi.digitalWrite(pinNum_GPIO_2_Phy_13, wpi.HIGH);
			}else{
				wpi.digitalWrite(pinNum_GPIO_2_Phy_13, wpi.LOW);
			}		
      }     
    });
  });

let observerComp3 = db.collection('compartment').where('compartmentId', '==', 'comp3')
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
     
      if (change.type === 'modified') {
			console.log(' DoorOpen data: ', change.doc.data().isDoorOpen);
			if(change.doc.data().isDoorOpen){
				 wpi.digitalWrite(pinNum_GPIO_3_Phy_15, wpi.HIGH);
			}else{
				wpi.digitalWrite(pinNum_GPIO_3_Phy_15, wpi.LOW);
			}			
      }     
    });
  });

let observerComp4 = db.collection('compartment').where('compartmentId', '==', 'comp4')
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
     
      if (change.type === 'modified') {
          console.log(' DoorOpen data: ', change.doc.data().isDoorOpen);		
			if(change.doc.data().isDoorOpen){
				wpi.digitalWrite(pinNum_GPIO_7_Phy_7, wpi.HIGH);
			}else{
				wpi.digitalWrite(pinNum_GPIO_7_Phy_7, wpi.LOW);
			}				
      }     
    });
  });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
	
	
	