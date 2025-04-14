export default {
    name: 'help',
    description: 'Show help panel',
    aliases:[],
    run: async ({program, logger, json }) => {
        const project = json.load('../package.json');

        const name = project.name.replace("-", " ").toUpperCase();
        logger.figlet(name);
        program.outputHelp();
    }
};
