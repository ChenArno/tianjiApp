package com.century.tianjiapp;

import com.century.tianjiapp.RyIm.RyListView;
import com.century.tianjiapp.RyIm.RyRegist;
import com.century.tianjiapp.Video.PlayerView;
import com.century.tianjiapp.Video.ysyView;
import com.century.tianjiapp.cpmpontes.TJehcarts;
import com.century.tianjiapp.pgy.pgyupdate;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;


/**
 * Created by chencentury on 2018/2/23.
 */

public class Weex {
    private static Weex instance = null;
    private Weex(){}

    public static Weex getInstance(){
        if(instance == null){
            instance = new Weex();
        }
        instance.init();
        return instance;
    }

    //Context 上下文
    // Application  app的类
    public void init(){
        try {
            WXSDKEngine.registerModule("pgyupdate", pgyupdate.class);
            WXSDKEngine.registerModule("rongyun", RyRegist.class);

            WXSDKEngine.registerComponent("rylist", RyListView.class);
            WXSDKEngine.registerComponent("tjEcharts", TJehcarts.class);
            WXSDKEngine.registerComponent("tj-video", PlayerView.class);
            WXSDKEngine.registerComponent("tj-ysy-video", ysyView.class);
        }catch (WXException e){
            e.printStackTrace();
        }
    }
}
