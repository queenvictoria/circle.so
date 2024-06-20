import { Url } from "url"

// export enum FormatEnum {
//   JSON = "json",
//   XML = "xml"
// }

// export type MainProps = {
//   header?: number
//   summary?: number
// }

// export type ParamsProps = {
//   reqestedarticles?: number
//   main?: MainProps
// }

// export type SearchProps = {
//   searchterm: string
//   params?: ParamsProps
// }

// export type TextProps = {
//   matches: boolean
//   text?: string
//   readmore?: boolean
// }

// export type ImageProps = {
//   url: Url
// }

// export type DocumentProps = {
//   id_site: number
//   id_article: number
//   hidden: boolean
//   position: number
//   countrycode: string
//   countryname: string
//   similarweb: {
//     domain: string
//   }
//   site_rank: {
//     rank_global: number
//     rank_country: number
//   }
//   unix_timestamp: number
//   media_type: {
//     timemap: boolean
//     clip: boolean
//     hastext: boolean
//     haslogo: boolean
//     paywall: boolean
//     fulltext: boolean
//     text: string // 'WEB'
//   }
//   stimestamp: number
//   stimestamp_index: number
//   local_time: {
//     GMT: number
//     text: string
//   }
//   local_rcf822_time: {
//     text: string
//   }
//   distribute_conditions: string
//   content_protected: number // 1
//   language: {
//     encoding: string
//     text: string
//   }
//   word_count: number
//   first_source: {
//     id: number|string
//     name: string
//     sitename: string
//     url: Url
//     siteurl: Url
//   }
//   header: TextProps
//   summary: TextProps
//   body: TextProps
//   articleimages: {
//     count: number
//     articleimage: Array<ImageProps>
//   }
//   caption: {
//     text: string
//   }
//   quotes: any // An array of some kind
//   url: Url
//   orig_url: Url
//   url_common: Url
//   screenshots: any // An array of some kind
//   author: string
//   exists_in_basket: string
//   tags: Array<string> // At a guess
//   stored_search_id: number
//   topics_and_entities?: {
//     sentiment?: SentimentDirectionEnum
//     sentiment_score?: number
//     topics?: TopicProps[]
//     entities?: EntityTypeProps
//   }
// }

// export type EntityProps = {
//   entity: string
//   wikidata_id?: string
//   sentiment?: SentimentDirectionEnum
// }

// export type TopicProps = {
//   label: string
//   mediatopic_id?: string
//   score: number
// }

// export enum EntityTypeEnum {
//   location,
//   organization,
//   person
// }

// export declare enum SentimentDirectionEnum {
//   Negative = -1,
//   Neutral = 0,
//   Positive = 1,
// }

// export interface EntityTypeProps extends Record<EntityTypeEnum, EntityProps[]> {}

// export type StoredSearchListResponse = Array<StoredSearchRetrieveResponse>


export type SpacesProps = {

}

export type SpacesIndexProps = {
  community_id: number      //
  sort?: string             // latest (default) | active
  per_page?: number         // defaults to 60. Maximum 100.
  page?: number
}

export type SpacesIndexResponse = {

}

export type TopicProps = {}

export type SpaceProps = {
  id: number
  name: string
  slug: string
  space_group_id: number    // 431824
  space_group_name: string  // 'Public Spaces'
  url: string
  community_id: number      // 185986
  is_private?: boolean
  hide_post_settings?: boolean
  display_view: string      // 'posts'
  post_ids: number[]
  is_post_disabled?: boolean
  space_type: string        // 'basic'
  hide_topic_settings?: boolean
  is_topic_disabled?: boolean
  topic_ids: number[]
  topics: TopicProps[]
  emoji?: string
  custom_emoji_url?: string
  custom_emoji_dark_url?: string
}

export type SpacesCreateProps = {
  community_id: number
  name: string
  is_private?: boolean
  is_hidden_from_non_members?: boolean
  is_hidden?: boolean
  slug?: string
  topics?: number[]
}

export type SpacesCreateResponse = {
  success: boolean
  message: string
  space: SpaceProps
}

export type SpacesShowProps = {
  id: number
  community_id: number
}


// export type SpacesShowProps = {
//   community_id: number      //
// }

// export type StoredSearchFeedResponse = {
//   searchresult: {
//     documents: number
//     search_start: number
//     covered: number
//     next_from: number

//     first_timestamp?: number
//     last_timestamp?: number
//     generated_timestamp?: number
//     cacheage?: number
//     cputime?: number
//     host?: string
//     compiledate?: string
//     notimeout?: boolean
//     document?: Array<DocumentProps>
//   }
// }

// export type StoredSearchListProps = {}

// export type StoredSearchAddProps = {
//   search: string
//   access_group?: string
//   get_old_articles?: boolean
//   max_age?: number
//   use_syndicates?: boolean
// }

// export type StoredSearchAddResponse = {
//   id: number|string
// } & StoredSearchAddProps

// export type StoredSearchRetrieveProps = {
//   id: number|string
// }

// export type StoredSearchRetrieveResponse = {
//   last_new_article: number
//   access_group: {
//     access_groups: Array<any>
//     sites: Array<any>
//     sources: Array<any>
//   }
// } & StoredSearchAddResponse

// export type StoredSearchUpdateProps = {
//   id: number|string
// } & StoredSearchAddProps

// export type StoredSearchUpdateResponse = StoredSearchRetrieveResponse

// export type StoredSearchDeleteProps = {
//   id: number|string
// }

// export type StoredSearchDeleteResponse = {}

export type CircleProps = SpacesIndexProps | SpacesCreateProps | SpacesShowProps

export type CircleResponse = {
  response: Response
  data: any
}
