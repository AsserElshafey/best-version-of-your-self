const Background = ({ children }) => {
  return (
    <div className="relative min-h-screen  bg-gradient-radial from-[#9b927a] to-[#a8a8a8] overflow-hidden">
      <div className="absolute inset-0 mybg pointer-events-none"></div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

export default Background;
