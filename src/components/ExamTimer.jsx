/* import React, { useState, useEffect } from 'react';

const ExamTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-xl font-bold">
      Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default ExamTimer; */

import React, { useState, useEffect } from 'react';

const ExamTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-xl font-bold mb-4">
      Tiempo restante: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default ExamTimer;
