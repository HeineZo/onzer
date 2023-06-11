"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "fun",
    label: "Playlist du fun",
  },
  {
    value: "rapfr",
    label: "Rap français",
  },
  {
    value: "wow",
    label: "Années 2000",
  },
  {
    value: "nouvelan",
    label: "Soirée du nouvel an",
  },
  {
    value: "noel",
    label: "Musiques de noël",
  },
]

interface ComboboxProps {
    children: React.ReactNode
    values: Object[]
    placeholder?: string
    notFoundMessage?: string
}
export function Combobox({children, values, placeholder, notFoundMessage}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder ?? 'Recherchez'} />
          <CommandEmpty>{notFoundMessage ?? 'Aucun résultat'}</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
