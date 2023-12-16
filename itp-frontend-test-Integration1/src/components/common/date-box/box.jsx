







import React, { useState } from 'react';

function NumberButton({ number, selected, onClick }) {
  const buttonClasses = `absolute w-[46px] h-[38px] font-normal text-[16px] text-center tracking-[-0.32px] leading-[21px] ${
    selected ? 'text-black' : 'text-[#7f7f7f]'
  }`;

  return (
    <button
      className={buttonClasses}
      onClick={() => onClick(number)}
      style={{
        top: `${(Math.floor((number - 1) / 7) * 38) + 114}px`,
        left: `${((number - 1) % 7) * 46 + 34}px`,
      }}
    >
      {number}
    </button>
  );
}

const Box = () => {
  const containerStyles = {
    width: '786px',
    height: '734px',
    transform: 'scale(1)',
    transformOrigin: 'top left',
  };

  const calendarStyles = {
    width: '253px',
    height: '117px',
    position: 'relative',
  };
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const toggleNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  return (
    <div style={containerStyles}>
      <div style={calendarStyles}>
        <div className="relative">
          {Array.from({ length: 31 }, (_, i) => (
            <NumberButton
              key={i + 1}
              number={i + 1}
              selected={selectedNumbers.includes(i + 1)}
              onClick={toggleNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Box;

