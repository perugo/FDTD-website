import java.io.*;
import java.util.Map;
import java.util.HashMap;
import java.lang.Math;

import java.awt.image.BufferedImage;
import java.io.IOException;

/*external library jcodec-0.2.5.jar , jcodec-javase-0.2.5.jar*/
import org.jcodec.common.io.NIOUtils;
import org.jcodec.common.io.SeekableByteChannel;
import org.jcodec.api.awt.AWTSequenceEncoder;
import org.jcodec.common.model.Rational;
/**/
public class FDTDVideo{
    private Canvas canvas;
    int i;
    private int simulation_num;
    public FDTDVideo(){
        String bitmap_filedir="/home/perugo/html2_project/inputfol/bitmap_info.txt"; //Set your bitmap file directory in your computer file.
        //Set your file directory where php uploads bitmap_info.txt.
        String info_filedir="/home/perugo/html2_project/inputfol/info.txt";//Set your bitmap file directory in your computer file.
        //Set your file directory where php uploads info.txt.
        String mp4_filedir="/home/perugo/html2_project/test.mp4";//Set your bitmap file directory in your computer file.
        //                                                          //Set your file directory where php downloads the output mp4 video.
        final int Max_Img_Length=600;
        int Img_width;
        int Img_height;

        int drawcanvasrate=10;
        int filmnum=130;
        int simulation_num=drawcanvasrate*filmnum;
        try(FileReader fr=new FileReader(bitmap_filedir); //Reads your bitmap file directory
            BufferedReader br=new BufferedReader(fr);
            FileReader fr2=new FileReader(info_filedir); //Reads your info file directory
            BufferedReader br2=new BufferedReader(fr2)){
            String inputf;
            i=0;
            int[][] input_bitmap;
            Map<Integer,Integer> info_Map=new HashMap<>();
            while((inputf=br2.readLine())!=null){
                int d=Integer.valueOf(inputf);
                System.out.println("i : "+i+"   d : "+d);
                info_Map.put(i,d);
                i++;
            }
            int input_xnum=info_Map.get(0);
            int input_ynum=info_Map.get(1);
            input_bitmap=new int[input_xnum][input_ynum];
            while((inputf=br.readLine())!=null){
                String[] lines=inputf.split(",");
                int ii=0;
                for(i=0;i<input_xnum;i++){
                    for(int n=0;n<input_ynum;n++){
                        input_bitmap[i][n]=Integer.parseInt(lines[ii]);
                        ii++;
                    }
                }
            }
            FDTD_Input fdtd_input=new FDTD_Input(info_Map,input_bitmap);
            int nx=fdtd_input.get_nx();
            int ny=fdtd_input.get_ny();

            int max=Math.max(nx,ny);
            int bunkaino=1;
            while(Max_Img_Length>bunkaino*max){
                bunkaino++;
            }
            Img_width=bunkaino*nx;
            Img_height=bunkaino*ny;
            if(Img_width%2==1){Img_width++;}
            if(Img_height%2==1){Img_height++;}
            canvas=new Canvas(Img_width,Img_height,bunkaino,fdtd_input);
            try {
                SeekableByteChannel ch = NIOUtils.writableFileChannel(mp4_filedir);
                Rational r=new Rational(30,3);
                AWTSequenceEncoder enc = new AWTSequenceEncoder(ch,r);
                for(i=0;i<simulation_num;i++){
                    if(i%drawcanvasrate==0) {
                        BufferedImage buffImg=canvas.get_canvas();
                        enc.encodeImage(buffImg);

                    }else {
                        canvas.calc();
                    }


                }

                enc.finish();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }catch(FileNotFoundException e){
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }
    }
}