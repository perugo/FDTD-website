import java.util.Map;
import java.util.HashMap;
public class FDTD_Input {
    private int nx_pec; //ｘ軸の格子の数
    private int ny_pec; //z軸の格子の数
    private double lattice_width; // 格子長(空間離散間隔) [m]

    private double dimension_m=0.003; //格子長 [m]
    private double feq; //周波数 [Hz]
    private int[][] bitmap; //格子中の物体を表現した二次元配列
    private int lpml;
    private int nx;
    private int ny;

    public FDTD_Input(Map<Integer,Integer>  map,int[][] input_bitmap){
        int input_xnum=map.get(0);
        int input_ynum=map.get(1);
        int input_resolution=map.get(2);
        int input_frequency_coefficient=map.get(3);
        int input_frequency_power=map.get(4);
        this.nx_pec=input_xnum*input_resolution;
        this.ny_pec=input_ynum*input_resolution;
        this.lattice_width=dimension_m; //0.003[m]
        this.lpml=15;
        this.feq = Math.pow(10, input_frequency_power)*(double)input_frequency_coefficient;
        this.nx=nx_pec+2*lpml;
        this.ny=ny_pec+2*lpml;
        this.bitmap=make_bitmap(input_bitmap,input_xnum,input_ynum,input_resolution,lpml);
        System.out.println("nx : "+nx);
        System.out.println("ny : "+ny);
    }
    public int[][] make_bitmap(int[][] ib,int ix,int iy,int ir,int lp){
        int[][] bitmap=new int[nx][ny];
        for(int i=0;i<nx;i++){
            for(int n=0;n<ny;n++){
                bitmap[i][n]=0;
            }
        }

        for(int i=0;i<ix;i++){
            for(int n=0;n<iy;n++){
                int c=ib[i][n];
                for(int x=0;x<ir;x++){
                    for(int z=0;z<ir;z++){
                        bitmap[i*ir+x+lp][n*ir+z+lp]=c;
                    }
                }
            }
        }
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
    public int[][] get_bitmap(){
        return bitmap;
    }
}