package com.century.tianjiapp.Video.Rtsp;

import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.Surface;

import java.nio.ByteBuffer;

import veg.mediaplayer.sdk.MediaPlayer;
import veg.mediaplayer.sdk.MediaPlayerConfig;

/**
 * Created by chencentury on 2018/3/29.
 */

public class rtspView extends VideoSurfaceView implements MediaPlayer.MediaPlayerCallback {
    private static final String Tag = "RongLog========>";
    private static rtspView instance = null;
    private static MediaPlayer player = null;
    private Context mContext;
    private rtspView mthis = null;
    private int mOldMsg = 0;
    private PlayerStates player_state = PlayerStates.ReadyForUse;
    private PlayerConnectType reconnect_type = PlayerConnectType.Normal;
    private ResultListener resultListener;

    private enum PlayerStates {
        Busy,
        ReadyForUse
    }

    private enum PlayerConnectType {
        Normal,
        Reconnecting
    }

    public rtspView(Context context){
        super(context, new VideoSurfaceViewCallback() {
            @Override
            public void onSurfaceCreated(Surface surface) {
                if (player != null)
                    player.setSurface(surface);
            }
        });
        init(context);
    }

    public static synchronized rtspView getInstance(Context context){
        if(instance == null){
            instance = new rtspView(context);
        }
        return instance;
    }

    public void init(Context context){
        SharedSettings.getInstance(context).loadPrefSettings();
        SharedSettings.getInstance().savePrefSettings();
        this.mContext = context;
        this.mthis = this;
        player = new MediaPlayer(context, false);
    }

    public void startPlay(String url){
        SharedSettings.getInstance().loadPrefSettings();
        if (player != null) {
            player.getConfig().setConnectionUrl(url);
            if (player.getConfig().getConnectionUrl().isEmpty())
                return;
            //player_record.Close();

            player.Close();
            SharedSettings sett = SharedSettings.getInstance();
            MediaPlayerConfig conf = new MediaPlayerConfig();

            conf.setConnectionUrl(player.getConfig().getConnectionUrl());

            conf.setConnectionNetworkProtocol(-1);
            conf.setConnectionDetectionTime(sett.connectionDetectionTime);
            conf.setConnectionBufferingTime(sett.connectionBufferingTime);

            conf.setDecodingType(sett.decoderType);

            conf.setSynchroEnable(sett.synchroEnable);
            conf.setSynchroNeedDropVideoFrames(sett.synchroNeedDropVideoFrames);

            conf.setEnableAspectRatio(sett.rendererEnableAspectRatio);
            conf.setDataReceiveTimeout(10000);
            conf.setNumberOfCPUCores(0);

            conf.setEnableABR(0);
            conf.setAspectRatioMode(1); // Zoom and move mode

            player.setSurface(this.getSurface());
            player.Open(conf, this);
            if(resultListener != null){
                resultListener.onPrepared();
            }

        }
    }

    public void stop(){
        if (player != null) {
            player.onStop();
        }
    }

    public void close(){
        if (player != null) {
            player.Close();
            player = null;
        }
    }

    @Override
    public int Status(int i) {
        MediaPlayer.PlayerNotifyCodes status = MediaPlayer.PlayerNotifyCodes.forValue(i);
        if (handler == null || status == null)
            return 0;

//        Log.e(Tag, "Form Native Player status: " + arg);
        switch (MediaPlayer.PlayerNotifyCodes.forValue(i)) {
            case PLP_EOS:
            case CP_ERROR_DISCONNECTED:

            default:
                Message msg = new Message();
                msg.obj = status;
                handler.removeMessages(mOldMsg);
                mOldMsg = msg.what;
                handler.sendMessage(msg);
        }

        return 0;
    }

    @Override
    public int OnReceiveData(ByteBuffer byteBuffer, int i, long l) {
        Log.e(Tag, "Form Native Player OnReceiveData: size: " + i + ", pts: " + l);
        return 0;
    }
    private Handler handler = new Handler() {
        String sText;
        String sCode;
        @Override
        public void handleMessage(Message msg) {
            MediaPlayer.PlayerNotifyCodes status = (MediaPlayer.PlayerNotifyCodes) msg.obj;
//            Log.i(Tag, status+"");
            switch (status) {
                case CP_CONNECT_STARTING:
                    player_state = PlayerStates.Busy;
                    //                    showStatusView();
                    reconnect_type = PlayerConnectType.Normal;
//                    setHideControls();
                    break;

                case PLP_BUILD_SUCCESSFUL:
                    sText = player.getPropString(MediaPlayer.PlayerProperties.PP_PROPERTY_PLP_RESPONSE_TEXT);
                    sCode = player.getPropString(MediaPlayer.PlayerProperties.PP_PROPERTY_PLP_RESPONSE_CODE);
//                    Log.i(Tag, "=Status PLP_BUILD_SUCCESSFUL: Response sText=" + sText + " sCode=" + sCode);
                    break;

                case VRP_NEED_SURFACE:
                    player_state = PlayerStates.Busy;
//                    showVideoView();
                    break;

                case PLP_PLAY_SUCCESSFUL:  //播放成功
                    player_state = PlayerStates.ReadyForUse;
                    resultListener.onPlaySuccess();
                    // temp for test
//                    String info = player.getStreamInfo();
                    break;

                case PLP_CLOSE_STARTING:
                    player_state = PlayerStates.Busy;
                    break;

                case PLP_CLOSE_SUCCESSFUL:  //关闭成功
                    player_state = PlayerStates.ReadyForUse;
                    System.gc();
                    break;

                case PLP_CLOSE_FAILED:  //播放失败
                    player_state = PlayerStates.ReadyForUse;
                    resultListener.onPlayFail();
                    break;

                case CP_CONNECT_FAILED:
                    player_state = PlayerStates.ReadyForUse;
                    break;

                case PLP_BUILD_FAILED:
                    sText = player.getPropString(MediaPlayer.PlayerProperties.PP_PROPERTY_PLP_RESPONSE_TEXT);
                    sCode = player.getPropString(MediaPlayer.PlayerProperties.PP_PROPERTY_PLP_RESPONSE_CODE);
//                    Log.i(Tag, "=Status PLP_BUILD_FAILED: Response sText=" + sText + " sCode=" + sCode);

                    player_state = PlayerStates.ReadyForUse;
                    break;

                case PLP_PLAY_FAILED:
                    player_state = PlayerStates.ReadyForUse;
                    break;

                case PLP_ERROR:
                    player_state = PlayerStates.ReadyForUse;
                    break;

                case CP_INTERRUPTED:
                    player_state = PlayerStates.ReadyForUse;
                    break;
                case CP_RECORD_STARTED:
                    Log.v(Tag, "=handleMessage CP_RECORD_STARTED");
                    break;

                case CP_RECORD_STOPPED:
                    Log.v(Tag, "=handleMessage CP_RECORD_STOPPED");
                    break;

                case CP_START_BUFFERING:
//	            	progress = ProgressDialog.show(mthis, null,
//	            		    "buffering...", true);
                    break;

                case CP_STOP_BUFFERING:
//	            	if (progress != null)
//	            		progress.dismiss();
                    break;

                case CP_STOPPED:
                case VDP_STOPPED:
                case VRP_STOPPED:
                case ADP_STOPPED:
                case ARP_STOPPED:
                    if (player_state != PlayerStates.Busy) {
                        player_state = PlayerStates.Busy;
                        player.Close();
                        player_state = PlayerStates.ReadyForUse;
                    }
                    break;
                case PLP_TRIAL_VERSION:
                case CP_ERROR_DISCONNECTED:  //超时
                    resultListener.onPlayTimeout();
                    break;
                default:
                    player_state = PlayerStates.Busy;
            }
        }
    };

     public interface ResultListener{
        void onPlaySuccess();
        void onPlayFail();
        void onPrepared();
        void onPlayTimeout();
     };


    public void setResultListener(ResultListener resultListener){
        this.resultListener = resultListener;
    }


}
