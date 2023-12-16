import Sidebar from '../sidebar'

const Dashboard = ({ sectionLinks, children }) => {
  return (
    <>
      <div className="grid grid-cols-5" style={{ backgroundColor: '#edf2ee' }}>
        <div className="col-span-1">
          <Sidebar sectionLinks={sectionLinks} />
        </div>
        <div className="col-span-4 bg-[#fff]">{children}</div>
      </div>
    </>
  )
}

export default Dashboard
