import React from 'react'
import Head from 'next/head'

import Heading from 'constructicon/heading'
import Section from 'constructicon/section'

const Index = props => {
  return (
    <div className="container">
      <Head>
        <title>EMC API Doc</title>
      </Head>
      <main>
        <Section borderWidth={10} styles={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '30rem' }}>
          <Heading>
            EMC API playground
          </Heading>
          <LoginForm />
        </Section>
      </main>
    </div>
  )
}

export default Index
