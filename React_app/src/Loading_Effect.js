import React from 'react';
import styled from "styled-components";
import { useState,useEffect,useCallback } from 'react';

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
  min-height:400px;

`
const Middle_top=styled.div`
flex: 1;
`
const Middle_buttom=styled.div`
flex:1;
`
const MiddleBar=styled.div`
  min-width:400px;
  margin-left:auto;
  margin-right:auto;
  display:flex;
  flex-direction:column;
  height:max;
`

const Img_Wrapper=styled.div`
  height:200px;
  display:flex-inline;
`
const Img_Inner=styled.div`
  text-align:center;
  margin-left:auto;
  margin-right:auto;
  height:200px;
  width:200px;
`
const Middle_Inner=styled.div`
  display:flex;
  flex-direction:column;
`
const RightBar=styled.div`
  width:100%;
`

export default function Loading_Effect(){
  return(
    <PopupMain>
      <LeftBar>

      </LeftBar>
      <MiddleBar>
        <Middle_top/>
        <Middle>
          <Img_Wrapper>
            <Img_Inner>
              <img style={{ width: "100%", height: "100%" }} src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif" alt="loading..." />
            </Img_Inner>
          </Img_Wrapper>
          <Img_Wrapper>
            <Img_Inner style={{width:"400px",backgroundColor:"white",height:"auto"}}>
              <h3>画面下に動画ファイルが保存されます</h3>
            </Img_Inner>
          </Img_Wrapper>
        </Middle>

      <Middle_buttom/>
      </MiddleBar>
      <RightBar>
      </RightBar>
    </PopupMain>
  )
}