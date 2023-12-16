import { useState } from 'react'

const Upload = ({ value }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setFile(file)
  }

  const uploadFile = async () => {
    const formData = new FormData()
    formData.append('file', file)
  }

  return (
    <div>
      <h1>Upload file</h1>

      <input
        type="file"
        onChange={handleFileChange}
        className="mt-5 block w-full p-3 rounded-md border border-gray-300 focus:border-[#A4161A]"
      />

      <button
        onClick={uploadFile} // Call the uploadFile function when the button is clicked
        className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mb-8"
      >
        Upload
      </button>
    </div>
  )
}

// Export the App component
export default Upload
