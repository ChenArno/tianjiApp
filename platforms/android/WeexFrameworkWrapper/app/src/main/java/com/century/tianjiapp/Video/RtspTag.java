package com.century.tianjiapp.Video;

/**
 * Created by chencentury on 2018/3/28.
 * 0 onvif  1萤石云
 */

public class RtspTag {

    private static RtspTag single = null;
    private int type;

    private RtspTag() {}


    //通过这个方法 来获取唯一的对象实例
    public static RtspTag getInstance() {
        if (single == null) {
            single = new RtspTag();
        }
        return single;
    }

    public void  setType(int type){
        this.type = type;
    }

    public int getType(){
        return this.type;
    }
}
