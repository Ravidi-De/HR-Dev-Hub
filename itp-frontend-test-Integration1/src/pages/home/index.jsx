import { BasicFooter, BasicHeader } from '../../components/common'
import Section1 from './components/section1'
import Section2 from './components/section2'
import Section3 from './components/section3'

const Home = () => {
  return (
    <>
      <BasicHeader />
      <main>
        <Section1 />
        <Section2 />
        <Section3 />
      </main>
      <BasicFooter />
    </>
  )
}

export default Home
