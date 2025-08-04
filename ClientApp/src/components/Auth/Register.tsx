import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'; 
import React, { useState} from 'react'
import $ from 'jquery';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:7241",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

export function Register() {

  const [firstname, setFirstname]  = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerMsg, setRegisterMsg] = useState<string>("");

  const closeRegistration = () => {
    setRegisterMsg('');
    setFirstname('')
    setLastname('')
    setPassword('')
    setEmail('')
    setUsername('')
    setMobile('')
    $("#registerReset").click();
  }
  
  const submitRegistration = (event: any) => {
    event.preventDefault();
    const data =JSON.stringify({ lastname: lastname, firstname: firstname,email: email, mobile: mobile,
      username: username, password: password });
    api.post("/signup", data)
    .then((res) => {
        if (res.data.statuscode === 200) {
            setRegisterMsg(res.data.message);
            return;
        } else {
          setRegisterMsg(res.data.message);
          window.setTimeout(() => {
            setRegisterMsg('');
          }, 3000);
          return;
        }
      }, (error) => {
            setRegisterMsg(error.message);
            window.setTimeout(() => {
              setRegisterMsg('');
            }, 3000);
          return;
    });

    $("#registerReset").click();
  }

  return (
<div className="modal fade" id="staticRegister" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticRegisterLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-danger">
        <h1 className="modal-title fs-5 text-white" id="staticRegisterLabel"><FontAwesomeIcon icon={faAddressCard}/>&nbsp;Account Registration</h1>
        <button onClick={closeRegistration} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form id="registrationForm" onSubmit={submitRegistration} autoComplete='off'>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <input className="form-control" value={lastname} onChange={e => setLastname(e.target.value)} placeholder="enter Last Name" autoComplete='off' required type="text" />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <input type="text" required className="form-control" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="enter First Name" autoComplete='off' />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <input type="email" required className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="enter Email Address" autoComplete='off'/>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <input type="text" required className="form-control" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="enter Mobile No." autoComplete='off'/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <input type="text" required className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="enter User Name" autoComplete='off'/>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <input type="password" required className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter Password" autoComplete='off'/>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-danger mx-1">register</button>
          <button id="registerReset" type="reset" className="btn btn-danger">reset</button>

        </form>

      </div>
      <div className="modal-footer">
          <div className="w-100 text-left text-danger">{registerMsg}</div>
      </div>
    </div>
  </div>
</div>
  )
}
