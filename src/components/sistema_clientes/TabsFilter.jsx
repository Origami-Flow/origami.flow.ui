const TabsFilter = ({ tabs, activeTabIndex, onTabClick }) => {
    return (
        <ul className="w-[40%] h-[8vh] flex items-center justify-between border-gray-300 border-[0.5px] border-solid rounded-xl p-2 mb-4 max-md:w-full max-md:h-[7vh]">
            {tabs.map((tab, index) => (
                <li
                    key={tab.text}
                    className={`w-[50%] p-2 max-lg:p-1 list-none text-center cursor-pointer transition-colors duration-300 ease-in-out rounded-xl max-md:text-sm ${activeTabIndex === index ? 'bg-roseprimary text-branconeutro' : 'text-black/65'}`} 
                    onClick={() => onTabClick(index)}
                >
                    {tab.text}
                </li>
            ))}
        </ul>
    );
}

export default TabsFilter;