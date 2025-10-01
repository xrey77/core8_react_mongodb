import React,{useState} from 'react'
import $ from 'jquery';
import axios from 'axios';

const api = axios.create({
   baseURL: "https://localhost:7241",
   headers: {'Accept': 'application/json',
             'Content-Type': 'application/json'}
})

export default function Mfa() {
  let userId = sessionStorage.getItem('USERID');
  const [otpcode, setOtpcode] = useState<string>("");
  const  [otpMessage, setOtpMessage] = useState<string>("");

  const closeMfa = () =>{
    setOtpMessage('');
    setOtpMessage('');
    $("#mfaReset").click();
  }

  const submitOTP = (event: any) => {
    event.preventDefault();
    const data =JSON.stringify({ id: userId, otp: otpcode });
    api.post("/validateotp", data)
    .then((res) => {
          setOtpMessage(res.data.message);
          sessionStorage.setItem("USERNAME", res.data.username);
          window.setTimeout(() => {
            setOtpMessage('');
            $("#mfaReset").click();
            window.location.reload();
          }, 3000);
      }, (error: any) => {
            setOtpMessage(error.response.data.message);
            window.setTimeout(() => {
              setOtpMessage('');
            }, 3000);
            return;
    });    
  }

  return (
<div className="modal fade" id="staticMfa" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticMfaLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-warning">
        <h1 className="modal-title fs-5 text-white" id="staticMfaLabel">2-Factor Authenticator</h1>
        <button onClick={closeMfa} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form id="mfaForm" onSubmit={submitOTP} autoComplete='off'>
          <div className="mb-3">
            <input type="number" maxLength={6} required className="form-control" value={otpcode} onChange={e => setOtpcode(e.target.value)} placeholder="enter 6 digits OTP Code" autoComplete='off'/>
        </div>
        <button type="submit" className="btn btn-warning mx-2">submit</button>
        <button id="mfaReset" type="reset" className="btn btn-warning">reset</button>

        </form>
      </div>
      <div className="modal-footer">
        <div id="mfaMsg" className="w-100 text-left text-danger">{otpMessage}</div>
      </div>
    </div>
  </div>
</div>    
  )
}

