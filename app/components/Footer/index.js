import React from 'react'
import { FormattedMessage } from 'react-intl'

import A from 'components/A'
import Container from 'components/Container'
import LocaleToggle from 'containers/LocaleToggle'
import Wrapper, {
  LocaleWrapper
} from './Wrapper'
import messages from './messages'

function Footer () {
  return (
    <Container>
      <Wrapper>
        <LocaleWrapper>
          <FormattedMessage {...messages.footerLocale} />
          <LocaleToggle />
        </LocaleWrapper>
        <section>
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: <A href='https://github.com/joshuaalpuerto'>Joshua C Alpuerto</A>
            }}
          />
        </section>
      </Wrapper>
    </Container>
  )
}

export default Footer
