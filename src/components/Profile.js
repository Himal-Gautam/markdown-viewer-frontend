import React, { Component, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {ReactSession} from "react-client-session";
import { toast } from "react-toastify";
import { API } from "../global";
// class Profile extends Component {
//   constructor(props) {
//     super(props);
//     let auth = getAuth();
//     console.log(auth);
//     this.state = {
//       name: auth.currentUser ? auth.currentUser.displayName : null,
//       email: auth.currentUser ? auth.currentUser.email : null,
//       changeDetails: false,
//     };
//   }

//   render() {
//     let { name, email, changeDetails } = this.state;
//     const { navigate } = this.props;

//     const onSubmit = async () => {
//       try {
//         if (auth.currentUser.displayName !== name) {
//           // update display name in firebase
//           await updateProfile(auth.currentUser, { displayName: name });

//           // update in fs
//           const userRef = doc(db, "users", auth.currentUser.uid);
//           await updateDoc(userRef, { name });
//           toast.success('Profile updated successfully')
//         }
//       } catch (error) {
//         toast.error('Could not update profile details')
//       }
//     };

//     // const onChange = (e) => {
//     //   this.setState({e.target.id: e.target.value})
//     // }
// }

function Profile() {
  const navigate = navigate();
  const [changeDetails, setchangeDetails] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [user, setuser] = useState({});

  (async()=>{
    try {
      setuser(await fetch(`${API}/users/me`),{
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Authorization": ReactSession.get("token"),
        }
      });
      setname(user.name)
      setemail(user.email)
    } catch (error) {
      navigate('/log-in')
    }
  })()
 
  const onSubmit = async () => {
    try {
      if (user.name !== name) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  return (
    <div>hello
      {/* <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              this.setState({ changeDetails: !changeDetails });
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              disabled={!changeDetails}
              value={name}
              onChange={(e) => setname({ name: e.target.value })}
            />
            <input
              type="text"
              id="email"
              disabled={!changeDetails}
              value={email}
            />
          </form>
        </div>
      </main> */}
    </div>
  );
}

export default Profile;
