"use client"

import React, {
  Ref,
  useRef,
  useState,
  useTransition,
} from "react"
import { usePathname, useRouter } from "next/navigation"

import { SearchCategory } from "@/types/search"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "./ui/input"

interface handleChangeParams {
  value: string
  filter: SearchCategory
}

export default function Searchbar() {
  const [filter, setFilter] = useState(SearchCategory["Titre"])
  const [value, setValue] = useState("")

  let pathname = usePathname()
  const router = useRouter()
  const ref = useRef<HTMLInputElement>()
  let [isPending, startTransition] = useTransition()

  /**
   * Lorsque le filtre de recherche change ou que la recherche change
   */
  const handleChange = ({value, filter}: handleChangeParams) => {
    let params = new URLSearchParams()
    if (value) {
      params.set(filter, value)
    } else {
      params.delete(filter)
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  /**
   * Lorsque la recherche change
   * @param value Valeur de la recherche
   */
  const handleSearch = (value: string) => {
    setValue(value)
    handleChange({value, filter})
  }

  /**
   * Lorsque le filtre de recherche change
   * @param newFilter Nouveau filtre à appliquer
   */
  const handleSelect = (newFilter: SearchCategory) => {
    setFilter(newFilter)
    handleChange({value, filter: newFilter})
  }


  return (
    <div className="flex">
      <Select
        defaultValue={SearchCategory["Titre"]}
        onValueChange={(newFilter: SearchCategory) => handleSelect(newFilter)}
      >
        <SelectTrigger className="w-32 rounded-r-none border-r-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.keys(SearchCategory).map((item) => (
              <SelectItem key={item} value={SearchCategory[item as keyof typeof SearchCategory]}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        placeholder={`Recherchez par ${filter}`}
        className="rounded-l-none border-l-0"
        onChange={(e) => handleSearch(e.target.value)}
        ref={ref as Ref<HTMLInputElement>}
      />
    </div>
  )
}
