import java.awt.image.BufferedImage;
import java.awt.*;

public class Canvas {
  public FDTD2D_PML fdtd2DPML;
  public ColorCode colorCode;

  public int dx;
  public int dz; 
  public int nx;
  public int ny;
  public int Img_width;
  public int Img_height;
  public BufferedImage buffImg;
  public Graphics2D g2d;
  public int lpml;
  public Canvas(int Img_width,int Img_height,int bunkaino,FDTD_Input fdtd_Input){
    buffImg=new BufferedImage(Img_width,Img_height,BufferedImage.TYPE_3BYTE_BGR);
    g2d=buffImg.createGraphics();
    this.Img_width=Img_width;
    this.Img_height=Img_height;
    this.colorCode=new ColorCode(0.3);
    this.dx=bunkaino; //写真でのマス目の幅 [px]
    fdtd2DPML =new FDTD2D_PML(fdtd_Input);
    nx=fdtd_Input.get_nx();
    ny=fdtd_Input.get_ny();
    lpml=fdtd_Input.get_lpml();
  }
  public BufferedImage get_canvas(){
    fdtd2DPML.cal();
    double[][] Ez= fdtd2DPML.get_Ez();
    for(int i=0;i<nx;i++){
      for(int n=0;n<ny;n++){
        double aa=Ez[i][n];
        
        Color c=colorCode.get_color(aa);
        g2d.setColor(c);
        g2d.fillRect(i*dx,n*dx,dx,dx);

      }
    }

    g2d.setColor(new Color(80,80,80));
    g2d.drawLine(lpml*dx, lpml*dx, (nx-lpml)*dx, lpml*dx);
    g2d.drawLine(lpml*dx, lpml*dx, lpml*dx, (ny-lpml)*dx);
    g2d.drawLine((nx-lpml)*dx, lpml*dx, (nx-lpml)*dx, (ny-lpml)*dx);
    g2d.drawLine(lpml*dx, (ny-lpml)*dx, (nx-lpml)*dx, (ny-lpml)*dx);

    return buffImg;
  }
  public void calc(){
    fdtd2DPML.cal();
  }
}

