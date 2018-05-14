package com.century.tianjiapp.RyIm;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;

import com.alibaba.fastjson.JSONArray;
import com.benmu.framework.model.WeexEventBean;
import com.benmu.framework.utils.L;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.ui.view.WXFrameLayout;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.rong.imkit.RongIM;
import io.rong.imkit.fragment.ConversationListFragment;
import io.rong.imlib.RongIMClient;
import io.rong.imlib.model.Conversation;
import io.rong.imlib.model.Message;
import io.rong.imlib.model.MessageContent;
import io.rong.message.TextMessage;

/**
 * Created by chencentury on 2018/3/9.
 */


public class RyListView extends WXVContainer<WXFrameLayout> implements RongIMClient.OnReceiveMessageListener {
    public static WXSDKInstance mWXSDKInstance;
    public static SQLiteHelper sqlhelp;
    private WXFrameLayout layout;
    public static final String TAG = "RongLog========>";
    private ConversationListFragment mConversationFragment = null;

    public RyListView(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
        if (mWXSDKInstance == null) {
            mWXSDKInstance = instance;
        }
    }

    protected WXFrameLayout initComponentHostView(@NonNull final Context context) {
        layout = new WXFrameLayout(context);
        RongIM.setOnReceiveMessageListener(this);
        return layout;
    }

    @WXComponentProp(name = "userUuid")
    public void setTel(String userUuid) {
//        getHostView().setText("tel: " + telNumber);
    }

    @JSMethod
    public void openView(JSONArray array) {
        Log.d(TAG, "openView: " + array.getString(0) + array.getString(1));
        try {
            String otherUuid = array.getString(0);
            String name = array.getString(1);
//            Log.d(TAG, "openView: " + mco);
            ;
//        RongIM.setUserInfoProvider(this, true);
//        RongIM.getInstance().refreshUserInfoCache(new UserInfo(youId, youName, Uri.parse(youUri)));
            RongIM.getInstance().startPrivateChat(mWXSDKInstance.getContext(), otherUuid, name);

        } catch (Exception e) {
            Log.d(TAG, "openView: " + e);
        }

    }

    @JSMethod
    public void selectData(String userUuid, final JSCallback success) {
        if(sqlhelp == null){
            String db = userUuid + ".db";
            sqlhelp = new SQLiteHelper(mWXSDKInstance.getContext(), db, null, 1);
        }
        RongIMClient.getInstance().getConversationList(new RongIMClient.ResultCallback<List<Conversation>>() {
            @Override
            public void onSuccess(List<Conversation> conversations) {
                try {
                    if (conversations == null) {
                        success.invoke(null);
                        return;
                    }
                    JSONArray newArray = new JSONArray();
                    for (Conversation con : conversations) {
                        MessageContent messageContent = con.getLatestMessage();
                        String conent = "";
                        if (messageContent instanceof TextMessage) {//文本消息
                            TextMessage textMessage = (TextMessage) messageContent;
                            conent = textMessage.getContent();
                        }
                        Map<String, String> data = new HashMap<>();
                        String targetId = con.getTargetId();
                        Person person = sqlhelp.queryPersonById(targetId);
                        if(person == null){
                            break;
                        }
                        data.put("userId", targetId);
                        data.put("name", person.getLabel());
                        data.put("content", conent);
                        data.put("lastTime", String.valueOf(con.getSentTime()));
                        data.put("typeName", con.getObjectName());
                        data.put("avatarUrl", person.getAvatarUrl());
                        data.put("unreadCount", String.valueOf(con.getUnreadMessageCount()));
                        newArray.add(data);
                    }
                    success.invoke(newArray);
                } catch (Exception e) {
                    Log.d(TAG, "selectData: " + e);
                    success.invoke(null);
                }
            }

            @Override
            public void onError(RongIMClient.ErrorCode errorCode) {
                Log.d(TAG, "onError: "+errorCode);
                success.invoke(null);
            }
        });
    }

    @JSMethod
    public void deleteItem(Conversation.ConversationType conversationType,String uuId,final JSCallback success) {
       Boolean suc = RongIMClient.getInstance().removeConversation(conversationType,uuId);
        if(suc){
            success.invoke("true");
        }else{
            success.invoke("false");
        }
    }

    @Override
    public boolean onReceived(Message message, int i) {
        Map<String, Object> params = new HashMap<>();
        params.put("key", "value");
        mWXSDKInstance.fireGlobalEventCallback("ryPushMessage", params);
        return true;
    }
}
