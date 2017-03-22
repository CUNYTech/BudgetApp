
import * as firebase from "firebase";

 export function _updatePoints (event, uid) {
   value = +event;
   var ref = firebase.database().ref();
   var userPointsRef = ref.child('userReadable/userPoints').child(uid);
   userPointsRef.once('value').then(function(snap){
    var userPoints = snap.val().points;
    return points = (userPoints)
  }).then(function(points){
      var eventPoints = value + (points);
      userPointsRef.update({points:eventPoints});
    })
  }
