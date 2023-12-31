import { useState, useEffect, useRef } from 'react'
import { AiOutlineCloseCircle, AiFillDelete, AiFillCloseSquare } from 'react-icons/ai'
import { BsImageFill } from 'react-icons/bs'
import { FaFileUpload } from 'react-icons/fa'
import { useStateContext } from '@/contexts/ContextProvider'
import Link from 'next/link'

export function ButtonRound(props) {
  return (
    <button onClick={props.onCustomClick} className={`
      rounded-full p-4 flex items-center justify-center text-xl   
      ${props._class}
      ${props.color ?? 'bg-tile'}
      ${props.border ?? 'border-2'}
      ${props.borderColor ?? 'border-gray-300'}
      ${props.textColor ?? 'text-gray-200'}
      ${props.width ?? 'w-[70px]'} 
      ${props.height ?? 'h-[70px]'} 
    `}>
      {props.children}
    </button>
  )
}

export function Button(props) {
  return (
    <button onClick={props.onClick} type={props.type ?? 'button'} className={`
      rounded block
      ${props._class}
      ${props.width ?? 'min-w-[200px]'} 
      ${props.height ?? 'h-[50px]'} 
      ${props.color ?? 'bg-secondary'} 
    `}>
      {props.link
        ? (
          <Link href={props.link} className="w-full h-full flex items-center justify-center rounded">
            {props.children ?? 'submit'}
          </Link>
        ) : (
          <>{props.children ?? 'submit'}</>
        )
      }
    </button>
  )
}

export function ButtonUpload_off(props) {
  // if component should use single file selection init var previews as array | in other case use previews from properties  
  let previews = []

  if (!props.single && Array.isArray(props.previews)) {
    previews = props.previews
  } else if (props.single && props.previews) {
    previews = [props.previews]
  } 

  const handleClear = props.clear
  const handleUpload = props.handle
  const realUploadInput = useRef(null)

  const clickRealUploadInput = (e) => {
    e.preventDefault()
    realUploadInput.current.click()
  }

  const renderPreviews = () => {
    if (previews.length === 0) {
      return null
    }

    return previews.map((preview, index) => (
      <div className="relative rounded pt-2 " key={index}>
        <img src={preview} className="object-contain " />
        <div onClick={(e) => handleClear(e, index)} className="absolute top-1 right-1 text-gray-100| text-red hover:text-gray-300 text-2xl hover:cursor-pointer">
          <AiFillCloseSquare />
        </div>
      </div>
    ))
  }

  return (
    <div className="flex">
      <div className="bg-tileDark p-4 rounded w-full">
        <div className="flex items-center justify-between">
          <label className="pr-4 font-bolder text-right font-medium">{props.children ?? 'Загрузка файлов'}</label>
          <input type="file" onChange={handleUpload} ref={realUploadInput} multiple hidden />
          <div onClick={clickRealUploadInput} className={`flex items-center p-5 h-[20px] text-lg font-bolder bg-white hover:bg-gray-200 rounded text-black hover:cursor-pointer`}>
            <FaFileUpload />
          </div>
        </div>
        <div className="columns-3 gap-2">
          {renderPreviews()}
        </div>
      </div>
    </div>
  )
}

export function ButtonUpload(props) {
  // if component should use single file selection init var previews as array | in other case use previews from properties  
  let previews = []

  if (!props.single && Array.isArray(props.previews)) {
    previews = props.previews
  } else if (props.single && props.previews) {
    previews = [props.previews]
  } 

  const handleClear = props.clear
  const realUploadInput = useRef(null)

  const clickRealUploadInput = (e) => {
    realUploadInput.current.click()
  }

  const renderPreviews = () => {
    if (previews.length === 0) {
      return null
    }

    return previews.map((preview, index) => (
      <div className="relative rounded mb-2 " key={index} onClick={(e) => handleClear(e, index)}>
        <img src={preview} className="object-contain " />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-rose-400/10 hover:cursor-default"></div>
      </div>
    ))
  }

  document.addEventListener('drop', e => e.preventDefault()) 

  // Files upload from "Click" event
  const changeFiles = (e) => {
    props.handle(realUploadInput.current.files)
  }
  
  // Files upload from "Drop" event
  const dropFiles = (e) => {
    const files = Array.from(e.dataTransfer.files)
    props.handle(files)
  }

  const dragEnter = (e) => {
    e.preventDefault()
    setHover(true)
  }

  const dragOver = (e) => {
    e.preventDefault()
    setHover(false)
  }

  const [isHover, setHover] = useState(false)

  return (
    <>
      <div className={`bg-inherit p-4 w-full ${props.error && 'border-red'} border border-dashed rounded hover:cursor-pointer ${isHover ? 'border-inputFocus text-inputFocus' : 'border-input text-input'}`} 
        onMouseEnter={() => setHover(true)} 
        onMouseLeave={() => setHover(false)} 
        onClick={clickRealUploadInput}
        onDrop={dropFiles}
        onDragEnter={dragEnter}
        onDragLeave={dragOver}
      >
        <div className={`flex items-center justify-between mb-4`}>
          <label className="pr-4 font-bolder text-right font-medium cursor-pointer">{props.children ?? 'Загрузка файлов'}</label>
          {previews.length > 0 && 
            <div onClick={clickRealUploadInput} className={`flex items-center p-5 h-[20px] text-lg font-bolder bg-white hover:bg-gray-200 rounded text-black hover:cursor-pointer`}>
              <FaFileUpload />
            </div>
          }
        </div>
        {previews.length === 0 && 
          <div className={`flex w-full items-center justify-center text-7xl mb-4 ${isHover ? 'text-inputFocus' : 'text-input'}`}>
            <FaFileUpload />
          </div>
        }
        <div className="columns-3 gap-2">
          {renderPreviews()}
        </div>

        <input type="file" onChange={changeFiles} ref={realUploadInput} multiple hidden/>
      </div>
      {props.error && <div className="text-sm text-red w-full block text-left">{props.error}</div>}
    </>
  )
}

export function Input(props) {
  const inputClass = `mt-1 w-full text-md bg-inherit border border-input text-inputFocus outline-none p-2 px-4 rounded focus:bg-inputFocus focus:text-black
    ${props.error && 'border-2 border-red'}`

  let input = null

  if (props.type == 'textarea') {
    input = <textarea onChange={(e) => { props.handle(e.target.value) }} value={props.children} className={`${inputClass} h-44`} />
  } else {
    input = <input onChange={(e) => { props.handle(e.target.value) }} value={props.children} type={props.pass == true ? 'password' : 'text'} className={`${inputClass}`} autocomplete='off'/>
  }

  return (
    <div>
      {props.label && <label className={`text-gray-300 ${props.error && 'text-red'}`}>{props.label}</label>}
      {input}
      {props.error && <div className="text-sm text-red w-full block text-left">{props.error}</div>}
    </div>
  )
}

export function InputInline(props) {
  const inputClass = `mt-1 w-full text-md bg-inherit border border-input text-inputFocus outline-none text-md p-2 px-4 rounded focus:bg-inputFocus focus:text-black
    ${props.error && 'border-2 border-red'}`

  return (
    <div>
      <div className="flex items-center">
        {props.children && <label className={`text-gray-300 ${props.error && 'text-red'} text-3xl mr-4`}>{props.children}</label>}
        <input 
          value={props.value} 
          placeholder={props.placeholder ?? ''} 
          onChange={e => props.handle(e.target.value)} 
          type={props.pass == true ? 'password' : 'text'} 
          className={`${inputClass}`} 
          autoComplete="off"
        />
      </div>
      {props.error && <div className="text-sm text-red w-full block text-left mt-2">{props.error}</div>}
    </div>

  )
}

export function Label(props) {
  return (
    <div className="flex mb-2 border-b-2 border-gray-500 pb-4">
      <div>
        <div className="text-2xl font-bolder">{props.children}</div>
        <div className="text-md text-gray-400">{props.help}</div>
      </div>
      {props.button && 
        <div className="ml-auto space-x-2">
          <Button width="w-40" color="bg-primary" type="submit">сохранить</Button>
        </div>
      }
    </div>
  )
}

export function Switch(props) {
  return (
    <div>
      <div className="mb-2">Публичный просмотр</div>
      <label className="switch">
        <input type="checkbox" onChange={props.onChange} checked={props.checked}/>
        <span className="slider round"></span>
      </label>
    </div>
  )
}
