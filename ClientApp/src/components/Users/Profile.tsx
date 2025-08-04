import React, {useState, useEffect} from 'react'
import $ from 'jquery';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5073",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'},
})

export default function Profile() {

    var userid = sessionStorage.getItem('USERID') + "";
    var token = sessionStorage.getItem('TOKEN');

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email,setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [qrcodeurl, setQrcodeUrl] = useState("");
    const [profilepic, setProfilepic] = useState("");
    const [profileMsg, setProfileMsg] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setConfpassword] = useState("");
    
    // const fetchUserData = () => {
    // }    

    useEffect(() => {
        $("#cpwd").hide();
        $("#mfa1").hide();
        $("#mfa2").hide();  
        api.get("/api/getuserbyid/" + userid, { headers: {
            Authorization: `Bearer ${token}`
        }} )
            .then((res) => {
                if (res.data.statuscode === 200) {
                    setProfileMsg(res.data.user.message);
                    setFirstname(res.data.user.firstname);
                    setLastname(res.data.user.lastname);
                    setEmail(res.data.user.email);
                    setMobile(res.data.user.mobile);
                    setProfilepic(res.data.user.profilepic);
                    setQrcodeUrl(res.data.user.qrcodeurl);
                    sessionStorage.setItem('USERPIC', profilepic);
                    return;
                } else {
                    setProfileMsg(res.data.message);
                    return;
                }
              }, (error) => {
                    setProfileMsg(error.message);
                    return;
            });                
        // fetchUserData();
    },[userid,token,profilepic]);

    const submitProfile = (event: any) => {
        event.preventDefault();
        if ($('#chkPwd').is(":checked")) {            
            if (password !== confpassword) {
                setProfileMsg("New Password does not matched.");
                setTimeout(() => {
                    setProfileMsg('');
                }, 3000);
                return;
            }
        }
        const data =JSON.stringify({ lastname: lastname, 
            firstname: firstname, mobile: mobile,
            password: password });

        api.post("/api/updateprofile/" + userid, data, { headers: {
        Authorization: `Bearer ${token}`
        }} )
        .then((res) => {
            if (res.data.statuscode === 200) {
                setProfileMsg(res.data.message);
                window.setTimeout(() => {
                    setPassword("");
                    setConfpassword("");
                    setProfileMsg('');
                }, 3000);
                return;
            } else {
                setProfileMsg(res.data.message);
              window.setTimeout(() => {
                setProfileMsg('');
                }, 3000);
                return;
            }
          }, (error) => {
                setProfileMsg(error.message);
                window.setTimeout(() => {
                    setProfileMsg('');
                }, 3000);
                return;
        });
    }
    
    const changePicture = (event: any) => {
        $("#userpic1").attr('src',URL.createObjectURL(event.target.files[0]));
        $("#userpic2").attr('src',URL.createObjectURL(event.target.files[0]));

        let formdata = new FormData();
        formdata.append('Id', userid);
        formdata.append('Profilepic',event.target.files[0]);

        api.post("/api/uploadpicture", formdata, { headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
        }} )
        .then((res) => {
            if (res.data.statuscode === 200) {
                setProfileMsg(res.data.message);
                window.setTimeout(() => {
                    setProfileMsg('');
                    window.location.reload();
                }, 3000);
                return;
            } else {
                setProfileMsg(res.data.message);
              window.setTimeout(() => {
                setProfileMsg('');
                }, 3000);
                return;
            }
          }, (error) => {
            setProfileMsg(error.message);
                window.setTimeout(() => {
                    setProfileMsg('');
                }, 3000);
                return;
        });
    }

    // const checkboxPassword = (event: any) => {
    //     event.preventDefault();
    //     if (event.target.checked) 
    //     {
    //         $('#chkMfa').prop('checked', false);
    //         $("#cpwd").show();
    //         $("#mfa1").hide();  
    //         $("#mfa2").hide();  
    //         setChkPwd(true);
    //         return;
    //     } 
    //     $("#cpwd").hide();
    //     setChkPwd(false);
    // }

    // const checkboxMFA = (event: any) => {
    //     event.preventDefault();
    //     if (event.target.checked) {
    //         $('#chgPwd').prop('checked', false);
    //         $("#cpwd").hide();
    //         $("#mfa1").show();
    //         $("#mfa2").show();
    //         setChkMfa(true);
    //         return;
    //     } 
    //     $("#mfa1").hide();  
    //     $("#mfa2").hide();                  
    //     setChkMfa(false);
    // }

$( document ).ready(function() {

    $("#chgPwd").change(function() {
        if ($('#chgPwd').is(":checked")) {
            $("#cpwd").show();
            $("#mfa1").hide();  
            $("#mfa2").hide();  
            $('#chkMfa').prop('checked', false);
        } else {
            $("#cpwd").hide();
        }            
    })

    $("#chkMfa").change(function() {
        if ($('#chkMfa').is(":checked")) {
            $("#cpwd").hide();
            $("#mfa1").show();
            $("#mfa2").show();
            $('#chgPwd').prop('checked', false);
        } else {
            $("#mfa1").hide();  
            $("#mfa2").hide();  
        }            
    })
});

    const enableMFA = () => {
        const data =JSON.stringify({ Twofactorenabled: true });
        api.put("/api/enablemfa/" + userid, data, { headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        }} )
        .then((res) => {
            if (res.data.statuscode === 200) {
                setProfileMsg(res.data.message);
                window.setTimeout(() => {
                    setProfileMsg('');
                    window.location.reload();
                }, 3000);
                return;
            } else {
              setProfileMsg(res.data.message);
              window.setTimeout(() => {
                    setProfileMsg('');
                }, 3000);
                return;
            }
          }, (error) => {
                setProfileMsg(error.message);
                window.setTimeout(() => {
                    setProfileMsg('');
                }, 3000);
                return;
        });
    }

    const disableMFA = () => {
        const data =JSON.stringify({ Twofactorenabled: false });
        api.put("/api/enablemfa/" + userid, data, { headers: {
            Authorization: `Bearer ${token}`
        }} )
        .then((res) => {
            if (res.data.statuscode === 200) {
                setProfileMsg(res.data.message);
                window.setTimeout(() => {
                    setProfileMsg('');
                    window.location.reload();
                }, 3000);
                return;
            } else {
                setProfileMsg(res.data.message);
              window.setTimeout(() => {
                    setProfileMsg('');
                }, 3000);
                return;
            }
          }, (error) => {
                setProfileMsg(error.message);
                window.setTimeout(() => {
                    setProfileMsg('');
                }, 3000);
                return;
        });
    }

  return (
<div className="card card-width bs-info-border-subtle">
  <div className="card-header bg-info text-white">
    USER'S PROFILE NO.&nbsp; {userid}
  </div>
  <div className="card-body">

    <form id="profileForm" onSubmit={submitProfile} encType="multipart/form-data" method="POST">
        <div className="row">
            <div className="col">
                <div className="mb-3">
                    <input type="text" required value={firstname} onChange={e => setFirstname(e.target.value)} className="form-control" autoComplete='off'/>
                </div>
                <div className="mb-3">
                    <input type="text" required value={lastname} onChange={e => setLastname(e.target.value)} className="form-control" autoComplete='off'/>
                </div>
                <div className="mb-3">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" readOnly />
                </div>
                <div className="mb-3">
                    <input type="text" required value={mobile} onChange={e => setMobile(e.target.value)} className="form-control" autoComplete='off'/>
                </div>

            </div>
            <div className="col">
                <img id="userpic2" className="usr" src={profilepic} alt=""/>
                <div className="mb-3">
                    <input type="file" onChange={changePicture} className="form-control form-control-sm mt-3" accept=".png, .jpg, .jpeg, .gif"  />
                </div>

            </div>
        </div>

        <div className="row">
            <div className="col">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id='chgPwd' value=""  />
                    <label className="form-check-label" htmlFor="chgPwd">
                        Change Password
                    </label>
                </div>
            </div>
            <div className="col">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="chkMfa"  />
                    <label className="form-check-label" htmlFor="chkMfa">
                        2-Factor Authenticator
                    </label>
                </div>
            </div>
        </div>

        <div className="row">

            <div className="col">
              <div id="cpwd">
                <div className="mb-3">
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} className="form-control" autoComplete='off' />
                </div>
                <div className="mb-3">
                    <input type="text" value={confpassword} onChange={e => setConfpassword(e.target.value)} className="form-control" autoComplete='off' />
                </div>
              </div>
                <div id="mfa1">
                      {
                        qrcodeurl != null ?
                            <img className="qrcode1" src={qrcodeurl} alt="qrcodeurl"/>
                        :
                            <img className="qrcode2" src="http://localhost:5073/resources/images/qrcode.png" alt="QRCODE" />
                      }
                </div>

            </div>
            <div className="col">
                <div id="mfa2">
                        <p className='text-danger'><strong>Requirements</strong></p>
                        <p>You need to install <strong>Google or Microsoft Authenticator</strong> in your Mobile Phone, once installed, click Enable Button below, and <strong>SCAN QR CODE</strong>, next time you login, another dialog window will appear, then enter the <strong>OTP CODE</strong> from your Mobile Phone in order for you to login.</p>
                        <div className="row">
                            <div className="col btn-1">
                                <button onClick={enableMFA} type="button" className="btn btn-primary">Enable</button>
                            </div>
                            <div className="col col-3 btn-2">
                                <button onClick={disableMFA} type="button" className="btn btn-secondary">Disable</button>
                            </div>
                        </div>

                    </div>

            </div>
        </div>

        <button id="save" type="submit" className="btn btn-info text-white">save</button>

    </form>
  </div>
  <div className="card-footer">
    <div className="w-100 text-left text-danger">{profileMsg}</div>
  </div>
</div>

  )
}