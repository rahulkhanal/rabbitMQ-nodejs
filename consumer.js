const amqp = require('amqplib');

async function receiveMail() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue('mail_queue', { durable: false });
        channel.consume('mail_queue', async (msg) => {
            const message = JSON.parse(msg.content);
            console.log(message);
            await channel.ack(msg);
        });
    } catch (error) {

    }
}
 
receiveMail();