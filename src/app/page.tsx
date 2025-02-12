import Image from "next/image"
import QuizSubjectList from "./components/QuizSubjectList"

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-end gap-[0.5em] px-[1em] py-[1.5em]">
        <span>
          <Image
            className="inline"
            src="images/icon-sun-dark.svg"
            width={16}
            height={16}
            alt=""
          />
        </span>
        <label className="relative inline-block h-[20px] w-[32px] rounded-full bg-[var(--clr-purple)] px-[0.25em] py-[0.25em]">
          <input
            type="checkbox"
            className="absolute left-[4px] top-[4px] h-[12px] w-[12px] appearance-none rounded-full bg-[var(--clr-white)] transition-[left] duration-150 ease-in-out checked:left-[16px]"
          />
        </label>
        <span>
          <Image
            className="inline"
            src="images/icon-moon-dark.svg"
            width={16}
            height={16}
            alt=""
          />
        </span>
      </header>
      <main className="grid grid-rows-[auto_1fr] gap-[2.5em] px-[1.5em] pt-[2em]">
        <div className="intro">
          <h1 className="mb-[0.4em] text-[2.5rem] font-light">
            Welcome to the{" "}
            <strong className="text-[var(--clr-grey-700)]">
              Frontend Quiz!
            </strong>
          </h1>
          <p className="text-[0.875rem] italic leading-[1.5] text-[var(--clr-grey-500)]">
            Pick a subject to get started.
          </p>
        </div>
        <QuizSubjectList />
      </main>
    </>
  )
}
