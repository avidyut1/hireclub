# hireclub
Platform for Hiring Candidates includes Online Judge, Real Time Code Pair, Video Calling etc

There are three parts of the project 

1. CodeChecker - C++ Library that continuously polls message from SQS queue and excutes the code after fetching code from S3.

    Run the make command inside codechecker folder to create the object named codechecker.
    
        % make

2. Web App - Rails MySql AngularJS running on Unicorn and Nginx.

3. Realtime Engine powered by Redis and Socket.io.
