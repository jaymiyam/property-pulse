'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessage(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required.' };
  }

  const targetMessage = await Message.findById(messageId);

  if (!targetMessage) {
    return { error: 'Message not found.' };
  }

  if (targetMessage.recipient.toString() !== sessionUser.userId) {
    return { error: 'Unauthorized' };
  }

  targetMessage.read = !targetMessage.read;

  await targetMessage.save();

  revalidatePath('/messages', 'page');

  return { read: targetMessage.read };
}

export default markMessage;
