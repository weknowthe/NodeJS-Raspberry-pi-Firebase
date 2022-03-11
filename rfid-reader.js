


      var isDoorOpenvariable = '' ;
      db.collection("compartment")
        .where("lockerId", "==", lockerId)        
        .where("compartmentId", "==", compId)
        .get()
        .then(snapshot => {
          if (snapshot.size > 0) {
            snapshot.forEach(doc => {   
                
                isDoorOpenvariable  =  doc1.data().isDoorOpen;
            ret(doc1.data().isDoorOpen);
            });
          } 
          return "promise";
        })
        .catch(err => {         
          console.log({ message: "error connecting to the system " });
          console.log("Error getting documents", err);
        });
