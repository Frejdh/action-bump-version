// https://github.com/actions/github-script

module.exports = ({github, context, core}) => {
    const {
        projectFramework,
        version,
    } = process.env;

    let command = '';
    switch (projectFramework.toLowerCase()) {
        case 'maven':
            command = `mvn -B versions:set "-DnewVersion=${version}" -DprocessAllModules -DgenerateBackupPoms=false`;
            break;
        default:
            console.error(`Project framework [${projectFramework}] not supported`);
    }
    core.exportVariable('BUMP_VERSION_COMMAND', command)
}