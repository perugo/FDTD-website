public class WavePoint3 {
    private double dt;
    private int[][] bitmap;
    private double t;
    private double c;
    private int nx;
    private int ny;
    private double lattice_width; //格子長[cm]
    private int lpml;
    private double order;

    private double pml_conductivty_max;
    private double pml_magnetic_max;

    private double[][] Ex; private double[][] Ey; private double[][] Ez;
    private double[][] Ezx; private double[][] Ezy;
    private double[][] Hx; private double[][] Hy; private double[][] Hz;
    private double[][] Hzx; private double[][] Hzy;

    private double[][] ae; private double[][] be;
    private double[][] am; private double[][] bm;

    private double[] aexpml; private double[] aeypml; private double[] bexpml; private double[] beypml;
    private double[] amxpml; private double[] amypml; private double[] bmxpml; private double[] bmypml;

    private double E0; //真空の誘電率
    private double M0; //真空の透磁率
    private double feq;
    private Pml_Block[] pmlBlocks;
    private int IWEX;
    private int IWEY;
    public WavePoint3(FDTD_Input fdtd_input){
        nx=fdtd_input.get_nx(); //x軸方向の格子の数
        ny=fdtd_input.get_ny(); //z軸方向の格子の数
        lattice_width=fdtd_input.get_lattice_width(); //x軸の空間離散間隔の定義 [m]
        feq= fdtd_input.get_feq(); //[振動/fs]
        //feq=10e9;
        lpml= fdtd_input.get_lpml();
        bitmap=fdtd_input.get_bitmap();
        IWEX =lpml+((nx-2*lpml)/2);
        IWEY =lpml+((ny-2*lpml)/2);
        c=2.99792458*10e8; //光速　nm/fs
        E0=8.8541878128e-12;  //真空中の誘電率[F/nm]
        M0=0.125663706e-6; //真空中の透磁率 [H/nm]
        dt=(1/ (c*Math.sqrt( 1/(lattice_width*lattice_width) ) ) )*0.6;


        Ex=new double[nx][ny];
        Ey=new double[nx][ny];
        Ez=new double[nx][ny];
        Ezx=new double[nx][ny];
        Ezy=new double[nx][ny];
        Hx=new double[nx][ny];
        Hy=new double[nx][ny];
        Hz=new double[nx][ny];
        Hzx=new double[nx][ny];
        Hzy=new double[nx][ny];
        t=0.0;
        ae=new double[nx][ny];
        be=new double[nx][ny];
        am=new double[nx][ny];
        bm=new double[nx][ny];
        double de=dt/E0/lattice_width;
        double dm=dt/M0/lattice_width;
        for(int i=0;i<nx-1;i++){
            for(int n=0;n<ny;n++){
                if(bitmap[i][n]==1) {
                    ae[i][n]=0.0;
                    be[i][n]=0.0;
                    am[i][n]=1.0;
                    bm[i][n]=dm;
                }else {
                    ae[i][n]=1.0;
                    be[i][n]=de;
                    am[i][n]=1.0;
                    bm[i][n]=dm;
                }
            }
        }
        for(int i=0;i<nx;i++){
            ae[i][0]=0.0;
            be[i][0]=0.0;
            am[i][0]=1.0;
            bm[i][0]=dm;
        }
        for(int i=0;i<nx;i++){
            ae[i][ny-1]=0.0;
            be[i][ny-1]=0.0;
            am[i][ny-1]=1.0;
            bm[i][ny-1]=dm;
        }
        for(int n=0;n<ny;n++){
            ae[0][n]=0.0;
            be[0][n]=0.0;
            am[0][n]=1.0;
            bm[0][n]=dm;
        }
        for(int n=0;n<ny;n++){
            ae[nx-1][n]=0.0;
            be[nx-1][n]=0.0;
            am[nx-1][n]=1.0;
            bm[nx-1][n]=dm;
        }
        aexpml=new double[nx];
        bexpml=new double[nx];
        amxpml=new double[nx];
        bmxpml=new double[nx];
        aeypml=new double[ny];
        beypml=new double[ny];
        amypml=new double[ny];
        bmypml=new double[ny];

        order=5.0;
        pml_conductivty_max=-(E0/(2*dt))*(-13)*(order+1)/lpml;
        System.out.println(pml_conductivty_max);
        pml_magnetic_max=(M0/E0)*pml_conductivty_max;

        set_pml();
        pmlBlocks=new Pml_Block[4];
        pmlBlocks[0]=new Pml_Block(0,0,lpml-1,ny-1);
        pmlBlocks[1]=new Pml_Block(nx-lpml,0,nx-1,ny-1);
        pmlBlocks[2]=new Pml_Block(lpml,0,nx-lpml-1,lpml-1);
        pmlBlocks[3]=new Pml_Block(lpml,ny-lpml,nx-lpml-1,ny-1);
/*
        for(int n=0;n<lpml;n++){
            System.out.println(bmypml[n]);
        }
        System.out.println("---");
        for(int n=lpml;n<ny-lpml;n++){
            System.out.println(bm[40][n]);
        }
        System.out.println("----");
        for(int n=ny-lpml;n<ny;n++){
            System.out.println(bmypml[n]);
        }
*/

    }
    public void cal(){
        cal_E();
        feed();
        cal_Epml();
        t+=dt/2.0;
        cal_H();
        cal_Hpml();
        t+=dt/2.0;
    }
    public double[][] get_Ez(){
        return Ez;
    }
    public void set_pml(){
        //右、左、上、下に初期値を入れる
        double tmp_aepml = 1.0;
        double tmp_bepml = dt/E0/lattice_width;
        double tmp_ampml = 1.0;
        double tmp_bmpml = dt/M0/lattice_width;
        for(int i=0;i<nx;i++){
            aexpml[i]=tmp_aepml;
            bexpml[i]=tmp_bepml;
            amxpml[i]=tmp_ampml;
            bmxpml[i]=tmp_bmpml;
        }
        for(int n=0;n<ny;n++){
            aeypml[n] = tmp_aepml;
            beypml[n] = tmp_bepml;
            amypml[n] = tmp_ampml;
            bmypml[n] = tmp_bmpml;
        }
        double l=(double)lpml - 1.0;
        double dpml=(double)lpml;
        //左側のPMl
        for(int i=0;i<lpml;i++){

            double te = (l+1.0) / dpml;
            double tm = (l + 0.5) / dpml;

            double sigxe = pml_conductivty_max * Math.pow(te, order);
            double sigxm = pml_magnetic_max * Math.pow(tm, order);
            double a=(2.0 * E0 - sigxe * dt) / (2.0 * E0 + sigxe * dt);
            double b=((2.0 * dt) / (2.0 * E0 + sigxe * dt))/lattice_width;
            double c=(2.0 * M0 - sigxm * dt) / (2.0 * M0 + sigxm * dt);
            double d=((2.0 * dt) / (2 * M0 + sigxm * dt))/lattice_width;
            aexpml[i] = a;
            bexpml[i] = b;
            amxpml[i] = c;
            bmxpml[i] = d;
            l-=1.0;
        }
        //右側のPMl
        l=0.0;
        for(int i=nx-lpml;i<nx;i++){
            double te = (l+1.0) / dpml;
            double tm = (l + 0.5) / dpml;
            double sigxe = pml_conductivty_max * Math.pow(te, order);
            double sigxm = pml_magnetic_max * Math.pow(tm, order);
            double a = (2.0 * E0 - sigxe * dt) / (2.0 * E0 + sigxe * dt);
            double b = ((2.0 * dt) / (2.0 * E0 + sigxe * dt))/lattice_width;
            double c = (2.0 * M0 - sigxm * dt) / (2.0 * M0 + sigxm * dt);
            double d = ((2.0 * dt) / (2 * M0 + sigxm * dt))/lattice_width;

            aexpml[i] = a;
            bexpml[i] = b;
            amxpml[i] = c;
            bmxpml[i] = d;
            l+=1.0;
        }
        //上側のpml
        l=lpml-1.0;
        for(int n=0;n<lpml;n++){
            double te = (l+1.0) / dpml;
            double tm = (l + 0.5) / dpml;
            double sigxe = pml_conductivty_max * Math.pow(te, order);
            double sigxm = pml_magnetic_max * Math.pow(tm, order);
            double a = (2.0 * E0 - sigxe * dt) / (2.0 * E0 + sigxe * dt);
            double b = ((2.0 * dt) / (2.0 * E0 + sigxe * dt))/lattice_width;
            double c = (2.0 * M0 - sigxm * dt) / (2.0 * M0 + sigxm * dt);
            double d = ((2.0 * dt) / (2 * M0 + sigxm * dt))/lattice_width;

            aeypml[n] = a;
            beypml[n] = b;
            amypml[n] = c;
            bmypml[n] = d;

            l-=1.0;
        }
        //下側のpml
        l=0.0;
        for(int n=ny-lpml;n<ny;n++){
            double te = (l+1.0) / dpml;
            double tm = (l + 0.5) / dpml;
            double sigxe = pml_conductivty_max * Math.pow(te, order);
            double sigxm = pml_magnetic_max * Math.pow(tm, order);
            double a = (2.0 * E0 - sigxe * dt) / (2.0 * E0 + sigxe * dt);
            double b = ((2.0 * dt) / (2.0 * E0 + sigxe * dt))/lattice_width;
            double c = (2.0 * M0 - sigxm * dt) / (2.0 * M0 + sigxm * dt);
            double d = ((2.0 * dt) / (2 * M0 + sigxm * dt))/lattice_width;

            aeypml[n] = a;
            beypml[n] = b;
            amypml[n] = c;
            bmypml[n] = d;

            l+=1.0;
        }
    }
    public void cal_E(){
        for(int i=0;i<nx-1;i++){
            for(int n=1;n<ny-1;n++){
                Ex[i][n]=ae[i][n]*Ex[i][n]+be[i][n]*(Hz[i][n]-Hz[i][n-1]);
            }
        }
        for(int i=1;i<nx-1;i++){
            for(int n=0;n<ny-1;n++){
                Ey[i][n]=ae[i][n]*Ey[i][n]-be[i][n]*(Hz[i][n]-Hz[i-1][n]);
            }
        }
        for(int i=1;i<nx-1;i++){
            for(int n=1;n<ny-1;n++){
                Ez[i][n]=ae[i][n]*Ez[i][n]+be[i][n]*(Hy[i][n]-Hy[i-1][n])
                                          -be[i][n]*(Hx[i][n]-Hx[i][n-1]);
            }
        }
    }
    public void cal_H(){
        for(int i=1;i<nx-1;i++){
            for(int n=0;n<ny-1;n++){
                Hx[i][n]=am[i][n]*Hx[i][n]-bm[i][n]*(Ez[i][n+1]-Ez[i][n]);
            }
        }
        for(int i=0;i<nx-1;i++){
            for(int n=1;n<ny-1;n++){
                Hy[i][n]=am[i][n]*Hy[i][n]+bm[i][n]*(Ez[i+1][n]-Ez[i][n]);
            }
        }
        for(int i=0;i<nx-1;i++){
            for(int n=0;n<ny-1;n++){
                Hz[i][n]=am[i][n]*Hz[i][n]-bm[i][n]*(Ey[i+1][n]-Ey[i][n])
                        +bm[i][n]*(Ex[i][n+1]-Ex[i][n]);
            }
        }

    }
    public void cal_Epml(){
        int addi;
        int addn;
        addi=0; addn=0;
        //Ex pml
        for(int x=0;x<pmlBlocks.length;x++){
            Pml_Block p_b=pmlBlocks[x];
            if(x==0 || x==1 || x==2){addn=1;}else{addn=0;}
            for (int i = p_b.sx;i<=p_b.ex;i++) {
                for(int n=p_b.sy+addn;n<=p_b.ey;n++){
                    Ex[i][n]=aeypml[n]*Ex[i][n]+beypml[n]*(Hz[i][n]-Hz[i][n-1]);

                }

            }
        }
        addi=0;addn=0;
        //Ey pml
        for(int x=0;x<pmlBlocks.length;x++){
            Pml_Block p_b=pmlBlocks[x];
            if(x==0){addi=1;}else{addi=0;}
            for (int i = p_b.sx+addi;i<=p_b.ex;i++) {
                for(int n=p_b.sy;n<=p_b.ey;n++){
                    Ey[i][n]=aexpml[i]*Ey[i][n]-bexpml[i]*(Hz[i][n]-Hz[i-1][n]);
                }
            }
        }
        addi=0;addn=0;
        //Ez pml
        for(int x=0;x<pmlBlocks.length;x++){
            Pml_Block p_b=pmlBlocks[x];
            if(x==0){addi=1;}else{addi=0;}
            if(x==0 || x==1 || x==2){addn=1;}else{addn=0;}
            for (int i = p_b.sx+addi;i<=p_b.ex;i++) {
                for(int n=p_b.sy+addn;n<=p_b.ey;n++){
                    Ezx[i][n]=aexpml[i]*Ezx[i][n]+bexpml[i]*(Hy[i][n]-Hy[i-1][n]);
                    Ezy[i][n]=aeypml[n]*Ezy[i][n]-beypml[n]*(Hx[i][n]-Hx[i][n-1]);
                    Ez[i][n]=Ezx[i][n]+Ezy[i][n];
                }
            }
        }
    }
    public void cal_Hpml(){
        int limiti;
        int limitn;
        limiti=0;limitn=0;
        //Hx pml
        for(int x=0;x<pmlBlocks.length;x++){
            Pml_Block p_b=pmlBlocks[x];

            if(x==0 || x==1 || x==3){limitn=1;}else{limitn=0;}
            for (int i = p_b.sx;i<=p_b.ex;i++) {
                for(int n=p_b.sy;n<=p_b.ey-limitn;n++){
                    Hx[i][n]=amypml[n]*Hx[i][n]-bmypml[n]*(Ez[i][n+1]-Ez[i][n]);
                }
            }
        }
        limiti=0;limitn=0;
        //Hy pml
        for(int x=0;x<pmlBlocks.length;x++){
            Pml_Block p_b=pmlBlocks[x];
            if(x==1){limiti=1;}else{limiti=0;}
            for (int i = p_b.sx;i<=p_b.ex-limiti;i++) {
                for(int n=p_b.sy;n<=p_b.ey;n++){
                    Hy[i][n]=amxpml[i]*Hy[i][n]+bmxpml[i]*(Ez[i+1][n]-Ez[i][n]);
                }
            }
        }
        limiti=0;limitn=0;
        //Hz pml
        for(int x=0;x<pmlBlocks.length;x++){
            Pml_Block p_b=pmlBlocks[x];
            if(x==1){limiti=1;}else{limiti=0;}
            if(x==0 || x==1 || x==3){limitn=1;}else{limitn=0;}
            for (int i = p_b.sx;i<=p_b.ex-limiti;i++) {
                for(int n=p_b.sy;n<=p_b.ey-limitn;n++){
                    Hzx[i][n]=amxpml[i]*Hzx[i][n]-bmxpml[i]*(Ey[i+1][n]-Ey[i][n]);
                    Hzy[i][n]=amypml[n]*Hzy[i][n]+bmypml[n]*(Ex[i][n+1]-Ex[i][n]);
                    Hz[i][n]=Hzx[i][n]+Hzy[i][n];
                }
            }
        }
    }
    public void feed(){
        Ez[IWEX][IWEY]=Math.sin(Math.PI*2.0*feq*t);
    }

    public class Pml_Block{
        public int sx; public int sy; public int ex; public int ey;
        public Pml_Block(int sx,int sy,int ex,int ey){
            this.sx=sx; this.sy=sy; this.ex=ex; this.ey=ey;
            System.out.println(sx+" : "+sy+" : "+ex+" : "+ey);
        }
    }
}
