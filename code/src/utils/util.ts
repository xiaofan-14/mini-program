export const formatTime = (date: string | Date): string => {
  if (!date) return '';

  // 兼容字符串和 Date 类型
  const d = new Date(date);

  // 补零函数
  const pad = (n: number) => n.toString().padStart(2, '0');

  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};


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
