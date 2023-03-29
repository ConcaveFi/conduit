import { SearchIcon } from '@tradex/icons'
import { useState } from 'react'

export function SearchAddress(props: { onSubmit(query: string): void }) {
  const [value, setValue] = useState('')
  return (
    <div className="centered bg-dark-10 ocean:bg-blue-10 flex h-[40px] w-[190px] gap-1 rounded-full px-4 shadow-md">
      <SearchIcon className="stroke-dark-30 ocean:stroke-blue-30 box-6 " />
      <input
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        className="text-dark-accent ocean:text-blue-accent placeholder:text-dark-30 ocean:placeholder:text-blue-30 w-full bg-transparent outline-none"
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return
          props.onSubmit(value)
        }}
        placeholder="Search"
      />
    </div>
  )
}
