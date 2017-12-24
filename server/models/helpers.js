import moment from 'moment'
export function generateAltId (seq) {
  if (!seq) seq = 0
  const count = `000${seq}`
  return `Q${moment().format('YYDD')}${count.substr(count.length - 4)}`
}
