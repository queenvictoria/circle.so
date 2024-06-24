import { Members } from '@circle/members'
import { Spaces } from '@circle/spaces'

import {
  type MembersCreateProps,
  type MembersCreateResponse,
  type MemberProps,
} from '@circle/types'

import { expect, test } from '@jest/globals'

// This seems to be us
const community_id = 185986
let id = 0, new_id = 0

test('API key and user details present', async () => {
  expect(process.env.CIRCLE_API_KEY).not.toBe(undefined)
  expect(process.env.USER_EMAIL).not.toBe(undefined)
  expect(process.env.USER_PASS).not.toBe(undefined)
})

if ( !process.env.CIRCLE_API_KEY ) throw new Error("Please add CIRCLE_API_KEY to your environment.")
const api = new Members({ api_key: process.env.CIRCLE_API_KEY })
const spaces_api = new Spaces({ api_key: process.env.CIRCLE_API_KEY })
let space_id:number

// Create a space
beforeAll(async () => {
  const name = "Test space"

  const data = await spaces_api.add({ name, community_id})
  space_id = data?.id || -1
})

afterAll(async () => {
  await spaces_api.destroy({id: space_id})
})

// Doesn't seem to be notifying invited members.
// The UI has a switch for this. skip_invitation? If password is set invitation
// is not emailed.
// If the user already exists with a password an email is not sent either.
// But they are added to the new space.
// Can use space_members add if the member is already in the community.
// fetch("https://app.circle.so/api/v1/space_members?email=member@circle.co&space_id=693100&community_id=11111", requestOptions)
it('Invite a member to a space', async () => {
  const name = "Test member"
  const email = process.env.USER_EMAIL || ''
  const password = process.env.USER_PASS || ''
  const props: MembersCreateProps = {
    community_id,
    space_ids: [space_id],
    name,
    email,
    password,
    skip_invitation: false
  }

  const data: MembersCreateResponse = await api.add(props)

  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('name')
  expect(data?.name).toEqual(name)
  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('email')
  expect(data?.email.toLowerCase()).toEqual(email.toLowerCase())
  // Even if spaces are set they don't show up here.
  // expect(data).toHaveProperty('space_ids')
  // expect(data?.space_ids).toEqual([space_id])
  expect(data).toHaveProperty('community_id')
  expect(data?.community_id).toEqual(community_id)

  id = data?.id || -1
})

// Show space and show member don't seem to show spaces.
// There isn't a GET space_members listed in the API.
it('Show a member', async () => {
  const data = await api.show({ id, community_id })

  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('id')
  expect(data?.id).toBe(id)
  expect(data).toHaveProperty('email')
  expect(data?.email).toBe(process.env.USER_EMAIL?.toLowerCase())
})

it('Fetch the member index of a community', async () => {
  const data = await api.index({ })

  expect(Array.isArray(data)).toBe(true)
  expect(data.length).toBeGreaterThan(1) // Our core user and some new ones.

  data.forEach((member: MemberProps) => {
    expect(member).toHaveProperty('id')
    expect(member).toHaveProperty('name')
    expect(member).toHaveProperty('email')
    expect(member).toHaveProperty('accepted_invitation') // Before now
    expect(member).toHaveProperty('updated_at') // Before now
    expect(member).toHaveProperty('active') // true
  })
})

// The API does not allow updates to the body.
it('Update a member', async () => {

  // This is not a good test as we don't see space_ids in the response.
  // Remove a member from our space
  let data = await api.update({ id, space_ids: [] })

  expect(data.id).toBe(id)
  // expect(data.space_ids).toBe([])

  // Get the member back
  data = await api.show({ id })

  expect(data).toHaveProperty('name')
  expect(data.id).toBe(id)
  // expect(data.space_ids).toBe([])
})

it('Destroy a member', async () => {
  const res = await api.remove({ id })

  expect(res).toEqual(undefined)

  // Try to get the member. This will throw.
  const action = async () => {
    await api.retrieve({ id })
  }
  await expect(action()).rejects.toThrow('member not found')
})
