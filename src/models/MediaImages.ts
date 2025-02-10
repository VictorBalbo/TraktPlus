export interface MediaImages {
  backdrop?: string
  poster?: string
  still?: string
}

export const getImageSrc = (images: MediaImages | undefined, imageType: keyof MediaImages) => {
  return `${imageBasePath}/${imageSizes[imageType][0]}${images?.[imageType]}`
}

export const getImageSrcSet = (images: MediaImages | undefined, imageType: keyof MediaImages) =>
  imageSizes[imageType]
    .map((s) => {
      if (s === 'original') {
        return `${imageBasePath}/${s}${images?.[imageType]} `
      } else {
        return `${imageBasePath}/${s}${images?.[imageType]} ${s.replace('w', '')}w`
      }
    })
    .join(', ')

const imageSizes = {
  backdrop: ['w300', 'w780', 'w1280', 'original'],
  poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'original'],
  still: ['w92', 'w185', 'w300', 'original'],
}
const imageBasePath = 'https://image.tmdb.org/t/p'
