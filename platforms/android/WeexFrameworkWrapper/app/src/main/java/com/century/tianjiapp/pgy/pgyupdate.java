package com.century.tianjiapp.pgy;

import android.widget.Toast;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;

/**
 * Created by chencentury on 2018/2/23.
 */

public class pgyupdate extends WXModule{
    //run ui thread 判断当前方法是否要运行在 UI 线程
    @JSMethod(uiThread = true)
    public void update(String msg){
        Toast.makeText(mWXSDKInstance.getContext(),msg,Toast.LENGTH_SHORT).show();
    }

    //run JS thread
    @JSMethod (uiThread = false)
    public void fireEventSyncCall(){
        //implement your module logic here
    }
}
