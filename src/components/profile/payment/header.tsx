import { IMerchantWidget } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import { genericURL } from '@/lib/data/constants'
import Image from 'next/image'
import { Header, LogoContainer, Name } from './styles'

const PaymentHeader = ({
  widget,
  displayHeader
}: {
  widget: IMerchantWidget
  displayHeader: boolean
}) => (
  <>
    {displayHeader && (
      <Header>
        {widget.logoCompany && (
          <LogoContainer>
            <Image
              src={genericURL + widget.logoCompany}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              alt=""
            />
          </LogoContainer>
        )}
        {widget.nameCompany && <Name>{widget.nameCompany}</Name>}
      </Header>
    )}
  </>
)

export default PaymentHeader
