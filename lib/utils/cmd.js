import { spawn } from 'child_process';

const cmd = async (command, path, options={log: false}) => {
  return new Promise((resolve, reject) => {
    options.cwd = path || options.cwd; 

    const childProcess = spawn('cmd.exe', ['/c', command], options);

    var logs = '';

    childProcess.stdout.on('data', (data) => {
      logs += data.toString();
      if (options.log) console.log(data.toString());
    });

    childProcess.stderr.on('data', (data) => {
      logs += data.toString();
      if (options.log) console.log(data.toString());
    });

    childProcess.on('exit', (code, signal) => {
      const result = {
        error: code !== 0,
        status: code,
        logs
      };

      resolve(result);
    });

    childProcess.on('error', (err) => {
      const result = {
        error: err.message,
        status: null,
        logs
      };

      resolve(result);
    });
  });
};

export default cmd;