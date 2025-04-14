export default {
    name: 'version',
    description: 'Show CLI version',
    aliases:[],
    run: async ({ json }) => {
        const project = json.load('../package.json');
        console.log(project.version);
    }
};
