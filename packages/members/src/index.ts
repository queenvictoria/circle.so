import { BaseService } from '@circle/core'

import {
  type MembersCreateProps,
  type MembersCreateResponse,
  type MembersIndexProps,
  type MembersIndexResponse,
  type MembersShowProps,
  type MembersUpdateProps,
  type MemberProps,
} from '@circle/types'


export class Members extends BaseService {
  endpoint = 'community_members'

  constructor ({api_key}: {api_key: string}) {
    super({ api_key })
  }

  // https://api.circle.so/#a1501d36-5e30-48f3-8934-c825256f31d7
  /**
   * List all Members
   */
  list (params?: MembersIndexProps): Promise<MembersIndexResponse> {

    return this._get([], params)
  }
  index = this.list

  /**
   * Invite a Member
   */
  async add (params: MembersCreateProps): Promise<MembersCreateResponse> {
    if ( !params?.email) throw new Error("Create requires an `email`.")
    if ( !params?.community_id)
      throw new Error("Create requires a `community_id`.")

    const data = await this._post(params)
    // Creates a user and a community_member which are different.
    // They have separate ids but share a public_uid.
    // The user id is present on the member as user_id
    // They both have email and first/last names.
    if (data?.community_member) return data.community_member

    throw new Error("Failed to invite a member to the community.")
  }
  invite = this.add

  /**
   * Get a single Member
   */
  async retrieve ({id, community_id}: MembersShowProps): Promise<MemberProps> {
    const params = { community_id } as MembersShowProps
    const data = await this._get([id.toString()], params)

    return data
  }
  show = this.retrieve

  /**
   * Update a single Member
   */
  async update (params: MembersUpdateProps): Promise<MemberProps> {
    const { id } = params
    const data = await this._patch([id.toString()], params)

    if (data?.success === false) throw new Error("Member not updated.")
    if (data?.community_member) return data.community_member

    throw new Error("Failed to update member.")
  }

  /**
   * Remove a single member
   */
  async delete ({id}: {id: number}): Promise<undefined> {
    if (!id) throw new Error("Delete requires an ID.")

    const res = await this._delete(id.toString())
    console.log(res)
  }
  remove = this.delete
}
