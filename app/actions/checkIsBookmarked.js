'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkIsBookmarked(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return;
  }

  await connectDB();

  const targetUser = await User.findById(sessionUser.userId);

  let isBookmarked = targetUser.bookmarks.includes(propertyId);

  return {
    isBookmarked,
  };
}

export default checkIsBookmarked;
