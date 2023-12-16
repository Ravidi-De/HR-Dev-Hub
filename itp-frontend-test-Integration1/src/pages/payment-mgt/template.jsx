import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faCalendar, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import {Dashboard, EmployeeNavBar} from "../../../components/common";


const FinancialDashboard = () => {
    return (
      <Dashboard
      sectionLinks={[
        {
          section: 'Menu',
          children: [
            {
              path: '/',
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
          ],
        },
      ]}
    >
      <>
      <EmployeeNavBar/>
        {/* Add the content here */}
        </>
        </Dashboard>
    );
}

export default FinancialDashboard;