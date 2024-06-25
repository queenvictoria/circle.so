import { BaseService } from '@circle.so/core'

import {
  type SpacesCreateProps,
  type SpacesIndexProps,
  type SpacesShowProps,
  type SpacesIndexResponse,
  type SpaceProps
} from '@circle.so/types'


export class Spaces extends BaseService {
  endpoint = 'spaces'

  constructor ({api_key}: {api_key: string}) {
    super({ api_key })
  }

  // https://api.circle.so/#c2faf0c4-9903-4cdb-84c5-6a587e0f6c40
  /**
   * List all spaces in a community
   */
  list (params?: SpacesIndexProps): Promise<SpacesIndexResponse> {
    if ( !params?.community_id) throw new Error("Index requires a `community_id` integer.")

    return this._get([], params)
  }
  index = this.list

  /**
   * Create a space in a community
   */
  async add (params: SpacesCreateProps): Promise<SpaceProps> {
    const data = await this._post(params)

    if (data?.space) return data.space
    throw new Error("Failed to create a space.")
  }
  create = this.add

  /**
   * Get a single space
   */
  retrieve ({id, community_id}: SpacesShowProps): Promise<SpaceProps> {
    const params = { community_id } as SpacesShowProps
    return this._get([id.toString()], params)
  }
  show = this.retrieve

  /**
   * Delete a single space
   */
  delete ({id}: {id: number}): Promise<undefined> {
    if (!id) throw new Error("Delete requires an ID.")

    return this._delete(id.toString())
  }
  destroy = this.delete
}
