cmake_minimum_required(VERSION 3.4.1)

add_library(mycppcode SHARED MyCppCode.cpp)

find_library(log-lib log)

target_link_libraries(mycppcode ${log-lib})
