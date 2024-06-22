import { Spaces } from '@circle/spaces'

import {
  type SpacesCreateProps,
  type SpacesCreateResponse,
  type SpaceProps,
  SpacesIndexResponse,
} from '@circle/types'

import { expect, test } from '@jest/globals'

// This seems to be us
// const community_id = 1
const community_id = 185986
let id = 0, new_id = 0

test('API key present', async () => {
  expect(process.env.CIRCLE_API_KEY).not.toBe(undefined)
})

if ( !process.env.CIRCLE_API_KEY ) throw new Error("Please add CIRCLE_API_KEY to your environment.")
const api = new Spaces({ api_key: process.env.CIRCLE_API_KEY })

test('Fetch the index community spaces', async () => {
  const data: SpacesIndexResponse = await api.index({ community_id })

  expect(typeof data).toEqual("object")
  expect(Array.isArray(data)).toEqual(true)

  expect(data.length).toBeGreaterThan(-1)
  data.forEach(space => {
    expect(space).toHaveProperty('id')
    expect(space).toHaveProperty('name')
    expect(space).toHaveProperty('slug')
    expect(space).toHaveProperty('url')
  })

  id = data[0].id
}, 20 * 1000)

test('Show a space', async () => {
  const data = await api.show({ community_id, id })

  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('slug')
  expect(data).toHaveProperty('url')
}, 20 * 1000)


test('Get a space without providing a community_id', async () => {
  const data = await api.show({ id })

  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('slug')
  expect(data).toHaveProperty('url')
}, 20 * 1000)

test('Create a space', async () => {
  const name = "Test space"
  const props: SpacesCreateProps = { name, community_id }
  const data = await api.add(props)

  expect(typeof data).toEqual('object')
  expect(data).toHaveProperty('name')
  expect(data?.name).toEqual(name)
  expect(data).toHaveProperty('id')

  new_id = data?.id || -1
})

// The API can't update Spaces.

test('Destroy a space', async () => {
  const data = await api.destroy({ id: new_id })

  expect(data).toEqual(undefined)

  // Check if it is really gone. This will throw.
  const action = async () => {
    await api.retrieve({ community_id, id: new_id })
  }
  // Why does fetching a missing space throw a 500?
  await expect(action()).rejects.toThrow('Internal Server Error')
})
