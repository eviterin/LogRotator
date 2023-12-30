# LogRotator
Enacts a [logrotate](https://linux.die.net/man/8/logrotate) policy for any set of files.
The log rotation behavior can be set inside the `logpolicy.conf` file. 

## Test
```
Creates a file.
Enacts a 3MB threshold policy.
Adds 2MB of data to the file, below threshold.
Asserts file is not rotated.
Adds 2MB of data to the file, above threshold.
Asserts file is rotated.
```

## How to Run
Follow these steps to run the program:
1. Compile the TypeScript files: tsc *.ts
2. Execute the compiled JavaScript file: node LogRotate.test.js

## Expected Output
Upon successful execution, you should see the following output:
```
Test: Creating log file...
Test: Initial file size is 0MB.
Test: Appended 2MB of data to test log.
Test: Appended an additional 2MB of data to test log.
Test: Logrotate policy enacted.
Test passed: Test file was rotated successfully.
```
