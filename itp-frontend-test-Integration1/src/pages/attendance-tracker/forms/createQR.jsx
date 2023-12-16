import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendar,
  faArrowRightToFile,
  faMoneyBillTransfer,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { Dashboard, EmployeeNavBar, Toast } from '../../../components/common';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Swal from 'sweetalert2';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import Cookies from 'js-cookie';

// import PDF from '../assets/Backgrounds/'

const data = {
  employeeID: Cookies.get('employeeID'),
};

const createQRData = () => {
  const uniqueId = uuidv4();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();

  return {
    employeeID: data.employeeID,
    uniqueID: uniqueId,
    dateTime: formattedDate,
  };
};

// Function to handle the "Download" button click

const navigateBack = () => {
  window.location.href = '/attendance-tracker/employeeDashboard'; // Change the URL to navigate
};

const CreateQR = () => {
  const [qrCodeData, setQRCodeData] = useState(createQRData());
  const [generatedQRCode, setGeneratedQRCode] = useState(null);

  useEffect(() => {
    const savedEmployeeID = Cookies.get('employeeID');

    if (savedEmployeeID) {
      // Use the employeeID from the cookie
      setQRCodeData({ ...qrCodeData, employeeID: savedEmployeeID });
    }
  }, []);

  const qrCodeRef = useRef(null);

  // Function to handle the "Generate" button click
  const handleGenerate = async () => {
    try {
      const validateEndpoint = `http://localhost:4444/api/qrCode/validate`;
      await axios.post(validateEndpoint, data);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Validation successful.',
        timer: 500,
      });
      
      setTimeout(async () => {
        try {
          const createQREndpoint = `http://localhost:4444/api/qrCode/createQR`;
          const qrCodeData = createQRData();

          // Store the qrCodeData in the database
          await axios.post(createQREndpoint, qrCodeData);

          // Generate the QR code after storing data
          setGeneratedQRCode(<QRCode value={JSON.stringify(qrCodeData)} size={256} />);

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Saved QR data',
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'QR generation failed',
          });
        }
      }, 2500); // 2500 milliseconds (2.5 seconds) delay
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User not found',
      });
    }
  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr_code.png';
        link.click();
      });
    }
  };

  

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Menu',
          children: [
            {
              path: '/attendance-tracker/employeeDashboard',
              name: 'Attendance',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendar}
                />
              ),
            },
            {
              path: '/leave-manager/empDashboard',
              name: 'Leaves',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMoneyBillTransfer}
                />
              ),
            },
          ],
        },
      ]}
    >
      <>
        <EmployeeNavBar />
        <div
          className="container-fluid d-flex flex-column align-items-center justify-content-center"
          style={{ height: '92.5vh' }}
        >
          {/* {generatedQRCode} */}

          <div ref={qrCodeRef}
          style={{
            padding: '10px', // Add padding to the QR code
            border: '1px solid #000', // Add a border to the QR code
            textAlign: 'center', // Center the employeeID horizontally
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center the employeeID vertically
            justifyContent: 'center',
          }}
          >
            {generatedQRCode}
            <p>{qrCodeData.employeeID}</p>
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col">
              <button
                className="btn btn-info my-3"
                onClick={() => handleGenerate()}
              >
                Generate
                <FontAwesomeIcon
                  icon={faArrowRightToFile}
                  style={{ fontSize: 15, marginLeft: '5px' }}
                />
              </button>
              <div className="col">
                <button
                  className="btn btn-info my-3"
                  onClick={() => handleDownload()}
                >
                  Download
                  <FontAwesomeIcon
                    icon={faArrowRightToFile}
                    style={{ fontSize: 15, marginLeft: '5px' }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </Dashboard>
  );
};

export default CreateQR;
