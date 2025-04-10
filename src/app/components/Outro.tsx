"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

gsap.registerPlugin(useGSAP)

export default function Outro() {
  useGSAP(() => {
    gsap.to(".results-outro", {
      x: 0,
      opacity: 1,
      duration: 1.75
    })
  }, [])

  return (
    <div className="results-outro text-[var(--clr-grey-700)]">
      <h2 className="text-[2.5rem] font-light lg:text-[4rem] dark:text-[var(--clr-white)]">
        Quiz completed
      </h2>
      <strong className="text-[2.5rem] font-bold lg:text-[4rem] dark:text-[var(--clr-white)]">
        You scored...
      </strong>
    </div>
  )
}
