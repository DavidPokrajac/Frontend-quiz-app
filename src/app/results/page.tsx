"use client"

import Header from "../components/Header"
import { useSearchParams } from "next/navigation"
import ResultSummary from "../components/ResultSummary"
import Outro from "../components/Outro"
import { Suspense } from "react"

export default function Results() {
  const searchParams = useSearchParams()
  const search = searchParams.get("quiz") as string
  const rightAnswers = searchParams.get("rightAnswers") as string

  return (
    <Suspense>
      <Header subject={search} />
      <main className="lg:grid-rows-[1fr row-start-2 grid grid-rows-[min-content_310px] gap-[40px] px-[1.5em] pt-[2em] lg:grid-cols-[repeat(2,_1fr)] lg:grid-rows-[1fr]">
        <Outro />
        <ResultSummary search={search} rightAnswers={rightAnswers} />
      </main>
    </Suspense>
  )
}
