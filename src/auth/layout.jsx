import { Outlet,Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated=false;
  return (
    <>
      {isAuthenticated ?(
        <Navigate to="/"/>
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet/>
          </section>
          <img className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" 
          src="https://i.ibb.co/W5j5ycW/sign-in-page.jpg"/>
        </>
      )}
    </>
  )
}

export default AuthLayout