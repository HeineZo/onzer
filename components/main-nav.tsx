"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import LogoDark from "@/public/onzer_black.svg"
import LogoWhite from "@/public/onzer_white.svg"
import { useTheme } from "next-themes"

import { NavItem } from "@/types/nav"
import {usePathname} from 'next/navigation';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src={theme === "light" ? LogoDark : LogoWhite}
          className="h-6 w-full"
          alt="Onzer"
        />
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80",
                    pathname === item.href && "text-accent-foreground"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
