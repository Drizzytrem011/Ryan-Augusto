import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative py-4 px-8 text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-300 font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] overflow-hidden";
  
  const variants = {
    primary: "bg-offwhite text-black hover:bg-neutral-300 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    white: "bg-white text-black hover:bg-neutral-200 border border-transparent",
    outline: "bg-transparent text-offwhite border border-neutral-700 hover:border-offwhite hover:text-white hover:bg-white/5",
    ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;