/*
	Main checker file that forks child processes, number of which is given in
	command line argument while running the executable.
	Each child process will poll AWS SQS queue and after getting a message,
	it will fetch the code from AWS S3 and execute it and then send the result.
*/
#include <iostream>
#include <vector>
#include <string>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <fstream>
#include <stdlib.h>
#include "submission.cpp"

using namespace std;

int main(int argc, char * argv[]) {

}
