#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_com_mycppproject_MyCppCode_stringFromJNI(JNIEnv *env, jobject /* this */) {
  return env->NewStringUTF("Hello from C++!");
}
