#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_com_anonymous_timemanager_MyCppCode_stringFromJNI(JNIEnv *env,
                                                       jobject /* this */) {
  return env->NewStringUTF("Hello from C/C++!"); // Возвращаем строку
}
