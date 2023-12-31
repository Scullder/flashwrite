'use client'

import { FaMessage } from "react-icons/fa6"
import { CgClose } from "react-icons/cg"

export default function Message(props) {
  /* const statusColors = {
    success: styles.alertSuccess,
    warning: styles.alertWarning,
    info: styles.alertInfo,
  } 
 */
  /* let color = statusColors[props.status] !== undefined
    ? statusColors[props.status]
    : statusColors.info

  console.log(color) */

  const bgColors = {
    success: `border-green-900 bg-green-900`,
    warning: `border-red bg-red`,
    info: `border-sky-900 bg-sky-900`,
  } 
  const bgColor = bgColors[props.status] ?? bgColors.info

  const titleColors = {
    success: `text-green-600`,
    warning: `text-rose-500`,
    info: `text-sky-600`,
  }
  const titleColor = titleColors[props.status] ?? titleColors.info

  console.log(bgColor)
  console.log(titleColor)

  return (
    <div className={`border drop-shadow-lg ${bgColor} bg-opacity-50 backdrop-blur-lg fixed right-6 top-6 min-w-[500px] z-[999] rounded p-4`}>
      <div onClick={props.handleClose} className="absolute right-2 top-2 text-lg text-gray-400 hover:text-white hover:cursor-pointer">
        <CgClose />
      </div>
      <span className={`flex items-center gap-2 font-bold ${titleColor}`}>
        <FaMessage /> {props.title ?? 'Сообщение!'}
      </span>
      <div className="text-white mt-1">
        {props.text ?? 'Message'}
      </div>
    </div>
  )
}