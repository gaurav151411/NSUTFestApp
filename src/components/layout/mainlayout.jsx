import { FooterPage } from "../footer/footer"
import { HeaderPage } from "../header/header"

export const MainLayout = ({children}) => {
  return (
    <>
        <HeaderPage/>
          <main>
            {children}
          </main>

        <FooterPage/>
    </>
  )
}

