import { SpaceGroups } from '@circle.so/spaces'

import {
  type SpacesCreateProps,
  type SpacesCreateResponse,
  type SpaceProps,
  SpacesIndexResponse,
} from '@circle.so/types'

import { expect, test } from '@jest/globals'

// This seems to be us
// const community_id = 1
const community_id = 185986
let id = 0, new_id = 0

test('API key present', async () => {
  expect(process.env.CIRCLE_API_KEY).not.toBe(undefined)
})

if ( !process.env.CIRCLE_API_KEY ) throw new Error("Please add CIRCLE_API_KEY to your environment.")
const api = new SpaceGroups({ api_key: process.env.CIRCLE_API_KEY })

test('Fetch the index community space groups', async () => {
  const data: SpacesIndexResponse = await api.index({ community_id })

  expect(typeof data).toEqual("object")
  expect(Array.isArray(data)).toEqual(true)

  expect(data.length).toBeGreaterThan(-1)
  data.forEach(group => {
    expect(group).toHaveProperty('id')
    expect(group).toHaveProperty('name')
    expect(group).toHaveProperty('slug')
  })

  id = data[0].id
}, 20 * 1000)

/**
 * Received value:
 * {
  "active_space_group_members_count": 0,
  "add_members_to_space_group_on_space_join": false,
  "allow_members_to_create_spaces": false,
  "automatically_add_members_to_new_spaces": false,
  "community_id": 185986,
  "created_at": "2024-06-09T03:18:06.357Z",
  "hide_members_count": null,
  "hide_non_member_spaces_from_sidebar": false,
  "id": 431825,
  "is_hidden_from_non_members": true,
  "name": "Get Started",
  "slug": "get-started",
  "space_group_members_count": null,
  "space_order_array": [
    1239009,
    1239011,
    1299353
  ],
  "updated_at": "2024-07-15T19:49:55.204Z"
}
 */
test('Show a space group', async () => {
  const data = await api.show({ community_id, id })

  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('slug')
  expect(data).toHaveProperty('space_order_array')
  expect(data).toHaveProperty('community_id')
  expect(data.community_id).toEqual(community_id)
}, 20 * 1000)

test('Get a space group without providing a community_id', async () => {
  const data = await api.show({ id })

  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('slug')
}, 20 * 1000)

// @FIX With a custom slug
test('Create a space group', async () => {
  const name = "Test space group"
  const slug = "test-0000-slug" // Becomes dasherised
  const props: SpacesCreateProps = { slug, name, community_id }
  const data = await api.add(props)

  expect(typeof data).toEqual('object')
  expect(data).toHaveProperty('name')
  expect(data?.name).toEqual(name)
  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('slug')
  expect(data.slug).toEqual(slug.replace('|', '-'))

  new_id = data?.id || -1
})

test('Destroy a space group', async () => {
  const data = await api.destroy({ id: new_id })
  expect(data).toEqual(undefined)

  // Check if it is really gone. This will throw.
  const action = async () => {
    await api.retrieve({ community_id, id: new_id })
  }
  await expect(action()).rejects.toThrow('Group not found')
})
