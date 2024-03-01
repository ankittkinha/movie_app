import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ChangePassword from "./pages/ChangePasswordPage";
import ShowBookings from "./pages/ShowBookingsPage";
import TheatrePage from "./pages/TheatrePage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/users/signup/" element={<SignupPage />} ></Route>
        <Route path="/users/login/" element={<LoginPage />} ></Route>
        <Route path="/users/forgot/" element={<ForgotPasswordPage />} ></Route>
        <Route path="/users/:user_id/pass/" element={<ChangePassword />} ></Route>
        <Route path="/users/details/" element={<ProtectedRoute Component={UserDetailsPage} />} ></Route>
        <Route path="/movie/:id/details/" element={<ProtectedRoute Component={MovieDetailsPage} />} ></Route>
        <Route path="/movie/:movie_id/theatres/" element={<ProtectedRoute Component={TheatrePage} />} ></Route>
        <Route path="/movie/show/:theatre_id/:movie_id/seats/" element={<ProtectedRoute Component={SeatSelectionPage} />} ></Route>
        <Route path="/users/bookings/" element={<ProtectedRoute Component={ShowBookings} />} ></Route>
        <Route path="*" element={<NotFoundPage />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
