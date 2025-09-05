'use client';
import { useState } from 'react';
import markMessage from '@/app/actions/markMessage';
import deleteMessage from '@/app/actions/deleteMessage';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/app/context/GlobalContext';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const { setUnreadCount } = useGlobalContext();

  const handleMarkMessage = async () => {
    const res = await markMessage(message._id);

    if (res.error) {
      return toast.error(res.error);
    } else {
      setIsRead(res.read);
      setUnreadCount((prev) => (res.read ? prev - 1 : prev + 1));
    }
  };
  const handleDeleteMessage = async () => {
    const res = await deleteMessage(message._id);

    if (res.error) {
      return toast.error(res.error);
    } else if (res.deleted) {
      setUnreadCount((prev) => (isRead ? prev : prev - 1));
      toast.success('Message Deleted');
    }
  };
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>{' '}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.message}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {message.createdAt}
        </li>
      </ul>
      <button
        onClick={handleMarkMessage}
        className={`cursor-pointer mt-4 mr-3 text-white py-1 px-3 rounded-md ${
          isRead ? 'bg-blue-500' : 'bg-green-500'
        }`}
      >
        Mark As {isRead ? 'Unread' : 'Read'}
      </button>
      <button
        onClick={handleDeleteMessage}
        className="cursor-pointer mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
