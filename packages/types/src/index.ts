import { Url } from "url"

export type SpacesProps = {}

export type SpacesIndexProps = {
  community_id: number      //
  sort?: string             // latest (default) | active
  per_page?: number         // defaults to 60. Maximum 100.
  page?: number
}

export type SpacesIndexResponse = SpaceProps[]

export type TopicProps = {}

export type SpaceProps = {
  id: number
  name: string
  slug: string
  space_group_id: number    // 431824
  space_group_name: string  // 'Public Spaces'
  url: Url
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
  community_id?: number
}

export type CircleProps = SpacesIndexProps | SpacesCreateProps | SpacesShowProps

export type CircleResponse = {
  response: Response
  data: any
}
