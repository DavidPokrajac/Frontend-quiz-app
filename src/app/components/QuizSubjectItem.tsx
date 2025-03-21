import Image from "next/image"
import Link from "next/link"
import { linkBgColor } from "../utils/linkBgColor"

interface SubjectTitleProp {
  quiz: {
    title: string
  }
}

export default function QuizSubjectItem({ quiz }: SubjectTitleProp) {
  return (
    <li
      key={quiz.title}
      className="quiz-item flex items-center gap-[0.8889em] rounded-[0.6667em] bg-[var(--clr-white)] px-[0.4286em] py-[0.4286em] text-[1.125rem] font-bold text-[var(--clr-grey-700)] md:text-[1.75rem] lg:px-[0.72em] lg:py-[0.72em] dark:bg-[var(--clr-grey-600)] dark:text-[var(--clr-white)]"
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
          className={`inline-flex h-[40px] w-[40px] items-center justify-center rounded-[0.25em] md:h-[56px] md:w-[56px] bg-[${linkBgColor(quiz.title)["bgColor"]}]`}
          style={{
            backgroundColor: linkBgColor(quiz.title)["bgColor"]
          }}
        >
          <Image
            src={`images/icon-${linkBgColor(quiz.title)["subject"]}.svg`}
            width={23}
            height={23}
            alt=""
            className="md:h-[40px] md:w-[40px]"
          />
        </span>{" "}
        {quiz.title}
      </Link>
    </li>
  )
}
