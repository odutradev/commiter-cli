export default {
    name: 'use',
    description: 'Use the tool to commit',
    aliases:[],
    run: async ({program, logger, json, prompt, config }) => {
        const project = json.load('../package.json');
        let currentConfig = config.get(); 

        const name = project.name.replace("-", " ").toUpperCase();
        logger.figlet(name);
        
        let commitMessage = await prompt([{
            message: 'What is the commit message?',
            name: "commitMessage",
            type: 'input'
        }]);

        commitMessage = commitMessage[0];

        
    }
};
