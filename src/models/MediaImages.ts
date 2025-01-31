export interface MediaImages {
  backdrops: Image
  logos: Image
  posters: Image
  stills: Image
}

export interface Image {
  aspect_ratio: number
  height: number
  width: number
  iso_639_1: string | null
  file_path: string
  base_path: string
  sizes: string[]
}

export const getImageSrc = (image?: Image) =>
  `${image?.base_path}/${image?.sizes[0]}${image?.file_path}`

export const getImageSrcSet = (image?: Image) =>
  image?.sizes
    .map((s) => `${image?.base_path}/${s}${image?.file_path} ${s.replace('w', '')}w`)
    .join(', ')
