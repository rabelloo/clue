const colors = require('colors');
const fs = require('fs-extra');
const { inlineSource } = require('inline-source');
const { log, error } = require('./log');

log('Inlining scripts and styles...'.gray);

const file = 'dist/index.html';

module.exports =
require('./spinner')
.then(() => inline(file))
.then(
    files => log('Inlined:'.grey, file.magenta),
    error
)
.then(() => fs.remove('tmp'));

function inline(file) {
    return inlineSource(file)
            .then(html => fs.outputFile(file, html));
}
