import { Spaces } from '@circle/spaces'

import {
  type CircleResponse,
  type SpacesCreateProps,
  type SpacesProps,
  type SpacesIndexResponse,
  type SpaceProps,
} from '@circle/types'


import { expect, test } from '@jest/globals'
// Use while updating src and remove after build.
// import { DocumentProps, EntityTypeProps, StoredSearchFeedProps } from '@opoint/types/src'

// This seems to be us
// const community_id = 1
const community_id = 185986
let id = 0

test('API key present', async () => {
  expect(process.env.CIRCLE_API_KEY).not.toBe(undefined)
})

if ( !process.env.CIRCLE_API_KEY ) throw new Error("Please add CIRCLE_API_KEY to your environment.")
const api = new Spaces({ api_key: process.env.CIRCLE_API_KEY })

test('List community spaces', async () => {
  const res = await api.list({ community_id })

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(200)

  const data = res.data as SpaceProps[]
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

test('Get a space', async () => {
  const res = await api.retrieve({ community_id, id })

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(200)

  const data = res.data as SpaceProps[]
  expect(typeof data).toEqual("object")

  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('slug')
  expect(data).toHaveProperty('url')
}, 20 * 1000)
