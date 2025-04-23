import cmd from "../../utils/cmd.js";

export default {
    name: 'use',
    description: 'Use the tool to commit',
    aliases:[],
    run: async ({program, logger, json, prompt, config }) => {
        const commitPatterns = json.load("../data/default/commitPatterns.json");
        const project = json.load('../package.json');
        let currentConfig = config.get(); 

        const name = project.name.replace("-", " ").toUpperCase();
        logger.figlet(name);
        
        let commitMessage = await prompt([{
            message: 'What is the commit message?',
            type: 'input'
        }]);
        
        commitMessage = commitMessage[0];

        const currentCommitPatterns = commitPatterns[currentConfig.commitPatterns];

        const choices = currentCommitPatterns.map((x, i) => ({ name: `${x.emoji} ${x.keyword ? x.keyword + ":": ""} ${x.description}`, value: i }) );
        
        let commitPrefix = await prompt([{
            message: 'What is your commit prefix?',
            type: 'list',
            choices
        }]);

        const commitConfig = currentCommitPatterns[commitPrefix[0]];

        const endCommitMessage = `${commitConfig.emoji + " " || ""}${commitConfig.keyword + ": " || ""}${commitMessage}`;

        if (currentConfig.addFilesToGitOnCommit){
            logger.info("Files added to git");
            cmd("git add .", process.cwd(), { log: true });
        };

        console.log(`git commit -am "` + endCommitMessage + `"`, process.cwd())
        const safeMessage = endCommitMessage.replace(/"/g, '\\"');

// rode dentro de um shell para que o `"..."` seja respeitado
cmd(
  `git commit -a -m "${safeMessage}"`,
  process.cwd(),
  { log: true, shell: true }
);

        logger.success("Commit completed successfully");
    }
};
