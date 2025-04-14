import { readdirSync } from "node:fs";
import { program } from "commander";

import localPath from "./utils/localPath.js";
import logger from "./utils/logger.js";
import json from "./utils/json.js";

const project = json.load('../package.json');

program.version(project.version);

const commandDirectories = readdirSync(localPath.absolutePath('./commands'));

(async () => {
    for (const dir of commandDirectories) {
        const cmds = readdirSync(localPath.absolutePath(`./commands/${dir}`)).filter(file => file.endsWith('.js'));
        for (const file of cmds) {
            let cmd = await import(`./commands/${dir}/${file}`);
            cmd = cmd?.default ? cmd.default : cmd;
            if (cmd?.name) {
                program
                .command(cmd?.usage ? cmd.usage : cmd.name)
                .description(cmd?.description || "")
                .action((...args) => cmd.run({ program, json, logger }, {...args}) );
            } else {
                continue;
            }
        }
    }
    
    program.parse(process.argv);
})();