import { BaseService } from '@circle/core'

import {
  type PostsCreateProps,
  type PostsCreateResponse,
  type PostsIndexProps,
  type PostsIndexResponse,
  type PostsShowProps,
  type PostsUpdateProps,
  type PostProps,
} from '@circle/types'


export class Posts extends BaseService {
  endpoint = 'posts'

  constructor ({api_key}: {api_key: string}) {
    super({ api_key })
  }

  // https://api.circle.so/#98273257-cde7-44bc-bd45-5e0278d3acb0
  /**
   * List all posts in a space
   */
  list (params?: PostsIndexProps): Promise<PostsIndexResponse> {
    if ( !params?.space_id) throw new Error("Index requires a `space_id` integer.")

    return this._get([], params)
  }
  index = this.list

  /**
   * Create a post in a space
   */
  async add (params: PostsCreateProps): Promise<PostsCreateResponse> {
    if ( !params?.space_id) throw new Error("Create requires a `space_id` integer.")
    const data = await this._post(params)

    if (data?.post) return data.post
    throw new Error("Failed to post to the space.")

  }
  create = this.add

  /**
   * Get a single post
   */
  async retrieve ({id, community_id}: PostsShowProps): Promise<PostProps> {
    const params = { community_id } as PostsShowProps
    const data = await this._get([id.toString()], params)

    if (data?.success === false) throw new Error("Post not found.")
    return data
  }
  show = this.retrieve

  /**
   * Update a single post
   */
  async update (params: PostsUpdateProps): Promise<PostProps> {
    const { id } = params
    const data = await this._patch([id.toString()], params)

    if (data?.post) return data.post
    throw new Error("Failed to update post.")
  }

  /**
   * Delete a single space
   */
  delete ({id}: {id: number}): Promise<undefined> {
    if (!id) throw new Error("Delete requires an ID.")

    return this._delete(id.toString())
  }
  destroy = this.delete
}
