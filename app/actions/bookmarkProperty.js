'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';

async function bookmarkProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User not found.');
  }

  await connectDB();

  const targetUser = await User.findById(sessionUser.userId);

  let isBookmarked = targetUser.bookmarks.includes(propertyId);
  let message;

  if (!isBookmarked) {
    targetUser.bookmarks.push(propertyId);
    isBookmarked = true;
    message = 'Bookmark added successfully';
  } else {
    targetUser.bookmarks.pull(propertyId);
    isBookmarked = false;
    message = 'Bookmark removed successfully';
  }

  await targetUser.save();
  revalidatePath('/properties/saved', 'page');

  return {
    isBookmarked,
    message,
  };
}

export default bookmarkProperty;
