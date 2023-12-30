import { exec } from 'child_process';
import * as fs from 'fs';

export function enactLogrotatePolicy(): Promise<void> {
    return new Promise((resolve, reject) => {
        const stateFilePath = "logrotate.state"; // Local path for the .state file to be created
        const configFile = 'logpolicy.conf'; // Local path where the log rotate policy is found

        // Check if the config file exists
        if (!fs.existsSync(configFile)) {
            reject(new Error(`Config file ${configFile} not found.`));
            return;
        }
        
        // Execute logrotate in the command line
        exec(`logrotate --state ${stateFilePath} ${configFile}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
            }

            if(stdout.length > 0)
            {
                console.log(`Stdout: ${stdout}`);
            }

            resolve();
        });
    });
}

export function createOrClearLogFile(filePath: string) {
    if (fs.existsSync(filePath)) {
        // Clear the file if it exists
        fs.writeFileSync(filePath, '');
    } else {
        // Create the file if it doesn't exist
        fs.writeFileSync(filePath, '');
    }
}

export function clearLogFile(filePath: string) {
    fs.writeFileSync(filePath, '');
}

// Used for testing purposes
export function appendOneMBToFile(filePath: string) {
    // Each character is 1 byte, and 1 MB is 1024 * 1024 bytes = 1,048,576 bytes
    const oneMBData = '0'.repeat(1024 * 1024);

    // Append the data to the file
    fs.appendFileSync(filePath, oneMBData);
}