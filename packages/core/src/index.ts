import {
  type CircleProps,
  type CircleResponse
} from '@circle/types'

export class BaseService {
  base_url = 'https://app.circle.so/api/v1'
  method = 'GET'
  headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  })
  endpoint = ''

  constructor ({api_key}: {api_key: string}) {
    if (api_key) {
      this.headers.set('Authorization', ['Token', api_key].join(' '))
    }
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
   *
   * @param params
   */
  fetch (opts: RequestInit, paths?: Array<string>, params?: any): Promise<CircleResponse> {
    const fragments = [this.base_url, this.endpoint]
    if ( paths && paths.length > 0 ) {
      paths.forEach(p => fragments.push(p))
    }
    // Add a trailing slash
    fragments.push('')
    const url = new URL(fragments.join('/'))
    if (params)
      url.search = new URLSearchParams(params).toString()

    // Add Headers
    opts.headers = this.headers

    return fetch(url, opts)
      .then(async res => {
        let data = {}
        // Any of these codes should throw.
        if ( [500].includes(res.status) ) throw new Error(res.statusText)
        if ( opts.method && !['DELETE'].includes(opts.method)) {
          try {
            data = await res.json()
          } catch (err) {
            console.error(err)
          }
        }
        return {
          response: res, data
        }
      })
  }

  /**
   *
  */
  _delete (id: string): Promise<CircleResponse> {
    return this.fetch({ method: 'DELETE' }, [id])
  }

  /**
   *
  */
  _get (paths: Array<string>, params?: CircleProps): Promise<CircleResponse> {
    return this.fetch({ method: 'GET' }, paths, params)
  }

  /**
   *
   */
  _patch (paths: Array<string>, body: CircleProps): Promise<CircleResponse> {
    return this.fetch({ method: 'PATCH', body: JSON.stringify(body) }, paths)
  }

  /**
   *
   */
  _post (body: CircleProps): Promise<CircleResponse> {
    return this.fetch({ method: 'POST', body: JSON.stringify(body) })
  }
}