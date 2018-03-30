import React from 'react'
import { FormattedMessage } from 'react-intl'

import A from 'components/A'
import LocaleToggle from 'containers/LocaleToggle'
import Wrapper from './Wrapper'
import messages from './messages'

function Footer () {
  return (
    <Wrapper>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href='https://github.com/joshuaalpuerto'>Joshua C Alpuerto</A>
          }}
        />
      </section>
    </Wrapper>
  )
}

export default Footer
