"use client"

import React, { useState } from "react"
import { Search } from "lucide-react"

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

const findBy = [
  {
    value: "musique",
    label: "Musique",
  },
  {
    value: "playlist",
    label: "Playlist",
  },
  {
    value: "artiste",
    label: "Artiste",
  },
  {
    value: "pays",
    label: "Pays",
  },
  {
    value: "genre",
    label: "Genre",
  },
]

export default function Searchbar() {
  const [filter, setFilter] = useState("musique")

  return (
    <div className="flex">
      <Select
        defaultValue="musique"
        onValueChange={(newFilter) => setFilter(newFilter)}
      >
        <SelectTrigger className="w-32 rounded-r-none border-r-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {findBy.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        placeholder={`Recherchez par ${filter}`}
        className="rounded-l-none border-l-0"
      />
    </div>
  )
}
