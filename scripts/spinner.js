const colors = require('colors');
const fs = require('fs-extra');
const { log, error } = require('./log');

const dest = 'tmp/spinner.svg';

log(`Creating ${dest}...`.gray);

module.exports =
fs.copy('src/app/spinner/spinner.component.html', dest)
.then(
    () => log('Created:'.grey, dest.magenta),
    error
);
