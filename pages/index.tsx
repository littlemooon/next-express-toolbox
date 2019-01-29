import { NextFC } from 'next'
import Link from 'next/link'
import Header from '../components/header'

const Index: NextFC = () => {
  return (
    <main>
      <Header />
      <section>
        <Link href="/about">
          <a>Go to About Me</a>
        </Link>
      </section>
    </main>
  )
}

export default Index
