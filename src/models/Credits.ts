import type { Ids } from './Media'

export interface Credits {
  cast: CastCrewMember[]
  crew: Crew
}

export interface CastCrewMember {
  characters: string[]
  jobs: string[]
  episode_count?: number
  person: Person
  images: Images
}

export interface Person {
  name: string
  ids: Ids
}

export interface Images {
  headshot: string[]
}

export interface Crew {
  directing?: CastCrewMember[]
  writing?: CastCrewMember[]
  'created by'?: CastCrewMember[]
}
