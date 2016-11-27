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
#include "aws4c.h"
#include "tinyxml2.h"
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <fstream>
#include <stdlib.h>
#include "submission.cpp"

using namespace std;
using namespace tinyxml2;

char * gen_random(int);

int main(int argc, char * argv[]) {
  	char * queueURL = "https://sqs.ap-south-1.amazonaws.com/624003939571/code";
  	/// Initialize the AWS SDK library.
  	aws_init();
  	aws_set_debug(1);
  	char * config = "id";
  	int rc = aws_read_config(config);
  	if(rc) {
      puts ( "Could not find a credential in the config file" );
      puts ( "Make sure your ~/.awsAuth file is correct" );
      return 0;
    }
	pid_t child_pid; // stores pid
	pid_t parent = getpid();
	int num_child = 0; //stores number of child process
	if(argc == 2){
		num_child = atoi(argv[1]);
	}
	else{
		cout << "Please enter number of child processes" << endl;
		cin >> num_child;
	}
	// creating num_child child processes
	for (int i = 0; i < num_child; i++){
		if(parent == getpid()) {
			child_pid = fork();
			if (child_pid >= 0) {
				// now poll on AWS SQS forever
				while (true) {
					IOBuf * bf = aws_iobuf_new();
					char receipt[1024];
					memset(receipt, 0, sizeof(receipt));
					int rv = sqs_get_message(bf, queueURL, receipt);
					string response;
					while (1) {
						char Ln[1024];
						int sz = aws_iobuf_getline ( bf, Ln, sizeof(Ln));
						string line (Ln);
						if ( Ln[0] == 0 ) break;
						response = response + line;
					}
					response = response.substr(21);
					char * fname = gen_random(7);
					ofstream out(fname);
					out << response;
					out.close();
					//parsing the response string
					XMLDocument xmldoc;
					xmldoc.LoadFile(fname);
					XMLNode * root = xmldoc.FirstChild();
					const char* message;
					XMLElement * node = root -> FirstChildElement("ReceiveMessageResult");
					if (node) {
						XMLElement * nodechild = node -> FirstChildElement("Message");
						if(nodechild) {
							message = nodechild -> FirstChildElement( "Body" )->GetText();
							cout << message << endl;
							//execute the code
							// use the message to fetch code from s3 and run it locall
							Submission s;
							s.submission_str = message;
							s.print_submission_str();
						}
					}
				    //delete the file
				    if(remove(fname) != 0){
				      cout << "Error deleting the file" << endl;
				    }
				    else{
				      cout << "Deleted file" << endl;
				    }
					aws_iobuf_free(bf);
					if (receipt[0] != 0) {
						bf = aws_iobuf_new ();
						rv = sqs_delete_message (bf, queueURL, receipt);
					}
					else {
						cout <<  "Empty queue" << endl;
					}
				}
			}
			else{
				cout << "Failed to create a fork" << endl;
			}
		}
	}
	return 0;
}
char * gen_random(int len) {
    static const char alphanum[] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    char s[len];
    srand(time(NULL));
    for (int i = 0; i < len; ++i) {
    	int ind = rand() % (sizeof(alphanum) - 1);
        s[i] = alphanum[ind];
    }

    s[len] = 0;
    char * res = (char *) malloc(len * sizeof(char));
    strcpy(res, s);
    return res;
}
