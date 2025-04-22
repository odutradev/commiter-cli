export default {
    name: 'config',
    description: 'Perform CLI configuration',
    usage: 'config [action] [extra]',
    aliases:[],
    run: async ({ config, logger, json, prompt }, {'0': action, '1': extra }) => {
       const configType = json.load("../data/default/configTypes.json");
       let currentConfig = config.get(); 
   
       switch (action){
        case("get"):
            logger.table(
                ['Name', 'Description'],     
                [30, 70],
                Object.entries(currentConfig).map(([key, value]) => ([key, value]))                    
            );
        break
        case("list"):
            logger.table(
                ['Name', 'Description'],     
                [30, 70],
                Object.entries(configType).map(([key, value]) => ([key, value.description]))                    
            );
        break
        case("update"):
            if (!extra){
                logger.error("Enter the setting you want to change");
                console.log("\n\nUse 'config update [configName]'");
                return;
            };  

            const type = configType[extra];

            if(!type) return logger.error("Not a valid configName");

            const configPromt = await prompt([{
                message: type.description,
                type: 'list',
                name: extra,
                choices: type.choices
            }])

            const updateResult = config.update({
                [extra]: configPromt[extra]
            });
            if (updateResult.status){
                logger.success(`"${extra}" configuration updated successfully`);
            } else {
               logger.error("Unable to update due to an error");
            };
            
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