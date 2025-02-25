/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { create } from "../../actions"
import { generateLetter } from "../../utils/generateLetter"
import { useSearchParams } from "next/navigation"
import { navigate } from "../../actions"

import {
  useState,
  useEffect,
  Fragment,
  ChangeEvent,
  SyntheticEvent
} from "react"
import Header from "@/app/components/Header"
import Image from "next/image"

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
  const [checkedName, setCheckedName] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [qNumber, setQNumber] = useState<number>(0)
  const [rightAnswer, setRightAnswer] = useState<number>(0)
  const [value, setValue] = useState<string>("")

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

  const filteredQuiz: any = data.filter((d: DataProps) => {
    return d.title === search
  })

  const handleChange = (event: ChangeEvent<HTMLLabelElement>) => {
    setValue(event.target.nextSibling?.nodeValue as string)
    setCheckedName(event.target.id)
  }

  const handleSubmit = (event: SyntheticEvent, answer: string) => {
    event.preventDefault()

    if (checkedName) {
      setIsSubmitted(true)
      if (value === answer) {
        setRightAnswer((prevValue) => prevValue + 1)
        setValue("")
      }
    } else {
      setIsSubmitted(false)
    }
  }

  const handleNextAnswer = () => {
    setQuestionNumber((questionNumber) => questionNumber + 110)
    setQNumber((qNumber) => qNumber + 1)
    setCheckedName("")
  }

  let showRes = false

  useEffect(() => {
    if (isSubmitted && qNumber === 9) {
      showRes = true
      navigate(filteredQuiz[0].title, rightAnswer)
    }
  }, [showRes, isSubmitted])

  return (
    <Fragment>
      {filteredQuiz.map((quiz: QuizProps) => {
        const { questions } = quiz

        return (
          <Fragment key={quiz.title}>
            <Header subject={quiz.title} />
            <main className="relative row-start-2 row-end-3 overflow-hidden px-[1.5em] pt-[2em]">
              {questions.map((question: QuestionProps, index: number) => {
                const { options, answer } = question

                return (
                  <div
                    key={index}
                    className="absolute top-0 grid w-full grid-rows-subgrid gap-[2.5em]"
                    style={{
                      left: `calc((110%*${index}) - ${questionNumber}%)`,
                      padding: "inherit"
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
                    <form
                      className="answers"
                      onSubmit={(event) => handleSubmit(event, answer)}
                    >
                      <div className="fe-quiz-subject-list">
                        {options.map((option: string, index: number) => {
                          const letter = generateLetter(index)

                          return (
                            <label
                              onChange={handleChange}
                              htmlFor={`option-${index + 1}`}
                              data-index={`option-${index + 1}`}
                              className={`grid grid-cols-[40px_1fr_40px] grid-rows-[auto] items-center gap-[0.8889em] rounded-[0.6667em] border-[3px] border-solid bg-[var(--clr-white)] px-[0.6667em] py-[0.6667em] text-[1.125rem] font-bold text-[var(--clr-grey-700)] checked:transition checked:duration-150 checked:ease-in-out ${isSubmitted === false && checkedName === `option-${index + 1}` ? "border-[var(--clr-purple)]" : ""} cursor-pointer ${isSubmitted === true && checkedName === `option-${index + 1}` && option === answer ? "border-[var(--clr-light-green)]" : ""} ${isSubmitted === true && checkedName === `option-${index + 1}` && option !== answer ? "border-[var(--clr-medium-red)]" : ""}`}
                              key={index}
                            >
                              <input
                                type="radio"
                                id={`option-${index + 1}`}
                                name={`option`}
                                before-dynamic-value={letter}
                                className={`letter relative inline-block h-[40px] w-[40px] appearance-none rounded-[0.3333em] bg-[var(--clr-grey-300)] text-center text-[1.125rem] uppercase text-[var(--clr-grey-500)] before:absolute before:inset-0 before:content-center before:content-[attr(before-dynamic-value)] checked:transition checked:duration-150 checked:ease-in-out ${isSubmitted === false && checkedName === `option-${index + 1}` ? "bg-[var(--clr-purple)] text-white" : ""} ${isSubmitted && checkedName === `option-${index + 1}` && option === answer ? "bg-[var(--clr-light-green)] text-white" : ""} ${isSubmitted && checkedName === `option-${index + 1}` && option !== answer ? "bg-[var(--clr-medium-red)] text-white" : ""}`}
                                disabled={isSubmitted}
                                defaultChecked={
                                  checkedName === `option-${index + 1}`
                                }
                              />
                              {option}
                              {isSubmitted &&
                              checkedName === `option-${index + 1}` &&
                              option !== answer ? (
                                <Image
                                  src="/images/icon-error.svg"
                                  alt=""
                                  height={24}
                                  width={24}
                                />
                              ) : (
                                ""
                              )}
                              {isSubmitted &&
                              (checkedName !== `option-${index + 1}` ||
                                checkedName === `option-${index + 1}`) &&
                              option === answer ? (
                                <Image
                                  src="/images/icon-correct.svg"
                                  alt=""
                                  height={24}
                                  width={24}
                                />
                              ) : (
                                ""
                              )}
                            </label>
                          )
                        })}
                      </div>

                      {isSubmitted && checkedName ? (
                        <button
                          type="submit"
                          className="mt-[0.6667em] block w-full rounded-[0.6667em] bg-[var(--clr-purple)] py-[0.6667em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)]"
                          onClick={handleNextAnswer}
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="mt-[0.6667em] block w-full rounded-[0.6667em] bg-[var(--clr-purple)] py-[0.6667em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)]"
                        >
                          Submit answer
                        </button>
                      )}

                      {isSubmitted && checkedName === "" ? (
                        <span>Please select an answer</span>
                      ) : (
                        ""
                      )}
                    </form>
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
