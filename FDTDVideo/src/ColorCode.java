import java.awt.Color;
public class ColorCode {
  private double r;
  public ColorCode(double r){
    this.r=r;
  }
  public Color get_color(double value){
    if(value == Double.POSITIVE_INFINITY || value==Double.NEGATIVE_INFINITY){
      value=r+1.0;
      System.out.println("INFINITY!!!");
    }
    double v=value/r;
    if(v>=1.0){v=1.0;}
    if(v<=0){v=0;}
    
    int r=get_R(v); //明るさ　暗さ調整がない RGB Color
    int g=get_G(v);
    int b=get_B(v);
    
    //r=brightness(r,v);
    //g=brightness(g,v);
    //b=brightness(b,v);
    Color c=new Color(r,g,b);
    return c;
  }
  
  private int get_R(double c){
    int r;
    if(c>=0.75){
      r=255;
    }else if(c>=0.5){
      r=(int)(255.0*4*c-510.0);
    }else{
      r=0;
    }
    return r;
  }
  private int get_B(double c){
    int b;
    if(c<=0.25){
      b=255;
    }else if(c<=0.5){
      b=(int)(-1*255.0*4*c+510.0);
    }else{
      b=0;
    }
    return b;
  }
  private int get_G(double c){
    int g;
    if(c>=0.25 && c<=0.75){
      g=255;
    }else if(c<0.25){
      g=(int)(255.0*4*c);
    }else{
      g=(int)(-1*255.0*4*c+1020.0);
    }
    return g;
  }
  public int brightness(int c1,double val) {
	  //c1 は元のRBG  valは強さ
	  int c;
	  if(val>=0) {
		  c=c1+(int)(-80.0*val+30.0);
	  }else {
		  c=c1+(int)(80.0*val+30.0);
	  }
	  if(c<=0) {c=0;}
	  if(c>=255) {c=255;}
	  return c;
  }
}
