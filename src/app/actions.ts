"use server"

// import { promises as fs } from "fs"
import { redirect } from "next/navigation"
// import path from "path"

/* export async function create() {
  try {
    const pathToPosts =
      process.env.NODE_ENV === "development" ? "/data.json" : "data.json"
    const postsDirectoryPath = process.cwd()
    const files = await fs.readFile(path.join(postsDirectoryPath, pathToPosts))
    const data = JSON.parse(files)
    return data
  } catch (error) {
    console.error(error)
  }
} */

export async function navigate(data: string, rightAnswers: number) {
  try {
    redirect(`/results/?quiz=${data}&rightAnswers=${rightAnswers}`)
  } catch (error) {
    console.error(error)
  }
}
