const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-full font-semibold transition-colors";
  const variantStyles = {
    primary: "bg-primary-dark text-white hover:bg-primary",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white"
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
