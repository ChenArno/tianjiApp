package com.century.tianjiapp.RyIm;

import android.net.Uri;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.util.Log;

import com.alibaba.fastjson.JSONArray;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.rong.imkit.RongIM;
import io.rong.imlib.RongIMClient;
import io.rong.imlib.model.UserInfo;


/**
 * Created by chencentury on 2018/3/7.
 */

public class RyRegist extends WXModule implements RongIM.UserInfoProvider {
    public static final String TAG = "RongLog========>";
    public static SQLiteHelper sqlhelp;
    private List<Friend> userIdList;

    @JSMethod(uiThread = false)
    public void ryConnect(String token, final JSCallback success, final @Nullable JSCallback error) {
        logout();
        RongIM.connect(token, new RongIMClient.ConnectCallback() {
            @Override
            public void onTokenIncorrect() {
                if (error != null) {
                    error.invoke("Token已过期或者appky对应不正确");
                }
            }

            @Override
            public void onSuccess(String userid) {
                RongIM.getInstance().enableNewComingMessageIcon(true);//显示新消息提醒
                RongIM.getInstance().enableUnreadMessageIcon(true);//显示未读消息数目
                Log.d(TAG, "onSuccess: " + userid);
//                Map<String, Object> params = new HashMap<>();
//                params.put("isFirst", "true");
//                mWXSDKInstance.fireGlobalEventCallback("ryPushMessage", params);
                success.invoke("true");
            }

            @Override
            public void onError(RongIMClient.ErrorCode errorCode) {
                Log.d(TAG, errorCode.getMessage());
            }
        });
    }

    @JSMethod(uiThread = false)
    public void logout(){
        RongIM.getInstance().logout();
    }

    @Override
    public UserInfo getUserInfo(String s) {
        for (Friend i : userIdList) {
            if (i.getUserId().equals(s)) {
                return new UserInfo(i.getUserId(), i.getUserName(), Uri.parse(i.getPortraitUri()));
            }
        }
        return null;
    }

    @JSMethod(uiThread = false)
    public void clearDb(JSONArray array, String uuId, final JSCallback success) {
        String db = uuId + ".db";
        sqlhelp = new SQLiteHelper(mWXSDKInstance.getContext(), db, null, 1);
        Boolean suc = sqlhelp.deleteTable();
        if (suc) {
            success.invoke("true");
        } else {
            success.invoke("false");
        }
    }

    @JSMethod(uiThread = false)
    public void addUser(JSONArray array, String uuid, final JSCallback success) {
        if (sqlhelp == null) {
            Log.d(TAG, "addUser: sqlhelp=null");
        }
        Person person = new Person();
        person.setId(array.getString(0));
        person.setRyId(array.getString(1));
        person.setLabel(array.getString(2));
        person.setShortLabel(array.getString(3));
        person.setPid(array.getString(4));
        person.setNodeType(Integer.parseInt(array.getString(5)));
        person.setAvatarUrl(array.getString(6));
        sqlhelp.addPerson(person);
        success.invoke("true");
    }

    @JSMethod(uiThread = false)
    public void selectAll(String userUuid,String sql,JSCallback success) {
        if (sqlhelp == null) {
            sqlhelp = new SQLiteHelper(mWXSDKInstance.getContext(), userUuid + ".db", null, 1);
        }
        JSONArray jsonArray = sqlhelp.queryAllPerson(sql);
        success.invoke(jsonArray);
    }

    /*
    * 废弃
    *
    * */
    public File getDatabasePath(String name) {
        ///data/user/0/com.century.tianjiapp/files
        String dbDir = mWXSDKInstance.getContext().getFilesDir().getAbsolutePath();// 数据库所在目录
        String dbPath = dbDir + "/c9kqb3rdcyhqj/" + name; // 数据库路径
        Log.d(TAG, "ryConnect:" + dbPath);
        // 判断目录是否存在，不存在则创建该目录
        File dirFile = new File(dbPath);
        if (!dirFile.exists())
            dirFile.mkdirs();

        // 数据库文件是否创建成功
        boolean isFileCreateSuccess = false;
        // 判断文件是否存在，不存在则创建该文件
        File dbFile = new File(dbPath);
        if (!dbFile.exists()) {
            try {
                isFileCreateSuccess = dbFile.createNewFile();// 创建文件
            } catch (Exception e) {
                Log.d(TAG, "getDatabasePath: " + e);
            }
        } else
            isFileCreateSuccess = true;

        // 返回数据库文件对象
        if (isFileCreateSuccess)
            return dbFile;
        else
            return null;
    }


}
