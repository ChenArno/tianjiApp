package com.century.tianjiapp.cpmpontes;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.ui.view.IWebView;
import com.taobao.weex.ui.view.WXWebView;

import java.util.Date;

/**
 * Created by chencentury on 2018/3/21.
 */

public class TJehcarts extends WXComponent implements IWebView.OnPageListener{
    private WXWebView mWebView;
    private WebView mWeb;
    private String mCharInfo;
    private Date s;
    private boolean mLoadFinish;

    public TJehcarts(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, int type) {
        super(instance, dom, parent, type);
        init();
    }

    public TJehcarts(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String
            instanceId, boolean isLazy) {
        super(instance, dom, parent, instanceId, isLazy);
        init();
    }

    public TJehcarts(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, boolean isLazy) {
        super(instance, dom, parent, isLazy);
        init();
    }

    public TJehcarts(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
        init();
    }

    private void init() {
        mWebView = new WXWebView(getContext());
    }

    @Override
    protected View initComponentHostView(@NonNull Context context) {
        View view = mWebView.getView();
        mWeb = mWebView.getWebView();
        view.setBackgroundColor(Color.TRANSPARENT);
        WebSettings settings = mWeb.getSettings();
        settings.setJavaScriptEnabled(true);
        mWebView.setOnPageListener(this);
        s = new Date();
        Log.e("TJehcarts", "start" + s.getTime());
        mWeb.loadUrl("file:///android_asset/tj-chart.html");
        mWeb.setWebChromeClient(new WebChromeClient() {

            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                return false;
            }

            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                String message = consoleMessage.message();
                Log.e("onConsoleMessage", ">>>>>>" + message);
                return super.onConsoleMessage(consoleMessage);
            }
        });
        return view;
    }


    @Override
    protected void onFinishLayout() {
        super.onFinishLayout();
    }

    @Override
    public void onReceivedTitle(String title) {

    }

    @Override
    public void onPageStart(String url) {

    }

    @WXComponentProp(name = "options")
    public void setChartInfo(String info) {
        this.mCharInfo = info;
        executeSetOptions();
    }

    @JSMethod
    public void setOptions(String info) {
        this.mCharInfo = info;
        executeSetOptions();
    }


    @Override
    public void onPageFinish(String url, boolean canGoBack, boolean canGoForward) {
        Date e = new Date();
        Log.e("TJehcarts", "finsh" + e.getTime() + "耗时" + (e.getTime() - s.getTime()));
        mLoadFinish = true;
        executeSetOptions();
    }


    public void executeSetOptions() {
        if (!mLoadFinish) return;
        if (!TextUtils.isEmpty(mCharInfo)) {
            Log.e("options",">>>>>>>>"+mCharInfo);
            mWeb.loadUrl("javascript:setOption(" + mCharInfo + ")");
            fireEvent("finish");
        }
    }
}
