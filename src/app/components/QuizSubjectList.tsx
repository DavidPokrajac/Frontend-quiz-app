import Image from "next/image"
import Link from "next/link"
import { promises as fs } from "fs"
import { linkBgColor } from "../utils/linkBgColor"
import { QuizProps } from "../quiz-section/[title]/page"

export default async function QuizSubjectList() {
  const file = await fs.readFile(process.cwd() + "/data.json", "utf8")
  const data = JSON.parse(file)

  const { quizzes } = data

  return (
    <ul className="fe-quiz-subject-list">
      {quizzes.map((quiz: QuizProps) => {
        // console.log(quiz)
        return (
          <>
            <li
              key={quiz.title}
              className="flex items-center gap-[0.8889em] rounded-[0.6667em] bg-[var(--clr-white)] px-[0.6667em] py-[0.6667em] text-[1.125rem] font-bold text-[var(--clr-grey-700)] lg:text-[1.75rem]"
            >
              <Link
                href={{
                  pathname: `/quiz-section/${quiz.title}`,
                  query: {
                    title: quiz.title
                  }
                }}
                className="flex w-full items-center gap-[0.8889em]"
              >
                <span
                  className={`inline-flex h-[40px] w-[40px] items-center justify-center rounded-[0.25em] lg:h-[56px] lg:w-[56px] bg-[${linkBgColor(quiz.title)["bgColor"]}]`}
                  style={{
                    backgroundColor: linkBgColor(quiz.title)["bgColor"]
                  }}
                >
                  <Image
                    src={`images/icon-${linkBgColor(quiz.title)["subject"]}.svg`}
                    width={28}
                    height={28}
                    alt=""
                  />
                </span>{" "}
                {quiz.title}
              </Link>
            </li>
          </>
        )
      })}
    </ul>
  )
}
