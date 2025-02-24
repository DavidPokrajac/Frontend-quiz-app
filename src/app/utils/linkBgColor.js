export function linkBgColor(subject) {
  if (subject === "HTML") {
    return { bgColor: "hsl(22, 100%, 96%)", subject: "html" }
  } else if (subject === "CSS") {
    return { bgColor: "hsl(151, 87%, 94%)", subject: "css" }
  } else if (subject === "JavaScript") {
    return { bgColor: "hsl(223, 100%, 96%)", subject: "js" }
  }
  return { bgColor: "hsl(277, 100%, 95%)", subject: "accessibility" }
}
