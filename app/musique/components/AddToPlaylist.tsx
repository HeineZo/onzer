"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Playlist } from "@/types/playlist"
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
import { useToast } from "@/components/ui/use-toast"
import { addMusic, removeMusics } from "@/app/playlist/actions"

interface AddToPlaylistProps {
  children: React.ReactNode
  values: Playlist[]
  setValues: React.Dispatch<React.SetStateAction<Playlist[]>>
  musiqueId: string
  checkedIds?: string[]
  placeholder?: string
  notFoundMessage?: string
}
export function AddToPlaylist({
  children,
  values,
  setValues,
  checkedIds,
  musiqueId,
  placeholder,
  notFoundMessage,
}: AddToPlaylistProps) {
  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [checkedValues, setCheckedValues] = React.useState<string[]>(
    checkedIds ?? []
  )

  /**
   * Lorsqu'une playlist est sélectionnée
   * @param currentValue Identifiant de la playlist
   */
  const handleSelect = async (currentValue: string) => {
    let response
    if (checkedValues.includes(currentValue)) {
      setCheckedValues(checkedValues.filter((value) => value !== currentValue))
      setValues((prevValues) =>
        prevValues.filter((value) => value._id !== currentValue)
      )
      response = await removeMusics(currentValue, [musiqueId])
    } else {
      setCheckedValues([...checkedValues, currentValue])
      setValues((prevValues) => [
        ...prevValues,
        values.find((value) => value._id === currentValue) ?? ({} as Playlist),
      ])
      response = await addMusic(currentValue, musiqueId)
    }
    if (response.success) {
      toast({
        title: "Succès",
        description: response.message,
      })
    } else {
      toast({
        title: "Erreur",
        description: response.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholder ?? "Recherchez"} />
          <CommandEmpty>{notFoundMessage ?? "Aucun résultat"}</CommandEmpty>
          <CommandGroup>
            {values?.map((playlist: Playlist) => (
              <CommandItem
                key={playlist._id}
                onSelect={() => {
                  handleSelect(playlist._id ?? "")
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    checkedValues.includes(playlist._id ?? "")
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {playlist.titre}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
