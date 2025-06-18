import { redirect } from "next/navigation"

export function navigate(data: string, rightAnswers: number) {
  redirect(`/results/?quiz=${data}&rightAnswers=${rightAnswers}`)
}
