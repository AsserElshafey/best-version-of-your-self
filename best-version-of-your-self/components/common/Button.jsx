import { colors } from '../../utils/colors';

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-full font-semibold transition-colors";
  const variantStyles = {
    primary: `bg-[${colors.primaryDark}] text-white hover:bg-[${colors.primary}]`,
    outline: `border border-[${colors.primary}] text-[${colors.primary}] hover:bg-[${colors.primary}] hover:text-white`
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;