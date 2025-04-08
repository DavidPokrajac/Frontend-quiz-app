import QuizSubjectList from "./components/QuizSubjectList"
import Header from "./components/Header"
import Intro from "./components/Intro"

export default function Home() {
  return (
    <>
      <Header />
      <main className="row-start-2 row-end-3 grid grid-rows-[auto_1fr] gap-[2.5em] px-[1.5em] pt-[2em] md:gap-[4em] md:px-[3em] lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto] lg:px-[0]">
        <Intro />
        <QuizSubjectList />
      </main>
    </>
  )
}
