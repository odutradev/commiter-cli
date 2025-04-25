import inquirer from "inquirer";

import logger from "./logger.js"

const prompt = async (prompts, options={}) => {
    try {        
        const validateNotAllowed= (value) => value ? true : "An empty response is not allowed.";
        prompts = prompts.map(({ validate=validateNotAllowed, type='input', message, name, choices=[] }, index) => ({ validate, type, message, name: (name || index.toString()), choices }) );
        let answers;
        answers = await inquirer.prompt(prompts);
    
        return answers.lenght == 1 ? answers[0] : answers;
    } catch (error) {
        logger.warning("Input canceled by user");
        process.exit()
    }
};

export default prompt;