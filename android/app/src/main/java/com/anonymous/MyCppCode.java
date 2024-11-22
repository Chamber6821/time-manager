package com.mycppproject;

public class MyCppCode {
    static {
        System.loadLibrary("mycppcode");
    }

    public static native String stringFromJNI();
}
