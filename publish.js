import logger from "./lib/utils/logger.js";
import json from "./lib/utils/json.js";
import cmd from "./lib/utils/cmd.js";
import chalk from "chalk";

logger.info("Starting CLI publishing");

const { version } = json.load('../package.json');

const bumpVersion = ver => {
  const parts = ver.split('.').map(Number);
  parts[2]++;
  if (parts[2] > 9) {
    parts[2] = 0;
    parts[1]++;
    if (parts[1] > 9) {
      parts[1] = 0;
      parts[0]++;
    }
  }
  return parts.join('.');
};

const newVersion = bumpVersion(version);

try {
    logger.info(`Updating CLI from ${chalk.cyanBright(version)} to ${chalk.greenBright(newVersion)}`);

    json.update('../package.json', { version: newVersion });
    await cmd(`git commit -a -m "${newVersion}"`, process.cwd(), { log: false, shell: true });
    await cmd(`npm publish`, process.cwd(), { log: false, shell: true });
} catch (error) {
     logger.error("There was an error updating");
} finally {
    logger.success("CLI Updated successfully");
};


