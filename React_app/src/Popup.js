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
  min-height:450px;
  background-color:#FFEBCD;

`
const P_label=styled.p`
  font-size:1.0rem;
  margin-block-start:0.8em;
  margin-block-end:0.5em;
  font-weight: 500;
`
const MiddleBar=styled.div`
  min-width:330px;
  margin-left:auto;
  margin-right:auto;
  display:flex;
  flex-direction:column;
  height:max;
`
const Middle_top=styled.div`
flex:1;
`
const Middle_buttom=styled.div`
flex:1;
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
  min-height:22px;
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
    font-size: 1.0rem;
    font-weight: 500;
    letter-spacing: -.01em;
    line-height: 0.9;
    padding: 0.75rem 1.0rem;
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
//trigger
export default function Popup({send_array,closePopup,array}){
  const [field_x,setfield_x]=useState(array.field_x);
  const [field_y,setfield_y]=useState(array.field_y);
  const [split,setsplit]=useState(array.split);
  const [feq,setfeq]=useState(array.feq);
  const [error_message,set_error_message]=useState('');
  const re = /^[0-9\b]+$/;
  useEffect(() => {
  },[]);
  function Send(){
    if(field_x =="" || field_y=="" || split=="" || feq==""){
      set_error_message("空の入力値があります");
      return;
    }
    if(field_x>500 || field_y>500 || split>400 || feq>990000){
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
    if(split<=100){
      set_error_message("x軸の分割数が小さすぎます");
      return;
    }
    if(split%3 != 0){
      set_error_message("x軸の分割数は３で割り切れる数字に設定してください");
      return;
    }
    var array2={
        "field_x":field_x,
        "field_y":field_y,
        "split":split,
        "feq":feq
    };
    send_array(array2);
  }
  function sendclosing(){
    closePopup();
  }
  

  return(
    <PopupMain>
      <LeftBar onClick = {sendclosing}>

      </LeftBar>
      <MiddleBar>
      <Middle_top onClick={sendclosing} />
      <Middle>
        
        <Middle_Wrapper>
          <h4>設定項目</h4>
          <Textarea_Wrapper>
            <P_label>x軸の空間長[cm]</P_label>
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
            <P_label>y軸の空間長[cm]</P_label>
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
            <P_label>x軸の分割数</P_label>
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
            <P_label>周波数[MHz]</P_label>
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
      <Middle_buttom onClick={sendclosing} />
      </MiddleBar>
      <RightBar onClick = {sendclosing}>

      </RightBar>
    </PopupMain>
  )
}