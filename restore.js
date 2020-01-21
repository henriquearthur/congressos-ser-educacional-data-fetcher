const firestoreService = require('firestore-export-import');
const serviceAccount = require('./firebase/congresso-unama-firebase-adminsdk-smxjg-5c420f3c7d.json');
const databaseURL = 'https://congresso-unama.firebaseio.com';

firestoreService.initializeApp(serviceAccount, databaseURL);

function getArgs() {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach(arg => {
            // long arg
            if (arg.slice(0, 2) === '--') {
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2, longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            // flags
            else if (arg[0] === '-') {
                const flags = arg.slice(1, arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}

const args = getArgs();

console.log("Restoring " + args.backup);
firestoreService.restore('backups/' + args.backup);