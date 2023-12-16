import React, { useRef, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import QrReader from 'react-qr-scanner'
import Swal from 'sweetalert2'
import axios from 'axios'

import './QRCodeScanner.css'

import logo from '../assets/Backgrounds/mas-logo_new-2-01-1.jpg'
import image1 from '../assets/Backgrounds/234.jpg'
import image2 from '../assets/Backgrounds/0129-1.jpg'
import image3 from '../assets/Backgrounds/0122-1.jpg'

const QRCodeScanner = () => {
  const videoRef = useRef(null)
  const [scannedData, setScannedData] = useState(null)
  const [scanning, setScanning] = useState(true)
  const currentDate = new Date().toLocaleDateString('en-US') // Get the current date in the desired format

  useEffect(() => {
    // Initially start scanning
    setScanning(true)
  }, [])

  const handleError = (error) => {
    console.error('Error while scanning:', error)

    // Wait for 5 seconds before scanning again in case of an error
    setTimeout(() => {
      setScanning(true)
    }, 5000)
  }

  const handleScan = async (result) => {
    if (result) {
      try {
        const resultString = result.text
        setScannedData(resultString)

        Swal.fire({
          icon: 'success',
          title: 'Scanned Data',
          text: resultString,
          confirmButtonColor: '#f01313', // Red color for the confirm button
          timer: 1000, // Close the alert after 5 seconds
        })

        const parsedData = JSON.parse(resultString)

        console.log('Employee ID:', parsedData.employeeID)
        console.log('Unique ID:', parsedData.uniqueID)
        console.log('Date and Time:', parsedData.dateTime)

        const extractedData = {
          employeeID: parsedData.employeeID,
          uniqueID: parsedData.uniqueID,
          createdDate: parsedData.dateTime,
        }

        await axios.post(
          'http://localhost:4444/api/attendanceTracker/',
          extractedData
        )

        Swal.fire({
          icon: 'success',
          title: 'Data Saved Successfully',
          confirmButtonColor: '#f01313', // Red color for the confirm button
          timer: 5000, // Close the alert after 5 seconds
        })

        // Stop scanning for 10 seconds after a successful scan
        setScanning(false)
        setTimeout(() => {
          setScanning(true)
        }, 5000)
      } catch (error) {
        console.error('Error parsing scanned data:', error)

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while saving data.',
          confirmButtonColor: '#f01313', // Red color for the confirm button
          timer: 5000, // Close the alert after 5 seconds
        })

        // Wait for 5 seconds before scanning again in case of an error
        setTimeout(() => {
          setScanning(true)
        }, 3000)

        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    }
  }

  return (
    <div className="container">
      <div className="background-carousel">
        <img src={image1} alt="Image 1" />
        <img src={image2} alt="Image 2" />
        <img src={image3} alt="Image 3" />
      </div>

      <header
        className="header"
        style={{ height: '10%' }}
      >
        <div className="header-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header-content">
          <span
            className="attendance-recorder"
            style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', fontSize: '24px' }}
          >
            Attendance Recorder
          </span>
          <span className="current-time" style={{ color: 'red', fontSize: '24px' }}>
            {currentDate}
          </span>
        </div>
      </header>

      <div
        className="text-above-scanner row"
        style={{ textAlign: 'center', color: 'red', marginTop: '12vh', fontSize: '28px', fontFamily: 'initial' }}
      >
        <h2>Place your QR code in front of the camera</h2>
      </div>
      <div
        className="scanner-container row"
        style={{
          height: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="scanner" style={{ width: '50%' }}>
          {scanning && (
            <QrReader
              ref={videoRef}
              delay={10000}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
          )}
        </div>
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} HRDev Hub. All Rights Reserved.
        {/* Add other basic footer content here */}
      </footer>
    </div>
  )
}

export default QRCodeScanner
