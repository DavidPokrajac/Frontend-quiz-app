import QuizSubjectList from "./components/QuizSubjectList"
import Header from "./components/Header"

export default function Home() {
  return (
    <>
      <Header />
      <main className="row-start-2 row-end-3 grid grid-rows-[auto_1fr] gap-[2.5em] px-[1.5em] pt-[2em]">
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
