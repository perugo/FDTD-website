import java.io.*;
import java.util.Map;
import java.util.HashMap;
import java.lang.Math;
import com.xuggle.mediatool.IMediaWriter;
import com.xuggle.mediatool.ToolFactory;

import java.awt.image.BufferedImage;

import com.xuggle.xuggler.ICodec;

import static com.xuggle.xuggler.Global.DEFAULT_TIME_UNIT;
import static java.util.concurrent.TimeUnit.MILLISECONDS;
public class FDTDVideo {
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
        long nextFrameTime = 0;
        final long frameRate = DEFAULT_TIME_UNIT.convert(100, MILLISECONDS);
        final int Max_Img_Length=500;
        int Img_width;
        int Img_height;

        int drawcanvasrate=6;
        int filmnum=100;
        simulation_num=drawcanvasrate*filmnum;
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

            canvas=new Canvas(Img_width,Img_height,bunkaino,fdtd_input);
            try {
                final IMediaWriter writer = ToolFactory.makeWriter(mp4_filedir);
                writer.addVideoStream(0, 0, ICodec.ID.CODEC_ID_MPEG4, Img_width, Img_height);
                
                for(i=0;i<simulation_num;i++){
                	if(i%drawcanvasrate==0) {
                		BufferedImage buffImg=canvas.get_canvas(true);
                		writer.encodeVideo(0,buffImg, nextFrameTime, DEFAULT_TIME_UNIT);
                        nextFrameTime += frameRate;

                	}else {
                		BufferedImage buffImg=canvas.get_canvas(false);
                	}

                    
                }
            
                writer.close();
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