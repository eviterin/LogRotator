import * as assert from 'assert';
import * as LogRotator from './LogRotate';
import * as fs from 'fs';

async function e2eRotationTest() {
    const testFile = 'test.log';
    LogRotator.createOrClearLogFile(testFile);
    console.log('Test: Creating log file...');

    // Assert that the file exists
    assert.ok(fs.existsSync(testFile), 'File does not exist.');

    // Get the initial file size
    const initialFileSize1 = fs.statSync(testFile).size;

    // Assert that the initial file size is 0MB
    assert.strictEqual(initialFileSize1, 0, 'Test file initial size is not 0MB.');

    console.log('Test: Initial file size is 0MB.');

    // Append 2MB of data to "test.log"
    LogRotator.appendOneMBToFile(testFile);
    LogRotator.appendOneMBToFile(testFile);

    console.log('Test: Appended 2MB of data to test log.');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Assert that the file is not rotated (size is still 2MB)
    const currentFileSize1 = fs.statSync(testFile).size;
    assert.strictEqual(currentFileSize1, 2 * 1024 * 1024, 'File was rotated prematurely.');

    // Append an additional 2MB of data to "test.log"
    LogRotator.appendOneMBToFile(testFile);
    LogRotator.appendOneMBToFile(testFile);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Test: Appended an additional 2MB of data to test log.');

    // Enact the policy defined in "logpolicy.conf"
    // Which rotates the test.log file if it is greater than 3MB
    LogRotator.enactLogrotatePolicy();
    console.log('Test: Logrotate policy enacted.');
    await new Promise(resolve => setTimeout(resolve, 5000));


    // Check if the file was rotated (size is reset to 0)
    const finalFileSize1 = fs.statSync(testFile).size;
    assert.strictEqual(finalFileSize1, 0, 'File was not rotated.');

    if (finalFileSize1 === 0) {
        console.log('Test passed: Test file was rotated successfully.');
    } else {
        console.error('Test failed: Test file was not rotated.');
    }
}

e2eRotationTest();