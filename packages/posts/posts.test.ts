import { Posts } from '@circle.so/posts'
import { Spaces } from '@circle.so/spaces'

import {
  type SpacesCreateResponse,
  type PostsCreateProps,
  type PostsCreateResponse,
  type PostProps,
} from '@circle.so/types'

import { expect, test } from '@jest/globals'

// This seems to be us
const community_id = 185986
let id = 0, new_id = 0

test('API key present', async () => {
  expect(process.env.CIRCLE_API_KEY).not.toBe(undefined)
})

if ( !process.env.CIRCLE_API_KEY ) throw new Error("Please add CIRCLE_API_KEY to your environment.")
const api = new Posts({ api_key: process.env.CIRCLE_API_KEY })
const spaces_api = new Spaces({ api_key: process.env.CIRCLE_API_KEY })
let space_id:number

// Create a space
beforeAll(async () => {
  const name = "Test space"

  const data: SpacesCreateResponse = await spaces_api.add({ name, community_id})
  space_id = data?.id || -1
})

afterAll(async () => {
  await spaces_api.destroy({id: space_id})
})

it('Send a post to a space', async () => {
  const name = "Test post"
  const body = "Lorem ipsum"
  const props: PostsCreateProps = { space_id, name, body }

  const data: PostsCreateResponse = await api.add(props)

  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('name')
  expect(data?.name).toEqual(name)
  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('body')
  expect(data?.body).toHaveProperty('body')
  expect(data?.body).toHaveProperty('record_type')
  expect(data?.body.record_type).toEqual('Post')

  id = data?.id || -1
})

it('Show a post', async () => {
  const data = await api.show({ id, community_id })

  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('id')
  expect(data?.id).toBe(id)
})

it('Fetch the post index of a space', async () => {
  const data = await api.index({ space_id })

  expect(Array.isArray(data)).toBe(true)
  expect(data.length).toBe(1)

  data.forEach((post: PostProps) => {
    expect(post).toHaveProperty('id')
    expect(post).toHaveProperty('name')
    expect(post).toHaveProperty('body')
    expect(post).toHaveProperty('slug')
    expect(post).toHaveProperty('url')
  })
})

// The API does not allow updates to the body.
it('Update a post', async () => {
  const name = "Test post 001"

  let data = await api.update({ id, name })

  expect(data).toHaveProperty('name')
  expect(data.name).toBe(name)
  expect(data).toHaveProperty('body')
  expect(typeof data.body).toBe('object')
  expect(data.body).toHaveProperty('body')

  // Get the post back
  data = await api.show({ id })

  expect(data).toHaveProperty('name')
  expect(data.name).toBe(name)
  expect(data).toHaveProperty('body')
  expect(typeof data.body).toBe('object')
  expect(data.body).toHaveProperty('body')
})

it('Destroy a post', async () => {
  const res = await api.destroy({ id })

  expect(res).toEqual(undefined)

  // Try to get the post. This will throw.
  const action = async () => {
    await api.retrieve({ id })
  }
  await expect(action()).rejects.toThrow('Post not found')
})
