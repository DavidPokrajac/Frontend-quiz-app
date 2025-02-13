import Image from "next/image"
import { linkBgColor } from "../utils/linkBgColor"

interface HeaderProps {
  subject: string
}

export default function Header({ subject }: HeaderProps) {
  const linkColor = linkBgColor(subject)["bgColor"]
  return (
    <header
      className={`row-start-1 row-end-2 flex ${!subject ? "justify-end" : "justify-between"} items-center gap-[0.5em] px-[1em] py-[1.5em]`}
    >
      {subject && (
        <div className="flex items-center gap-[1em]">
          <span
            className={`bg-[${linkColor}] inline-block h-[40px] w-[40px] content-center`}
          >
            <Image
              src={`/images/icon-${subject?.toLowerCase()}.svg`}
              alt=""
              width={29}
              height={29}
              className="mx-auto"
            />
          </span>
          <h3 className="text-[1.25rem] font-semibold text-[var(--clr-grey-700)]">
            {subject}
          </h3>
        </div>
      )}
      <div className="flex items-center gap-[0.5em]">
        <span>
          <Image
            className="inline"
            src="/images/icon-sun-dark.svg"
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
            src="/images/icon-moon-dark.svg"
            width={16}
            height={16}
            alt=""
          />
        </span>
      </div>
    </header>
  )
}
