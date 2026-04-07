import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Login.css";

const Login: React.FC = () => {
  // 🔐 Login states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // 🔥 Forgot password states
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // 🔐 LOGIN FUNCTION
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      toast.success("Login Successful ✅");

      // 🔥 Redirect
      window.location.href = "/courses";

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="container">
      <h1 className="title">CourseFlow</h1>
      <p className="subtitle">Online Course Content Manager</p>

      <form className="card" onSubmit={handleLogin}>
        <h2>Sign In</h2>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>

        <p className="message">{message}</p>

        {/* 🔥 FORGOT PASSWORD BUTTON */}
        <p
          className="forgot"
          onClick={() => {
            setShowPopup(true);
            setStep(1);
          }}
        >
          Forgot Password?
        </p>
      </form>

      {/* 🔥 POPUP */}
      {showPopup && (
        <div className="modal">
          <div className="modal-box">

            <h3>Reset Password 🔐</h3>

            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <>
                <input
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  onClick={async () => {
                    try {
                      await axios.post(
                        "http://localhost:5000/api/auth/send-otp",
                        { email }
                      );

                      toast.success("OTP sent to your email 📧");
                      setStep(2);
                    } catch (err: any) {
                      toast.error(err.response?.data?.message);
                    }
                  }}
                >
                  Send OTP
                </button>
              </>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <>
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  onClick={async () => {
                    try {
                      await axios.post(
                        "http://localhost:5000/api/auth/verify-otp",
                        { email, otp }
                      );

                      toast.success("OTP verified ✅");
                      setStep(3);
                    } catch (err: any) {
                      toast.error(err.response?.data?.message);
                    }
                  }}
                >
                  Verify OTP
                </button>
              </>
            )}

            {/* STEP 3: RESET PASSWORD */}
            {step === 3 && (
              <>
                <input
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  onClick={async () => {
                    try {
                      await axios.post(
                        "http://localhost:5000/api/auth/reset-password-otp",
                        { email, newPassword }
                      );

                      toast.success("Password updated successfully 🎉");

                      setShowPopup(false);
                      setStep(1);
                      setOtp("");
                      setNewPassword("");
                    } catch (err: any) {
                      toast.error(err.response?.data?.message);
                    }
                  }}
                >
                  Reset Password
                </button>
              </>
            )}

            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Login;