require('dotenv').config();
var moment = require('moment');
moment.locale('pt-br');

const firestoreService = require('firestore-export-import');
const serviceAccount = require('./firebase/congressos-ser-educacional-firebase-adminsdk-h98t9-c1f88ff95f.json');
const databaseURL = "https://congressos-ser-educacional.firebaseio.com";

firestoreService.initializeApp(serviceAccount, databaseURL);

firestoreService
    .backups(['2019_v1.1_congressos', '2019_v1.1_palestras'])
    .then(data => {
        var json = JSON.stringify(data);

        const fs = require('fs');

        var filename = "backup_" + new Date() + ".json";

        fs.writeFile("backups/" + filename, json, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("Backup saved!");

            // Send .json file to e-mail
            const nodemailer = require('nodemailer');

            var currentDate = moment().format('LLL');

            var emailContent = 'Backup realizado em <b>' + currentDate + '</b>.<br>';
            emailContent += 'Arquivo .json em anexo.';

            const config = {
                mailserver: {
                    host: 'smtp.zoho.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'eu@henriquearthur.com.br',
                        pass: process.env.EMAIL_PASS
                    }
                },
                mail: {
                    from: 'eu@henriquearthur.com.br',
                    to: ['eu@henriquearthur.com.br', 'hnrq.art@gmail.com'],
                    subject: '[congressos-ser-educacional-data-fetcher] Backup realizado - ' + currentDate,
                    html: emailContent,
                    attachments: [
                        {
                            filename: filename,
                            content: fs.createReadStream('backups/' + filename)
                        },
                    ]
                },
            };

            const sendMail = async ({ mailserver, mail }) => {
                let transporter = nodemailer.createTransport(mailserver);
                let info = await transporter.sendMail(mail);
            };

            sendMail(config).catch(console.error);
        });
    });
