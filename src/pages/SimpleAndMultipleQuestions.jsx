import React from 'react';

const SimpleAndMultipleQuestions = ({ questions, answers, handleAnswer, timeUp }) => {
  return (
    <>
      {questions.map((question, index) => (
        <div key={question._id} className="bg-white p-4 rounded shadow mb-4">
          <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
          {question.type === 'simple' && (
            <input
              type="text"
              value={answers[question._id] || ''}
              onChange={(e) => handleAnswer(question._id, e.target.value)}
              className="w-full p-2 border rounded"
              disabled={timeUp}
            />
          )}
          {question.type === 'multiple' && (
            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
                <label key={optIndex} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleAnswer(question._id, option)}
                    className="mr-2"
                    disabled={timeUp}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default SimpleAndMultipleQuestions;