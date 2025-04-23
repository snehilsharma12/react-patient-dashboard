import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BloodPressureChart from './BloodPressureChart';


function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Fetch the patient data
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://fedskillstest.coalitiontechnologies.workers.dev', {
          auth: {
            username: 'coalition',
            password: 'skills-test',
          },
        });

        setPatients(response.data);

        // select Jessica Taylor if available
        const jessica = response.data.find(patient => patient.name === 'Jessica Taylor');
        if (jessica) {
          setSelectedPatient(jessica);
          console.log(response.data)
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo">
            <span><img src='./assets/TestLogo.png' alt='' /></span>
          </div>
          <nav className="nav-links">
            <a href="#" className="nav-item">
              <span className="icon"><img src={process.env.PUBLIC_URL + '/home.png'} alt='' /></span> Overview
            </a>
            <a href="#" className="nav-item active">
              <span className="icon"><img src={process.env.PUBLIC_URL + '/pat.png'} alt='' /></span> Patients
            </a>
            <a href="#" className="nav-item">
              <span className="icon"><img src={process.env.PUBLIC_URL + '/cal.png'} alt='' /></span> Schedule
            </a>
            <a href="#" className="nav-item">
              <span className="icon"><img src={process.env.PUBLIC_URL + '/msg.png'} alt='' /></span> Message
            </a>
            <a href="#" className="nav-item">
              <span className="icon"><img src={process.env.PUBLIC_URL + '/tra.png'} alt='' /></span> Transactions
            </a>
          </nav>
          <div className="user-info">
            <img
              src={process.env.PUBLIC_URL + '/jose.png'}
              alt="Dr. Jose Simmons"
            />
            <div className="user-details">
              <span className="user-name">Dr. Jose Simmons</span>
              <span className="user-role">General Practitioner</span>
            </div>
            <div className="header-icons">
              <span className="separator"></span>
              <button className="icon-btn settings">
                <span className="icon"><img src={process.env.PUBLIC_URL + '/set.png'} alt='' /></span>
              </button>
              <button className="icon-btn menu">
                <span className="icon">⋮</span>
              </button>
            </div>
          </div>
        </header>


        <div className="content-wrapper">
          {/* Patients Sidebar */}
          <aside className="sidebar">
            <h3>Patients</h3>
            <ul>
              {patients.map((patient) => (
                <li
                  key={patient.name}
                  onClick={() => setSelectedPatient(patient)}
                  className={selectedPatient?.name === patient.name ? 'active' : ''}
                >
                  <img src={patient.profile_picture} alt={`${patient.name}'s avatar`} />
                  <div className="patient-info">
                    <p className="patient-name">{patient.name}</p>
                    <p className="patient-age-gender">{patient.gender}, {patient.age}</p>
                  </div>

                  <div className="patient-options">
                    <button className="options-button">
                      &#8230;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* Diagnosis History and Details */}
          <div className="main-content">
            <section className="diagnosis-history">
              <h3>Diagnosis History</h3>

              <div className="diagnostic-cards">
                {selectedPatient && selectedPatient.diagnosis_history ? (
                  <>
                    <div className='chartbox'>
                      <BloodPressureChart diagnosisHistory={selectedPatient.diagnosis_history} />

                    </div>

                    <div className='threeCards'>

                      <div className="card respR">
                        <img src={process.env.PUBLIC_URL + '/resp.png'} alt='' />
                        <p>Respiratory Rate</p>
                        <h4>{selectedPatient.diagnosis_history[0].respiratory_rate.value} bpm</h4>
                        <p> {selectedPatient.diagnosis_history[0].respiratory_rate.levels}</p>
                      </div>

                      <div className="card ctemp">
                        <img src={process.env.PUBLIC_URL + '/temp.png'} alt='' />
                        <p>Temperature</p>
                        <h4>{selectedPatient.diagnosis_history[0].temperature.value} °F</h4>
                        <p> {selectedPatient.diagnosis_history[0].temperature.levels}</p>
                      </div>
                      <div className="card heartR">
                        <img src={process.env.PUBLIC_URL + '/bpm.png'} alt='' />
                        <p>Heart Rate</p>
                        <h4>{selectedPatient.diagnosis_history[0].heart_rate.value} bpm</h4>
                        <p> {selectedPatient.diagnosis_history[0].heart_rate.levels}</p>
                      </div>
                    </div>

                  </>
                ) : (
                  <p>No Diagnosis History Available</p>
                )}
              </div>
            </section>

            <section className="diagnostic-list">
              <h3>Diagnostic List</h3>
              {selectedPatient && selectedPatient.diagnostic_list ? (
                <table>
                  <thead>
                    <tr>
                      <th>Problem/Diagnosis</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPatient.diagnostic_list.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No Diagnostic List Available</p>
              )}
            </section>
          </div>

          {/* Patient Details and Lab Results */}
          <div className="right-content">
            <section className="details">
              {selectedPatient && (
                <>
                  <img src={selectedPatient.profile_picture} alt={`${selectedPatient.name}'s avatar`} />
                  <h3>{selectedPatient.name}</h3>
                  <div className="detail-item">
                    <img src={process.env.PUBLIC_URL + '/birth.png'} alt="Calendar Icon" />
                    <p>
                      <strong>Date Of Birth</strong><p> {selectedPatient?.date_of_birth}</p>
                    </p>
                  </div>
                  <div className="detail-item">
                    <span className="icon">
                      <img src={process.env.PUBLIC_URL + '/female.png'} alt="Gender Icon" />
                    </span>
                    <p>
                      <strong>Gender</strong><p>{selectedPatient?.gender}</p>
                    </p>
                  </div>
                  <div className="detail-item">
                    <span className="icon">
                      <img src={process.env.PUBLIC_URL + '/phone.png'} alt="Phone Icon" />
                    </span>
                    <p>
                      <strong>Contact Info</strong><p>{selectedPatient?.phone_number}</p>
                    </p>
                  </div>
                  <div className="detail-item">
                    <span className="icon">
                      <img src={process.env.PUBLIC_URL + '/phone.png'} alt="Emergency Icon" />
                    </span>
                    <p>
                      <strong>Emergency Contacts</strong><p>{selectedPatient?.emergency_contact}</p>
                    </p>
                  </div>
                  <div className="detail-item">
                    <span className="icon">
                      <img src={process.env.PUBLIC_URL + '/ins.png'} alt="Insurance Icon" />
                    </span>
                    <p>
                      <strong>Insurance Provider</strong><p>{selectedPatient?.insurance_type}</p>
                    </p>
                  </div>

                  <button><span>Show All Information</span></button>
                </>
              )}
            </section>


            <section className="lab-results">
              <h3>Lab Results</h3>
              {selectedPatient && selectedPatient.lab_results ? (
                <ul>
                  {selectedPatient.lab_results.map((result, index) => (
                    <li key={index}>
                      {result}
                      <button>
                        <img src={process.env.PUBLIC_URL + '/dwn.png'} alt='' />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Lab Results Available</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
