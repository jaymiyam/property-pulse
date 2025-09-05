'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId) {
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

  await targetMessage.deleteOne();

  revalidatePath('/messages', 'page');

  return { deleted: true };
}

export default deleteMessage;
