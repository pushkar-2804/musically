import {Link} from 'react-router-dom'
import './Menu.css'
import { menuItems } from '../../constants/index'

const Menu = () => {
  return (
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
  )
}

export default Menu
