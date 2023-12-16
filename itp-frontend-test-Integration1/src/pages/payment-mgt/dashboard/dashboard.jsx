import React from 'react'

import { useState, useEffect } from 'react'
import { PDFDocument, rgb } from 'pdf-lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToFile } from '@fortawesome/free-solid-svg-icons'
import { EmployeeNavBar } from '../../../components/common'
import { Dashboard } from '../../../components/common'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import { Chart } from 'react-google-charts'
import PieChart from '../component/charts/PieChart'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import {
  faArrowRightLong,
  faCalendar,
  faMoneyBillTransfer,
  faEnvelopeOpenText,
  faCalendarDays 
} from '@fortawesome/free-solid-svg-icons'
export const databar = [
  ['Element', 'Density', { role: 'style' }],
  ['HR', 8.94, '#b87333'],
  ['Marketing', 10.49, 'silver'],
  ['IT R&D', 19.3, 'gold'],
  ['Engineering', 21.45, 'color: #e5e4e2'],
  ['Sales', 15.34, 'color: #e624e2'],
]

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const labels = ['HR', 'IT R&D', 'Marketing', 'Sales', 'Engineering']

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}
export const data = {
  labels,
  datasets: [
    {
      label: 'Income',
      data: [20000, 43500, 28000, 32000, 56000],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const exportChartAsImage = () => {
  // Export the chart as an image
  const chartCanvas = document.getElementById('myChart') // Replace 'myChart' with the actual chart ID
  const chartImage = new Image(chartCanvas.toDataURL('image/png'))
  return chartImage
}

const FinancialDashboard = () => {
  const [rowsData, setRowsData] = useState([]) // You should initialize this with your data

  const Header = () => (
    <View style={styles.header}>
      <Text>Financial Report - Company XYZ</Text>
    </View>
  );
  
  const Footer = () => (
    <View style={styles.footer}>
      <Text>Page </Text>
      <Text render={({ pageNumber, totalPages }) => <Text>{pageNumber} / {totalPages}</Text>} />
    </View>
  );
  
  const generatePdf = () => {
    const chartImage = exportChartAsImage();
  
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 30,
      },
      header: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 18,
      },
      chartImage: {
        width: 400,
        height: 300,
      },
      additionalText: {
        fontSize: 16,
        marginTop: 20,
      },
      footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 12,
      },
    });
  
    const pdfDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <Header />
          <Image src={chartImage} style={styles.chartImage} />
          <Text style={styles.additionalText}>Additional text and data can go here.</Text>
          <Footer />
        </Page>
      </Document>
    );
  
    return pdfDocument;
  };
  
  const createPdf = () => {
    const pdfDocument = generatePdf();
  
    const blob = PDFViewer.renderToBlob(pdfDocument);
    const url = URL.createObjectURL(blob);
  
    // Open the PDF in a new tab
    window.open(url);
  };


  const [isHovered, setIsHovered] = useState(false)

  const textStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    color: isHovered ? 'darkred' : 'black',
  }

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
        <div className="row">
          <div className="col-md-12 order-md-2">
            <div className="container">
              <h2
                style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}
              >
                Financial report of the month
              </h2>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-center mt-5">
                    <div
                      className="col-10 p-5"
                      style={{
                        border: 'solid',
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: '#A9A9A9',
                      }}
                    >
                      <div className="d-flex justify-content-center">
                        <Bar options={options} data={data} />
                      </div>
                      <p
                        style={textStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        Salary distributions
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 d-flex justify-content-center">
                    <div
                      className="col-8 p1"
                      style={{
                        borderRadius: 40,
                        borderWidth: 2,
                        borderColor: '#C0C0C0',
                        backgroundColor: '#F5F5F5',
                      }}
                    >
                      <PieChart />
                      <p
                        style={textStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        Average attendance of an employee
                      </p>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    <div
                      className="col-8 p1"
                      style={{
                        borderRadius: 40,
                        borderWidth: 2,
                        borderColor: '#C0C0C0',
                        backgroundColor: '#F5F5F5',
                      }}
                    >
                      <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
                        data={databar}
                      />
                      <p
                        style={textStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        Overal attendance of departments
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-between mt-4">
                  <div class="col-4">
                    <a
                      href="/payment-manager/profiles"
                      class="btn btn-danger btn-lg active"
                      role="button"
                      aria-pressed="true"
                      onClick={'/payment-manager/profiles'}
                    >
                      Payment Profiles
                      <FontAwesomeIcon
                        icon={faArrowRightLong}
                        style={{ fontSize: 15 }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Dashboard>
  )
}

export default FinancialDashboard
