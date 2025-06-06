"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { linkBgColor } from "../utils/linkBgColor"
import { subjectTitle } from "../utils/subjectTitle"

interface HeaderProps {
  subject?: string
}

export default function Header({ subject }: HeaderProps) {
  const [theme, setTheme] = useState<string>("")

  function handleChange() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  useEffect(() => {
    const savedValue = localStorage.getItem("color-theme")
    setTheme(savedValue ? savedValue : "light")
  }, [])

  useEffect(() => {
    localStorage.setItem("color-theme", theme)
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [theme])

  const linkColor = linkBgColor(subject)["bgColor"]
  return (
    <header
      className={`row-start-1 row-end-2 flex ${!subject ? "justify-end" : "justify-between"} items-center gap-[0.5em] px-[1.5em] py-[1.5em] md:px-[3em] md:py-[3em] lg:px-[0] lg:pb-[100px] lg:pt-0`}
    >
      {subject && (
        <div className="flex items-center gap-[1em]">
          <span
            className={`inline-block h-[40px] w-[40px] content-center rounded-[4px] md:h-[56px] md:w-[56px]`}
            style={{ background: linkColor }}
          >
            <Image
              src={`/images/icon-${subjectTitle(subject?.toLowerCase())}.svg`}
              alt=""
              width={29}
              height={29}
              className="mx-auto md:h-[40px] md:w-[40px]"
            />
          </span>
          <h3 className="text-[1.25rem] font-semibold text-[var(--clr-grey-700)] md:text-[1.75rem] dark:text-[var(--clr-white)]">
            {subject}
          </h3>
        </div>
      )}
      <div className="flex items-center gap-[0.5em]">
        <span>
          <Image
            className="inline md:h-[24px] md:w-[24px]"
            src={`/images/icon-sun-${theme !== "dark" ? "dark" : "light"}.svg`}
            width={16}
            height={16}
            alt="Click to change site to light mode"
          />
        </span>
        <label className="relative inline-block h-[20px] w-[32px] rounded-full bg-[var(--clr-purple)] px-[0.25em] py-[0.25em] md:h-[28px] md:w-[48px]">
          <input
            type="checkbox"
            onChange={handleChange}
            className="absolute left-[4px] top-[4px] h-[12px] w-[12px] appearance-none rounded-full bg-[var(--clr-white)] transition-[left] duration-150 ease-in-out checked:left-[16px] md:h-[20px] md:w-[20px] md:checked:left-[24px]"
            checked={theme === "dark"}
          />
        </label>
        <span>
          <Image
            className="inline md:h-[24px] md:w-[24px]"
            src={`/images/icon-moon-${theme !== "dark" ? "dark" : "light"}.svg`}
            width={16}
            height={16}
            alt="Click to change site to dark mode"
          />
        </span>
      </div>
    </header>
  )
}
