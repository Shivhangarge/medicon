import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import user1 from "../../../src/images/dcard.png";
import swal from "sweetalert";
import passwordValidation from "./PasswordValidation";
import Footer2 from "../../Footer2";


function ResetPassDoctor() {
  const [user, setUser] = useState({
    email: sessionStorage.getItem("email"),
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(passwordValidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios
        .put("http://localhost:8081/Doctor/resetpassword", user)
        .then((resp) => {
          swal({
            title: "Success!",
            text: "Password updated successfully !",
            icon: "success",
            button: "OK",
          });
          sessionStorage.clear();
          navigate("/Dlogin");
        })
        .catch((error) => {
          console.log("Error", error);
          //alert("Invalid username or password")
          swal({
            title: "Error!",
            text: "Password update failed",
            icon: "error",
            button: "OK",
          });
        });
    } else {
      setUser({ ...user, [user.password]: "", [user.cpassword]: "" });
    }
  }, [errors]);

  return (
    <div className="container-fluid w-50 mt-5 login-component">
      <div className="row shadow bg-transparent border rounded">
        <div className="col-4 ">
          <img
            src={user1}
            className="rounded-start img-fluid mt-5"
            style={{ width: "300px" }}
          ></img>
        </div>

        <div className="col-8">
          <div className="border border-0 rounded p-2">
            <h2 className="fw-bold mb-2 mt-2 text-uppercase">
              {" "}
              RESET PASSWORD
            </h2>

            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    className="form-control form-control-sm"
                    placeholder="********"
                  />
                  {errors.password && (
                    <medium className="text-danger float-right">
                      {errors.password}
                    </medium>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={handleInput}
                    placeholder="********"
                  />
                  {errors.cpassword && (
                    <medium className="text-danger float-right">
                      {errors.cpassword}
                    </medium>
                  )}
                </div>
                <button className="btn btn-primary float-center">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer2/>
    </div>
  );
}

export default ResetPassDoctor;
