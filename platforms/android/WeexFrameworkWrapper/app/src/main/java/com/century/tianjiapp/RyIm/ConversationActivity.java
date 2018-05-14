package com.century.tianjiapp.RyIm;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.century.tianjiapp.R;

import java.util.HashMap;
import java.util.Map;

import io.rong.imkit.RongIM;
import io.rong.imlib.RongIMClient;
import io.rong.imlib.model.Message;

/**
 * Created by chencentury on 2018/3/9.
 */

public class ConversationActivity extends FragmentActivity implements RongIM.OnSendMessageListener {
    TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.conversation);

        //对方 昵称
        String title = getIntent().getData().getQueryParameter("title");
        if (!TextUtils.isEmpty(title)) {
            textView = (TextView) findViewById(R.id.RY_title);
            textView.setText(title);
        }

        Button titleBackBtn = (Button) findViewById(R.id.RY_iewBack);
        titleBackBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Map<String, Object> params = new HashMap<>();
                params.put("key", "value");
                RyListView.mWXSDKInstance.fireGlobalEventCallback("ryPushMessage",params);
                finish();
            }
        });
    }

    /**
     * 消息发送前监听器处理接口（是否发送成功可以从 SentStatus 属性获取）。
     *
     * @param message 发送的消息实例。
     * @return 处理后的消息实例。
     */
    @Override
    public Message onSend(Message message) {
        return null;
    }
    /**
     * 消息在 UI 展示后执行/自己的消息发出后执行,无论成功或失败。
     *
     * @param message              消息实例。
     * @param sentMessageErrorCode 发送消息失败的状态码，消息发送成功 SentMessageErrorCode 为 null。
     * @return true 表示走自已的处理方式，false 走融云默认处理方式。
     */
    @Override
    public boolean onSent(Message message, RongIM.SentMessageErrorCode sentMessageErrorCode) {
        return false;
    }
}
