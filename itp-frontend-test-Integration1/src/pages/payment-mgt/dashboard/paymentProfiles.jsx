import React, { useState,useEffect  } from 'react'
import Axios from 'axios'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,faEye,faTrash,faFilter,faPen,faPrint,
} from '@fortawesome/free-solid-svg-icons'
import styles from '../assets/paymentProfile.scss?inline'
import {faMagnifyingGlass,faCalendar,faMoneyBillTransfer,faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from '../../../components/common'
import {pdf} from '@react-pdf/renderer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { EmployeeNavBar } from '../../../components/common'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import PDF from '../component/pdf/PDF.jsx'

const PaymentProfileDashboard = () => {
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [paymentProfiles, setPaymentProfiles] = useState([]); // State to hold payment profiles


  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const filteredData = paymentProfiles.filter(
    (profile) =>
      (selectedDepartment === 'All' || profile.department === selectedDepartment) &&
      profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredData.slice(startIndex, endIndex)

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
};

  const handleFilter = () => {
    setCurrentPage(1)
  }

  const calculateDailyAmount = (base_salary,allowances) => {
    const parsedBaseSalary = parseFloat(base_salary)
    const parsedAllowances = parseFloat(allowances)
    const dates = parseFloat(30)
    // Check if parsing failed and default to 0
    if (isNaN(parsedBaseSalary) || isNaN(parsedAllowances)) {
      return 0
    }

    return (parsedBaseSalary + parsedAllowances) / dates
  }

  useEffect(() => {
    // Function to fetch payment profiles from the backend
    const fetchPaymentProfiles = async () => {
      try {
        const response = await Axios.get('http://localhost:4444/api/paymentProfile/profiles');

        const profilesWithIds = response.data.map((profile, index) => ({
          ...profile,
          id: index + 1,
        }));
        setPaymentProfiles(profilesWithIds);
      } catch (error) {
        console.error('Error fetching payment profiles:', error);
      }
    };
  
    // Call the fetchPaymentProfiles function when the component mounts
    fetchPaymentProfiles();
  }, []);

  // State variable to store the selected _id
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to set the selected _id when the eye button is clicked
  const handleViewClick = (_id) => {
    // Store the _id in session storage
    sessionStorage.setItem('selectedId', _id);
    // Set the selected _id in state
    setSelectedId(_id);
    
    // Use navigate within the onClick function
    navigate(`/payment-manager/profiles/view/${_id}`);
  };

  const handleUpdateClick = (_id) => {
    // Store the _id in session storage
    sessionStorage.setItem('selectedId', _id);
    // Set the selected _id in state
    setSelectedId(_id);
    
    // Use navigate within the onClick function
    navigate(`/payment-manager/profiles/update/${_id}`);
  };

  const handlePrint = () => {
    const pdfDoc = (
      <PDF sampleData={paymentProfiles} /> // Pass payment profile data to PDF
    );

    pdf(pdfDoc).toBlob().then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'payment_profiles.pdf';
      a.style.display = 'none';

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    });
  };


  
  const handleDeleteClick = async (_id) => {
    try {
      const response = await fetch(`http://localhost:4444/api/paymentProfile/profiles/${_id}`, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        // Success
        Swal.fire({
          icon: 'success',
          title: 'Profile Deleted',
          showConfirmButton: false,
          timer: 1500, // Display for 1.5 seconds
        });
  
        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1500); // Adjust the delay as needed
      } else if (response.status === 404) {
        // Profile not found
        Swal.fire({
          icon: 'error',
          title: 'Profile not found',
          text: 'The specified profile does not exist.',
        });
      } else {
        // Internal Server Error or other errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the profile. Please try again later.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the profile. Please try again later.',
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
              path: '/profile-mgt/HRmanager/dashboard',
              name: 'Home',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faHome}
                />
              ),
            },
            {
              path: '/attendance-tracker/adminDashboard',
              name: 'Attendance',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendar}
                />
              ),
            },
            {
              path: '/payment-manager/dashboard',
              name: 'Payment',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMoneyBillTransfer}
                />
              ),
            },
            {
              path: '/leave-manager/adminDashboard',
              name: 'Leaves',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendarDays}
                />
              ),
            },
          ],
        },
      ]}
    >
      <>
        <EmployeeNavBar />
        <div className="container">
          <div className="d-flex justify-content-start">
            <h1
              className="text-danger"
              style={{ color: 'red', fontSize: '24px' }}
            >
              Payment Profiles
            </h1>
          </div>
          <div className="d-flex justify-content-end">
          <div className="mr-2">
              <button className="btn btn-danger" onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} /> Print
              </button>
            </div>
            <div className="mr-2">
              <button
                className="btn btn-danger"
                onClick={() => navigate('/payment-manager/profiles/create')}
              >
                <FontAwesomeIcon icon={faPen} /> new profile
              </button>
            </div>
            <div className="mr-2">
              <button className="btn btn-danger" onClick={handleFilter}>
                <FontAwesomeIcon icon={faFilter} /> Filter
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="col-3">
              <form action="">
                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                  <div className="input-group">
                    <input
                      type="search"
                      placeholder="Search by Name"
                      aria-describedby="button-addon1"
                      className="form-control border-0 bg-light"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <div className="input-group-append">
                      <button
                        id="button-addon1"
                        type="submit"
                        className="btn btn-link text-danger"
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {paymentProfiles.length > 0 ? (
          <div className={`table-responsive ${styles.responsiveTable}`}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">Base Salary</th>
                  <th scope="col">Allowances</th>
                  <th scope="col">Daily amount</th>
                  <th scope="col">View</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {paymentProfiles.map((profile) => (
                  <tr key={profile._id}>
                    <th scope="row">{profile.id}</th>
                    <td>{profile.fullName }</td>
                    <td>{profile.employeeID}</td>
                    <td>{profile.email}</td>
                    <td>{profile.base_salary}</td>
                    <td>{profile.allowances}</td>
                    <td>{calculateDailyAmount(profile.base_salary,profile.allowances)}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleViewClick(profile._id)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleUpdateClick(profile._id)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger"
                      onClick={() => handleDeleteClick(profile._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           ) : (
            <p>No payment profiles available.</p>
          )}

          <div className="text-center ">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger mx-3"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
              <button
                className="btn btn-danger mx-3"
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(filteredData.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    </Dashboard>
  )
}

export default PaymentProfileDashboard
