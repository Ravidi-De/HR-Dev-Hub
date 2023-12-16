const CounterCard = ({ counter, children }) => {
  return (
    <div className="counter-card border-4 border-[#D3D3D3] rounded-xl grid grid-cols-4 w-full px-6 m-2 cursor-pointer hover:border-[#A4161A]">
      <div className="flex col-span-4 xl:col-span-1 justify-center items-start h-full">
        <div className="block mx-auto border-4 rounded-full border-[#D3D3D3] h-24 w-24 text-6xl text-center my-6">
          <div className="flex justify-center items-center h-full text-[#A4161A]">
            {counter}
          </div>
        </div>
      </div>

      <div className="col-span-4 xl:col-span-3 my-6">{children}</div>
    </div>
  )
}

export default CounterCard
