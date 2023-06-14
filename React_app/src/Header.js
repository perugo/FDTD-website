import styled from "styled-components";
const Container=styled.div`
  margin-bottom:5px;
  margin-left:10px;
`
const Letter=styled.h4`
  margin-top:3px;
  margin-bottom:3px;
  font-size:18px;
`
export const Header=()=> {
    return (
    <Container>
        <Letter>誰にでも、簡単に電磁波シュミレーション</Letter>
    </Container>
    )
  };
  