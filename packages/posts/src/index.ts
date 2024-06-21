import { BaseService } from '@circle/core'

import {
  type PostsCreateProps,
  type PostsIndexProps,
  type PostsShowProps,
  type PostsUpdateProps,
  type CircleResponse
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
  list (params?: PostsIndexProps): Promise<CircleResponse> {
    if ( !params?.space_id) throw new Error("Index requires a `space_id` integer.")

    return this._get([], params)
  }
  index = this.list

  /**
   * Create a post in a space
   */
  add (params: PostsCreateProps): Promise<CircleResponse> {
    if ( !params?.space_id) throw new Error("Create requires a `space_id` integer.")

    return this._post(params)
  }
  create = this.add

  /**
   * Get a single post
   */
  retrieve ({id, community_id}: PostsShowProps): Promise<CircleResponse> {
    const params = { community_id } as PostsShowProps
    return this._get([id.toString()], params)
  }
  show = this.retrieve

  /**
   * Update a single post
   */
  update (params: PostsUpdateProps): Promise<CircleResponse> {
    const { id } = params

    return this._patch([id.toString()], params)
  }

  /**
   * Delete a single space
   */
  delete ({id}: {id: number}): Promise<CircleResponse> {
    if (!id) throw new Error("Delete requires an ID.")

    return this._delete(id.toString())
  }
  destroy = this.delete
}
