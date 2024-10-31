import { Link } from "react-router-dom";
function HeaderText({item, path}){
    return(
      
      <Link to={path} className="flex space-x-3 items-center hover:text-rosesecundary cursor-pointer">
        {item}
      </Link>
    )
}

export default HeaderText;