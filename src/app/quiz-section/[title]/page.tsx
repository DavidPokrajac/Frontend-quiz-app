"use client"

import { create } from "../../actions"
import { generateLetter } from "../../utils/generateLetter"
import { useSearchParams } from "next/navigation"
import { navigate } from "../../actions"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import {
  useState,
  useEffect,
  useRef,
  Fragment,
  ChangeEvent,
  SyntheticEvent
} from "react"
import Header from "@/app/components/Header"
import ErrorMessage from "@/app/components/ErrorMessage"
import Image from "next/image"

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

gsap.registerPlugin(useGSAP)

export default function Page() {
  const [data, setData] = useState<
    Array<{
      title: string
      icon: string
      questions: {
        question: string
        answer: string
        options: string[]
      }[]
    }>
  >([])
  const [checkedName, setCheckedName] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [qNumber, setQNumber] = useState<number>(0)
  const [rightAnswer, setRightAnswer] = useState<number>(0)
  const [value, setValue] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [submitIsClicked, setSubmitIsClicked] = useState<boolean>(false)

  const radioInput = useRef<HTMLInputElement>(null)
  const { contextSafe } = useGSAP()

  const searchParams = useSearchParams()
  const search = searchParams.get("title")

  useEffect(() => {
    create().then((p) => {
      console.log(p)
      const { quizzes } = p
      setData(quizzes)
    })

    // console.log(quizData)
    /* const quizData = async () => {
      try {
        const result = await create()
        const { quizzes } = result
        setData(quizzes)
      } catch (error) {
        console.error(error)
      }
    } */
    /* quizData() */
  }, [])

  useGSAP(() => {
    if (isSubmitted) {
      const tl = gsap.timeline({ repeat: 1, repeatDelay: 0 })

      tl.to("label[class*='var(--clr-medium-red)']", {
        rotation: 2.5,
        transformOrigin: "center center",
        duration: 0.15
      })
      tl.to("label[class*='var(--clr-medium-red)']", {
        rotation: 0,
        transformOrigin: "center center",
        duration: 0.15
      })
      const showCorrect = gsap.timeline({ repeat: 0, repeatDelay: 0 })
      showCorrect.to("label:has(img[src*='correct'])", {
        scale: 1.05,
        transformOrigin: "center center",
        duration: 0.75
      })
      showCorrect.to("label:has(img[src*='correct'])", {
        scale: 1,
        transformOrigin: "center center",
        duration: 0.75
      })

      const tlCorrect = gsap.timeline({ repeat: 0, repeatDelay: 0 })

      tlCorrect.to("label[class*='var(--clr-light-green)']", {
        scale: 1.05,
        transformOrigin: "center center",
        duration: 0.5
      })
      tlCorrect.to("label[class*='var(--clr-light-green)']", {
        scale: 1,
        transformOrigin: "center center",
        duration: 0.5
      })
    }
  }, [isSubmitted])

  const filteredQuiz: Array<QuizProps> = data?.filter((d: QuizProps) => {
    return d.title === search
  })

  const handleChange = (event: ChangeEvent<HTMLLabelElement>) => {
    setIsSubmitted(false)
    setSubmitIsClicked(false)
    setValue(event.target.nextSibling?.nodeValue as string)
    setCheckedName(event.target.id)
    console.log("Hi")
  }

  const handleSubmit = contextSafe((event: SyntheticEvent, answer: string) => {
    event.preventDefault()

    setErrorMessage("")
    setSubmitIsClicked(true)

    if (checkedName) {
      setIsSubmitted(true)
      setValue("")

      if (value === answer) {
        setRightAnswer((prevValue) => prevValue + 1)
        setValue("")
        setErrorMessage("")
      }
    } else {
      setValue("")
      setErrorMessage("Please select an answer")
    }
  })

  const handleNextAnswer = () => {
    setQuestionNumber((questionNumber) => questionNumber + 110)
    setQNumber((qNumber) => qNumber + 1)
    setCheckedName("")
    setErrorMessage("")
    setSubmitIsClicked(false)
    setIsSubmitted(false)
  }

  let showRes = false

  useEffect(() => {
    if (isSubmitted && qNumber === 9) {
      showRes = true
      navigate(filteredQuiz[0].title, rightAnswer)
    }
  }, [showRes, isSubmitted])

  useGSAP(() => {
    gsap.to(".prog", {
      width: (qNumber + 1) * 10 + "%",
      ease: "power3.out",
      duration: 0.75
    })
  }, [qNumber])

  return (
    <Fragment>
      {filteredQuiz.map((quiz: QuizProps) => {
        const { questions } = quiz

        return (
          <Fragment key={quiz.title}>
            <Header subject={quiz.title} />

            <main className="relative row-start-2 row-end-3 px-[1.5em] pt-[2em] md:px-[3em] lg:px-0">
              {questions.map((question: QuestionProps, index: number) => {
                const { options, answer } = question

                return (
                  <div
                    key={index}
                    className="absolute top-0 grid w-full grid-rows-subgrid gap-[2.5em] lg:grid-cols-[repeat(2,_45%)] lg:gap-[10%]"
                    style={{
                      left: `calc((110%*${index}) - ${questionNumber}%)`
                    }}
                  >
                    <div className="question-info grid gap-[0.75em] lg:grid-rows-[min-content_250px_auto]">
                      <p className="text-[0.875rem] italic leading-[1.5] text-[var(--clr-grey-500)] md:text-[1.25rem] dark:text-[var(--clr-grey-400)]">
                        Question {index + 1} of {questions.length}
                      </p>
                      <p className="mt-[0.6em] text-[1.25rem] font-bold leading-[1.2] text-[var(--clr-grey-700)] md:text-[2.25rem] dark:text-[var(--clr-white)]">
                        {question.question}
                      </p>

                      <div className="mt-[0.75em] h-[16px] w-full rounded-full bg-[var(--clr-white)] p-[4px] dark:bg-[var(--clr-grey-600)]">
                        <div className="prog h-[8px] w-[10%] rounded-full bg-[var(--clr-purple)]"></div>
                      </div>
                    </div>
                    <div className="answers">
                      <div className="fe-quiz-subject-list">
                        {options.map((option: string, index: number) => {
                          const letter = generateLetter(index)

                          return (
                            <label
                              onChange={handleChange}
                              htmlFor={`option-${index + 1}`}
                              data-index={`option-${index + 1}`}
                              className={`label relative z-20 grid cursor-pointer grid-cols-[40px_1fr_40px] grid-rows-[auto] items-center gap-[0.8889em] rounded-[1em] border-[3px] border-solid bg-[var(--clr-white)] px-[0.6667em] py-[0.6667em] font-bold text-[var(--clr-grey-700)] md:grid-cols-[56px_1fr_56px] dark:bg-[var(--clr-grey-600)] dark:text-[var(--clr-white)] ${checkedName !== `option-${index + 1}` ? "border-transparent" : ""} ${isSubmitted === false && checkedName === `option-${index + 1}` ? "border-[var(--clr-purple)]" : ""} cursor-pointer ${isSubmitted === true && checkedName === `option-${index + 1}` && option === answer ? "border-[var(--clr-light-green)]" : ""} ${isSubmitted === true && checkedName === `option-${index + 1}` && option !== answer ? "border-[var(--clr-medium-red)]" : ""}`}
                              key={index}
                            >
                              <input
                                ref={radioInput}
                                type="radio"
                                id={`option-${index + 1}`}
                                name={`option`}
                                before-dynamic-value={letter}
                                className={`letter relative inline-block h-[40px] w-[40px] cursor-pointer appearance-none rounded-[0.3333em] bg-[var(--clr-grey-300)] text-center text-[1.125rem] uppercase text-[var(--clr-grey-500)] before:absolute before:inset-0 before:content-center before:content-[attr(before-dynamic-value)] md:h-[56px] md:w-[56px] md:before:text-[1.75rem] ${isSubmitted === false && checkedName === `option-${index + 1}` ? "bg-[var(--clr-purple)] text-white" : ""} ${isSubmitted && checkedName === `option-${index + 1}` && option === answer ? "bg-[var(--clr-light-green)] text-white" : ""} ${isSubmitted && checkedName === `option-${index + 1}` && option !== answer ? "bg-[var(--clr-medium-red)] text-white" : ""}`}
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
                                  alt="Wrong answer"
                                  height={24}
                                  width={24}
                                  className="lg:h-[30px] lg:w-[30px]"
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
                                  alt="Correct answer"
                                  height={24}
                                  width={24}
                                  className="lg:h-[30px] lg:w-[30px]"
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
                          className="mt-[0.6667em] block w-full rounded-[1em] bg-[var(--clr-purple)] py-[1em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)] transition duration-100 ease-in-out hover:bg-[hsl(277_91%_56%_/0.5)] md:text-[1.75rem]"
                          onClick={handleNextAnswer}
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          className="mt-[0.6667em] block w-full rounded-[1em] bg-[var(--clr-purple)] py-[1em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)] transition duration-100 ease-in-out hover:bg-[hsl(277_91%_56%_/0.5)] md:text-[1.75rem]"
                          onClick={(event) => handleSubmit(event, answer)}
                        >
                          Submit answer
                        </button>
                      )}

                      <ErrorMessage
                        errorMessage={errorMessage}
                        submitIsClicked={submitIsClicked}
                        checkedName={checkedName}
                      />
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
