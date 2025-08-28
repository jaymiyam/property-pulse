'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function addProperty(formData) {
  await connectDB();

  //   get current user information from session
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User id is required');
  }

  const amenities = formData.getAll('amenities');
  const images = formData.getAll('images').map((image) => image.name);

  const propertyData = {
    owner: sessionUser.userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    images,
  };

  // save the new property to database
  const newProperty = new Property(propertyData);
  await newProperty.save();

  // purge the cache of index page and update the data with new property
  revalidatePath('/', 'layout');
  //   redirect to new property's page
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
