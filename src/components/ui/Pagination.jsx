export default function Pagination({total, handler, page}) {
  return (
    <div className="flex relative">
      { page > 1 &&
        <button onClick={() => handler(page - 1)} className="absolute left-0 px-4 py-2 bg-background border-2 border-backgroundLighter rounded">назад</button>
      }
      <ul className="flex gap-2 justify-center mx-auto text-gray-400">
        {[...Array(total).keys()].map(pageNumber => (
          <li 
            onClick={() => handler(pageNumber + 1)} 
            className={`
              cursor-pointer p-2 rounded  
              ${ page == pageNumber + 1 ? `bg-background border-2 border-tile text-white` : `hover:bg-background border-2 border-tileDark hover:border-tile`}
            `}
          >
            {pageNumber + 1}
          </li>
        ))}            
      </ul>
      { page < total && 
        <button onClick={() => handler(page + 1)} className="absolute right-0 px-4 py-2 bg-background border-2 border-tile rounded">вперёд</button>
      }
    </div>
  )
}