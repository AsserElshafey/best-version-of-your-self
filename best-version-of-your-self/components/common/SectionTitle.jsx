import React from 'react';
import { colors } from '../../utils/colors';


const SectionTitle = ({ 
  title, 
  subtitle,
  className = ''
}) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className={`text-3xl font-bold text-[${colors.primary}] mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;