import java.util.Map;
import java.util.HashMap;
public class FDTD_Input {
    private int xnum; //ｘ軸の格子の数
    private int znum; //z軸の格子の数
    private double dx; // xの空間離散間隔[m]
    private double dz; // zの空間離散間隔[m]

    private double dimension_m=0.003; //xとzのマス目の間隔[m]
    private double feq; //周波数 [Hz]
    private int[][] bitmap; //格子中の物体を表現した二次元配列
    public FDTD_Input(Map<Integer,Integer>  map,int[][] input_bitmap){
        int input_xnum=map.get(0);
        int input_znum=map.get(1);
        int input_resolution=map.get(2);
        int input_frequency_coefficient=map.get(3);
        int input_frequency_power=map.get(4);
        this.xnum=input_xnum*input_resolution;
        this.znum=input_znum*input_resolution;
        this.dx=dimension_m; //0.003[m]
        this.dz=dimension_m; //0.003[m]
        this.feq = Math.pow(10, input_frequency_power)*(double)input_frequency_coefficient;
        this.bitmap=make_bitmap(input_bitmap,input_xnum,input_znum,input_resolution);
    }
    public int[][] make_bitmap(int[][] ib,int ix,int iz,int ir){
        int[][] bitmap=new int[xnum][znum];
        for(int i=0;i<ix;i++){
            for(int n=0;n<iz;n++){
                int c=ib[i][n];
                for(int x=0;x<ir;x++){
                    for(int z=0;z<ir;z++){
                        bitmap[i*ir+x][n*ir+z]=c;
                    }
                }
            }
        }
        return bitmap;
    }

    public int get_xnum(){
        return xnum;
    }
    public int get_znum(){
        return znum;
    }
    public double get_dx(){
        return dx;
    }
    public double get_dz(){
        return dz;
    }
    public double get_feq(){
        return feq;
    }
    public int[][] get_bitmap(){
        return bitmap;
    }
}