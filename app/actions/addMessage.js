'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function addMessage(prev, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'You must be signed in to send message.' };
  }

  const recipient = formData.get('recipient');

  if (recipient === sessionUser.userId) {
    return { error: 'You can not send a message to yourself' };
  }

  const newMessage = new Message({
    sender: sessionUser.userId,
    recipient: recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
