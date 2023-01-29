import java.awt.image.BufferedImage;
import java.awt.*;

public class Canvas {
  public WavePoint wavePoint;
  public ColorCode colorCode;

  public int dx;
  public int dz; 
  public int xnum;
  public int znum;
  public int Img_width;
  public int Img_height;
  public BufferedImage buffImg;
  public Graphics2D g2d;
  public Canvas(int Img_width,int Img_height,int bunkaino,FDTD_Input fdtd_Input){
    buffImg=new BufferedImage(Img_width,Img_height,BufferedImage.TYPE_3BYTE_BGR);
    g2d=buffImg.createGraphics();
    this.Img_width=Img_width;
    this.Img_height=Img_height;
    this.colorCode=new ColorCode(5.0);
    this.dx=bunkaino; //写真でのマス目の幅 [px]
    this.dz=bunkaino; //写真でのマス目の幅 [px]
    wavePoint=new WavePoint(fdtd_Input);
    xnum=fdtd_Input.get_xnum();
    znum=fdtd_Input.get_znum();
  }
  public BufferedImage get_canvas(boolean draw_ornot){
    g2d.setColor(Color.white);
    g2d.fillRect(0,0,Img_width,Img_height);
    wavePoint.cal();
    if(draw_ornot==false) {return buffImg;} //このbuffImgは何にも使われない
    double[][] Ey=wavePoint.getEy();
    for(int i=0;i<xnum;i++){
      for(int n=0;n<znum;n++){
        double aa=Ey[i][n];
        
        Color c=colorCode.get_color(aa);
        g2d.setColor(c);
        g2d.fillRect(i*dx,n*dx,dx,dx);

      }
    }
    return buffImg;
  }
}

