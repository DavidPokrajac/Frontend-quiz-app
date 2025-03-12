"use client"

import { create } from "../../actions"
import { generateLetter } from "../../utils/generateLetter"
import { useSearchParams } from "next/navigation"
import { navigate } from "../../actions"

import {
  useState,
  useEffect,
  useRef,
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
  const [errorMessage, setErrorMessage] = useState<string>("")

  const radioInput = useRef<HTMLInputElement>(null)

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

  const filteredQuiz: Array<QuizProps> = data.filter((d: DataProps) => {
    return d.title === search
  })

  const handleChange = (event: ChangeEvent<HTMLLabelElement>) => {
    setValue(event.target.nextSibling?.nodeValue as string)
    setCheckedName(event.target.id)
  }

  const handleSubmit = (event: SyntheticEvent, answer: string) => {
    event.preventDefault()

    setErrorMessage("")

    if (checkedName) {
      setIsSubmitted(true)
      setValue("")
      setErrorMessage("")

      if (value === answer) {
        setRightAnswer((prevValue) => prevValue + 1)
        setValue("")
        setErrorMessage("")
      }
    } else {
      setIsSubmitted(false)
      setValue("")
      setErrorMessage("Please select an answer")
    }
  }

  const handleNextAnswer = () => {
    setQuestionNumber((questionNumber) => questionNumber + 110)
    setQNumber((qNumber) => qNumber + 1)
    setCheckedName("")
    setErrorMessage("")
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
                    className="absolute top-0 grid w-full grid-rows-subgrid gap-[2.5em] lg:grid-cols-[1fr_1fr] lg:gap-[3.5em]"
                    style={{
                      left: `calc((110%*${index}) - ${questionNumber}%)`,
                      padding: "inherit"
                    }}
                  >
                    <div className="question-info grid gap-[0.75em] lg:grid-rows-[min-content_250px_auto]">
                      <p className="text-[0.875rem] italic leading-[1.5] text-[var(--clr-grey-500)] md:text-[1.25rem]">
                        Question {index + 1} of {questions.length}
                      </p>
                      <p className="mt-[0.6em] text-[1.25rem] font-bold leading-[1.2] text-[var(--clr-grey-700)] md:text-[2.25rem]">
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
                              className={`grid grid-cols-[40px_1fr_40px] grid-rows-[auto] items-center gap-[0.8889em] rounded-[0.6667em] border-[3px] border-solid bg-[var(--clr-white)] px-[0.6667em] py-[0.6667em] text-[1.125rem] font-bold text-[var(--clr-grey-700)] checked:transition checked:duration-150 checked:ease-in-out md:text-[1.75rem] ${checkedName !== `option-${index + 1}` ? "border-transparent" : ""} ${isSubmitted === false && checkedName === `option-${index + 1}` ? "border-[var(--clr-purple)]" : ""} cursor-pointer ${isSubmitted === true && checkedName === `option-${index + 1}` && option === answer ? "border-[var(--clr-light-green)]" : ""} ${isSubmitted === true && checkedName === `option-${index + 1}` && option !== answer ? "border-[var(--clr-medium-red)]" : ""}`}
                              key={index}
                            >
                              <input
                                ref={radioInput}
                                type="radio"
                                id={`option-${index + 1}`}
                                name={`option`}
                                before-dynamic-value={letter}
                                className={`letter relative inline-block h-[40px] w-[40px] appearance-none rounded-[0.3333em] bg-[var(--clr-grey-300)] text-center text-[1.125rem] uppercase text-[var(--clr-grey-500)] before:absolute before:inset-0 before:content-center before:content-[attr(before-dynamic-value)] checked:transition checked:duration-150 checked:ease-in-out md:h-[56px] md:w-[56px] md:before:text-[1.75rem] ${isSubmitted === false && checkedName === `option-${index + 1}` ? "bg-[var(--clr-purple)] text-white" : ""} ${isSubmitted && checkedName === `option-${index + 1}` && option === answer ? "bg-[var(--clr-light-green)] text-white" : ""} ${isSubmitted && checkedName === `option-${index + 1}` && option !== answer ? "bg-[var(--clr-medium-red)] text-white" : ""}`}
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
                          className="mt-[0.6667em] block w-full rounded-[0.6667em] bg-[var(--clr-purple)] py-[0.6667em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)] transition duration-100 ease-in-out hover:bg-[hsl(277_91%_56%_/0.5)] md:text-[1.75rem]"
                          onClick={handleNextAnswer}
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="mt-[0.6667em] block w-full rounded-[0.6667em] bg-[var(--clr-purple)] py-[0.6667em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)] transition duration-100 ease-in-out hover:bg-[hsl(277_91%_56%_/0.5)] md:text-[1.75rem]"
                        >
                          Submit answer
                        </button>
                      )}

                      {isSubmitted === false && value === "" ? (
                        <div className="error-message flex items-center justify-center gap-[0.5rem] transition duration-75">
                          <Image
                            src="/images/icon-incorrect.svg"
                            alt=""
                            width={32}
                            height={32}
                          />
                          <span className="text-center text-[1.125rem] text-[var(--clr-medium-red)]">
                            {errorMessage}
                          </span>
                        </div>
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
