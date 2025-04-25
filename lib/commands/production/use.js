import axios from "axios";

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

        try {
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

            try {       
                logger.info("Starting message translation");

                const { data } = await axios.post(
                    'https://api.commiter.odutra.com/translate',
                    {
                        text: commitMessage,
                        targetLang: currentConfig.commitMessageLanguage
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                commitMessage = data.translated;
            } catch (error) {
                console.log(error);
                let useSentMessage = await prompt([{
                    message: 'There was an error in the translation, do you want to keep the message you sent?',
                    type: 'confirm'
                }]);
                
                if (!useSentMessage) return logger.warning("Process successfully cancelled");
            }

            const endCommitMessage = `${commitConfig.emoji + " " || ""}${commitConfig.keyword + ": " || ""}${commitMessage}`;
    

            if (currentConfig.addFilesToGitOnCommit){
                logger.info("Files added to git");
                await cmd("git add .", process.cwd(), { log: true });
            };
    
            const safeMessage = endCommitMessage.replace(/"/g, '\\"');
    
            await cmd(
              `git commit -a -m "${safeMessage}"`,
              process.cwd(),
              { log: true, shell: true }
            );

            logger.success("Commit completed successfully");
        } catch (error){
            console.log(error)
            logger.error("Unable to complete process")
        }
    }
};
