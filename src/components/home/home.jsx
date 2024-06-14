import Link from "next/link"
import Image from "next/image"
export const HomePage=({data})=>{
    return(
        <div  className="home-body">
                 

                {data?.map((ev)=>
                <Link className="card" key={ev.id} href={`/events/${ev.id}`}passHref>
                    <div className="image">
                        <Image width={500} height={300}alt={ev.title} src={ev.image}/>
                    </div>

                    <div className="content" >
                        <h2 style={{fontFamily:"monospace", fontSize:"40px"}}>{ev.title}</h2>
                        <p style={{fontFamily:"fantasy"}}>{ev.description}</p>
                    </div>
                    
                    
                </Link>)}
                
        </div>
    )
}

