import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import logo from './Logo_of_MAS_Holdings.png'; 

const PDF = ({ sampleData }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#403f3e', 
      color: '#fff', 
    },
    headerLogo: {
      width: 70,
      height: 70,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 2,
      textAlign: 'center',
    },
    headerAddress: {
      fontSize: 12,
      flex: 1,
      textAlign: 'right',
      right: 20
    },
    table: {
      display: 'table',
      width: '100%', 
      backgroundColor: '#f2f2f2',
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCell: {
      borderBottom: '1px solid #ccc',
      padding: 5,
      fontSize: 10,
      fontWeight: 'normal',
      width: '20%', // Adjust the width as needed
    },
    tableHeader: {
      backgroundColor: '#333',
      color: '#fff',
      fontWeight: 'bold',
    },
    footer: {
      fontSize: 12,
      marginTop: 20,
      textAlign: 'center',
      backgroundColor: '#333', 
      color: '#fff', 
    },
    pageNumber: {
      fontSize: 10,
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });

  const pageCount = Math.ceil(sampleData.length / 15);

  return (
    <Document>
      {Array.from({ length: pageCount }, (_, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Image style={styles.headerLogo} src={logo} />
            <Text style={styles.headerText}>MAS Holdings</Text>
            <Text style={styles.headerAddress}>Sri Lanka</Text>
          </View>

          <title>

          </title>

          {/* Table */}
          <View style={styles.table}>
            {/* Table Header */}
            {pageIndex === 0 && (
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Name</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Email</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Employee ID</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Base Salary</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Allowances</Text>
                </View>
                {/* <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Description</Text>
                </View> */}
                {/* Add more headers for other profile details */}
              </View>
            )}

            {/* Table Rows */}
            {sampleData
              .slice(pageIndex * 15, (pageIndex + 1) * 15)
              .map((record) => (
                <View style={styles.tableRow} key={record.id}>
                  <View style={styles.tableCell}>
                    <Text>{record.fullName}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{record.email}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{record.employeeID}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{record.base_salary}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{record.allowances}</Text>
                  </View>
                  {/* <View style={styles.tableCell}>
                    <Text>{profile.description}</Text>
                  </View> */}
                  {/* Add more cells for other profile details */}
                </View>
              ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>This is a system generated report</Text>
            <Text>Copyright HRDev hub</Text>
            <Text style={styles.pageNumber}>
              Page {pageIndex + 1} of {pageCount}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
}

export default PDF;