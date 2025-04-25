import Table from "cli-table";
import chalk from "chalk";
import fig from "figlet";
import log from "gulog";

log.setup({
    usePrefix: true,
    prefix: '[commiter]',
    prefixColor: 'magenta',
    info: {
        usePrefix: true,
        prefix: '[info]',
        prefixColor: 'cyan',
        messageColor: 'white',
    },
    error: {
        usePrefix: true,
        prefix: '[error]',
        prefixColor: 'redBright',
        messageColor: 'red',
    },
    warning: {
        usePrefix: true,
        prefix: '[warn]',
        prefixColor: 'yellowBright',
        messageColor: 'yellow',
    },
    success: {
        usePrefix: true,
        prefix: '[success]',
        prefixColor: 'green',
        messageColor: 'white',
    }
});

const { error, info, warning, success } = log;

const figlet = (text) => {
    console.log(chalk.cyan(fig.textSync(text)));
}

const table = (head, colWidths, data) => {
    const table = new Table({ head, colWidths });
    data.map((item) => table.push(item));
    console.log(table.toString());
}

export default {
    error, info, warning, success, figlet, table
}