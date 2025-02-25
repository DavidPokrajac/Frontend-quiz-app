"use client"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { linkBgColor } from "../utils/linkBgColor"

export default function Results() {
  const searchParams = useSearchParams()
  const search = searchParams.get("quiz") as string
  const rightAnswers = searchParams.get("rightAnswers") as string

  const router = useRouter()

  return (
    <>
      <Header subject={search} />
      <main className="row-start-2 grid grid-rows-[min-content_310px] gap-[40px] px-[1.5em] pt-[2em]">
        <div className="text-[var(--clr-grey-700)]">
          <h2 className="text-[2.5rem] font-light">Quiz completed</h2>
          <strong className="text-[2.5rem] font-bold">You scored...</strong>
        </div>
        <div className="text-center">
          <div className="rounded-[12px] bg-[var(--clr-white)] py-[32px]">
            <h2 className="flex items-center justify-center gap-[1em] text-[1.125rem] font-bold text-[var(--clr-grey-700)]">
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
            <p className="text-center text-[1.125rem] text-[var(--clr-grey-500)]">
              <span className="block text-[5.5rem] font-bold text-[var(--clr-grey-700)]">
                {rightAnswers}
              </span>{" "}
              out of 10
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-[0.6667em] block w-full rounded-[0.6667em] bg-[var(--clr-purple)] py-[0.6667em] text-center text-[1.125rem] font-semibold text-[var(--clr-white)]"
          >
            Play again
          </button>
        </div>
      </main>
    </>
  )
}
