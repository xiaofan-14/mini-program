export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function calcDeadline(limit: string): string {
  const now = new Date()
  let hoursToAdd = 0

  switch (limit) {
    case '24小时内':
      hoursToAdd = 24
      break
    case '8小时内':
      hoursToAdd = 8
      break
    case '4小时内':
      hoursToAdd = 4
      break
    case '1小时内':
      hoursToAdd = 1
      break
    default:
      hoursToAdd = 24
  }

  // 计算截止时间
  const deadline = new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000)

  const yyyy = deadline.getFullYear()
  const MM = String(deadline.getMonth() + 1).padStart(2, '0')
  const dd = String(deadline.getDate()).padStart(2, '0')
  const hh = String(deadline.getHours()).padStart(2, '0')
  const mm = String(deadline.getMinutes()).padStart(2, '0')
  const ss = String(deadline.getSeconds()).padStart(2, '0')

  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}
