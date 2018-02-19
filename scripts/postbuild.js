const colors = require('colors');
const { log, error } = require('./log');

log('[Post Build]'.cyan, 'Start'.green);

require('./inline')
.then(() => require('./cache-bust'))
.then(
    () => log('[Post Build]'.cyan, 'Finish'.green),
    error
);
