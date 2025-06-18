import { promises as fs } from "fs"
import { QuizProps } from "../quiz-section/[title]/page"
import QuizSubjectItem from "./QuizSubjectItem"
import { Fragment } from "react"

export default async function QuizSubjectList() {
  const file = await fs.readFile(process.cwd() + "/data.json", "utf8")
  const data = JSON.parse(file)

  const { quizzes } = data

  return (
    <ul className="fe-quiz-subject-list">
      {quizzes.map((quiz: QuizProps, index: number) => {
        return (
          <Fragment key={index}>
            <QuizSubjectItem quiz={quiz} index={index} />
          </Fragment>
        )
      })}
    </ul>
  )
}
