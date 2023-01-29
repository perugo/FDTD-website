import java.lang.Math;
public class WavePoint {
  public double dt; //time step for each calculation
  public double c; //speed of light [m/s]
  public int xnum; //Grid Dimension of x direction
  public int znum; //Grid Dimension of z direction
  public double t; //time of now. Gets added by t+=dt
  public double[][] Ey; //field matrices of Ey
  public double[][] Hx; //field matrices of Hx
  public double[][] Hz; //field matrices of Hz
  public double dx; //grid step of x field
  public double dz; //grid step of z field
  public double ca; //物体ごとのca
  public double cb; //物体ごとのcb

  public double E0; //真空中の誘電率 [F/nm]
  public double Er; //比誘電率
  public double M0; //真空中の透磁率 [H/m]
  public double Mr; //比透磁率
  public double[][] cay; //フィールド上に各caの値を格納した二次元配列
  public double[][] cby; //フィールド上に各cbの値を格納した二次元配列
  public double feq; //振動数
  public double DTZMR; //磁界FDTD差分式の係数計算
  public double DTXMR; //磁界FDTD差分式の係数計算
  public int IWX; //入力信号のX座標
  public int IWZ; //入力信号のZ座標


  public double HXINDT; //磁界節点一がΔz/2ずれていることによる時間遅延
                        //磁界が電界よりΔt/2ずれていることによる時間遅延
  public double ZTE; //TE波の特性インピーダンス
  public int[][] bitmap;
  public double ey_double; //input of Ey
  public double hx_double; //input of Hx
  public double keep_ey0;  //励振 of Ey
  public double keep_hx0; //励振 of Hx

  public double[] MUR_XButtom; //Keeps bottom of x field for Mur
  public double[] MUR_XTop; //Keeps top of x field for Mur

  public double[] MUR_ZButtom; //Keeps bottom of z field for Mur
  public double[] MUR_ZTop; //Keeps top of z field for Mur
  public int simulation_num;
  public WavePoint(FDTD_Input fdtd_input){
    xnum=fdtd_input.get_xnum(); //x軸方向の格子の数
    System.out.println("xnum : "+xnum);
    znum=fdtd_input.get_znum(); //z軸方向の格子の数
    System.out.println("znum : "+znum);
    dx=fdtd_input.get_dx(); //x軸の空間離散間隔の定義 [m]
    dz=fdtd_input.get_dz(); //z軸の空間離散間隔の定義 [m]
    feq= fdtd_input.get_feq(); //[振動/fs]
    System.out.println("fed : "+feq);
    //feq=10e9;
    bitmap=fdtd_input.get_bitmap();

    IWZ =znum/2;
    IWX =xnum/2;

    c=2.99792458*10e8; //光速　nm/fs


    
    dt=(1/ (c*Math.sqrt( 1/(dx*dx)+ 1/(dz*dz) ) ) )*0.9;

    Ey=new double[xnum][znum];
    Hx=new double[xnum][znum];
    Hz=new double[xnum][znum];
    
    for(int i=0;i<xnum;i++){
      for(int n=0;n<znum;n++){
        Ey[i][n]=0.0;
        Hx[i][n]=0.0;
        Hz[i][n]=0.0;
      }
    }
    E0=8.8541878128e-12;  //真空中の誘電率[F/nm] 
    Er=1.0;// 比誘電率
    M0=0.125663706e-6; //真空中の透磁率 [H/nm]
    Mr=1.0; //比透磁率


    //TT=1.0/feq/dt; //入力信号がsin波の時の分割数

    ca=1.0;  //磁界Eyを求めるために必要な係数 障害物ごとにcaの値は異なる
    cb=dt/(E0*Er); //磁界Eyを求めるために必要な係数　障害物ごとにcbの値は異なる

    t=0.0;
    cay=new double[xnum][znum];
    cby=new double[xnum][znum];
    for(int i=0;i<xnum;i++){
      for(int n=0;n<znum;n++){
    	if(bitmap[i][n]==1) {
    		cay[i][n]=0.0;
    		cby[i][n]=0.0;
    	}else {
            cay[i][n]=ca;
           cby[i][n]=cb;
    	}
      }
    }
    /*磁界FDTD差分式の係数計算 */
    DTZMR=dt/dz/M0/Mr;
    DTXMR=dt/dx/M0/Mr;
    /*付加励振における磁界入力の時間遅延の計算 */
    HXINDT=-dz/2.0/c/dt-0.5; //磁界節点一がΔz/2ずれていることによる時間遅延
                         //磁界が電界よりΔt/2ずれていることによる時間遅延
    ZTE=Math.sqrt(M0/E0); //TE波の特性インピーダンス
    
    MUR_XButtom =new double[xnum];
    MUR_XTop =new double[xnum];

    MUR_ZButtom =new double[znum];
    MUR_ZTop =new double[znum];
    simulation_num=0;
  }
  public double[][] getEy(){
    return Ey;
  }
  public void cal(){
    inject_wave();
    cal_reishin_Ey();
    mur_keep_ey();
    cal_Ey();
    mur_calculation();
    cal_reishin_Hx();
    cal_Hx();
    cal_Hz();
    t+=dt;
    simulation_num++;
  }
  private void inject_wave(){ //input of sin wave
	  
	ey_double=Math.sin(Math.PI*2.0*feq*t);
	hx_double=Math.sin(Math.PI*2.0*feq*(t+dt/2));
    if(simulation_num%10==0){
      System.out.println(ey_double);
    }
  }
  private void cal_reishin_Ey(){  //励振のための電界の保存
    keep_ey0=Ey[IWX][IWZ];
  }
  private void mur_keep_ey() { //store bottom & top of z array
	  for(int i=1;i<xnum-2;i++) {
		  MUR_XButtom[i]=Ey[i][1];
	  }
	  for(int i=1;i<xnum-2;i++) {
		  MUR_XTop[i]=Ey[i][znum-2];
	  }
      for(int i=1;i<znum-2;i++){
        MUR_ZButtom[i]=Ey[1][i];
      }
      for(int i=1;i<znum-2;i++){
        MUR_ZTop[i]=Ey[xnum-2][i];
      }
  }
  private void mur_calculation() { //calculate Mur
	  int k;
      k=0;
	  for(int i=1;i<xnum-2;i++) {
		  Ey[i][k]= MUR_XButtom[i]+(c*dt-dz)/(c*dt+dz)*(Ey[i][k+1]-Ey[i][k]);
	  }
	  k=znum-1;
	  for(int i=1;i<xnum-2;i++) {
		  Ey[i][k]= MUR_XTop[i]+(c*dt-dz)/(c*dt+dz)*(Ey[i][k-1]-Ey[i][k]);
	  }
      k=0;
      for(int i=1;i<znum-2;i++){
          Ey[k][i]= MUR_ZButtom[i]+(c*dt-dx)/(c*dt+dx)*(Ey[k+1][i]-Ey[k][i]);
      }
      k=xnum-1;
      for(int i=1;i<znum-2;i++){
        Ey[k][i]= MUR_ZTop[i]+(c*dt-dx)/(c*dt+dx)*(Ey[k-1][i]-Ey[k][i]);
      }
  }
  private void cal_reishin_Hx(){ //励振のための磁界の保存

    keep_hx0=Hx[IWX][IWZ];
  }
  
  private void cal_Ey(){  //calculate Ey
    for(int i=1;i<xnum-2;i++){
      for(int n=1;n<znum-2;n++){
        Ey[i][n]=cay[i][n]*Ey[i][n]+cby[i][n]*((Hx[i][n]-Hx[i][n-1])/dz-(Hz[i][n]-Hz[i-1][n])/dx);
        
      }
    }
    Ey[IWX][IWZ]=cay[IWX][IWZ]*keep_ey0+cby[IWX][IWZ]*((Hx[IWX][IWZ]-Hx[IWX][IWZ -1]-ey_double)/dz-(Hz[IWX][IWZ]-Hz[IWX -1][IWZ])/dx);
    
    
  }
  private void cal_Hx(){ //calculate Hx
    for(int i=1;i<xnum-2;i++){
      for(int n=0;n<znum-2;n++){
        Hx[i][n]=Hx[i][n]+(Ey[i][n+1]-Ey[i][n])*DTZMR;
      }
    }
    Hx[IWX][IWZ]=hx_double+(Ey[IWX][IWZ +1]-Ey[IWX][IWZ]+ey_double)*DTZMR;
  }
  private void cal_Hz(){ //calculate Hz
    for(int i=0;i<xnum-1;i++){
      for(int n=0;n<znum-1;n++){
        Hz[i][n]=Hz[i][n]-(Ey[i+1][n]-Ey[i][n])*DTXMR;
      }
    }
  }
  
}
