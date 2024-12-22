import { Link, Outlet } from "react-router-dom";

export default function DefaultLayout() {


  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>

          <div>

          </div>
        </header>
        <main>
          <Outlet/>
        </main>
       
      </div>
    </div>
  )
}
