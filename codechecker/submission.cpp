//
// Created by Ashesh Vidyut on 27/11/16.
//

#include<string>
#include<iostream>
using namespace std;
class Submission{
    public: string submission_str;
            void print_submission_str();
            void run_submission();
};
void Submission::print_submission_str() {
    cout << submission_str << endl;
}
void Submission::run_submission() {
    cout << "running" << endl;
}

