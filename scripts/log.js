const colors = require('colors');
const yargs = require('yargs').argv;
const verbose = yargs.v || yargs.verbose;

module.exports = {
    error,
    log,
    warn,
}

function log() {
    console.log(...arguments);
}

function warn() {
    console.warn('[Warning]'.yellow, ...arguments);
}

function error(err) {
    const print = (msg, stack) => console.error('[Error]'.red, msg.red, stack);

    if (err instanceof Error) {
        const stack = verbose ? err.stack.substring(err.stack.indexOf('\n')) : '';
        print(err.message, stack);
    }
    else if (err) {
        print(err);
    }

    process.exit(1);
}
