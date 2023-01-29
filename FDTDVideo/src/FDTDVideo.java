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
//javac -classpath xuggle-xuggler-5.4.jar;log4j-1.2.12.jar;slf4j-api-2.0.6.jar;log4j-1.2.12.jar; FDTDVideo.java
public class FDTDVideo {
    private Canvas canvas;
    int i;
    private int simulation_num;
    public FDTDVideo(){
        String bitmap_filedir="C:/Users/girar/Downloads/html/bitmap_info.txt"; //Set your bitmap file directory in your computer file.
                                                                               //Set your file directory where php uploads bitmap_info.txt.
        String info_filedir="C:/Users/girar/Downloads/html/info.txt";//Set your bitmap file directory in your computer file.
                                                                     //Set your file directory where php uploads info.txt.
        String mp4_filedir="C:/Users/girar/Downloads/html/test.mp4";//Set your bitmap file directory in your computer file.
        //                                                          //Set your file directory where php downloads the output mp4 video.
        long nextFrameTime = 0;
        final long frameRate = DEFAULT_TIME_UNIT.convert(100, MILLISECONDS);
        final int Max_Img_Length=500;
        int Img_width;
        int Img_height;
        simulation_num=800;
        int drawcanvasrate=10;
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
            int input_znum=info_Map.get(1);
            input_bitmap=new int[input_xnum][input_znum];
            while((inputf=br.readLine())!=null){
                String[] lines=inputf.split(",");
                int ii=0;
                for(i=0;i<input_xnum;i++){
                    for(int n=0;n<input_znum;n++){
                        input_bitmap[i][n]=Integer.parseInt(lines[ii]);
                        ii++;
                    }
                }
            }
            FDTD_Input fdtd_input=new FDTD_Input(info_Map,input_bitmap);
            int xnum=fdtd_input.get_xnum();
            int znum=fdtd_input.get_znum();
            
            int max=Math.max(xnum,znum);
            int bunkaino=1;
            while(Max_Img_Length>bunkaino*max){
                bunkaino++;
            }
            Img_width=bunkaino*xnum;
            Img_height=bunkaino*znum;

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