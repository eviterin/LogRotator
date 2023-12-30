# LogRotator
Enacts a [logrotate](https://linux.die.net/man/8/logrotate) policy for items defined inside config file.

## How to Run
Follow these steps to run the program:
1. Compile the TypeScript files: tsc *.ts
2. Execute the compiled JavaScript file: node LogRotate.test.js

## Expected Output
this whole thing todo:

The log rotation behavior is defined in the `logpolicy.conf` file. 

You can find this file in the project directory:
Upon successful execution, you should see the following output:
```
Test: Creating log file...
Test: Initial file size is 0MB.
Test: Appended 2MB of data to test log.
Test: Appended an additional 2MB of data to test log.
Test: Logrotate policy enacted.
Test passed: Test file was rotated successfully.
```
