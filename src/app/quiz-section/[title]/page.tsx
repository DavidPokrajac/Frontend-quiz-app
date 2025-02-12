"use client"

import { create } from "../../actions"
import { useSearchParams } from "next/navigation"

import { useState, useEffect, Fragment } from "react"

interface DataProps {
  title: string
  question: string
  answer: string
  options: string[]
}

interface QuizProps {
  title: string
  icon: string
  questions: {
    question: string
    answer: string
    options: string[]
  }[]
}

interface QuestionProps {
  question: string
  answer: string
  options: string[]
}

export default function Page() {
  const [data, setData] = useState([])
  const searchParams = useSearchParams()
  const search = searchParams.get("title")

  useEffect(() => {
    const quizData = () => {
      create().then((p) => {
        const { quizzes } = p
        setData(quizzes)
      })
    }
    quizData()
  }, [])

  const filteredQuiz = data.filter((d: DataProps) => {
    return d.title === search
  })

  return (
    <Fragment>
      {filteredQuiz.map((quiz: QuizProps) => {
        const { questions } = quiz
        console.log(questions)
        return (
          <div key={quiz.title}>
            <h3>{quiz.title}</h3>
            {questions.map((question: QuestionProps, index: number) => {
              const { options } = question

              return (
                <div
                  key={index}
                  className="absolute top-5 inline-block h-screen w-full"
                  style={{ left: `calc(100%*${index})` }}
                >
                  <p>{question.question}</p>
                  {options.map((option: string, index: number) => {
                    return (
                      <div key={index}>
                        <p>{option}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </Fragment>
  )
}
