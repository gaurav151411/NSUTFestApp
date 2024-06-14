
import { HomePage } from "../src/components/home/home";

export default function Home({data}){
    return(
        <div >
            
            <HomePage data={data}/>
            
        </div>
    )

    
}
export async function getServerSideProps(){
    //only runs on the server side we can include keys secrests, only access to access them is passing them through props
    const {events_categories}=await import('../data/data.json');
//    console.log(events_categories)
    return{
        props:{
           data:events_categories
        }
    }
}