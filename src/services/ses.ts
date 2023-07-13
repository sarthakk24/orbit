import config from '../config'
import { EMAIL_DATA_INTERFACE } from '../models/emailSchema'
import Logger from '../loaders/logger'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

const ses = new SESv2Client({
    region: config.awsRegion,
    credentials: {
        accessKeyId: config.awsID,
        secretAccessKey: config.awsKey,
    },
})

const sendEmail = async (data: EMAIL_DATA_INTERFACE) => {
    //Teamplate for sending emails
    const templateString = `
    <!DOCTYPE html><html><head><meta charset=utf-8><title>Submission Result</title><style>*{margin:0;padding:0;box-sizing:border-box}body{padding:100px;width:100vw}p{margin:10px 0}h1{margin:30px 0}h2{margin:30px 0}li{list-style-type:none;font-weight:500}@media only screen and (max-width:768px){body{width:100%}h1{font-size:20px}p{font-size:16px}}</style></head><body><h1>Submission Result</h1><h3>Hi ${data.name},</h3><p>Your recent submission for the ${data.problemName} problem has been reviewed.</p><h2>Results</h2><ul><li>Status: ${data.status}</li><li>Score: ${data.score}</li><li>Time: ${data.time}</li><li>Memory: ${data.memory}</li></ul><h2>Details</h2><ul><li>Date: ${data.date}</li><li>Compiler Name: ${data.compilerName}</li><li>Compiler Version: ${data.compilerVersion}</li></ul></body></html>
    `

    const params = {
        Destination: {
            ToAddresses: [data.email],
        },
        Content: {
            Simple: {
                Subject: {
                    Data: 'Submission Result details',
                },
                Body: {
                    Html: {
                        Data: templateString,
                    },
                },
                Text: {
                    Data: 'Submission Details',
                },
            },
        },

        FromEmailAddress: config.from,
    }
    try {
        await ses.send(new SendEmailCommand(params))
        return { status: true, message: 'Email Sent Successfully!' }
    } catch (err) {
        Logger.error(err)
        return { status: false, message: err }
    }
}
export default sendEmail
