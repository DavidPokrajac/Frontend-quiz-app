"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { linkBgColor } from "../utils/linkBgColor"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface ResultSummaryProps {
  search: string
  rightAnswers: string
}

gsap.registerPlugin(useGSAP)

export default function ResultSummary({
  search,
  rightAnswers
}: ResultSummaryProps) {
  const container = useRef(null)
  const router = useRouter()

  const { contextSafe } = useGSAP({ scope: container })

  useGSAP(() => {
    gsap.to(".result-wrapper", {
      x: 0,
      duration: 1.25,
      ease: "power1.inOut"
    })
    gsap.fromTo(
      ".right-answers",
      {
        scale: 0
      },
      {
        scale: 1,
        duration: 1.25,
        ease: "steps(6)",
        delay: 1
      }
    )
  }, [])

  const handleMouseEnter = contextSafe(() => {
    gsap.to(".play-again-btn", {
      scale: 1.1,
      duration: 0.45,
      ease: "power1.inOut"
    })
  })

  const handleMouseLeave = contextSafe(() => {
    gsap.to(".play-again-btn", {
      scale: 1,
      duration: 0.45,
      ease: "power1.inOut"
    })
  })

  return (
    <div className="result-wrapper text-center" ref={container}>
      <div className="rounded-[12px] bg-[var(--clr-white)] py-[32px] dark:bg-[var(--clr-grey-600)]">
        <h2 className="flex items-center justify-center gap-[1em] text-[1.125rem] font-bold text-[var(--clr-grey-700)] lg:text-[1.75rem] dark:text-[var(--clr-white)]">
          <span
            className="inline-block h-[40px] w-[40px] content-center rounded-[4px]"
            style={{ background: linkBgColor(search).bgColor }}
          >
            <Image
              src={`/images/icon-${linkBgColor(search).subject}.svg`}
              alt=""
              height={29}
              width={29}
              className="mx-auto"
            />
          </span>
          {search}
        </h2>
        <p className="text-center text-[1.125rem] text-[var(--clr-grey-500)] lg:text-[1.5rem] dark:text-[var(--clr-grey-400)]">
          <span className="right-answers block text-[5.5rem] font-bold text-[var(--clr-grey-700)] lg:text-[9rem] dark:text-[var(--clr-white)]">
            {rightAnswers}
          </span>{" "}
          <span className="out-of-ten">out of 10</span>
        </p>
      </div>
      <button
        onClick={() => router.push("/")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="play-again-btn mt-[0.6667em] block w-full rounded-[0.6667em] bg-[var(--clr-purple)] py-[0.6667em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)] transition duration-100 ease-in-out hover:bg-[hsl(277_91%_56%_/0.5)] lg:mt-[1.1429em] lg:text-[1.75rem]"
      >
        Play again
      </button>
    </div>
  )
}
