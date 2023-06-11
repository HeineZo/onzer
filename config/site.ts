export type SiteConfig = typeof siteConfig


export const siteConfig = {
  name: "Onzer",
  description:
    "Toute la musique avec une heure de retard",
  mainNav: [
    {
      title: "Explorer",
      href: "/musique",
    },
    {
      title: "Mes playlists",
      href: "/playlist",
    },
  ],
  links: {
    github: "https://github.com/shadcn/ui",
  },
  baseUrl: "http://127.0.0.1:3000"
}

