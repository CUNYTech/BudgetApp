
import * as firebase from 'firebase';

export function _updatePoints(event, uid) {
  value = event;
  const ref = firebase.database().ref();
  const userPointsRef = ref.child('userReadable/userPoints').child(uid);
  userPointsRef.once('value').then((snap) => {
    const userPoints = snap.val().points;
    return points = (userPoints);
  }).then((points) => {
    const eventPoints = value + (points);
    userPointsRef.update({ points: +eventPoints });
  });
}
