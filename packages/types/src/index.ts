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

export type PostsIndexProps = {
  community_id?: number
  space_group_id?: number
  space_id: number
  sort?: string             // latest (default) | active
  per_page?: number         // defaults to 60. Maximum 100.
  page?: number
  search_text?: string
  status?: string           // all
  topics?: number[]         // Optional: Array with topic IDS for filtering posts
}

export type PostProps = {
  community_id?: number
  space_id: number
  status?: string // published (default), draft, scheduled
  published_at?: Date // Must be in the past if 'scheduled'
  name: string
  body: string
  is_pinned?: boolean // true
  is_comments_enabled?: boolean // true
  is_comments_closed?: boolean // false
  is_liking_enabled?: boolean // true
  user_email?: string // Optional. Email of the community member to post from. Defaults to admin if empty.
  skip_notifications?: boolean // false
  slug?: string
  internal_custom_html?: string
  is_truncation_disabled?: boolean
  hide_meta_info?: boolean
  meta_title?: string
  meta_description?: string
  opengraph_title?: string
  opengraph_description?: string
  hide_from_featured_areas?: boolean
  topics?: number[] //  Array with topic IDS, Max of 5 topics per Post
}

export type PostsCreateProps = PostProps

export type PostsCreateResponse = {
  success: boolean
  message: string
  post: PostProps
}

export type PostsShowProps = {
  id: number
  community_id?: number
}

export type PostsUpdateProps = {
  id: number
  user_id?: number //
} & Partial<PostsCreateProps>

export type CircleProps =
  SpacesIndexProps | SpacesCreateProps | SpacesShowProps
  |
  PostsIndexProps | PostsCreateProps | PostsShowProps

export type CircleResponse = {
  response: Response
  data: any
}
