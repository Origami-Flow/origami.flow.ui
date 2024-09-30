const FooterText = ({ items }) => {
    return (
        <div className="flex flex-col text-rosesecundary w-52 h-full justify-evenly">
            {items.map((item, index) => (
                <span key={index}>{item}</span>
            ))}
        </div>
    )
}

export default FooterText;