import styled from "styled-components";
import { useRef,useState,useEffect } from 'react';
import { React } from 'react';

const Canvas2=styled.canvas`
  position:absolute;
  top:0;
  left:0;
  opacity:0.7;
`
const Canvas3=styled.canvas`
  position:absolute;
  top:0;
  left:0;
  opacity:0.;
`
const Canvas4=styled.canvas`
  position:absolute;
  top:0;
  left:0;
  opacity:1.0;
`
const Container=styled.div`
  margin-bottom:10px;
  margin-left:10px;
  position:relative;
  display: inline-block;
  display:flex;
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
    line-height: 1.3;
    padding: 0.75rem 0.75rem;
    position: relative;
    text-align: left;
    text-decoration: none;
    transform: translateZ(0) scale(1);
    transition: transform .2s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    &:disabled {
        color: #787878;const Canvas1=styled.canvas
        position:absolute;
        top:0;
        left:0;
        opacity:1.0;
      
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
  background-color:pink;
  width:300px;
  min-width:300px;
`
const Layout_Wrapper=styled.div`
`
const Setting_Inner=styled.div`
`
const Radio_Wrapper=styled.div`
  margin:top:10px;
  margin-left:10px;
  margin-right:10px;
`
const Radio_column=styled.div`
`
const Button_Wrapper=styled.div`
  margin-top:20px;
  margin-bottom:10px;
  text-align: center
  width:50%;
`
const Setting_popup=styled.div`
  width:50%;
`
const Setting_Info=styled.div`
  margin-left:10px;
  margin-right:10px;  
`

const Setting_setbut=styled.div`
  positoin:flex;
  display:flex;
  display:row;
`
const Label=styled.label`
  font-size: 15px;
`
const ArrowImg_Inner=styled.div`
width:70px;
height:60px;
margin-left:auto;
margin-right:auto;
margin-top:10px;
margin-bottom:10px;
`
const ArrowImg=styled.img`
width:100%;
height:100%;
`
const Setting_result=styled.div`
  margin-left:10px;
  margin-right:10px;
`
const Button_download_Wrapper=styled.div`
margin-top:10px;
margin-bottom:10px;
text-align: center
`
const Button_download=styled.div`
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
const Letter=styled.h4`
margin-top:5px;
margin-bottom:10px;
`
const Letter2=styled.h4`
margin-top:15px;
`
var canvas3;
var canvas2;
var canvas1;
var ctx1;
var ctx2;
var ctx3;

var drag; //ユーザーがマウスを押している状態かを取得する
var drag_source;//ユーザーが赤い点をドラッグ操作しているかを取得する
var canvas_dx;
var canvas_dy;
var source_x;
var source_y;
var start_x; //ユーザーがマウスを押し始めたx座標
var start_y; //ユーザーがマウスを押し始めたy座標
var end_x; //ユーザーが現在マウスを押しているx座標
var end_y; //ユーザーが現在マウスを押しているy座標
var object_index; //ユーザーが選択している障害物のindex
var c=299792458;
var xnum;
var ynum;
export const Content=({setshowPopup,array})=> {
    var [width,setwidth]=useState('');
    var [height,setheight]=useState('');
    var [field_x,setlb_field_x]=useState('');
    var [field_y,setlb_field_y]=useState('');
    var [feq,set_feq]=useState('');
    var [lb_feq,set_lb_feq]=useState('');
    var [lb_dx,set_lb_dx]=useState('');
    var [lb_dy,set_lb_dy]=useState('');
    var [dx,set_dx]=useState('');
    var [dy,set_dy]=useState('');
    var [lb_lambda,set_lb_lambda]=useState('');
    var [lb_lambda_dx,set_lb_lambda_dx]=useState('');
    var [lb_object_index,set_object_index]=useState('');
    var [bitmap,set_bitmap]=useState([]);

    const handleRadioChange=(e)=>{
      object_index=e.target.value;
      set_object_index(e.target.value);
    }
    function clicked(){
      setshowPopup(true);
    }
    function form_buttom_clicked(){
      set_bitmap(bitmap);
      set_feq(feq);
      setTimeout(function(){
        console.log("source_x : "+source_x);
        console.log("source_y : "+source_y);
        document.getElementById("bitmap").value=bitmap;
        document.getElementById("xnum").value=xnum;
        document.getElementById("ynum").value=ynum;
        document.getElementById("dx").value=Math.floor(dx*10000,0);
        document.getElementById("frequency").value=feq;
        document.getElementById("source_x").value=source_x;
        document.getElementById("source_y").value=source_y;
        setTimeout(function(){
          let form = document.getElementById("form__submit");
          form.submit();
        },500);
      },300)
      

    }
    useEffect(()=>{
      if (array !== undefined && array !== null && array.field_x>=10) {
        console.log('✅ variable is NOT undefined or null');
      }else{
        return;
      }
      async function fff0(){
      canvas3 = document.getElementById("canvas3");
      canvas2 = document.getElementById("canvas2");
      canvas1 = document.getElementById("canvas1");
      ctx3 = canvas3.getContext("2d");
      ctx2 = canvas2.getContext("2d");
      ctx1 = canvas1.getContext("2d");
      object_index=1;
      }
      async function fff1(){
        setlb_field_x(array.field_x); //x軸の空間長は100cm
        setlb_field_y(array.fiel_y); //ｙ軸の空間長はx軸の2/3
        set_feq(array.feq);
      }
      async function f1(){
        xnum=array.split;
        feq=array.feq;
        field_y=array.field_y;
        field_x=array.field_x;
      }
      async function f2(){
        dx=field_x/xnum;
        set_dx(dx);
        dy=dx;
        set_dy(dy);
      }
      async function f3(){
        ynum=Math.ceil(field_y/dy); //y軸の分割数
        console.log("ynummmmm : "+ynum);
      }
      async function f4(){

        field_y=ynum*dy;//y軸の空間長
        setlb_field_y(field_y);
      }
      async function f5(){
        width =window.innerHeight*0.9*1.5;
        
        canvas_dx=width/xnum;
        canvas_dy=canvas_dx;
        height=canvas_dy*ynum;
      }
      async function f51(){
        setwidth(width);
        setheight(height);
        setlb_field_x(field_x);
        var fff = Math.floor( field_y * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 ) ;
        setlb_field_y(fff);
        console.log("canvas_dx ; "+canvas_dx);
        
        set_lb_feq(make_lb_feq(feq));
        set_lb_dx(make_distance(dx));
        set_lb_dy(make_distance(dy));
        set_lb_lambda(make_distance(c/feq/1000000*100));
        set_lb_lambda_dx( Math.floor( ((c/feq/1000000*100)/dx) * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 ) );
        set_object_index(1);
        drag=false; //マウスは現在押されていないと設定する
        drag_source=false;
      }
      async function f6(){
        setTimeout(function(){
          console.log("source_x : "+Math.floor(xnum/2));
          source_x=Math.floor(xnum/2);
          console.log("source_y : "+Math.floor(ynum/2));
          source_y=Math.floor(Math.floor(ynum/2));
        },200)
      }
      async function f7(){
        canvas1.addEventListener('mousedown',on_mousedown,false); //canvas内でマウスを押した際、on_mousedown()メソッドを実行するアクションリスナーを作る
        canvas1.addEventListener('mousemove',on_mousemove,false); //canvas内でマウスを動かした際、on_mousemove()メソッドを実行するアクションリスナーを作る
        canvas1.addEventListener('mouseup',on_mouseup,false);
        console.log("ynum is :"+ynum);
        bitmap=twoDimensionArray(xnum,ynum);
      }
      async function f8(){
        setTimeout(function(){
          draw_canvas_background();
        },200);
      }
      async function f9(){
        setTimeout(function(){
          draw();
        },200);
      }
      fff0();
      fff1();
      f1();
      f2();
      f3();
      f4();
      f5();
      f51();
      f6();
      f7();
      f9();
      f8();
    },[array]);
    useEffect(()=>{
      console.log("reading bitmap useEffect");
    },[bitmap]);
    function on_mousedown(e){ /*マウスを押した際、実行される
                            init()で作成されたアクションリスナ*/
      if(drag==false){
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var index_x=Math.floor(x/canvas_dx);
        var index_y=Math.floor(y/canvas_dy);
        if(drag_source==false && source_x==index_x && source_y==index_y){
          drag_source=true;
          console.log("one_mousedown equal");
        }else if(x<=width && y<=height && drag_source==false){
          console.log("one_mousedown not equal");
          start_x=x; start_y=y;
          end_x=start_x; end_y=start_y;
          bitmap_set(start_x/canvas_dx,start_y/canvas_dy,object_index);
          draw();
          drag=true;
        }
      }
    }

    function on_mousemove(e){/*マウスを動かした際、実行される
                            init()で作成されたアクションリスナ*/
      if(drag_source){
        var rect = e.target.getBoundingClientRect();
        var x = (e.clientX - rect.left);
        var y = (e.clientY - rect.top);
        var index_x=Math.floor(x/canvas_dx);
        var index_y=Math.floor(y/canvas_dy);
        if(index_x>=0 && index_x<xnum && index_y>=0 && index_y<ynum){
          source_x=index_x;
          source_y=index_y;
          draw_red();
        }
      }else if(drag){
        var rect = e.target.getBoundingClientRect();
        end_x = e.clientX - rect.left;
        end_y = e.clientY - rect.top;
        draw();
      }
    }
    function on_mouseup(e){ /*マウスを離した際、実行される
                              init()で作成されたアクションリスナ*/
      drag=false;
      drag_source=false;
      draw();
    }
    function twoDimensionArray(a,b){ /*bitmapを作成するメソッド
                                      init(),set_bitmap()が実行する*/
      console.log("a : "+a);
      console.log("b : "+b);
      var x=new Array(a);
      for(var i=0;i<a;i++){
          x[i]=new Array(b);
      }
      for(var i=0;i<a;i++){
        for(var n=0;n<b;n++){
          x[i][n]=0;
        }
      }
      return x;
    }
    function draw_canvas_background(){ //各格子の枠線と格子全体の枠線を描写するメソッド
      console.log("draw_canvas_background");
      console.log("xnum : "+xnum);
      console.log("ynum : "+ynum);
      console.log("width : "+width +"   height : "+height);
      console.log("canvas_dx : "+canvas_dx);
      console.log("canvas_dy : "+canvas_dy);
      ctx2.clearRect(0,0,width,height); //clearRect()は描写をクリアする
      line(0,1,width,1,3,"black");
      line(1,0,1,height,3,"black");
      line(0,height-1,width,height-1,3,"black");
      line(width-1,0,width-1,height,3,"black");

      /*各格子の枠線を描写*/
      for(var i=0;i<xnum;i++){
        line(canvas_dx*i,0,canvas_dx*i,height,1,"black");
      }
      for(var i=0;i<ynum;i++){
        line(0,canvas_dy*i,width,canvas_dy*i,1,"black");
      }
      /*線を描写する内部メソッド*/
      function line(x1,y1,x2,y2,w,col){
        ctx2.strokeStyle=col;
        ctx2.lineWidth=w;
        ctx2.beginPath();
        ctx2.moveTo(x1,y1);
        ctx2.lineTo(x2,y2);
        ctx2.stroke();
      }
      console.log("canvas background finished");
    }
    function bitmap_set(x,y,i){ /*bitmap(x,y)の値を書き換えるメソッド
                           on_mousedown(),draw()によって実行される*/
      var index_x=Math.floor(x);
      var index_y=Math.floor(y);
      console.log(index_x);
      console.log(index_y);
      bitmap[index_x][index_y]=i;
      set_bitmap(bitmap);
      ctx3.fillStyle=object_array[i].color;
      ctx3.fillRect(index_x*canvas_dx,index_y*canvas_dy,canvas_dx,canvas_dy);
    }
    
    function draw_red(){
      ctx1.clearRect(0,0,width,height);
      ctx1.fillStyle="rgb(255,0,0)";
      ctx1.fillRect( Math.floor(source_x)*canvas_dx, Math.floor(source_y)*canvas_dy,canvas_dx,canvas_dy);
    }
    function draw(){ //マウス選択範囲の四角形と各格子を描写するメソッド
      //on_mouseup(),on_mousedown(),on_mousemove()メソッドによって実行される
      if(drag){
        var disp_x;
        var disp_y;
        var w;
        var h;
        if(start_x<end_x){
          disp_x=start_x;
          w=end_x-start_x;
        }else{
          disp_x=end_x;
          w=start_x-end_x;
        }
        if(start_y<end_y){
          disp_y=start_y;
          h=end_y-start_y;
        }else{
          disp_y=end_y;
          h=start_y-end_y;
        }
        for(var i=Math.floor(disp_x/canvas_dx);(disp_x+w)/canvas_dx>=i;i++){
          for(var n=Math.floor(disp_y/canvas_dy);(disp_y+h)/canvas_dy>=n;n++){
            bitmap_set(i,n,object_index); //マウス選択範囲を元に、bitmapに値を挿入する
          }
        }
      }else{
      }

      ctx1.clearRect(0,0,width,height);
      ctx1.fillStyle="rgb(255,0,0)";
      ctx1.fillRect( Math.floor(source_x)*canvas_dx, Math.floor(source_y)*canvas_dy,canvas_dx,canvas_dy);
    }

    function make_lb_feq(a_feq){
      var feq_figure="";
      var feq_dipnum=0;
      if(a_feq<1000){
        feq_figure="MHz";
        feq_dipnum=a_feq;
      }else if(a_feq<1000000){
        feq_figure="GHz";
        feq_dipnum=a_feq/1000;
      }else{
        feq_figure="error";
      }
      return feq_dipnum+feq_figure;
    }

    function make_distance(a_space){
      var space_figure="";
      var space_dispnum=0;
      if(a_space>=1.0){
        space_figure="cm";
        space_dispnum=a_space;
      }else if(a_space>=0.1){
        space_figure="mm";
        space_dispnum=a_space*10;
      }else if(a_space>=0.0001){
        space_figure="μm";
        space_dispnum=a_space*10000;
      }else if(a_space>=0.0000001){
        space_figure="nm";
        space_dispnum=a_space/10000000;
      }else{
        space_figure="error";
      }
      space_dispnum = Math.floor( space_dispnum * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 ) ;
      return space_dispnum+space_figure;
    }
    const object_array=[
      {index:0, name: "空気" ,color: "rgb(255,255,255)"},
      {index:1, name: "金属" ,color: "rgb(0,0,0)"},
    ]


    return(
      <Container>
        <Layout_Wrapper>
          <div style={{ width:width+"px", height:height+"px" }}>
            <Canvas2 id="canvas3"  width={width} height={height} />
            <Canvas3 id="canvas2" width={width} height={height} />
            <Canvas4 id="canvas1" width={width} height={height} />
          </div>
        </Layout_Wrapper>
        <Setting_Wrapper>
          <Setting_Inner>
            <Radio_Wrapper>
              <Letter>障害物の設置</Letter>
              <Radio_column>
                <Label><input type="radio" className="group" value={0}  checked={ 0 == lb_object_index} onChange={handleRadioChange}/>空気</Label>
              </Radio_column>
              <Radio_column>
                <Label><input type="radio" className="group" value={1} checked={ 1 == lb_object_index} onChange={handleRadioChange}/>金属</Label>
              </Radio_column>
            </Radio_Wrapper>
            

            <Setting_Info>
              <Setting_setbut>
                <Setting_popup>
                  <Letter2>設定項目</Letter2>
                </Setting_popup>
                <Button_Wrapper>
                  <Button_setting onClick={clicked}>設定を開く</Button_setting>
                </Button_Wrapper>
              </Setting_setbut>
              <div>
              <Label>x軸の空間長 : {field_x}cm</Label>
              </div>
              <div>
              <Label>y軸の空間長 : {field_y}cm</Label>
              </div>
              <div>
              <Label>周波数 : {lb_feq}</Label>
              </div>
              <div>
              <Label>x軸の分割数 : {xnum}</Label>
              </div>
            </Setting_Info>
            <ArrowImg_Inner>
              <ArrowImg src={`${window.location.origin}/arrow.png`}></ArrowImg>
            </ArrowImg_Inner>
            <Setting_result>
              <div>
                <Label>y軸の分割数 : {ynum}</Label>
              </div>
              <div>
                <Label>dx : {lb_dx}</Label>
              </div>
              <div>
                <Label>dy : {lb_dy}</Label>
              </div>
              <div>
                <Label>波長 : {lb_lambda}</Label>
              </div>
              <div>
                <Label style={{fontWeight:'bold'}}>波長/dx : {lb_lambda_dx}</Label>
              </div>
              <p>波長/dxの値は8以上,20以下が推奨です</p>
            </Setting_result>
            <Button_download_Wrapper>
              <Button_download onClick={form_buttom_clicked}>シュミレーション実行</Button_download>
            </Button_download_Wrapper>
            <form id="form__submit" action="/download.php" method="POST">
              <input type="hidden" id="bitmap" name="bitmap"/>
              <input type="hidden" id="xnum" name="xnum"/>
              <input type="hidden" id="ynum" name="ynum"/>
              <input type="hidden" id="dx" name="dx"/>
              <input type="hidden" id="frequency" name="frequency"/>
              <input type="hidden" id="source_x" name="source_x"/>
              <input type="hidden" id="source_y" name="source_y"/>
            </form>
          </Setting_Inner>
        </Setting_Wrapper>
      </Container>
    )
  };