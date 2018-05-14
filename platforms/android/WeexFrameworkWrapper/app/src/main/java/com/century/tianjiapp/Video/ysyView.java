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

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
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
import com.taobao.weex.ui.view.WXFrameLayout;
import com.yanzhenjie.permission.AndPermission;
import com.yanzhenjie.permission.PermissionListener;


import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by chencentury on 2018/4/2.
 */

public class ysyView extends WXComponent<View> implements EZUIPlayer.EZUIPlayerCallBack {
    public static final String TAG = "RongLog========>";
    private WXFrameLayout layout;
    public static WXSDKInstance mWXSDKInstance;

    private static Handler mEzHandler;
    private String SV_VISIBLE = "SV_VISIBLE";
    private String SV_INVISIBLE = "SV_INVISIBLE";
    private String SV_CLOSE = "SV_CLOSE";
    private static RtspTag rtspTag;
    //rtsp
    private static EZUIPlayer mEZUIPlayer;
    /**
     * 开发者申请的Appkey
     */
    private String appkey = "";
    /**
     * 授权accesstoken
     */
    private String accessToken = "";
    /**
     * 播放url：ezopen协议
     */
    private String mUri;

    public ysyView(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
        if (mWXSDKInstance == null) {
            mWXSDKInstance = instance;
        }
    }

    private void createHandler() {
        Looper mainLooper = Looper.getMainLooper();
        mEzHandler = new Handler(mainLooper) {
            @Override
            public void handleMessage(Message msg) {
                try {
                    String obj = (String) msg.obj;
                    if (mEZUIPlayer != null) {
                        if (SV_VISIBLE.equals(obj)) {
                            mEZUIPlayer.setVisibility(View.VISIBLE);
                        } else if (SV_INVISIBLE.equals(obj)) {
                            mEZUIPlayer.setVisibility(View.INVISIBLE);
                        } else if (SV_CLOSE.equals(obj)) {
                            //释放资源
                            mEZUIPlayer.releasePlayer();
                            mEZUIPlayer = null;
                        }
                    }
                    super.handleMessage(msg);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
    }

    @Override
    protected View initComponentHostView(@NonNull Context context) {
        AndPermission.with(context)
                .requestCode(300)
                .permission(
                        android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        android.Manifest.permission.READ_PHONE_STATE,
                        android.Manifest.permission.READ_EXTERNAL_STORAGE,
                        android.Manifest.permission.RECORD_AUDIO
                )
                .callback(perListener)
                .start();
//        layout = new WXFrameLayout(context);
//        surfaceHolder = videoView.getHolder();
        rtspTag = RtspTag.getInstance();

        //萤石云
        mEZUIPlayer = new EZUIPlayer(context);

        return mEZUIPlayer;
    }

    @WXComponentProp(name = "option")
    public void setPlayUrl(String option) {
        JSONObject json = JSON.parseObject(option);
        appkey = json.getString("appKey");
        accessToken = json.getString("accessToken");
        ysyinit();
    }

    @JSMethod
    public void setPlayType(int playType) {
        if (mEZUIPlayer != null) {
            if (playType == 1) {
                Message msg = new Message();
                msg.obj = SV_VISIBLE;
                mEzHandler.sendMessage(msg);
            } else {
                Message msg = new Message();
                msg.obj = SV_INVISIBLE;
                mEzHandler.sendMessage(msg);
                mEZUIPlayer.stopPlay();
            }
        }
    }

    @JSMethod
    public void startPlay(String playUrl) {
        //method implementation
        mUri = playUrl;
        Log.d(TAG, "paly: " + mUri);

        mEZUIPlayer.setUrl(mUri);
    }

    @JSMethod
    public void channelPlay(String playUrl) {
        //method implementation
        mUri = playUrl;
        mEZUIPlayer.setUrl(mUri);
    }

    public void ysyinit() {
        if (TextUtils.isEmpty(appkey)
                || TextUtils.isEmpty(accessToken)) {
            Toast.makeText(mWXSDKInstance.getContext(), "appkey,accesstoken or playUrl is null", Toast.LENGTH_LONG).show();
            return;
        }
        //设置debug模式，输出log信息
        EZUIKit.setDebug(true);
//        if (TextUtils.isEmpty(mGlobalAreaDomain)) {
//            //appkey初始化
//        }else{
//            //appkey初始化 海外版本
//            EZUIKit.initWithAppKeyGlobal(this.getApplication(), appkey,mGlobalAreaDomain);
//        }
        EZUIKit.initWithAppKey(WXEnvironment.getApplication(), appkey);
        //设置授权accesstoken
        EZUIKit.setAccessToken(accessToken);
        //设置播放资源参数

        mEZUIPlayer.setCallBack(this);
    }

    @Override
    public void onPlaySuccess() {
        Log.d(TAG, "onPlaySuccess");
        Map<String, Object> params = new HashMap<>();
        params.put("key", "onPlaySuccess");
        params.put("state", "2");
        mWXSDKInstance.fireGlobalEventCallback("PlayerView", params);
    }

    @Override
    public void onPlayFail(EZUIError ezuiError) {
        Log.d(TAG, "onPlayFail");
        Map<String, Object> params = new HashMap<>();
        params.put("key", "onPlayFail");
        params.put("state", "0");
        mWXSDKInstance.fireGlobalEventCallback("PlayerView", params);
    }

    @Override
    public void onVideoSizeChange(int i, int i1) {
        Log.d(TAG, "onVideoSizeChange");
    }

    @Override
    public void onPrepared() {
        mEZUIPlayer.startPlay();
        Map<String, Object> params = new HashMap<>();
        params.put("key", "onPrepared");
        params.put("state", "1");
        mWXSDKInstance.fireGlobalEventCallback("PlayerView", params);
    }

    @Override
    public void onPlayTime(Calendar calendar) {

    }

    @Override
    public void onPlayFinish() {

    }

    private PermissionListener perListener = new PermissionListener() {
        @Override
        public void onSucceed(int requestCode, List<String> grantedPermissions) {
            // 权限申请成功回调。

            // 这里的requestCode就是申请时设置的requestCode。
            // 和onActivityResult()的requestCode一样，用来区分多个不同的请求。
            if (requestCode == 200) {
                // TODO ...
                Log.d(TAG, "onSucceed");
            }
        }

        @Override
        public void onFailed(int requestCode, List<String> deniedPermissions) {
            // 权限申请失败回调。
            if (requestCode == 200) {
                // TODO ...
                Log.d(TAG, "onFailed");
            }
        }
    };
}
