import inquirer from "inquirer";

import json from "./json";

const prompt = async (prompts, options={}) => {
    const project = json.load('../package.json');

    const name = project.name.replace("-", " ").toUpperCase();
    const validateNotAllowed= (value) => value ? true : "An empty response is not allowed.";
    prompts = prompts.map(({ validate=validateNotAllowed, prefix=name, type='input', message, name, choices=[] }, index) => ({ validate, prefix, type, message, name: (name || index.toString()), choices }) );
    let answers;
    answers = await inquirer.prompt(prompts);
    return answers;
};

export default prompt;