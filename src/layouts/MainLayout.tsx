import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Loading from "../components/Loading"
import { useLoading } from "../contexts/LoadingContext"

const MainLayout = () => {
  const {isLoading} = useLoading();
  return (
    <div className='w-full h-full px-4 sm:px-6 md:px-10 lg:px-20'>
      <Header />
      <div className="mt-4">
        <Outlet />
      </div>
      {isLoading && <Loading />}
    </div>
  )
}

export default MainLayout
