// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   Card,
// //   TextField,
// //   Button,
// //   Typography,
// //   InputAdornment,
// //   IconButton,
// //   Alert,
// //   Divider,
// // } from '@mui/material';
// // import {
// //   Email as EmailIcon,
// //   Lock as LockIcon,
// //   Visibility,
// //   VisibilityOff,
// // } from '@mui/icons-material';
// // import { useNavigate } from 'react-router-dom';

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setIsLoading(true);

// //     if (!email || !password) {
// //       setError('Please enter both email and password');
// //       setIsLoading(false);
// //       return;
// //     }

// //     setTimeout(() => {
// //       localStorage.setItem('authToken', 'fake-jwt-token');
// //       localStorage.setItem('userData', JSON.stringify({ email }));
// //       navigate('/');
// //       setIsLoading(false);
// //     }, 800);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: '100vh',
// //         display: 'flex',
// //         flexDirection: { xs: 'column', md: 'row' },
// //       }}
// //     >
      

// //       {/* RIGHT LOGIN SECTION */}
// //       <Box
// //         sx={{
// //           flex: 1,
// //           display: 'flex',
// //           justifyContent: 'center',
// //           alignItems: 'center',
// //           p: 3,
// //         }}
// //       >
// //         <Card
// //           sx={{
// //             width: '100%',
// //             maxWidth: 460,
// //             p: { xs: 3, sm: 5 },
// //             borderRadius: 4,
// //             boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
// //             background: 'rgba(255,255,255,0.98)',
// //           }}
// //         >
// //           <Box textAlign="center" mb={4}>
// //             <Typography variant="h5" fontWeight={700}>
// //               Welcome Back 👋
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary">
// //               Sign in to access your CRM dashboard
// //             </Typography>
// //           </Box>

// //           {error && (
// //             <Alert severity="error" sx={{ mb: 3 }}>
// //               {error}
// //             </Alert>
// //           )}

// //           <form onSubmit={handleSubmit}>
// //             <Box display="flex" flexDirection="column" gap={3}>
// //               <TextField
// //                 fullWidth
// //                 label="Email Address"
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">
// //                       <EmailIcon color="primary" />
// //                     </InputAdornment>
// //                   ),
// //                 }}
// //                 sx={{
// //                   '& .MuiOutlinedInput-root': {
// //                     borderRadius: 3,
// //                   },
// //                 }}
// //               />

// //               <TextField
// //                 fullWidth
// //                 label="Password"
// //                 type={showPassword ? 'text' : 'password'}
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">
// //                       <LockIcon color="primary" />
// //                     </InputAdornment>
// //                   ),
// //                   endAdornment: (
// //                     <InputAdornment position="end">
// //                       <IconButton onClick={() => setShowPassword(!showPassword)}>
// //                         {showPassword ? <VisibilityOff /> : <Visibility />}
// //                       </IconButton>
// //                     </InputAdornment>
// //                   ),
// //                 }}
// //                 sx={{
// //                   '& .MuiOutlinedInput-root': {
// //                     borderRadius: 3,
// //                   },
// //                 }}
// //               />

// //               <Button
// //                 type="submit"
// //                 variant="contained"
// //                 fullWidth
// //                 disabled={isLoading}
// //                 sx={{
// //                   py: 1.7,
// //                   borderRadius: 3,
// //                   fontWeight: 700,
// //                   fontSize: 16,
// //                   textTransform: 'none',
// //                   background:
// //                     'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
// //                   boxShadow: '0 10px 25px rgba(37,99,235,0.4)',
// //                   '&:hover': {
// //                     transform: 'translateY(-2px)',
// //                     boxShadow: '0 15px 35px rgba(37,99,235,0.5)',
// //                   },
// //                 }}
// //               >
// //                 {isLoading ? 'Signing In...' : 'Sign In'}
// //               </Button>
// //             </Box>
// //           </form>

// //           <Divider sx={{ my: 4 }} />

// //           <Typography
// //             variant="caption"
// //             display="block"
// //             textAlign="center"
// //             color="text.secondary"
// //           >
// //             Secure Login • Enterprise Grade CRM System
// //           </Typography>
// //         </Card>
// //       </Box>
// //     </Box>
// //   );
// // }




// // // ===================================================================
// // // MINIMAL FIX: Login.js
// // // This version works WITHOUT AuthService or AuthContext
// // // Just fixes the visual issue and changes email to username
// // // ===================================================================

// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   Card,
// //   TextField,
// //   Button,
// //   Typography,
// //   InputAdornment,
// //   IconButton,
// //   Alert,
// //   Divider,
// // } from '@mui/material';
// // import {
// //   Person as PersonIcon,
// //   Lock as LockIcon,
// //   Visibility,
// //   VisibilityOff,
// //   HomeWork as HomeWorkIcon,
// // } from '@mui/icons-material';
// // import { useNavigate } from 'react-router-dom';

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const [username, setUsername] = useState(''); // CHANGED from email
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setIsLoading(true);

// //     if (!username || !password) {
// //       setError('Please enter both username and password');
// //       setIsLoading(false);
// //       return;
// //     }

// //     // Simple validation for demo
// //     // In production, this will call your AuthService
// //     setTimeout(() => {
// //       localStorage.setItem('authToken', 'fake-jwt-token');
// //       localStorage.setItem('userData', JSON.stringify({ 
// //         username,
// //         full_name: username.charAt(0).toUpperCase() + username.slice(1),
// //         email: `${username}@prometheus.com`,
// //         department: 'Sales',
// //         role: 'sales_rep'
// //       }));
// //       navigate('/');
// //       setIsLoading(false);
// //     }, 800);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: '100vh',
// //         display: 'flex',
// //         flexDirection: { xs: 'column', md: 'row' },
// //       }}
// //     >

// //       {/* RIGHT LOGIN SECTION */}
// //       <Box
// //         sx={{
// //           flex: 1,
// //           display: 'flex',
// //           justifyContent: 'center',
// //           alignItems: 'center',
// //           p: 3,
// //           backgroundColor: '#F8FAFC', // ADDED background color
// //         }}
// //       >
// //         <Card
// //           sx={{
// //             width: '100%',
// //             maxWidth: 460,
// //             p: { xs: 3, sm: 5 },
// //             borderRadius: 4,
// //             boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
// //             background: 'rgba(255,255,255,0.98)',
// //           }}
// //         >
// //           <Box textAlign="center" mb={4}>
// //             <Typography variant="h5" fontWeight={700}>
// //               Welcome Back 👋
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary">
// //               Sign in to access your CRM dashboard
// //             </Typography>
// //           </Box>

// //           {error && (
// //             <Alert severity="error" sx={{ mb: 3 }}>
// //               {error}
// //             </Alert>
// //           )}

// //           <form onSubmit={handleSubmit}>
// //             <Box display="flex" flexDirection="column" gap={3}>
// //               {/* USERNAME FIELD - CHANGED FROM EMAIL */}
// //               <TextField
// //                 fullWidth
// //                 label="Username"
// //                 type="text"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 placeholder="Enter your username"
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">
// //                       <PersonIcon color="primary" />
// //                     </InputAdornment>
// //                   ),
// //                 }}
// //                 sx={{
// //                   '& .MuiOutlinedInput-root': {
// //                     borderRadius: 3,
// //                   },
// //                 }}
// //               />

// //               <TextField
// //                 fullWidth
// //                 label="Password"
// //                 type={showPassword ? 'text' : 'password'}
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 placeholder="Enter your password"
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">
// //                       <LockIcon color="primary" />
// //                     </InputAdornment>
// //                   ),
// //                   endAdornment: (
// //                     <InputAdornment position="end">
// //                       <IconButton onClick={() => setShowPassword(!showPassword)}>
// //                         {showPassword ? <VisibilityOff /> : <Visibility />}
// //                       </IconButton>
// //                     </InputAdornment>
// //                   ),
// //                 }}
// //                 sx={{
// //                   '& .MuiOutlinedInput-root': {
// //                     borderRadius: 3,
// //                   },
// //                 }}
// //               />

// //               <Button
// //                 type="submit"
// //                 variant="contained"
// //                 fullWidth
// //                 disabled={isLoading}
// //                 sx={{
// //                   py: 1.7,
// //                   borderRadius: 3,
// //                   fontWeight: 700,
// //                   fontSize: 16,
// //                   textTransform: 'none',
// //                   background:
// //                     'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
// //                   boxShadow: '0 10px 25px rgba(37,99,235,0.4)',
// //                   '&:hover': {
// //                     transform: 'translateY(-2px)',
// //                     boxShadow: '0 15px 35px rgba(37,99,235,0.5)',
// //                   },
// //                 }}
// //               >
// //                 {isLoading ? 'Signing In...' : 'Sign In'}
// //               </Button>
// //             </Box>
// //           </form>

// //           <Divider sx={{ my: 4 }} />

// //           <Typography
// //             variant="caption"
// //             display="block"
// //             textAlign="center"
// //             color="text.secondary"
// //             sx={{ mt: 3 }}
// //           >
// //             Secure Login • Enterprise Grade CRM System
// //           </Typography>
// //         </Card>
// //       </Box>
// //     </Box>
// //   );
// // }









// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   TextField,
//   Button,
//   Typography,
//   InputAdornment,
//   IconButton,
//   Alert,
//   Divider,
// } from '@mui/material';
// import {
//   Person as PersonIcon,
//   Lock as LockIcon,
//   Visibility,
//   VisibilityOff,
//   HomeWork as HomeWorkIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!username || !password) {
//       setError('Please enter both username and password');
//       setIsLoading(false);
//       return;
//     }

//     // Simple validation for demo
//     // In production, this will call your AuthService
//     setTimeout(() => {
//       localStorage.setItem('authToken', 'fake-jwt-token');
//       localStorage.setItem('userData', JSON.stringify({ 
//         username,
//         full_name: username.charAt(0).toUpperCase() + username.slice(1),
//         email: `${username}@prometheus.com`,
//         department: 'Sales',
//         role: 'sales_rep'
//       }));
//       navigate('/');
//       setIsLoading(false);
//     }, 800);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: { xs: 'column', md: 'row' },
//       }}
//     >

//       {/* RIGHT LOGIN SECTION */}
//       <Box
//         sx={{
//           flex: 1,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           p: 3,
//           backgroundColor: '#F8FAFC',
//         }}
//       >
//         <Card
//           sx={{
//             width: '100%',
//             maxWidth: 460,
//             p: { xs: 3, sm: 5 },
//             borderRadius: 4,
//             boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
//             background: 'rgba(255,255,255,0.98)',
//           }}
//         >
//           <Box textAlign="center" mb={4}>
//             <Typography variant="h5" fontWeight={700}>
//               Welcome Back 👋
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Sign in to access your CRM dashboard
//             </Typography>
//           </Box>

//           {error && (
//             <Alert severity="error" sx={{ mb: 3 }}>
//               {error}
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit}>
//             <Box display="flex" flexDirection="column" gap={3}>
//               {/* USERNAME FIELD */}
//               <TextField
//                 fullWidth
//                 label="Username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 3,
//                   },
//                 }}
//               />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setShowPassword(!showPassword)}>
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 3,
//                   },
//                 }}
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 disabled={isLoading}
//                 sx={{
//                   py: 1.7,
//                   borderRadius: 3,
//                   fontWeight: 700,
//                   fontSize: 16,
//                   textTransform: 'none',
//                   background:
//                     'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
//                   boxShadow: '0 10px 25px rgba(37,99,235,0.4)',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 15px 35px rgba(37,99,235,0.5)',
//                   },
//                 }}
//               >
//                 {isLoading ? 'Signing In...' : 'Sign In'}
//               </Button>
//             </Box>
//           </form>

//           <Divider sx={{ my: 4 }} />

//           <Typography
//             variant="caption"
//             display="block"
//             textAlign="center"
//             color="text.secondary"
//             sx={{ mt: 3 }}
//           >
//             Secure Login • Enterprise Grade CRM System
//           </Typography>
//         </Card>
//       </Box>
//     </Box>
//   );
// }



// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   TextField,
//   Button,
//   Typography,
//   InputAdornment,
//   IconButton,
//   Alert,
//   Divider,
//   Collapse,
//   Paper,
//   Stack,
// } from '@mui/material';
// import {
//   Person as PersonIcon,
//   Lock as LockIcon,
//   Visibility,
//   VisibilityOff,
//   Info as InfoIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { AuthService, getMockUsers } from '../data/authService';

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showTestAccounts, setShowTestAccounts] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     if (!username || !password) {
//       setError('Please enter both username and password');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Step 1: Authenticate and get token
//       const { token } = await AuthService.login(username, password);
      
//       // Step 2: Store token
//       localStorage.setItem('authToken', token);
      
//       // Step 3: Get user info
//       const userData = await AuthService.getUserInfo(username);
      
//       // Step 4: Store user data
//       localStorage.setItem('userData', JSON.stringify(userData));
      
//       // Step 5: Update AuthContext
//       login(userData);
      
//       // Step 6: Navigate to dashboard
//       navigate('/');
      
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.error || 'Login failed. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   // Quick login helper for testing
//   const quickLogin = async (testUsername, testPassword) => {
//     setUsername(testUsername);
//     setPassword(testPassword);
    
//     // Trigger form submission after a brief delay
//     setTimeout(() => {
//       const form = document.querySelector('form');
//       if (form) {
//         form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
//       }
//     }, 100);
//   };

//   const testAccounts = getMockUsers();

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F8FAFC',
//         p: 3,
//       }}
//     >
//       <Box sx={{ width: '100%', maxWidth: 460 }}>
//         <Card
//           sx={{
//             width: '100%',
//             p: { xs: 3, sm: 5 },
//             borderRadius: 4,
//             boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
//             background: 'rgba(255,255,255,0.98)',
//           }}
//         >
//           {/* Header */}
//           <Box textAlign="center" mb={4}>
//             <Typography 
//               variant="h4" 
//               fontWeight={700}
//               sx={{
//                 background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 mb: 1,
//               }}
//             >
//               Prometheus CRM
//             </Typography>
//             <Typography variant="h5" fontWeight={700} gutterBottom>
//               Welcome Back 👋
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Sign in to access your CRM dashboard
//             </Typography>
//           </Box>

//           {/* Error Alert */}
//           {error && (
//             <Alert severity="error" sx={{ mb: 3 }}>
//               {error}
//             </Alert>
//           )}

//           {/* Login Form */}
//           <form onSubmit={handleSubmit}>
//             <Box display="flex" flexDirection="column" gap={3}>
//               {/* USERNAME FIELD */}
//               <TextField
//                 fullWidth
//                 label="Username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 3,
//                   },
//                 }}
//               />

//               {/* PASSWORD FIELD */}
//               <TextField
//                 fullWidth
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon color="primary" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setShowPassword(!showPassword)}>
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 3,
//                   },
//                 }}
//               />

//               {/* LOGIN BUTTON */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 disabled={isLoading}
//                 sx={{
//                   py: 1.7,
//                   borderRadius: 3,
//                   fontWeight: 700,
//                   fontSize: 16,
//                   textTransform: 'none',
//                   background:
//                     'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
//                   boxShadow: '0 10px 25px rgba(37,99,235,0.4)',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 15px 35px rgba(37,99,235,0.5)',
//                   },
//                 }}
//               >
//                 {isLoading ? 'Signing In...' : 'Sign In'}
//               </Button>
//             </Box>
//           </form>

//           <Divider sx={{ my: 4 }} />

//           <Typography
//             variant="caption"
//             display="block"
//             textAlign="center"
//             color="text.secondary"
//           >
//             Secure Login • Enterprise Grade CRM System
//           </Typography>
//         </Card>

//         {/* TEST ACCOUNTS SECTION */}
//         <Box sx={{ mt: 3 }}>
//           <Button
//             fullWidth
//             variant="outlined"
//             startIcon={<InfoIcon />}
//             onClick={() => setShowTestAccounts(!showTestAccounts)}
//             sx={{
//               borderRadius: 3,
//               textTransform: 'none',
//               fontWeight: 600,
//               borderColor: '#E5E7EB',
//               color: '#6B7280',
//               '&:hover': {
//                 borderColor: '#2563EB',
//                 backgroundColor: '#EFF6FF',
//               },
//             }}
//           >
//             {showTestAccounts ? 'Hide Test Accounts' : 'Show Test Accounts'}
//           </Button>

//           <Collapse in={showTestAccounts}>
//             <Paper
//               elevation={0}
//               sx={{
//                 mt: 2,
//                 p: 3,
//                 backgroundColor: '#F8FAFC',
//                 borderRadius: 3,
//                 border: '1px solid #E5E7EB',
//               }}
//             >
//               <Typography variant="subtitle2" fontWeight={700} gutterBottom>
//                 Test Accounts (Development Only)
//               </Typography>
//               <Typography variant="caption" color="text.secondary" display="block" mb={2}>
//                 Click any account to auto-fill the login form
//               </Typography>

//               <Stack spacing={1.5}>
//                 {testAccounts.map((account) => (
//                   <Button
//                     key={account.username}
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     onClick={() => quickLogin(account.username, account.password)}
//                     sx={{
//                       justifyContent: 'flex-start',
//                       textTransform: 'none',
//                       borderRadius: 2,
//                       px: 2,
//                       py: 1.5,
//                       borderColor: '#E5E7EB',
//                       '&:hover': {
//                         backgroundColor: '#EEF2FF',
//                         borderColor: '#2563EB',
//                       },
//                     }}
//                   >
//                     <Box sx={{ textAlign: 'left', width: '100%' }}>
//                       <Typography variant="body2" fontWeight={600}>
//                         {account.full_name}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {account.department} • {account.role.replace(/_/g, ' ')}
//                       </Typography>
//                     </Box>
//                   </Button>
//                 ))}
//               </Stack>
//             </Paper>
//           </Collapse>
//         </Box>
//       </Box>
//     </Box>
//   );
// }



import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Collapse,
  Paper,
  Stack,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthService, getMockUsers } from '../data/authService';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Authenticate and get token
      const { token } = await AuthService.login(username, password);
      
      // Step 2: Store token
      localStorage.setItem('authToken', token);
      
      // Step 3: Get user info
      const userData = await AuthService.getUserInfo(username);
      
      // Step 4: Store user data
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Step 5: Update AuthContext
      login(userData);
      
      // Step 6: Navigate to dashboard
      navigate('/');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.error || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Quick login helper for testing
  const quickLogin = async (testUsername, testPassword) => {
    setUsername(testUsername);
    setPassword(testPassword);
    
    // Trigger form submission after a brief delay
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  const testAccounts = getMockUsers();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        p: 3,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 460 }}>
        <Card
          sx={{
            width: '100%',
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            background: 'rgba(255,255,255,0.98)',
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography 
              variant="h4" 
              fontWeight={700}
              sx={{
                background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Prometheus CRM
            </Typography>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Welcome Back 👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your CRM dashboard
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* USERNAME FIELD */}
              <TextField
                fullWidth
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                }}
              />

              {/* PASSWORD FIELD */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                }}
              />

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.7,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: 16,
                  textTransform: 'none',
                  background:
                    'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                  boxShadow: '0 10px 25px rgba(37,99,235,0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(37,99,235,0.5)',
                  },
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>
          </form>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            color="text.secondary"
          >
            Secure Login • Enterprise Grade CRM System
          </Typography>
        </Card>

        {/* TEST ACCOUNTS SECTION */}
        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<InfoIcon />}
            onClick={() => setShowTestAccounts(!showTestAccounts)}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: '#E5E7EB',
              color: '#6B7280',
              '&:hover': {
                borderColor: '#2563EB',
                backgroundColor: '#EFF6FF',
              },
            }}
          >
            {showTestAccounts ? 'Hide Test Accounts' : 'Show Test Accounts'}
          </Button>

          <Collapse in={showTestAccounts}>
            <Paper
              elevation={0}
              sx={{
                mt: 2,
                p: 3,
                backgroundColor: '#F8FAFC',
                borderRadius: 3,
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Test Accounts (Development Only)
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                Click any account to auto-fill the login form
              </Typography>

              <Stack spacing={1.5}>
                {testAccounts.map((account) => (
                  <Button
                    key={account.username}
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={() => quickLogin(account.username, account.password)}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 2,
                      py: 1.5,
                      borderColor: '#E5E7EB',
                      '&:hover': {
                        backgroundColor: '#EEF2FF',
                        borderColor: '#2563EB',
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'left', width: '100%' }}>
                      <Typography variant="body2" fontWeight={600}>
                        {account.full_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {account.department} • {account.role.replace(/_/g, ' ')}
                      </Typography>
                    </Box>
                  </Button>
                ))}
              </Stack>
            </Paper>
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}