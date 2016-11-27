cmake_minimum_required(VERSION 3.6)
project(codechecker)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
    aws4c-0.5/s3_delete.dSYM/Contents/Resources/DWARF/s3_delete
    aws4c-0.5/s3_delete.dSYM/Contents/Info.plist
    aws4c-0.5/s3_get.dSYM/Contents/Resources/DWARF/s3_get
    aws4c-0.5/s3_get.dSYM/Contents/Info.plist
    aws4c-0.5/s3_put.dSYM/Contents/Resources/DWARF/s3_put
    aws4c-0.5/s3_put.dSYM/Contents/Info.plist
    aws4c-0.5/sqs_example.dSYM/Contents/Resources/DWARF/sqs_example
    aws4c-0.5/sqs_example.dSYM/Contents/Info.plist
    "aws4c-0.5/\u0001P\b@@\r"
    aws4c-0.5/aws4c.c
    aws4c-0.5/aws4c.h
    aws4c-0.5/aws4c.h.gch
    aws4c-0.5/aws4c.o
    aws4c-0.5/COPYING
    aws4c-0.5/Makefile
    aws4c-0.5/MANIFEST
    aws4c-0.5/out
    aws4c-0.5/README
    aws4c-0.5/s3_delete
    aws4c-0.5/s3_delete.c
    aws4c-0.5/s3_get
    aws4c-0.5/s3_get.c
    aws4c-0.5/s3_put
    aws4c-0.5/s3_put.c
    aws4c-0.5/sqs_example
    aws4c-0.5/sqs_example.c
    aws4c-0.5/sqs_example.o
    aws4c.c
    aws4c.h
    checker.cpp
    codechecker
    makefile
    tinyxml2.cpp
    tinyxml2.h
    VBMTXIt
    z4VnO2n)

add_executable(codechecker ${SOURCE_FILES})