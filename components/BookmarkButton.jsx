'use client';
import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkIsBookmarked from '@/app/actions/checkIsBookmarked';
import { useSession } from 'next-auth/react';

const BookmarkButton = ({ property }) => {
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleBookmark = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property.');
      return;
    }

    const res = await bookmarkProperty(property._id);

    if (res.error) {
      return toast.error(res.error);
    }

    setIsBookmarked(res.isBookmarked);
    toast.success(res.message);
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkIsBookmarked(property._id).then((res) => {
      setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId]);

  if (loading) return <p>Loading...</p>;

  return isBookmarked ? (
    <button
      onClick={handleBookmark}
      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleBookmark}
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
