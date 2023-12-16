import './styles.scss'
import WaterWave from 'react-water-wave'

const Section1 = () => {
  return (
    <section id="section1" className="h-screen w-full z-0">
      <WaterWave
        className="absolute top-0 h-screen w-full z-0"
        imageUrl={'https://source.unsplash.com/5QgIuuBxKwM/1920x1080'}
      >
        {() => (
          <div className="overlay h-full flex justify-center items-center lg:items-end lg:justify-start">
            <div className="block lg:ml-24 pb-12">
              <p className="text-orange-300 text-8xl markazi-text text-center lg:text-left">
                HR DevHub
              </p>
              <p className="text-white text-3xl text-center lg:text-left">
                HR system desiged for MAS Bodyline
              </p>
            </div>
          </div>
        )}
      </WaterWave>
    </section>
  )
}

export default Section1
