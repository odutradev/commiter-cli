export default {
    name: 'help',
    description: 'Show help panel',
    aliases:[],
    run: async ({ program }) => {
        program.outputHelp();
    }
};
