const amqp = require('amqplib');

async function sendMail() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'mail_exchange';
    const routingKey = 'send_mail';

    const message = {
      to: 'rahul39khanal@gmail.com',
      from: 'hamroghar531@gmail.com',
      subject: 'test',
      body: 'Hello Rahul !!',
    }

    await channel.assertExchange(exchange, 'direct', { durable: false }); // create exchange
    await channel.assertQueue('mail_queue', { durable: false }); // create queue
    await channel.bindQueue('mail_queue', exchange,routingKey); // bind queue to exchange
    // if durable is true, the queue will be deleted when the channel is closed

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    console.log('Message sent');
 
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

sendMail();
