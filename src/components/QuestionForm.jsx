/* import React, { useState } from 'react';

const QuestionForm = ({ onSubmit, initialData = {} }) => {
  const [question, setQuestion] = useState(initialData.question || '');
  const [type, setType] = useState(initialData.type || 'simple');
  const [options, setOptions] = useState(initialData.options || ['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(initialData.correctAnswer || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ question, options, correctAnswer });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Question:</label>
        <input
          value={type}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <label className="block mb-1">Option {index + 1}:</label>
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}
      <div>
        <label className="block mb-1">Correct Answer:</label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select correct answer</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit} type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData.question ? 'Update Question' : 'Add Question'}
      </button>
    </div>
  );
};

export default QuestionForm; */

/* import React, { useState } from 'react';
import VideoRecorder from './VideoRecorder';

const QuestionForm = ({ onSubmit, initialData = {} }) => {
  const [question, setQuestion] = useState(initialData.question || '');
  const [type, setType] = useState(initialData.type || 'simple');
  const [options, setOptions] = useState(initialData.options || ['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(initialData.correctAnswer || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = {
      question,
      type,
      options: type === 'multiple' ? options.filter(option => option !== '') : [],
      correctAnswer: type === 'simple' ? correctAnswer : (type === 'multiple' ? options[correctAnswer] : '')
    };
    onSubmit(questionData);
    setQuestion('');
    setType('simple');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Question Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="simple">Simple</option>
          <option value="multiple">Multiple Choice</option>
          <option value="video">Video</option>
        </select>
      </div>
      {type === 'multiple' && (
        <div>
          <label className="block mb-1">Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full p-2 border rounded mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      )}
      {type !== 'video' && (
        <div>
          <label className="block mb-1">Correct Answer:</label>
          {type === 'simple' ? (
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          ) : (
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select correct answer</option>
              {options.map((option, index) => (
                <option key={index} value={index}>{option}</option>
              ))}
            </select>
          )}
        </div>
      )}
      {type === 'video' && (
        <p>This question will require a video response from the student.</p>
      )}
      <button onClick={handleSubmit} type='button' className="bg-green-500 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </form>
  );
};

export default QuestionForm; */

/* import React, { useState } from 'react';

const QuestionForm = ({ onSubmit, initialData = {} }) => {
  const [question, setQuestion] = useState(initialData.question || '');
  const [type, setType] = useState(initialData.type || 'simple');
  const [options, setOptions] = useState(initialData.options || ['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(initialData.correctAnswer || '');

  const handleSubmit = () => {
    const questionData = {
      question,
      type,
      options: type === 'multiple' ? options.filter(option => option !== '') : [],
      correctAnswer: type === 'simple' ? correctAnswer : (type === 'multiple' ? options[correctAnswer] : '')
    };
    onSubmit(questionData);
    setQuestion('');
    setType('simple');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Question Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="simple">Simple</option>
          <option value="multiple">Multiple Choice</option>
          <option value="video">Video</option>
        </select>
      </div>
      {type === 'multiple' && (
        <div>
          <label className="block mb-1">Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full p-2 border rounded mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      )}
      {type !== 'video' && (
        <div>
          <label className="block mb-1">Correct Answer:</label>
          {type === 'simple' ? (
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          ) : (
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select correct answer</option>
              {options.map((option, index) => (
                <option key={index} value={index}>{option}</option>
              ))}
            </select>
          )}
        </div>
      )}
      {type === 'video' && (
        <p>This question will require a video response from the student.</p>
      )}
      <button onClick={handleSubmit} type="button" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </div>
  );
};

export default QuestionForm; */



import React, { useState } from 'react';

const QuestionForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [type, setType] = useState('simple');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddQuestion = () => {
    if (!question.trim()) {
      alert('La pregunta no puede estar vacía');
      return;
    }

    const newQuestion = {
      question,
      type,
      options: type === 'multiple' ? options.filter(option => option.trim() !== '') : [],
      correctAnswer
    };


    onSubmit(newQuestion);

    // Resetear el formulario
    setQuestion('');
    setType('simple');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Question Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="simple">Simple</option>
          <option value="multiple">Multiple Choice</option>
          <option value="video">Video</option>
        </select>
      </div>
      {type === 'multiple' && (
        <div>
          <label className="block mb-1">Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full p-2 border rounded mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      )}
      {type !== 'video' && (
        <div>
          <label className="block mb-1">Correct Answer:</label>
          {type === 'simple' ? (
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          ) : (
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select correct answer</option>
              {options.map((option, index) => (
                <option key={index} value={index}>{option}</option>
              ))}
            </select>
          )}
        </div>
      )}
      {type === 'video' && (
        <p>This question will require a video response from the student.</p>
      )}
      <button onClick={handleAddQuestion} type="button" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </div>
  );
};

export default QuestionForm;