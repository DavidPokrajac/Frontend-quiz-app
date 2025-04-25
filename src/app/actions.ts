"use server"

import { promises as fs } from "fs"
import { redirect } from "next/navigation"

export async function create() {
  try {
    const file = await fs.readFile(process.cwd() + "/data.json", "utf8")
    const data = JSON.parse(file)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function navigate(data: string, rightAnswers: number) {
  redirect(`/results/?quiz=${data}&rightAnswers=${rightAnswers}`)
}
