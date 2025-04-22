"use client"

import Image from "next/image"
import Link from "next/link"
import { linkBgColor } from "../utils/linkBgColor"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface SubjectTitleProp {
  quiz: {
    title: string
  }
  index: number
}

gsap.registerPlugin(useGSAP)

export default function QuizSubjectItem({ quiz, index }: SubjectTitleProp) {
  const { contextSafe } = useGSAP()
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 1 })
    tl.to(".item", { transitionDelay: 1 })
    tl.to(".quiz-item-0", { x: 0, duration: 1.5, ease: "power4.Out" }, "")
    tl.to(".quiz-item-1", { x: 0, duration: 1.5, ease: "power4.Out" }, "<0.1")
    tl.to(".quiz-item-2", { x: 0, duration: 1.5, ease: "power4.Out" }, "<0.1")
    tl.to(".quiz-item-3", { x: 0, duration: 1.5, ease: "power4.Out" }, "<0.1")
    tl.delay(0.125)
    tl.to(".item", { transitionDelay: 0 })
  }, [])

  const handleClick = contextSafe(() => {
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 1 })
    tl.to(".item", { transitionDelay: 1 })
    tl.to(
      ".quiz-item-0",
      { xPercent: 200, duration: 1.5, ease: "power4.Out" },
      ""
    )
    tl.to(
      ".quiz-item-1",
      { xPercent: 200, duration: 1.5, ease: "power4.Out" },
      "<0.1"
    )
    tl.to(
      ".quiz-item-2",
      { xPercent: 200, duration: 1.5, ease: "power4.Out" },
      "<0.1"
    )
    tl.to(
      ".quiz-item-3",
      { xPercent: 200, duration: 1.5, ease: "power4.Out" },
      "<0.1"
    )
    tl.delay(0.125)
    tl.to(".item", { transitionDelay: 0 })
  })

  return (
    <li
      key={quiz.title}
      className={`quiz-item-${index} item flex items-center gap-[0.8889em] rounded-[0.6667em] bg-[var(--clr-white)] px-[0.4286em] py-[0.4286em] text-[1.125rem] font-bold text-[var(--clr-grey-700)] md:text-[1.75rem] lg:px-[0.72em] lg:py-[0.72em] dark:bg-[var(--clr-grey-600)] dark:text-[var(--clr-white)]`}
      style={{ transform: `translateX(calc(${index + 1}*150%))` }}
      onClick={handleClick}
    >
      <Link
        href={{
          pathname: `/quiz-section/${quiz.title}`,
          query: {
            title: quiz.title
          }
        }}
        className="flex w-full items-center gap-[0.8889em]"
      >
        <span
          className={`inline-flex h-[40px] w-[40px] items-center justify-center rounded-[0.25em] md:h-[56px] md:w-[56px] bg-[${linkBgColor(quiz.title)["bgColor"]}]`}
          style={{
            backgroundColor: linkBgColor(quiz.title)["bgColor"]
          }}
        >
          <Image
            src={`images/icon-${linkBgColor(quiz.title)["subject"]}.svg`}
            width={23}
            height={23}
            alt=""
            className="md:h-[40px] md:w-[40px]"
          />
        </span>{" "}
        {quiz.title}
      </Link>
    </li>
  )
}
