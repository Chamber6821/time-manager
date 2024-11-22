package com.anonymous.timemanager

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MyCppCode(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    init {
        System.loadLibrary("mycppcode")
    }

    override fun getName(): String {
        return "MyCppCode"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    external fun stringFromJNI(): String
}
