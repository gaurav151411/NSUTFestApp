import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const CatEvent = ({events,pageName}) => {
  console.log(events);
  return (
    <div className='cat_events' style={{marginTop:"-15em"}}>
        <h1>Events at {pageName}</h1>
        <div className='content'>
            {events.map((ev)=>(
                <Link className="card" key={ev.id} href={`/events/${pageName}/${ev.id}` } passHref>
                
                    <Image className='image' width={400} height={300} alt={ev.title} src={ev.image}/>
                    <h2>{ev.title}</h2>
                    <p>{ev.description}</p>
                
                </Link>
                ))}
        </div>
      </div>
  )
}

export default CatEvent