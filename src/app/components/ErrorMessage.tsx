"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { useRef } from "react"

gsap.registerPlugin(useGSAP)

interface ErrorMessageProps {
  errorMessage: string
  submitIsClicked: boolean
  checkedName: string
}

export default function ErrorMessage({
  errorMessage,
  submitIsClicked,
  checkedName
}: ErrorMessageProps) {
  const errorRef = useRef(null)
  useGSAP(() => {
    if (submitIsClicked && !checkedName) {
      gsap.to(".error-message", {
        y: 10,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out"
      })
    } else {
      gsap.to(".error-message", {
        y: -50,
        opacity: 0,
        duration: 1
      })
    }
  }, [submitIsClicked, checkedName])
  return (
    <div
      ref={errorRef}
      className="error-message flex items-center justify-center gap-[0.5rem]"
    >
      <Image src="/images/icon-incorrect.svg" alt="" width={32} height={32} />
      <span className="text-center text-[1.125rem] text-[var(--clr-medium-red)]">
        {errorMessage}
      </span>
    </div>
  )
}
