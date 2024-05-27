const Background = ({ children }) => {
  return (
    <div className="relative min-h-screen  bg-gradient-radial from-[#829182] to-[#3a3a3a] overflow-hidden">
      <div className="absolute inset-0 mybg pointer-events-none"></div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

export default Background;
