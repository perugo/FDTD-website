import styled from "styled-components";
const Container=styled.div`
  margin-bottom:5px;
  margin-left:10px;
`
const Letter=styled.h3`
  margin-top:5px;
  margin-bottom:5px;
  font-size:20px;
`
export const Header=()=> {
    return (
    <Container>
        <Letter>誰でも、簡単に電磁波シュミレーション</Letter>
    </Container>
    )
  };
  