import { menuItems } from '../../constants/index'
import './Sidebar.css'

import { Link } from "react-router-dom"


const Sidebar = () => {
  return (
    <aside className='sidebar'>      
      <nav className="menu">
      <ul className="menu__list">
        {menuItems?.map((item,index)=>{
            return <li key={index}>
                <Link to={item.route} className='list-item'>
                <svg
              className="list-item__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
                <path d= {item.path}/>
            </svg>
            <label className="list-item__label">{item.name}</label>
                </Link>
            </li>
        })}
        
      </ul>
    </nav>
    <div className='btnWrap'><button type="button" className="btn btn-danger logout">Logout</button></div>
    </aside>
  )
}

export default Sidebar