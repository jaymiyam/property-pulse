'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  //   validate session user
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User not found.');
  }

  await connectDB();

  const targetProperty = await Property.findById(propertyId);

  if (!targetProperty) {
    throw new Error('Property not found.');
  }

  //   validate property ownership
  if (targetProperty.owner.toString() !== sessionUser.userId) {
    throw new Error('You do not have permission to delete this property.');
  }

  // get property image ids
  const imageIds = targetProperty.images.map((image) => {
    const parts = image.split('/');
    return parts.at(-1).split('.').at(0);
  });

  if (imageIds.length > 0) {
    for (const id of imageIds) {
      await cloudinary.uploader.destroy('property-pulse/' + id);
    }
  }

  await targetProperty.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteProperty;
