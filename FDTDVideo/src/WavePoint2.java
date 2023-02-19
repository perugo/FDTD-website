import java.lang.Math;

public class WavePoint2 {
    private double dt;
    private double t;
    private double c;
    private int xnum;
    private int znum;
    private double[] E;
    private double[] H;

    private double dx;
    private double E0; //真空中の誘電率[F/m]
    private double Er;
    private double M0; //真空中の透磁率 [H/m]
    private double Mr;

    private double feq;
    private int IWX;
    private double DTXMR;
    private double keep_EIW;
    private double keep_HIW;
    private double pulse_E;
    private double pulse_H;
    private Bounds content;
    private int PML_length;
    private Bounds border;
    private double[] Ce;
    private double[] Cm;
    private double[] De;
    private double[] Dm;
    private double order;

    private double pml_conductivty_max; //pml層で使う導電率の最大値
    private double pml_magnetic_max;//pml層で使う透磁率の最大値

    public WavePoint2(int xnum){

        this.xnum=xnum;

        dx=0.003;
        feq=10e9;
        IWX=6*xnum/10;
        c=2.99792458*10e8;
        PML_length=20;
        order=4.0;
        border=new Bounds(xnum,0);
        content=new Bounds(xnum,PML_length);

        dt=(1/ (c*Math.sqrt( 1/(dx*dx) ) ) )*0.6;
        //dt=(c/dx)*0.9;
        E=new double[xnum];
        H=new double[xnum];

        for(int i=border.x0;i<=border.x0;i++){
            E[i]=0.0;
            H[i]=0.0;
        }
        E0=0.1*8.8541878128e-12;  //真空中の誘電率[F/nm]
        M0=0.1*1.25663706e-6; //真空中の透磁率 [H/nm]

        Ce =new double[xnum];
        Cm =new double[xnum];
        De =new double[xnum];
        Dm =new double[xnum];

        double ce=1.0;
        double cm=dt/E0;
        double de=1.0;
        double dm=dt/M0;
        for(int i=content.x0;i<=content.x;i++){
            Ce[i]=ce;
            Cm[i]=cm;
            De[i]=de;
            Dm[i]=dm;
        }
        pml_conductivty_max=-(E0/(2*dt))*(order+1)/(PML_length)*(-10);
        pml_magnetic_max=(M0/E0)*pml_conductivty_max;
        set_pml();
        for(int i=border.x0;i<=border.x;i++){
            System.out.println("De["+i+"] : " + De[i]);
        }

    }

    public double[] getE(){
        return E;
    }
    private void set_pml(){
        int n;
        n=PML_length-1;
        for(int i=border.x0;i<content.x0;i++){
            System.out.println(n);
            double te=(double)n/(double)PML_length;
            double tm=((double)n+0.5)/(double)PML_length;
            double sige=pml_conductivty_max*Math.pow(te,order);
            double sigm=pml_magnetic_max*Math.pow(tm,order);

            Ce[i]=(2.0*E0-sige*dt)/(2.0*E0+sige*dt);
            Cm[i]=(2.0*dt)/(2.0*E0+sige*dt);

            De[i]=(2.0*M0-sigm*dt)/(2.0*M0+sigm*dt);
            Dm[i]=(2.0*dt)/(2*M0+sigm*dt);
            n--;
        }

        n=0;
        System.out.println("ffff");
        for(int i=content.x+1;i<=border.x;i++){
            System.out.println(n);
            double te=(double)n/(double)PML_length;
            double tm=((double)n+0.5)/(double)PML_length;
            double sige=pml_conductivty_max*Math.pow(te,order);
            double sigm=pml_magnetic_max*Math.pow(tm,order);

            Ce[i]=(2.0*E0-sige*dt)/(2.0*E0+sige*dt);
            Cm[i]=(2.0*dt)/(2.0*E0+sigm*dt);

            De[i]=(2.0*M0-sigm*dt)/(2.0*M0+sigm*dt);
            Dm[i]=(2.0*dt)/(2*M0+sigm*dt);
            n++;
        }
    }
    public void cal(){
        inject_wave();
        reishin_E();
        cal_E();
        reishin_H();
        cal_H();
        t+=dt;
    }
    private void inject_wave(){
        E[IWX]=Math.sin(Math.PI*2.0*feq*t);
    }
    private void reishin_E(){
        keep_EIW=E[IWX];
    }
    private void reishin_H(){
        keep_HIW=H[IWX];
    }
    private void cal_E(){
        for(int i=border.x0+1;i<=border.x;i++){
            E[i]= Ce[i]*E[i]-Cm[i]*(H[i]-H[i-1])/dx;
        }
        E[IWX]= Ce[IWX]*E[IWX]- Cm[IWX]*((pulse_H-H[IWX-1])/dx);
    }
    private void cal_H(){
        for(int i=border.x0;i<=border.x-1;i++){
            H[i]= De[i]*H[i]- Dm[i]*(E[i+1]-E[i])/dx;
        }
        H[IWX]= De[IWX]*pulse_H- Dm[IWX]*(E[IWX]-E[IWX-1]+pulse_E)/dx;
    }
    private class Bounds{
        public int x0;
        public int x;
        Bounds(int xnum,int padding){
            this.x0=padding;
            this.x=xnum-padding-1;
        }

    }
}
