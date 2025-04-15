export default {
    name: 'config',
    description: 'Perform CLI configuration',
    usage: 'config [action]',
    aliases:[],
    run: async ({ config, logger }, {'0': action }) => {
       let currentConfig = config.get(); 
       
       switch (action){
        case("get"):
            logger.table(
                ['Chave', 'Valor'],     
                [20, 30],                    
                [['Config', 'currentConfig[0]']] 
            );
        break;
        case("reset"):
           const resetResult = config.reset();
           if (resetResult.status){
                logger.info("Formatting completed successfully");
            } else {
               logger.error("Could not format due to an error");

           };
        break;
       };
    }
};