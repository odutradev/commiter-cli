export default {
    name: 'config',
    description: 'Perform CLI configuration',
    aliases:[],
    run: async ({ config }) => {
       config.get();
    }
};