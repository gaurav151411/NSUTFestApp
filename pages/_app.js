import { MainLayout } from "../src/components/layout/mainlayout"
import '../app/globals.css'
import '../app/Home.scss'
function MyApp({Component,pageProps}){
    return(
        <>
            <MainLayout>
                <Component {...pageProps}/>
            </MainLayout>
        </>
    )
}
export default MyApp