// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    lastsevendays: [],
    genderData: [],
    AgeData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCowinDetails()
  }

  getCowinDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)

    if (response.ok === true) {
      const dataone = await response.json()
      console.log(dataone)

      const updatedSevendays = dataone.last_7_days_vaccination.map(
        eachdays => ({
          vaccineDate: eachdays.vaccine_date,
          Dose1: eachdays.dose_1,
          Dose2: eachdays.dose_2,
        }),
      )
      const updatedgender = dataone.vaccination_by_gender.map(eachgender => ({
        count: eachgender.count,
        gender: eachgender.gender,
      }))

      const updatedAge = dataone.vaccination_by_age.map(eachAge => ({
        age: eachAge.age,
        count: eachAge.count,
      }))

      this.setState({
        lastsevendays: updatedSevendays,
        genderData: updatedgender,
        AgeData: updatedAge,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {lastsevendays, genderData, AgeData} = this.state

    return (
      <div className="background-container">
        <div className="flex-container">
          <img
            className="cowin-logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <div>
          <h1>CoWIN Vaccination in India</h1>
          <VaccinationCoverage
            lastsevendays={lastsevendays}
            key={lastsevendays.vaccineDate}
          />
          <VaccinationByGender
            genderData={genderData}
            key={genderData.gender}
          />
          <VaccinationByAge AgeData={AgeData} key={AgeData.age} />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default CowinDashboard
