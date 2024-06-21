import { Posts } from '@circle/posts'
import { Spaces } from '@circle/spaces'

import {
  type SpaceProps,
  type SpacesCreateResponse,
  type PostsCreateProps,
  type PostsCreateResponse,
  type PostProps,
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
const api = new Posts({ api_key: process.env.CIRCLE_API_KEY })
const spaces_api = new Spaces({ api_key: process.env.CIRCLE_API_KEY })
let space_id:number

// Create a space
beforeEach(async () => {
  const name = "Test space"

  const res = await spaces_api.add({ name, community_id})
  const data = res.data as SpacesCreateResponse
  space_id = data.space.id
})

afterEach(async () => {
  await spaces_api.destroy({id: space_id})
})

it('Send a post to a space', async () => {
  const name = "Test post"
  const body = "Lorem ipsum"
  const props: PostsCreateProps = { space_id, name, body }

  const res = api.create(props)
  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(200)

  const data = res.data as PostProps
  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('slug')
  expect(data).toHaveProperty('url')
})
