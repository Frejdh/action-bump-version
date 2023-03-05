// https://github.com/actions/github-script

module.exports = async ({core, exec}) => {
    const {
        projectFramework,
        version,
    } = process.env;

    let commandOutput = '';
    let commandError = '';
    const options = {
        listeners: {
            stdout: (data) => {
                commandOutput += data.toString();
            },
            stderr: (data) => {
                commandError += data.toString();
            }
        }
    };

    switch (projectFramework.toLowerCase()) {
        case 'maven':
            await exec.exec("mvn", ["-B", "versions:set", `-DnewVersion=${version}`, "-DprocessAllModules", "-DgenerateBackupPoms=false"], options);
            break;
    }

    if (commandError) {
        core.notice(commandOutput);
        core.setFailed(commandError);
    }
    else if (commandOutput) {
        core.info(`Resolved command for [${projectFramework}] and executed command successfully`);
    }
    else {
        core.setFailed(`Project framework [${projectFramework}] not supported`);
    }

}