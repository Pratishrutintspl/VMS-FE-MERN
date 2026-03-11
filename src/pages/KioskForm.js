import { Box, Paper, Typography, Divider, Stack, TextField, Button, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartment, getDepartmentwiseEmployee } from '../redux/actions/commonActions'
import { sendOTPAction, verifyOTPAction } from '../redux/actions/visitorActions'
function KioskForm() {
  const dispatch = useDispatch()
  const departments = useSelector(state => state.common.departments)
  const employees = useSelector(state => state.common.employees)
  const otpVerified = useSelector((state) => state.visitor);
  console.log("Redux Visitor State", useSelector(state => state.visitor));
  // console.log("response",response)
  // console.log("otpVerified",otpVerified);
  useEffect(() => {
    dispatch(getDepartment())

    console.log(departments);
  }, [dispatch])

  useEffect(() => {
    // alert(otpVerified)


    if (otpVerified === true) {
      setIsVerified(true);
    }
  }, [otpVerified]);
  console.log("departments", departments);

  console.log("employees", employees);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    meetingPerson: "",
    purpose: ""
  })

  const [errors, setErrors] = useState({})
  const [isVerified, setIsVerified] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    // Call employee API when department selected
    if (name === "department") {
      dispatch(getDepartmentwiseEmployee(value));
    }
  };
  // Validate basic fields before sending OTP
  const handleSendOtp = () => {

    let temp = {}

    if (!form.name.trim()) temp.name = "Full name is required"

    if (!form.email) temp.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Invalid email"

    if (!form.mobile) temp.mobile = "Mobile number required"
    else if (!/^[0-9]{10}$/.test(form.mobile))
      temp.mobile = "Enter valid 10 digit mobile"

    setErrors(temp)

    if (Object.keys(temp).length === 0) {

      const payload = {
        // name: form.name,
        email: form.email,
        mobile: form.mobile
      };

      dispatch(sendOTPAction(payload));

      setShowOtp(true);
    }
  }

const handleVerifyOtp = () => {

  if (otp.length !== 6) {
    setErrors({ otp: "OTP must be 6 digits" });
    return;
  }

  const payload = {
     email: form.email,
    mobile: form.mobile,
    otp: otp
  };

  dispatch(verifyOTPAction(payload));

  setErrors({});
};

  // Validate remaining fields before generating pass
  const handleGeneratePass = () => {

    let temp = {}

    if (!form.department) temp.department = "Select department"

    if (!form.meetingPerson) temp.meetingPerson = "Select meeting person"

    if (!form.purpose.trim()) temp.purpose = "Purpose required"

    setErrors(temp)

    if (Object.keys(temp).length === 0) {
      alert("Gate Pass Generated Successfully")
    }
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f5f7fa",
          minHeight: "100vh",
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <Paper
          elevation={4}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: "800px",
            borderRadius: 4
          }}
        >

          <Typography variant="h4" fontWeight="800" color="#1a237e" gutterBottom>
            Visitor Entry
          </Typography>

          <Divider
            sx={{
              mb: 4,
              width: "230px",
              height: "4px",
              bgcolor: "#1a237e",
              borderRadius: 2
            }}
          />

          <Stack spacing={3}>

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              disabled={isVerified}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isVerified}
            />

          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>

            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              disabled={isVerified}
            />
{/* 
            {!isVerified && !showOtp && (
              <Button
                variant="contained"
                onClick={handleSendOtp}
                sx={{
                  px: 4,
                  whiteSpace: 'nowrap',
                  borderRadius: 2
                }}
              >
                Send OTP
              </Button>
            )} */}
            {!isVerified && (
  <>
    {!showOtp ? (
      <Button
        variant="contained"
        onClick={handleSendOtp}
        sx={{
          px: 4,
          whiteSpace: "nowrap",
          borderRadius: 2
        }}
      >
        Send OTP
      </Button>
    ) : (
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleSendOtp}
        sx={{
          px: 4,
          whiteSpace: "nowrap",
          borderRadius: 2
        }}
      >
        Resend OTP
      </Button>
    )}
  </>
)}

          </Stack>
          {showOtp && !isVerified && (
            <Box
              sx={{
                p: 2,
                bgcolor: "#f0f4ff",
                borderRadius: 2,
                display: "flex",
                gap: 2,
                border: "1px dashed #3f51b5",
                mt: 2
              }}
            >
              <TextField
                fullWidth
                label="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={!!errors.otp}
                helperText={errors.otp}
              />

              <Button
                variant="contained"
                color="success"
                onClick={handleVerifyOtp}
                sx={{ borderRadius: 2 }}
              >
                Verify OTP
              </Button>
            </Box>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              select
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              error={!!errors.department}
              helperText={errors.department}
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>

              {departments?.map((dept) => (
                <MenuItem key={dept._id} value={dept._id}>
                  {dept.departmentName}
                </MenuItem>
              ))}
            </TextField>


            <TextField
              fullWidth
              select
              label="Meeting Person"
              name="meetingPerson"
              value={form.meetingPerson}
              onChange={handleChange}
              disabled={!form.department}
            >
              <MenuItem value="">
                <em>Select Meeting Person</em>
              </MenuItem>

              {employees?.map((emp) => (
                <MenuItem key={emp._id} value={emp._id}>
                  {emp.name}
                </MenuItem>
              ))}
            </TextField>

          </Stack>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Purpose of Visit"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            error={!!errors.purpose}
            helperText={errors.purpose}
            sx={{ mt: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={!isVerified}
            onClick={handleGeneratePass}
            sx={{
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              mt: 3,
              borderRadius: 3,
              background: isVerified
                ? "linear-gradient(45deg, #1a237e, #3f51b5)"
                : "#e0e0e0"
            }}
          >
            Generate Gate Pass
          </Button>

        </Paper>
      </Box>
    </>
  )
}

export default KioskForm

