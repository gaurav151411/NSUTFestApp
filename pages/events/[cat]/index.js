import CatEvent from "../../../src/components/events/catEvent";
import AddEvent from "../../../src/components/events/addEvent";
import { db } from "../../../src/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const EventsCatPage = ({ events, pageName }) => {
  console.log(events);
  return (
    <>
      <AddEvent />
      <CatEvent events={events} pageName={pageName} />
    </>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  // Fetch event categories from data.json
  const { events_categories } = await import('../../../data/data.json');

  // Extract unique categories
  const categories = new Set(events_categories.map((event) => event.id));

  // Generate paths for each category
  const allPaths = Array.from(categories).map((cat) => ({
    params: {
      cat: cat.toString(),
    },
  }));

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  
  // Fetch data from Firebase
  const eventsCollection = collection(db, 'events');
  const querySnapshot = await getDocs(eventsCollection);
  const events = [];
  querySnapshot.forEach((doc) => {
    const eventData = doc.data();
    console.log(eventData)
    if (eventData.place.trim().toLowerCase().replace(/\s+/g, '-') === id) {
      events.push({ id: doc.id, ...eventData });
    }
  });
  // console.log(events);
  return {
    props: { events, pageName: id },
  };
}
