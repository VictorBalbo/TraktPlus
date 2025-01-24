import { apiUrl } from '@/constants'
import type { Media } from '@/models'
import { useTraktStore } from '@/store/TracktStore'

export class MediaService {
  static getRecommendations = async () => {
    const url = `${apiUrl}/recommendations`
    // const recommendations = await MediaService.sendApiGetRequest<Media[]>(url)
    const recommendations = [
      {
        type: 'show',
        title: 'Kabaneri of the Iron Fortress',
        ids: {
          trakt: 104313,
          slug: 'kabaneri-of-the-iron-fortress',
          tvdb: 305082,
          imdb: 'tt5556656',
          tmdb: 65945,
          tvrage: null,
        },
        year: 2016,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 1152,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/9ydGmGHe6OHoMMtFoIFSWhuSrHz.jpg',
            vote_average: 0,
            vote_count: 0,
            width: 2048,
          },
          logos: {
            aspect_ratio: 2.962,
            height: 265,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/leXfINCnMKRCIkpjeXgPMzca4Vc.png',
            vote_average: 0.166,
            vote_count: 1,
            width: 785,
          },
          posters: {
            aspect_ratio: 0.667,
            height: 1500,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/skQt2g7UfNdlVeHxlMAeeeCRpzM.jpg',
            vote_average: 1.75,
            vote_count: 2,
            width: 1000,
          },
        },
      },
      {
        type: 'show',
        title: 'Invincible',
        ids: {
          trakt: 172648,
          slug: 'invincible-2021',
          tvdb: 368207,
          imdb: 'tt6741278',
          tmdb: 95557,
          tvrage: null,
        },
        year: 2021,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 720,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/3Tl4Cuv54iMbY9k10FsFAOegPPN.jpg',
            vote_average: 0.972,
            vote_count: 6,
            width: 1280,
          },
          logos: {
            aspect_ratio: 3.136,
            height: 574,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/kYtNJOwCs7jcGRxLH9IUklAVAXc.svg',
            vote_average: 2.066,
            vote_count: 5,
            width: 1800,
          },
          posters: {
            aspect_ratio: 0.667,
            height: 750,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/eIZ7oqXm1tAcRMsIViDuRzUtyOF.jpg',
            vote_average: 0,
            vote_count: 1,
            width: 500,
          },
        },
      },
      {
        type: 'movie',
        title: 'The One I Love',
        ids: {
          trakt: 147492,
          slug: 'the-one-i-love-2014',
          imdb: 'tt2756032',
          tmdb: 242090,
        },
        year: 2014,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 1080,
            iso_639_1: 'pt',
            file_path: 'https://image.tmdb.org/t/p/original/2Gak0KLgCgKateES79B9s9gBxLs.jpg',
            vote_average: 3.334,
            vote_count: 1,
            width: 1920,
          },
          posters: {
            aspect_ratio: 0.68,
            height: 1000,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/fOvd8tpltq8LzkjyDwSzG0Phah4.jpg',
            vote_average: 0.166,
            vote_count: 1,
            width: 680,
          },
        },
      },
      {
        type: 'movie',
        title: 'Song of the Sea',
        ids: {
          trakt: 77888,
          slug: 'song-of-the-sea-2014',
          imdb: 'tt1865505',
          tmdb: 110416,
        },
        year: 2014,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 900,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/4CqGjm6Qab0NRTCH9aExVKi3yfx.jpg',
            vote_average: 0,
            vote_count: 0,
            width: 1600,
          },
          logos: {
            aspect_ratio: 3.066,
            height: 256,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/6THzaPz4s2Ty5HM1ZT37CDRIz6i.png',
            vote_average: 0,
            vote_count: 0,
            width: 785,
          },
          posters: {
            aspect_ratio: 0.666,
            height: 1024,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/e9dvBa8HWJg4gJnEC0uMzWVb9ic.jpg',
            vote_average: 1.75,
            vote_count: 2,
            width: 682,
          },
        },
      },
      {
        type: 'movie',
        title: 'Soul',
        ids: {
          trakt: 355959,
          slug: 'soul-2020',
          imdb: 'tt2948372',
          tmdb: 508442,
        },
        year: 2020,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 1080,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/27h4Sh2uHnFNPsGgNmRyTlAZetY.jpg',
            vote_average: 3.334,
            vote_count: 1,
            width: 1920,
          },
          logos: {
            aspect_ratio: 1.584,
            height: 298,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/791NHTuFyTURI17KL9w8igk3jGf.png',
            vote_average: 0,
            vote_count: 0,
            width: 472,
          },
          posters: {
            aspect_ratio: 0.667,
            height: 750,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/lkC7NExQ7EUxOV5WTOeqNkLvZk6.jpg',
            vote_average: 0,
            vote_count: 0,
            width: 500,
          },
        },
      },
      {
        type: 'movie',
        title: 'Donnie Darko',
        ids: {
          trakt: 107,
          slug: 'donnie-darko-2001',
          imdb: 'tt0246578',
          tmdb: 141,
        },
        year: 2001,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 720,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/2Qe5h38MT99b8h7hWHL01WETdAw.jpg',
            vote_average: 3.334,
            vote_count: 1,
            width: 1280,
          },
          logos: {
            aspect_ratio: 7.528,
            height: 53,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/pNvOhQXSl0qrhzIMZjT7r02kpdV.png',
            vote_average: 3.334,
            vote_count: 1,
            width: 399,
          },
          posters: {
            aspect_ratio: 0.667,
            height: 750,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/6YjdZaPcMYI8NXcffIa569TO1M7.jpg',
            vote_average: 1.066,
            vote_count: 5,
            width: 500,
          },
        },
      },
      {
        type: 'show',
        title: 'Fate/Zero',
        ids: {
          trakt: 74325,
          slug: 'fate-zero',
          tvdb: 275798,
          imdb: 'tt2051178',
          tmdb: 45845,
          tvrage: null,
        },
        year: 2011,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 2160,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/lMdfZ1mvpgdqjPBmnsh1VqfOFqU.jpg',
            vote_average: 3.334,
            vote_count: 1,
            width: 3840,
          },
          logos: {
            aspect_ratio: 1.213,
            height: 534,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/oGB9aUlhcl226f5MXxuxNrbqdUe.png',
            vote_average: 0,
            vote_count: 0,
            width: 648,
          },
          posters: {
            aspect_ratio: 0.667,
            height: 750,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/4NFUjlilSIjOaOmUbCRc1eVVCR1.jpg',
            vote_average: 0,
            vote_count: 0,
            width: 500,
          },
        },
      },
      {
        type: 'show',
        title: 'Trese',
        ids: {
          trakt: 180772,
          slug: 'trese',
          tvdb: 403226,
          imdb: 'tt9310336',
          tmdb: 94924,
          tvrage: null,
        },
        year: 2021,
        images: {
          backdrops: {
            aspect_ratio: 1.777,
            height: 960,
            iso_639_1: null,
            file_path: 'https://image.tmdb.org/t/p/original/sSvD3oGf26PP9q2IclPDpM7oZ0t.jpg',
            vote_average: 1.75,
            vote_count: 2,
            width: 1706,
          },
          logos: {
            aspect_ratio: 2.957,
            height: 207,
            iso_639_1: null,
            file_path: 'https://image.tmdb.org/t/p/original/zKcNdpDrNDAyLiSQTsZqD7DBmY5.png',
            vote_average: 0,
            vote_count: 0,
            width: 612,
          },
          posters: {
            aspect_ratio: 0.68,
            height: 1000,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/zNYPSo9nhrLyy453s5SsC0MCTuz.jpg',
            vote_average: 3.334,
            vote_count: 3,
            width: 680,
          },
        },
      },
      {
        type: 'show',
        title: 'Attack on Titan',
        ids: {
          trakt: 1420,
          slug: 'attack-on-titan',
          tvdb: 267440,
          imdb: 'tt2560140',
          tmdb: 1429,
          tvrage: null,
        },
        year: 2013,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 720,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/jA6avZSe0bfSKDTrlFlmQYFs3hO.jpg',
            vote_average: 1.066,
            vote_count: 5,
            width: 1280,
          },
          logos: {
            aspect_ratio: 4.903,
            height: 31,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/atRrX51XtBtaXhOToJYwn3enxS1.svg',
            vote_average: 0,
            vote_count: 0,
            width: 152,
          },
          posters: {
            aspect_ratio: 0.667,
            height: 750,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/gMJIEvdYdO3K42ljeLCfzpuzVrT.jpg',
            vote_average: 0.736,
            vote_count: 12,
            width: 500,
          },
        },
      },
      {
        type: 'show',
        title: 'Feel Good',
        ids: {
          trakt: 158435,
          slug: 'feel-good',
          tvdb: 377294,
          imdb: 'tt10098620',
          tmdb: 99610,
          tvrage: null,
        },
        year: 2020,
        images: {
          backdrops: {
            aspect_ratio: 1.778,
            height: 2160,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/dHIXAFutfUFBQZorv6YvHy09nrU.jpg',
            vote_average: 0,
            vote_count: 0,
            width: 3840,
          },
          logos: {
            aspect_ratio: 5.252,
            height: 214,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/a6nOJuK22X8uOfdGfFdikNZXjuc.png',
            vote_average: 0,
            vote_count: 0,
            width: 1124,
          },
          posters: {
            aspect_ratio: 0.667,
            height: 750,
            iso_639_1: 'en',
            file_path: 'https://image.tmdb.org/t/p/original/7QosFCs2W0P1kB3dYeED4gEhHlv.jpg',
            vote_average: 0,
            vote_count: 0,
            width: 500,
          },
        },
      },
    ]
    return recommendations
  }

  private static sendApiGetRequest = async <T>(uri: string) => {
    const response = await fetch(uri, {
      headers: MediaService.getDefaultHeaders(),
    })
    const value = (await response.json()) as T
    return value
  }
  private static getDefaultHeaders = () => {
    const traktStore = useTraktStore()
    return {
      Authorization: `${traktStore.oAuth?.token_type} ${traktStore.oAuth?.access_token}`,
    }
  }
}
