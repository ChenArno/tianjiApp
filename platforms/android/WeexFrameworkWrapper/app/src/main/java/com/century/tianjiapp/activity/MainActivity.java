package com.century.tianjiapp.activity;

import android.os.Bundle;
import android.view.ViewGroup;

import com.benmu.framework.activity.AbstractWeexActivity;
import com.century.tianjiapp.R;

public class MainActivity extends AbstractWeexActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
        renderPage();
    }

    private void initView() {
        mContainer = (ViewGroup) findViewById(R.id.layout_container);
    }
}
