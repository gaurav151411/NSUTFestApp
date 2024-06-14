import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const AllEvents = ({data}) => {
  console.log(data);
  return (
    <div className='events_page'>
      
     
          {data.map((ev)=>(
             <Link className="card" key={ev.id} href={`events/${ev.id}`} passHref>
              
             <Image width={400} height={300} alt={ev.id} src={ev.image} />
             <h2>{ev.title}</h2>
           </Link>
            ))}
          

        
      </div>
  )
}

export default AllEvents