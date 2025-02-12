"use server"

import { promises as fs } from "fs"

export async function create() {
  const file = await fs.readFile(process.cwd() + "/data.json", "utf8")
  const data = JSON.parse(file)

  return data
}
