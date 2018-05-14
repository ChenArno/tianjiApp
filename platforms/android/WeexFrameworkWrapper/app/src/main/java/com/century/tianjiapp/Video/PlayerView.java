package com.century.tianjiapp.Video;

import android.content.Context;
import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.century.tianjiapp.Video.Rtsp.rtspView;
import com.ezvizuikit.open.EZUIError;
import com.ezvizuikit.open.EZUIKit;
import com.ezvizuikit.open.EZUIPlayer;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.taobao.weex.ui.view.WXFrameLayout;
import com.yanzhenjie.permission.AndPermission;
import com.yanzhenjie.permission.PermissionListener;

/**
 * Created by chencentury on 2018/3/28.
 */

public class PlayerView extends WXComponent<View> implements rtspView.ResultListener {
    public static final String TAG = "RongLog========>";
    private WXFrameLayout layout;
    public static WXSDKInstance mWXSDKInstance;
    private static RtspTag rtspTag;
    private String mUri;
    private static Handler mMainHandler;
    private String SV_VISIBLE = "SV_VISIBLE";
    private String SV_INVISIBLE = "SV_INVISIBLE";
    private String SV_CLOSE = "SV_CLOSE";

    //rtsp
    private rtspView videoView = null;

    private void createHandler() {
        Looper mainLooper = Looper.getMainLooper();
        mMainHandler = new Handler(mainLooper) {
            @Override
            public void handleMessage(Message msg) {
                if (videoView != null) {
                    videoView.getHolder().setKeepScreenOn(true);
                }
                try {
                    String obj = (String) msg.obj;
                    if (videoView != null) {
                        if (SV_VISIBLE.equals(obj)) {
                            videoView.setVisibility(View.VISIBLE);
                        } else if (SV_INVISIBLE.equals(obj)) {
                            videoView.setVisibility(View.INVISIBLE);
                        } else if (SV_CLOSE.equals(obj)) {
                            videoView.close();
                        }
                    }
                    super.handleMessage(msg);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    public PlayerView(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
        if (mWXSDKInstance == null) {
            mWXSDKInstance = instance;
        }
    }

    @Override
    protected View initComponentHostView(@NonNull Context context) {
//        layout = new WXFrameLayout(context);
//        surfaceHolder = videoView.getHolder();
        rtspTag = RtspTag.getInstance();

        videoView = rtspView.getInstance(context);
//        layout.addView(videoView);
        createHandler();
        videoView.setResultListener(this);
        return videoView;
    }

    @JSMethod
    public void setPlayType(int playType) {
        Log.d(TAG, "setPlayUrl: "+playType);
        if (videoView != null) {
            if (playType == 0) {
                Message msg = new Message();
                msg.obj = SV_VISIBLE;
                mMainHandler.sendMessage(msg);
            } else {
                Message msg = new Message();
                msg.obj = SV_INVISIBLE;
                mMainHandler.sendMessage(msg);
                videoView.stop();
            }
        }
    }

    @JSMethod
    public void startPlay(String playUrl) {
        //method implementation
        mUri = playUrl;
        videoView.startPlay(playUrl);
    }

    @JSMethod
    public void channelPlay(String playUrl) {
        //method implementation
        mUri = playUrl;
        videoView.startPlay(playUrl);
    }

    @Override
    public void onPlaySuccess() {
        Map<String, Object> params = new HashMap<>();
        params.put("key", "onPlaySuccess");
        params.put("state", "2");
        mWXSDKInstance.fireGlobalEventCallback("PlayerView", params);
    }

    @Override
    public void onPlayFail() {
        Map<String, Object> params = new HashMap<>();
        params.put("key", "onPlayFail");
        params.put("state", "0");
        mWXSDKInstance.fireGlobalEventCallback("PlayerView", params);
    }

    @Override
    public void onPrepared() {
        videoView.startPlay(mUri);
        Map<String, Object> params = new HashMap<>();
        params.put("key", "onPrepared");
        params.put("state", "1");
        mWXSDKInstance.fireGlobalEventCallback("PlayerView", params);
    }

    @Override
    public void onPlayTimeout() {
        videoView.startPlay(mUri);
    }
}
