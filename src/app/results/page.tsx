"use client"
import Header from "../components/Header"
import { useSearchParams } from "next/navigation"

export default function Results() {
  const searchParams = useSearchParams()
  const search = searchParams.get("quiz") as string

  console.log(search)

  return (
    <>
      <Header subject={search} />
      <main className="row-start-2 grid">
        <h2>Quiz completed</h2>
        <strong>You scored...</strong>
        <div></div>
        <button>Play again</button>
      </main>
    </>
  )
}
