
import * as firebase from 'firebase';

export function _updatePoints(event, uid) {
  const value = event;
  const ref = firebase.database().ref();
  const userPointsRef = ref.child('userReadable/userPoints').child(uid);
  const userDailyPointsRef = ref.child('userReadable/userDailyPoints').child(uid);
  userPointsRef.once('value').then((snap) => {
    const userPoints = snap.val().points;
    return points = (userPoints);
  }).then((points) => {
    const date = new Date().getDate();
    const eventPoints = value + (points);
    userPointsRef.update({ points: +eventPoints });

    userDailyPointsRef.once('value').then((snap) => {
      const dailyPoints = snap.val().points;
      const newDailyPoints = dailyPoints + event;
      if (snap.val().date === date) {
        userDailyPointsRef.update({ points: newDailyPoints });
      } else {
        userDailyPointsRef.update({ date,
          points: value });
      }
    });
  });
}


export function _updateDailyPoints(event, uid) {
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
