// pages/exploreevents.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        let eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort events by the number of registered emails
        eventsData = eventsData.sort((a, b) => b.emails_registered.length - a.emails_registered.length);

        // Take the top 6 events
        eventsData = eventsData.slice(0, 10);

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

  const eventTitles = events.map(event => event.title);
  const eventRegistrations = events.map(event => event.emails_registered.length);

  const data = {
    labels: eventTitles,
    datasets: [
      {
        label: 'Number of Registrations',
        data: eventRegistrations,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Top 6 Event Registrations',
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [8, 4],
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h1>Events</h1>
      <div style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ExploreEvents;
