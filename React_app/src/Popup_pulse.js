import React from 'react';
import styled from "styled-components";
import { useState,useEffect,useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Select from "react-select";
import { hover } from '@testing-library/user-event/dist/hover';

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
const Middle_top=styled.div`
flex: 1;
`
const Middle_buttom=styled.div`
flex:1;
`
const MiddleBar=styled.div`
  min-width:330px;
  margin-left:auto;
  margin-right:auto;
  display:flex;
  flex-direction:column;
  height:max;
`

const Middle_Wrapper=styled.div`
  margin-left:10px;
  margin-bottom:20px;
`
const Middle_Inner=styled.div`
  display:flex;
  flex-direction:column;
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
const Head_Text=styled.div`
  width:250px;
`
const Head_button_Wrapper=styled.div`
  position:relative;
`
const Head_button_Inner=styled.div`
position: absolute;
top: 50%;
left: 50%;
-webkit-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
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
    font-weight: 600;
    letter-spacing: -.01em;
    line-height: 1.0;
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
`
const Head=styled.div`
  display:flex;
  flex-direction:row;
`
const Pulse_Wrapper=styled.div`
  display:flex;
  height:40px;
  margin-bottom:6px;
  position:relative;
`
const Combo_Wrapper=styled.div`
  width:200px;
`
const Img_Inner_hn=styled.img`
  position:absolute;
  width:100%;
  height:100%;
  &:hover img {
    display : 'true';
  }
`
const Img_Inner_ht=styled.img`
  position:absolute;
  width:100%;
  height:100%;
  &:hover img {
    display : 'hide';
  }
`
const Garbage_Inner=styled.div`
  position:relative;
  height:40px;
  width:50px;

`
const Icon_Wrapper=styled.div`
  width:29px;
  height:29px;
  margin-top:3px;
  margin-bottom:3px;
  margin:3px 8px 3px 3px;
`
const SVG_Wrapper=styled.div`
 border-radius:10px;
 background-color:pink;
 display:flex
 height:32px;
 width:45px;
 margin-top:3px;
 margin-bottom:3px;
 
 &:hover{
  background-Color:red;
 }
`
const SVG_Inner=styled.div`
  position:relative;
  width:40px;
  height:25px;
  margin:auto;
`
const Icon_Inner=styled.div`
  width:100%;
  height:100%;
`
const Configure_Wrapper=styled.div`
  display:flex;
  flex-direction:row;
`
const Row_buttons=styled.div`
  width:50%;
  text-align:center;
`
const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    minHeight: 35
  })
};
const Error_Code=styled.div`
`
export default function Popup_pulse({send_pulsearray,closePopup_array,a_pulse_array}){
  const [error_message,set_error_message]=useState('');
  const [pulse_array,set_pulse_array]=useState([]);
  const [hoveredItemId,setHoveredItemId]=useState('');
  useEffect(() => {
  },[]);
  useEffect(()=>{
    if(a_pulse_array ==null || a_pulse_array.length==0){return;}
    set_pulse_array(a_pulse_array);
  },[a_pulse_array])


  useEffect(()=>{
  },[pulse_array])

  const pulse_color_array=[
    {color:"rgb(255,0,0)"},
    {color:"rgb(0,255,0)"},
    {color:"rgb(0,0,255)"}
  ]
  const dddd=[
    {value:0,label :"0"},
    {value:1,label :"1/2π"},
    {value:2,label :"1π"},
    {value:3,label :"3/2π"}
  ];
  function Send(){
    send_pulsearray(pulse_array);
  }
  function check(){
    for(let i=0;i<pulse_array.length;i++){
      console.log(pulse_array[i].id+"  color : "+pulse_array[i].color);
    }
  }
  function handleHover(id){
    setHoveredItemId(id)
  }
  function handleLeave(){
    setHoveredItemId('');
  }
  function delete_Onclick(id){
    var tmp_arr=[];
    var t=0;

    if(pulse_array[0].id === id){
      setHoveredItemId('');
      return;
    }

    for(let i=0;i<pulse_array.length;i++){
      if(pulse_array[i].id === id){continue;}
      var dd={
        id:pulse_array[i].id,
        x:pulse_array[i].x,
        y:pulse_array[i].y,
        color:pulse_color_array[t].color,
        k:pulse_array[i].k
      };
      tmp_arr=[...tmp_arr,dd];
      t++;
    }
    
    set_pulse_array(tmp_arr);
    setHoveredItemId('');
  }
  function add(){
    if(pulse_array.length<3){
      var dd={
        id:uuidv4(),
        x:-1,
        y:-1,
        color:pulse_color_array[pulse_array.length].color,
        k:0
      };

      set_pulse_array(prevTodos=>{
        return [...prevTodos,dd]
      })
    }
  }
  function sendclosing(){
    closePopup_array();
  }
  function handleChange(index,event){
    pulse_array[index].k=event.value;
    set_pulse_array(pulse_array);
  }
  return(
    <PopupMain>
      <LeftBar onClick = {sendclosing}>

      </LeftBar>
      <MiddleBar>
        <Middle_top onClick={sendclosing} />
        <Middle>
        <Middle_Wrapper>
          <Middle_Inner>
            <Head>
              <Head_Text>
                <h4>給電点の設定</h4>
              </Head_Text>
            </Head>
            <div style={{height:"170px"}}>
            {pulse_array.map((t,index)=>{
              return(
                <Pulse_Wrapper key={t.id}>
                  <Garbage_Inner
                    onMouseEnter={()=> handleHover(index)}
                    onMouseLeave={handleLeave}
                    onClick={()=>{delete_Onclick(t.id)}}
                    >
                      {index !== 0 && hoveredItemId !== index && (
                        <SVG_Wrapper style={{height:"32px" ,backgroundColor:"white"}}>
                          <SVG_Inner>
                            <Img_Inner_hn src={`${window.location.origin}/trash_close.svg`} style={{ marginBottom:"3px"}} alt="React Logo"/>
                          </SVG_Inner>
                        </SVG_Wrapper>
                      )}
                      {index !== 0 && hoveredItemId === index && (
                        <SVG_Wrapper style={{height:"32px",backgroundColor:"gray"}}>
                          <SVG_Inner>
                            <Img_Inner_ht src={`${window.location.origin}/trash_open_white.svg`} style={{  }} alt="React Logo"/>
                          </SVG_Inner>
                        </SVG_Wrapper>
                      )}
                      
                    
                  </Garbage_Inner>
                  <Icon_Wrapper>
                    <Icon_Inner style={{backgroundColor:pulse_array[index].color }}></Icon_Inner>
                  </Icon_Wrapper>
                  <Combo_Wrapper key={index}>
                    <Select options={dddd} styles={customStyles} defaultValue={dddd[pulse_array[index].k]} onChange={(event) => handleChange(index, event)} />
                  </Combo_Wrapper>
                </Pulse_Wrapper>
              );
            })}
            </div>
            <Error_Code>{error_message}
            </Error_Code>
            <Configure_Wrapper>
              <Row_buttons>
              <Setting_Wrapper style={{display:'inline-block'}}>
                {pulse_array.length <3 && (
                <Button_setting onClick={add}>給電点を追加</Button_setting>
                )}
              </Setting_Wrapper>
              </Row_buttons>
              <Row_buttons>
              <Setting_Wrapper sytle={{display:'inline-block'}}>
                <Button_setting onClick={Send} >設定を更新
                </Button_setting>
              </Setting_Wrapper>
              </Row_buttons>
            </Configure_Wrapper>
          </Middle_Inner>
        </Middle_Wrapper>


      </Middle>
      <Middle_buttom onClick={sendclosing} />
      </MiddleBar>
      <RightBar onClick = {sendclosing}>

      </RightBar>
    </PopupMain>
  )
}