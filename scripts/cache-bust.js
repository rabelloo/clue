const colors = require('colors');
const replace = require('replace-in-file');
const { log, error } = require('./log');
const version = process.env.npm_package_version;

log('Cache busting images...'.gray);
log('Version:'.gray, `${version}`.magenta);

module.exports =
replace({
    from: /\.(png|svg)(?:\?v=[^"]+)?/g,
    to: `.$1?v=${version}`,
    files: ['dist/index.html', 'dist/manifest.json'],
})
.then(
    files => log('Cache busted:'.gray, files.join(', ').magenta),
    error
);
