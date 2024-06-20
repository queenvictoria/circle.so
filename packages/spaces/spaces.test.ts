import { Spaces } from '@circle/spaces'

import {
  type CircleResponse,
  type SpacesCreateProps,
  type SpacesProps,
  type SpacesIndexResponse,
} from '@circle/types'


import { expect, test } from '@jest/globals'
// Use while updating src and remove after build.
// import { DocumentProps, EntityTypeProps, StoredSearchFeedProps } from '@opoint/types/src'

test('API key present', async () => {
  expect(process.env.CIRCLE_API_KEY).not.toBe(undefined)
})

if ( !process.env.CIRCLE_API_KEY ) throw new Error("Please add CIRCLE_API_KEY to your environment.")
const api = new Spaces({ api_key: process.env.CIRCLE_API_KEY })

test('List community spaces', async () => {
  const res = await api.list()

  expect(res.response).toHaveProperty('status')
  expect(res.response.status).toBe(200)

  const body = res.data as SpacesIndexResponse
  expect(typeof body).toEqual("object")
  expect(Array.isArray(body)).toEqual(true)

  expect(body.length).toBeGreaterThan(-1)

}, 20 * 1000)
