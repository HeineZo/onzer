"use client"

import { type ReactPortal, useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children: React.ReactNode
}

export function Portal(props: PortalProps): ReactPortal | null {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? createPortal(props.children, document.body) : null 
}
