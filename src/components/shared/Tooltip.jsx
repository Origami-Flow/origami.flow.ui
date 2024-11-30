const Tooltip = ({ text, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute z-50 bottom-full transform left-1/2 -translate-x-1/2 hidden group-hover:block bg-white border border-gray-200 text-black text-xs rounded py-1 px-2">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;