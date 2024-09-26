const FooterSocial = ({socialLinks}) => {
    return (
        <div className="flex flex-col text-rosesecundary w-52 h-full items-center justify-evenly">
            {socialLinks.map((link, index) => (
                <span key={index} className="flex justify-evenly w-full">
                    <img className="w-5" src={link.icon} alt={`ícone ${link.name}`} />
                    {link.text}
                </span>
            ))}
        </div>
    )
}

export default FooterSocial;