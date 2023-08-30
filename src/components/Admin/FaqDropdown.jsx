import React, { useState } from "react";

const FAQDropdown = ({ questions }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="border rounded p-4">
          <button
            className="text-lg font-semibold cursor-pointer focus:outline-none"
            onClick={() => toggleAnswer(index)}
          >
            {question.question}
          </button>
          {activeIndex === index && (
            <div className="mt-2">{question.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQDropdown;
