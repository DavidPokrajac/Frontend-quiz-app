export function linkBgColor(subject) {
  if (subject === "HTML") {
    return { bgColor: "hsl(22_100%_96%)", subject: "html" }
  } else if (subject === "CSS") {
    return { bgColor: "hsl(151_87%_94%)", subject: "css" }
  } else if (subject === "JavaScript") {
    return { bgColor: "hsl(223_100%_96%)", subject: "js" }
  }
  return { bgColor: "hsl(277_100%_95%)", subject: "accessibility" }
}
