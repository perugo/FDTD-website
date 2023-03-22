import java.util.Map;
import java.util.HashMap;
public class FDTD_Input {
    private int nx_pec; //ｘ軸の格子の数
    private int ny_pec; //z軸の格子の数
    private double lattice_width; // 格子長(空間離散間隔) [m]

    private double dimension_m;
    private double feq; //周波数 [Hz]
    private int[][] bitmap; //格子中の物体を表現した二次元配列
    private int lpml;
    private int nx;
    private int ny;

    private int source_x;
    private int source_y;
    public FDTD_Input(Map<Integer,Integer>  map,int[][] input_bitmap){
        int input_xnum=map.get(0);
        int input_ynum=map.get(1);
        int input_dx=map.get(2);
        int input_feq=map.get(3);
        System.out.println("input_feq : "+input_feq);
        int input_source_x=map.get(4);
        int input_source_y=map.get(5);
        this.nx_pec=input_xnum;
        this.ny_pec=input_ynum;
        double dinput_dx=input_dx;
        this.lattice_width=dinput_dx*0.000001;
        this.lpml=20;
        double dinput_feq=input_feq;
        this.feq = dinput_feq*1000000;
        if(feq<0.0){
            feq=feq*-1.0;
            System.out.println("feq is minus value");
        }
        System.out.println("feq : " + feq+"dx is : "+lattice_width);
        this.nx=nx_pec+2*lpml;
        this.ny=ny_pec+2*lpml;
        this.source_x=lpml+input_source_x;
        this.source_y=lpml+input_source_y;
        this.bitmap=make_bitmap(input_bitmap,nx_pec,ny_pec,lpml);
        System.out.println("nx : "+nx);
        System.out.println("ny : "+ny);
    }
    public int[][] make_bitmap(int[][] ib,int nxp,int nyp,int lp){
        int[][] bitmap=new int[nx][ny];
        for(int i=0;i<nxp+2*lp;i++) {
            for (int n = 0; n < nyp + 2 * lp; n++) {
                bitmap[i][n] = 0;
            }
        }

        for(int i=0;i<nxp;i++){
            for(int n=0;n<nyp;n++){
                bitmap[i+lp][n+lp]=ib[i][n];
            }
        }
        bitmap[source_x+lp][source_y+lp]=0;
        return bitmap;
    }

    public int get_nx(){
        return nx;
    }
    public int get_ny(){
        return ny;
    }
    public double get_lattice_width(){ return lattice_width; }
    public double get_feq(){
        return feq;
    }
    public int get_lpml(){ return lpml;}
    public int get_source_x(){return source_x;}
    public int get_source_y(){return source_y;}
    public int[][] get_bitmap(){
        return bitmap;
    }
}