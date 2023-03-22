import styled from "styled-components";
import { Header } from './Header';
import { Content } from './Content';
import Popup from './Popup';
import { useState,useEffect,useRef } from 'react';
import { Helmet } from 'react-helmet';

const Body=styled.div`
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
  const [showPopup,setshowPopup] =useState(false);
  const [array,setarray]=useState({});
  const readOnce=useRef(true);
  const TITLE='電磁波シュミレーション';
  useEffect(()=>{
    if(readOnce.current==false){
      console.log("App.js rejected");
      return;
    }
    readOnce.current=false;
    console.log("reading app useEffect");
    var default_array={
      field_x:50,
      field_y:33,
      split:160,
      feq:10000,
    };
    setTimeout(function(){
      setarray(default_array);
    },100);
  },[]);
  const sendmessage=(a_array)=>{
    console.log("changed");
    setTimeout(function(){
      setarray(a_array);
    },100);
    setshowPopup(false);
    
  }
  useEffect(()=>{
    console.log("read array useEffect");
  },[array]);
  const closePopup=(ddd)=>{
    setshowPopup(false);
  }

  return (
    <div className="App">
      <Helmet>
        <title>電磁波シュミレーション</title>
        <meta name="description" content="簡単にFDTD電磁波シュミレーション" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>
      <Body>
        <Header>
        </Header>
        <Content setshowPopup={setshowPopup} array={array}>
        </Content>
        {showPopup && (
          <Popup trigger={showPopup} array={array} closePopup={closePopup} sendmessage={sendmessage} />
        )}

      </Body>
    </div>
  );
}

export default App;
