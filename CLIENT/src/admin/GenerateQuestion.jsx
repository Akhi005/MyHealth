import React from 'react'
import { useLocation } from 'react-router-dom'

const GenerateQuestion = () => {
  const location = useLocation()
  const { questions, title } = location.state || { questions: [] }
  return (
    <div>
      <h1 className="text-3xl flex justify-center my-7">
        Generated Q/A on <b className="ml-2">{title}</b>
      </h1>
      <div className="container mx-auto">
        {questions && questions.length > 0 ? (
          <ul className="list-disc pl-5">
            {questions.map((item, index) => {
              const [questionPart, answerPart] = item.split('Answer:')
              return (
                <div key={index} className="mb-6">
                  <p className="font-bold bg-gray-200 p-5 rounded-t-xl text-2xl w-full">{questionPart?.trim()}</p>
                  {answerPart && <p className="bg-gray-300 p-5 rounded-b-xl  text-2xl w-full ">Answer:  {answerPart.trim()}</p>}
                </div>
              )
            })}
          </ul>
        ) : (
          <p>No questions and answers were generated.</p>
        )}
      </div>
    </div>
  )
}

export default GenerateQuestion
