import { env } from '@/lib/env/client'
import Link from 'next/link'
import { Footer, PoweredBy } from './styles'
import Configure from '@/components/common/header/configure'

const PaymentFooter = () => (
  <Footer>
    {env.isStage ? (
      <Link href="/" passHref>
        <a>
          <PoweredBy />
        </a>
      </Link>
    ) : (
      <a href="https://assetux.com">
        <PoweredBy />
      </a>
    )}

    <Configure direction="top" />
  </Footer>
)

export default PaymentFooter
