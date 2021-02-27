import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import './App.css';

var firebaseConfig = {
  apiKey: "AIzaSyDTbhO_Uk563oUFt9Ihu98komkckwgO9y8",
  authDomain: "react-chat-97ef4.firebaseapp.com",
  projectId: "react-chat-97ef4",
  storageBucket: "react-chat-97ef4.appspot.com",
  messagingSenderId: "713422912742",
  appId: "1:713422912742:web:87ea24276b23db9b244f27"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {
  const [msg, setMsg] = useState("")
  const [location, setLocation] = useState({})
  const [btn, setBtn] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {

      setLocation({ "latitude": position.coords.latitude, "longitude": position.coords.longitude })
      console.log(location);

    })
  }, [btn])

  function sendMsg(e) {
    e.preventDefault();
    setBtn(!btn)
    let d = new Date();
    let date = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    db.collection("users").add({
      msg: msg,
      location: location,
      timestamp: date
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  console.log(btn,location, msg)
  return (
    <div className="App">
      <form >
        <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message"></input>
        <button onClick={sendMsg}>Send</button>
      </form>
    </div >
  );
}

export default App;
