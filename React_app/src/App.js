import styled from "styled-components";
import { Header } from './Header';
import { Content } from './Content';
import Popup from './Popup';
import Popup_pulse from './Popup_pulse';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Body = styled.div`
  background-color:white;
  width:100%;
  overflow: hidden;
  margin:0px;

  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  height: 100%;
`

function App() {
  const [showPopup, setshowPopup] = useState(false);
  const [showPopup_pulse, setshowPopup_pulse] = useState(false)
  const [onload, setonload] = useState(false)
  var [array, setarray] = useState({});
  var [pulse_array, setpulse_array] = useState([]);
  const [loading,setLoading]=useState(false);
  const readOnce = useRef(true);
  useEffect(() => {
    if (readOnce.current == false) {
      return;
    }
    readOnce.current = false;
    console.log("reading app useEffect");
    var default_x = 50;
    var default_y = 32;

    var default_array = {
      field_x: default_x,
      field_y: default_y,
      split: 240,
      feq: 14000,
    };
    /*
    const default_pulse_array = [{
      id: uuidv4(),
      x: -1,
      y: -1,
      color: "rgb(255,0,0)",
      k: 0
    }];
    */
    var dd = {
      id: uuidv4(),
      x:-1,
      y:-1,
      color: "rgb(255,0,0)",
      k: 0
    };
    setarray(default_array);
    //setpulse_array(default_pulse_array);
    setpulse_array(empty => {
      return [...empty, dd]
    })
    setLoading(true);
  }, []);
  const send_array = (a_array) => {
    console.log("changed");
    setTimeout(function () {
      setarray(a_array);
    }, 100);
    setshowPopup(false);

  }
  const send_pulsearray = (a_pulse_array) => {
    console.log("changed");

    setTimeout(function () {
      setpulse_array(a_pulse_array);
    }, 100);
    setshowPopup_pulse(false);
  }


  useEffect(() => {
    console.log("read array useEffect");
  }, [array]);
  useEffect(() => {
  }, [pulse_array])

  const closePopup = (ddd) => {

    setshowPopup(false);

  }
  const closePopup_array = () => {
    setshowPopup_pulse(false);
  }
  return (
    <div className="App">
      <Body>
        <Header>
        </Header>
        {loading && (
          <Content setshowPopup={setshowPopup} setshowPopup_pulse={setshowPopup_pulse} array={array} a_pulse_array={pulse_array}>
          </Content>
        )}
        {showPopup && (
          <Popup trigger={showPopup} array={array} closePopup={closePopup} send_array={send_array} />
        )}
        {showPopup_pulse && (
          <Popup_pulse trigger={showPopup_pulse} a_pulse_array={pulse_array} closePopup_array={closePopup_array} send_pulsearray={send_pulsearray} />
        )}
      </Body>
    </div>
  );
}

export default App;
