import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const ReportContext = createContext({
  reports: [],
  loading: false,
  error: null,
  setReports: () => {},
  updateReportStatus: () => {},
})

const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:4000/reports')
      .then((response) => {
        setReports(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [])

  const updateReportStatus = (pcode, status) => {
    setReports((prevReports) => prevReports.map((report) => (report.pcode === pcode ? { ...report, status } : report)))
  }

  return (
    <ReportContext.Provider value={{ reports, setReports, updateReportStatus, loading, error }}>
      {children}
    </ReportContext.Provider>
  )
}
export default ReportsProvider
