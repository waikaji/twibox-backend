function timeNow() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = d.getMonth() + 1
  const dd = d.getDate()
  const HH = d.getHours()
  const MM = d.getMinutes()
  const SS = d.getSeconds()

  return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`
}

module.exports = {timeNow}