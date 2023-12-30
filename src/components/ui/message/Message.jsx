'use client'

import { FaMessage } from "react-icons/fa6";

export default function Message(props) {
    return (
        <div onClick={props.handleClose} className="fixed right-6 top-6 bg-gray-100 min-h-[100px] min-w-[500px] z-[999] rounded p-4 border-4 border-primary hover:cursor-pointer">
            <div className="text-lg">
                <span className="flex items-center gap-2 text-primary font-bold">
                    <FaMessage /> {props.title ?? 'Сообщение!'}
                </span>
                {props.text ?? 'Message'}
            </div>
        </div>
    )
}