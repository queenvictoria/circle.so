import { Url } from "url"

export type SpacesIndexProps = {
  community_id: number      //
  sort?: string             // latest (default) | active
  per_page?: number         // defaults to 60. Maximum 100.
  page?: number
}

export type TopicProps = SpaceProps & {
  space_slug: string
}

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

export type SpacesIndexResponse = SpaceProps[]
export type SpacesCreateResponse = SpaceProps

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

export type BodyProps = {
  id: number
  name: string
  body: BodyProps
  record_type: string // 'Post'
  record_id: number // same as id?
  created_at: Date
  updated_at: Date
}

export type PostsCreateProps = {
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

export type PostProps = PostsCreateProps & {
  id: number
  body: BodyProps
  url: Url
  space_name: string
  user_id: number
  user_name: string
  comments_count: number
  user_avatar_url: Url | null
  created_at: Date
  updated_at: Date
  cover_image?: any
  cover_image_url?: Url | null
  cardview_thumbnail?: any
  cardview_url?: Url | null
  flagged_for_approval_at: Date
  custom_html?: string
  likes_count: number
  topics?: TopicProps[]
  user_posts_count: number
  user_topics_count: number
  user_likes_count: number
  user_comments_count: number
}

export type PostsIndexResponse = PostProps[]
export type PostsCreateResponse = PostProps

export type PostsShowProps = {
  id: number
  community_id?: number
}


export type PostsUpdateProps = Partial<Omit<PostsCreateProps, 'body'>> & {
  id: number
  user_id?: number //
}

export type MembersCreateProps = {
  email: string
  password?: string
  name: string
  community_id?: number
  space_ids?: number[]
  space_group_ids?: number[]
  member_tag_ids?: []
  headline?: string
  bio?: string
  website_url?: Url
  instagram_url?: Url
  twitter_url?: Url
  linkedin_url?: Url
  facebook_url?: Url
  avatar?: Url
  skip_invitation?: boolean
  location?: string
}

export type MembersSearchProps = {
  email: string
  community_id?: number
}

export type MembersIndexProps = {
  sort?: string             // latest (default) | active
  per_page?: number         // defaults to 60. Maximum 100.
  page?: number
  status?: string      // 'active'
}

export type MembersShowProps = {
  id: number
  community_id?: number
}

export type ProfileFieldProps = any
export type TagProps = any

export type MemberProps = MembersCreateProps & {
  id: number
  community_id?: number
  last_seem_at: Date
  profile_url: Url
  public_uuid: string
  profile_fields: ProfileFieldProps[]
  avatar_url: Url
  user_id: number
  topics_count: number
  posts_count: number
  comments_count: number
  accepted_invitation: Date
  active: boolean
  sso_provider_user_id?: string
  member_tags: TagProps[]
}

export type MembersUpdateProps = {
  id: number
  community_id?: number
  space_ids?: number[]
  space_group_ids?: number[]
  skip_invitation?: boolean
}

export type MembersIndexResponse = MemberProps[]
export type MembersCreateResponse = MemberProps

export type CircleProps =
  SpacesIndexProps | SpacesCreateProps | SpacesShowProps
  |
  PostsIndexProps | PostsCreateProps | PostsShowProps
  |
  MembersIndexProps | MembersCreateProps | MembersShowProps

export type CircleResponse = any
