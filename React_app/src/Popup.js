import React from 'react';
import styled from "styled-components";
import { useState,useEffect } from 'react';
const BASE_FONT_FAMILY = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif';
const BASE_FONT_WEIGHT = '20px';

const PopupMain=styled.div`
  position:absolute;
  width:100%;
  height:100%;
  background-color:transparent;
  display: flex;

`
const LeftBar=styled.div`
  width:100%;
`
const Middle=styled.div`
  height:600px;
  min-height:600px;
  background-color:#FFEBCD;

`
const MiddleBar=styled.div`
  width:400px;
  min-width:400px;
  margin-left:auto;
  margin-right:auto;
  display:grid;
`

const Middle_Wrapper=styled.div`
  margin-left:10px;
  margin-bottom:20px;
`
const RightBar=styled.div`
  width:100%;
`
const Textarea_Wrapper=styled.div`
  width:50%;
  margin:5px;
`
const Taskname_textarea=styled.textarea`
  border-radius:0;
  display:block;
  height:100%;
  outline:0;
  overflow:hidden;
  position:absolute;
  resize:none;
  top:0;
  width:100%;
  white-space:pre;
  outline:0;

  border:0;
  font-size:14px;
  line-height:20px;
  margin:0;
  min-width:20px;
  padding:0 4px;
  text-rendering:optimizeSpeed;
  font-family:${BASE_FONT_FAMILY};
  font-size:${BASE_FONT_WEIGHT};
`
const Input_Wrapper=styled.div`
  position:relative;
  min-width:100px;
  min-height:30px;
`
const Button_setting=styled.div`
    backface-visibility: hidden;
    background: #332cf2;
    border: 0;
    border-radius: .375rem;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: Circular,Helvetica,sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -.01em;
    line-height: 1.3;
    padding: 1.0rem 1.25rem;
    position: relative;
    text-align: left;
    text-decoration: none;
    transform: translateZ(0) scale(1);
    transition: transform .2s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:disabled {
        color: #787878;
        cursor: auto;
      }
     
    &:not(:disabled):hover {
        transform: scale(1.05);
      }
     
    &:not(:disabled):hover:active {
        transform: scale(1.05) translateY(.125rem);
      }
     
    &:focus {
        outline: 0 solid transparent;
      }
     
    &:focus:before {
        border-width: .125rem;
        content: "";
        left: calc(-1*.375rem);
        pointer-events: none;
        position: absolute;
        top: calc(-1*.375rem);
        transition: border-radius;
        user-select: none;
      }
     
    &:focus:not(:focus-visible) {
        outline: 0 solid transparent;
      }
     
    &:not(:disabled):active {
        transform: translateY(.125rem);
    }
`
const Setting_Wrapper=styled.div`
  position:relative;
  margin-left:auto;
  margin-right:auto;
  width:300px;
  min-width:300px;

`

const Error_Code=styled.div`
`
export default function Popup({sendmessage,closePopup,array}){
  const [field_x,setfield_x]=useState(array.field_x);
  const [field_y,setfield_y]=useState(array.field_y);
  const [split,setsplit]=useState(array.split);
  const [feq,setfeq]=useState(array.feq);
  const [error_message,set_error_message]=useState('');
  const [soto,setsoto]=useState('');
  const [naka,setnaka]=useState("600px");
  const re = /^[0-9\b]+$/;
  useEffect(() => {
    var u=(window.innerHeight-600)/2;
    console.log("u is :"+u);
    u=u+"px"
    setsoto(u);
    setnaka("600px");
    console.log("from popup array.field_x is :"+array.field_x);
    console.log("from popup array.field_x is :"+array.field_y);
    console.log("from popup array.field_x is :"+array.feq);
    console.log("from popup array.field_x is :"+array.split);

  },[]);
  function Send(){
    if(field_x =="" || field_y=="" || split=="" || feq==""){
      set_error_message("空の入力値があります");
      return;
    }
    if(field_x>500 || field_y>500 || split>200 || feq>990000){
      set_error_message("既定値よりも大きすぎる数字があります");
      return;
    }
    if(field_x>(field_y*3)){
      set_error_message("y軸の空間長に比べて、x軸の空間長が長すぎます");
      return;
    }
    if(field_y>(field_x*3)){
      set_error_message("x軸の空間長に比べて、y軸の空間長が長すぎます");
      return;
    }

    var array2={
        "field_x":field_x,
        "field_y":field_y,
        "split":split,
        "feq":feq
    };
    console.log("Popup field_x : "+field_x);
    console.log("Popup filed_y : "+field_y);
    console.log("Popup split : "+split);
    console.log("feq : "+feq);
    sendmessage(array2);
  }
  function sendclosing(){
    closePopup("fffg");
  }
  return(
    <PopupMain>
      <LeftBar onClick = {sendclosing}>

      </LeftBar>
      <MiddleBar>
        <div onClick={sendclosing} style={{height:soto}}/>
      <Middle style={{height:naka}}>
        <Middle_Wrapper>
          <h2>設定項目</h2>
          <Textarea_Wrapper>
            <h3>x軸の空間長 : </h3>
            <Input_Wrapper>
              <Taskname_textarea
                        id="field_x"
                        field_x={field_x}
                        onKeyPress={e => {
                            if(e.key === 'Enter' || !re.test(e.key))
                              e.preventDefault()
                        }}
                        onChange={(e)=> setfield_x(e.target.value)}
                        defaultValue={field_x}     
              />
            </Input_Wrapper>
          </Textarea_Wrapper>
        <Textarea_Wrapper>
            <h3>y軸の空間長 : </h3>
            <Input_Wrapper>
            <Taskname_textarea
                      id="field_y"
                      field_y={field_y}
                      onKeyPress={e => {
                          if(e.key === 'Enter' || !re.test(e.key))
                            e.preventDefault()
                      }}長すぎます
                      onChange={(e)=> setfield_y(e.target.value)}
                      defaultValue={field_y}
            />
          </Input_Wrapper>
        </Textarea_Wrapper>
        <Textarea_Wrapper>
            <h3>x軸の分割数 : </h3>
            <Input_Wrapper>
            <Taskname_textarea
                      id="split"
                      split={split}
                      onKeyPress={e => {
                          if(e.key === 'Enter' || !re.test(e.key))
                            e.preventDefault()
                      }}
                      onChange={(e)=> setsplit(e.target.value)}
                      defaultValue={split}
            />
          </Input_Wrapper>
        </Textarea_Wrapper>
        <Textarea_Wrapper>
            <h3><code>周波数[MHz] : </code></h3>
            <Input_Wrapper>
            <Taskname_textarea
                      id="feq"
                      feq={feq}
                      onKeyPress={e => {
                          if(e.key === 'Enter' || !re.test(e.key))
                            e.preventDefault()
                      }}
                      onChange={(e)=> setfeq(e.target.value)}
                      defaultValue={feq}
            />
          </Input_Wrapper>
        </Textarea_Wrapper>
        </Middle_Wrapper>
        <Error_Code>{error_message}
        </Error_Code>
        <Setting_Wrapper>
          <Button_setting onClick={Send} >設定を更新
          </Button_setting>
        </Setting_Wrapper>
      </Middle>
      <div onClick={sendclosing} style={{height:soto}} />
      </MiddleBar>
      <RightBar onClick = {sendclosing}>

      </RightBar>
    </PopupMain>
  )
}