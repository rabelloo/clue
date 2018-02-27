// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBciniecFHtoiVUB6vysRDSpnCBonQa4J0',
    authDomain: 'clue-solver.firebaseapp.com',
    databaseURL: 'https://clue-solver.firebaseio.com',
    projectId: 'clue-solver',
    storageBucket: 'clue-solver.appspot.com',
    messagingSenderId: '593102949051'
  }
};
