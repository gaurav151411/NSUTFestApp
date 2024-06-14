// pages/exploreevents.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../src/firebase/firebase';
import Link from 'next/link';

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Events</h1>
      <div className="events-grid">
        {events.map(event => (
            <Link key={event.id} href={`/events/${event.place.trim().toLowerCase().replace(/\s+/g, '-')}/${event.id}`}>
            <div key={event.id} className="card">
                <img src={event.image} alt={event.title} />
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>{new Date(event.createdAt).toLocaleDateString()}</p>
                <p>{event.place}</p>
                <p>Registered Emails: {event.emails_registered.length}</p>
            </div>
            </Link>
          
        ))}
      </div>
      <style jsx>{`
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .card {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }
        .card img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default ExploreEvents;
