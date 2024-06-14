import Image from 'next/image';
import SingleEvent from '../../../src/components/events/singleEvent';
import { db } from '../../../src/firebase/firebase';
import { collection, query, getDocs ,where} from 'firebase/firestore';

const EventPage = ({ eventData }) => {
  console.log(eventData);
  return (
    <SingleEvent data={eventData} />
  );
};

export default EventPage;

export async function getStaticPaths() {
  const eventsCollection = collection(db, 'events');
  const eventsSnapshot = await getDocs(eventsCollection);
 
  const paths = eventsSnapshot.docs.map(doc => {
    console.log(doc.data())
    return {
      params: {
        cat:doc.data().place.trim().toLowerCase().replace(/\s+/g, '-'),
        id: doc.data().id
      },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps(context) {
  try {
    const { id } = context.params;

    // Query to find the event data based on the id field
    const eventsCollection = collection(db, 'events');
    const eventsQuery = query(eventsCollection, where('id', '==', id));
    const eventsSnapshot = await getDocs(eventsQuery);

    // Check if any documents match the query
    if (eventsSnapshot.empty) {
      return {
        notFound: true,
      };
    }

    // Assuming there's only one document with the specified id
    const eventData = eventsSnapshot.docs[0].data();
    console.log(eventData);

    return {
      props: {
        eventData,
      },
    };
  } catch (error) {
    console.error('Error fetching event data:', error);
    return {
      notFound: true,
    };
  }
}