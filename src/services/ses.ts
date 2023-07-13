import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses'
import config from '../config'
import { EMAIL_DATA_INTERFACE } from '../models/emailSchema'
import Logger from '../loaders/logger'

const client = new SESClient({ region: 'REGION' })

const sendEmail = async (data: EMAIL_DATA_INTERFACE, template: string) => {
    try {
        const input = {
            Source: config.from,
            Destination: {
                ToAddresses: [data.email],
            },
            ReplyToAddresses: [config.replyTo],
            Template: template,
            TemplateData: JSON.stringify(data), // required
        }

        const command = new SendTemplatedEmailCommand(input)
        const response = await client.send(command)
        return { status: 200, message: `Email Sent to ${data.email}`, response }
    } catch (error) {
        Logger.error(error)
        return {
            status: 500,
            message: `Problem Sending email to ${data.email}`,
        }
    }
}

export default sendEmail
