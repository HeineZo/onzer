import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Met un mot au pluriel si le nombre est supérieur à 1
 * 
 * @param {number} nb Nombre devant le mot
 * @param {string} str Mot à mettre au pluriel
 */
export function pluralize(nb: number, str: string) {
  return nb > 1 ? `${str}s` : str
}

/**
 * Met la première lettre d'un mot en majuscule
 * 
 * @param str Mot dont on veut mettre la première lettre en majuscule
 * @returns Mot avec la première lettre en majuscule
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Détermine si un objet est vide
 * @param obj Objet à tester
 * @returns True si l'objet est vide, false sinon
 */
export function isEmpty(obj: Object) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}