"use client"

import React, {
  startTransition,
  useEffect,
  useState,
  useTransition,
} from "react"
import { usePathname, useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { SearchCategory } from "@/types/search"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import { usePrevious } from "@uidotdev/usehooks";

export default function Searchbar() {
  const [filter, setFilter] = useState(Object.values(SearchCategory)[0])
  const previousFilter = usePrevious(filter);
  let pathname = usePathname()
  let { replace } = useRouter()
  let [isPending, startTransition] = useTransition()

  const handleSearch = (value: string) => {
    let params = new URLSearchParams(window.location.search)
    if (value) {
      params.set(filter, value)
    } else {
      params.delete(filter)
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  useEffect(() => {
    let params = new URLSearchParams(window.location.search)

    params.delete(previousFilter)
  }, [filter])

  return (
    <div className="flex">
      <Select
        defaultValue={Object.values(SearchCategory)[0]}
        onValueChange={(newFilter: SearchCategory) => setFilter(newFilter)}
      >
        <SelectTrigger className="w-32 rounded-r-none border-r-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.keys(SearchCategory).map((item) => (
              <SelectItem key={item} value={item.toLowerCase()}>
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
      />
    </div>
  )
}
