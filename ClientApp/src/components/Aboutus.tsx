import React, { Component } from 'react'

export class Aboutus extends Component {
  static displayName = Aboutus.name;

  render() {
    return (
<div className="card mt-3 mb-3">
  <div className="card-header bg-dark">
    <h1 className='text-light'>About Us</h1>
  </div>
  <div className="card-body">
    <h5 className="card-title">Overview Profile</h5>
    <p className="card-text">
    Wincor Nixdorf was a German corporation that provided hardware, software, and services for retail and retail banking. It was primarily involved in the sale, manufacture, installation, and service of self-service transaction systems (like ATMs), retail banking equipment, lottery terminals, postal terminals, and related software and services. The company was acquired by Diebold in 2016      
    </p>
    <p><strong>Core Business:</strong></p>

    <h6>Here's a more detailed breakdown:</h6>
    <p>
    Wincor Nixdorf focused on optimizing business processes, particularly in customer interfaces, using information technology. 
    </p>

    <h6><strong>Key Products:</strong></h6>
    <p>
    They provided solutions for cash management in retail, including front and back office applications, and developed systems for various sectors like healthcare, telecom, and payment solutions. 
    </p>
    <h6><strong>Acquisition: </strong></h6>
    <p>Diebold Nixdorf, a global leader in financial and retail technology, acquired Wincor Nixdorf in 2016.</p>
    <h6><strong>Global Presence:</strong></h6>
    <p>
    Wincor Nixdorf had a strong international presence, with subsidiaries like Diebold Nixdorf Systems GmbH.
    </p>
    <h6><strong>Innovation: </strong></h6>
    <p>They were involved in developing innovative solutions like blockchain-based ATM systems and user-friendly payment platforms. </p>
    <a href="#" className="btn btn-primary">More Details</a>
  </div>
</div>
      )
  }
}
