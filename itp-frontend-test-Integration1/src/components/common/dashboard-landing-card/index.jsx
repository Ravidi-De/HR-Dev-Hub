import { Link } from 'react-router-dom'
import Button from '../button'

const DashboardLandingCard = ({
  title,
  description,
  illustration,
  isIllustrationTopEnabled,
  linkLoc,
  linkTitle,
}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-2 p-4 bg-[#FCFCFC] w-4/5 border-2 border-[#BABABA] rounded-xl">
        <div className="col-span-1 mt-16 flex items-center justify-center xl:justify-end">
          <div className="block xl:ml-8">
            <p className="text-3xl font-semibold mb-4 text-center xl:text-left">
              {title}
            </p>
            <p className="mb-4 text-xl">{description}</p>
            {linkLoc && linkTitle && (
              <Link to={linkLoc}>
                <Button className="block mx-auto xl:mx-0 text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-8 w-72">
                  {linkTitle}
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div
          className={`hidden xl:block ${
            isIllustrationTopEnabled ? 'xl:-mt-52' : null
          }`}
        >
          <img
            className="block mx-auto"
            src={illustration}
            alt="illustration"
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardLandingCard
