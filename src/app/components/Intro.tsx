"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export default function Intro() {
  useGSAP(() => {
    gsap.to(".intro", {
      x: 0,
      opacity: 1,
      duration: 1.5
    })
  }, [])

  return (
    <div className="intro text-balance">
      <h1 className="mb-[0.4em] text-[2.5rem] font-light md:text-[4rem] dark:text-[var(--clr-white)]">
        Welcome to the{" "}
        <strong className="block font-bold text-[var(--clr-grey-700)] dark:text-[var(--clr-white)]">
          Frontend Quiz!
        </strong>
      </h1>
      <p className="text-[0.875rem] italic leading-[1.5] text-[var(--clr-grey-500)] md:text-[1.25rem] dark:text-[var(--clr-grey-400)]">
        Pick a subject to get started.
      </p>
    </div>
  )
}
