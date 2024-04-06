package com.vietTravel.module.common;

import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Objects;

public class CommonModule extends ReactContextBaseJavaModule {
    public CommonModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return "CommonApp";
    }

    @ReactMethod
    public void hideNavigation() {
        getReactApplicationContext().runOnUiQueueThread(() -> {
            try {
                final int flags =
                        View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                                | View.SYSTEM_UI_FLAG_IMMERSIVE;
                Objects.requireNonNull(getCurrentActivity()).getWindow().getDecorView().setSystemUiVisibility(flags);
            } catch (Exception ignored) {
            }
        });
    }
}
