"use client"

import { create } from "../../actions"
import { generateLetter } from "../../utils/generateLetter"
import { useSearchParams } from "next/navigation"

import { useState, useEffect, Fragment } from "react"
import Header from "@/app/components/Header"

interface DataProps {
  title: string
  question: string
  answer: string
  options: string[]
}

export interface QuizProps {
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
        console.log(quiz)
        return (
          <Fragment key={quiz.title}>
            <Header subject={quiz.title} />
            <main className="row-start-2 row-end-3 overflow-hidden px-[1.5em] pt-[2em]">
              {questions.map((question: QuestionProps, index: number) => {
                const { options } = question
                return (
                  <div
                    key={index}
                    className="grid w-full grid-rows-subgrid gap-[2.5em]"
                    style={{
                      transform: `translate(calc(110%*${index}), calc(100%*(-${index})))`
                    }}
                  >
                    <div className="question-info grid gap-[0.75em]">
                      <p className="text-[0.875rem] italic leading-[1.5] text-[var(--clr-grey-500)]">
                        Question {index + 1} of {questions.length}
                      </p>
                      <p className="mt-[0.6em] text-[1.25rem] font-bold leading-[1.2] text-[var(--clr-grey-700)]">
                        {question.question}
                      </p>

                      <div className="mt-[0.75em] h-[16px] w-full rounded-full bg-[var(--clr-white)] p-[4px]">
                        <div
                          className="h-[8px] rounded-full bg-[var(--clr-purple)]"
                          style={{
                            width: `${((index + 1) / questions.length) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="answers">
                      <ul className="fe-quiz-subject-list">
                        {options.map((option: string, index: number) => {
                          const letter = generateLetter(index)
                          return (
                            <li
                              className="grid grid-cols-[40px_1fr] items-center gap-[0.8889em] rounded-[0.6667em] bg-[var(--clr-white)] px-[0.6667em] py-[0.6667em] text-[1.125rem] font-bold text-[var(--clr-grey-700)]"
                              key={index}
                            >
                              <span className="inline-block h-[40px] w-[40px] content-center rounded-[0.3333em] bg-[var(--clr-grey-300)] text-center text-[1.125rem] uppercase text-[var(--clr-grey-500)]">
                                {letter}
                              </span>{" "}
                              <p className="">{option}</p>
                            </li>
                          )
                        })}
                      </ul>
                      <button className="mt-[0.6667em] block w-full rounded-[0.6667em] bg-[var(--clr-purple)] py-[0.6667em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)]">
                        Submit answer
                      </button>
                    </div>
                  </div>
                )
              })}
            </main>
          </Fragment>
        )
      })}
    </Fragment>
  )
}
