import rs from 'jsrsasign'
import { max_age, refresh_max_age, privateKey, publicKey } from './constant'

export const createJWT = (
  data: any,
  type: 'action_token' | 'refresh_token' = 'action_token',
) => {
  const header = { typ: 'JWT', alg: 'RS256', kid: 'authserver' }
  const now = rs.KJUR.jws.IntDate.get('now') * 1000
  let exp = now + max_age
  if (type === 'refresh_token') {
    exp = now + refresh_max_age // Refresh tokens can have a longer expiration time
  }
  return rs.KJUR.jws.JWS.sign(
    header.alg,
    JSON.stringify(header),
    JSON.stringify({
      ...data,
      type,
      exp,
      iat: now,
      nbf: now,
    }),
    privateKey,
  )
}

export const extendActionToken = (data: any) => {
  const header = { typ: 'JWT', alg: 'RS256', kid: 'authserver' }
  const now = rs.KJUR.jws.IntDate.get('now') * 1000
  data.exp = now + max_age
  return rs.KJUR.jws.JWS.sign(
    header.alg,
    JSON.stringify(header),
    JSON.stringify({ ...data }),
    privateKey,
  )
}

export const verifyJWT = (
  token: string,
  type: 'action_token' | 'refresh_token' = 'action_token',
) => {
  const isValid = rs.KJUR.jws.JWS.verify(token, publicKey)
  if (isValid) {
    const tokenParts = token.split('.')
    const payloadJson = atob(tokenParts[1])
    const payload = JSON.parse(payloadJson)
    const current = rs.KJUR.jws.IntDate.get('now') * 1000
    if (current > payload.exp || payload.type !== type) {
      return {}
    }
    return payload
  }
  return {}
}
