"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface MultiSelectProps {
  values: string[]
  title: string
  selectedValues: string[]
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
}

export default function MultiSelect({ values, title, selectedValues, setSelectedValues }: MultiSelectProps) {

  const handleCheck = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues((prev) => prev.filter((v) => v !== value))
    } else {
      setSelectedValues((prev) => [...prev, value])
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {values.map((value: string, index: number) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={selectedValues.includes(value)}
            onCheckedChange={() => handleCheck(value)}
          >
            {value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
