/**
 * This is a sample test suite.
 * Replace this with your implementation.
 */

import assert from 'assert'
import { string, z } from 'zod'
import { jest } from '@jest/globals'
import { BackendClient } from '@/lib/backend/main'
import {
  FiatProvider,
  GetPaymentUrlProps,
  SellTokenCreateProps,
  Token
} from '@/lib/backend/main/types.backend.main'
const client = new BackendClient()
const apiHost = 'bsc.dev.assetux.com'
let PROVIDERS: FiatProvider[]
let TOKENS: Token[]
let sellorderid: string

const card = '5533664477558866'
const OxZERO = '0x0000000000000000000000000000000000000000'

describe('TEST /api', () => {
  it('GET /fiatrates', async () => {
    const rates = await client.getFiatRates({ apiHost })
    assert(rates.state === 'success')
    assert(rates.data.length > 0)

    const FiatRate = z.array(
      z.object({
        chain_id: z.number(),
        name: z.string(),
        token_address: z.string(),
        buy: z.object({
          RUB: z.number(),
          UAH: z.optional(z.number()),
          KZT: z.optional(z.number())
        })
      })
    )

    FiatRate.parse(rates.data)
  })
  // process.exit(0)
  it('GET /fiatproviders', async () => {
    const providers = await client.getFiatProviders({ apiHost })
    assert(providers.state === 'success')

    const Provider = z.array(
      z.object({
        id: z.number(),
        currency: z.enum(['RUB', 'UAH', 'KZT']),
        provider: z.string(),
        method: z.string()
      })
    )

    Provider.parse(providers.data)
    PROVIDERS = providers.data
  })

  it('GET /blockchains', async () => {
    const blockchains = await client.getBlockchains()

    assert(blockchains.state === 'success')
    const Chain = z.array(
      z.object({
        id: z.number(),
        chain_id: z.number(),
        active: z.boolean(),
        title: z.string(),
        url: z.string(),
        logo: z.optional(z.string())
      })
    )

    Chain.parse(blockchains.data)
  })

  it('GET /blockchains (BUY)', async () => {
    const tokens = await client.getTokens({ apiHost, type: 'buy' })

    assert(tokens.state === 'success')
    const Token = z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        symbol: z.string(),
        address: z.string(),
        decimals: z.number(),
        enabled: z.boolean(),
        chain_id: z.number()
      })
    )

    Token.parse(tokens.data)
    TOKENS = tokens.data
  })

  it('GET /blockchains (SELL)', async () => {
    const tokens = await client.getTokens({ apiHost, type: 'sell' })

    assert(tokens.state === 'success')
    const Token = z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        symbol: z.string(),
        address: z.string(),
        decimals: z.number(),
        enabled: z.boolean(),
        chain_id: z.number()
      })
    )

    Token.parse(tokens.data)
  })
  jest.setTimeout(30000)
  it('Buy some tokens', async () => {
    const params: GetPaymentUrlProps = {
      apiHost,
      chainId: 56,
      ticker: 'RUB',
      tokenAddress: TOKENS[0].address,
      cryptoAddress: OxZERO,
      card,
      email: 'noreply@example.com',
      provider: PROVIDERS[0].method,
      amount: 5002
    }
    const payUrl = await client.getPaymentUrl(params)
    assert(payUrl.state === 'success')
  })
  describe('Sell order', () => {
    const cr = async () => {
      const params: SellTokenCreateProps = {
        apiHost,
        cur_in: {
          ...TOKENS[0]
        },
        cur_out: {
          type: 'VISAMASTER',
          currency: 'RUB',
          pan: card,
          holder: 'CARD HOLDER'
        },
        totalAmount: 100,
        email: 'noreply@example.com'
      }
      const some = await client.createSellTokenOrder(params)
      assert(some.state === 'success')
      console.log(some)
      sellorderid = (some.data as any).orderId.toString()
      return sellorderid
    }

    it('Sell some tokens', async () => {
      await cr()
    })

    it('Sell order check', async () => {
      const some = await client.checkSellOrder({
        apiHost,
        orderId: sellorderid
      })
      assert(some.state === 'success')
    })

    it('Cancels order', async () => {
      const some = await client.closeSellOrder({
        apiHost,
        orderId: sellorderid
      })
      console.log(some)
      assert(some.state === 'success')
      // invalidate
      sellorderid = undefined as any
    })

    it('Request refund', async () => {
      await cr()
      const some = await client.refundRequest({ apiHost, orderId: sellorderid })
      console.log(some)
      assert(some.state === 'success')
    })
  })
})
