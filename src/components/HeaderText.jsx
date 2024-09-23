function HeaderText(props){
    return(
      <ul className="flex space-x-3 items-center hover:text-rosesecundary cursor-pointer">
        {props.item}
      </ul>
    )
}

export default HeaderText;