import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import PublicRoute from "../components/PublicRouter/PublicRoute";

// Layouts
import HomeLayout from "../view/client/layout/default";
import MentorLayout from "../view/mentor/layout/mentorLayout";
import AdminLayout from "../view/admin/layout/AdminLayout";

// Client Pages
import HomeScreen from "../view/client/pages/home";
import Login from "../view/client/pages/login/Login";
import Signup from "../view/client/pages/register/SignUp";
import ResendEmail from "../view/client/pages/register/ResendEmail";
import Success from "../components/Success";
import Infomation from "../view/client/pages/profile";
import InstructorInfo from "../view/client/pages/instructor-info";
import ShoppingCart from "../view/client/pages/shopping-cart/ShoppingCart";
import Checkout from "../view/client/pages/checkout/Checkout";
import OrderComplete from "../view/client/pages/order-complete/OrderComplete";
import Categories from "../view/client/pages/categories/CourseList";
import CourseViewer from "../view/client/pages/course-viewer/CourseViewer";
import CourseHeader from "../view/client/pages/course";
// Mentor Pages
import Dashboard from "../view/mentor/pages/dashboard/Dashboard";
import Communication from "../view/mentor/pages/communication/Communication";
import AddCourseForm from "../components/AddCourse/AddCourseForm";
import AddCourseSectionForm from "../components/AddCourse/AddCourseSectionForm";
import CourseStudentList from "../view/mentor/pages/courses/CourseStudentList/CourseStudentList";

// Admin Pages
import AdminDashboard from "../view/admin/pages/dashboard/Dashboard";
import CategoryList from "../view/admin/pages/categories/CategoryList";
import CategoryWarehouse from "../view/admin/pages/categories/CategoryWarehouse";

// Error Pages
import Error404 from "../view/client/pages/error/Error404";
import VerifyEmail from "../view/client/pages/register/VerifyEmail ";
import ViewMentorCourses from "../view/mentor/pages/courses/ViewListCourse/ViewMentorCourses";
import SignUpMentor from "../view/client/pages/register/SignUpMentor";
import AdminUserPage from "../view/admin/pages/users/AdminUserPage";
import OrderHistory from "../view/client/pages/order-history/OrderHistory";

const AppRoutes = () => (
  <Routes>
    {/* Routes cho Client */}
    <Route path="/*" element={<HomeLayout />}>
    <Route index element={<Navigate to="/home" replace />} />
      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="resend-confirmation" element={<ResendEmail />} />
        <Route path="success" element={<Success />} />
        
      </Route>

      <Route element={<PrivateRouter />}>
        <Route path="info-user" element={<Infomation />} />
        <Route path="instructor-info/:id" element={<InstructorInfo />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="check-out" element={<Checkout />} />
        <Route path="payment-success" element={<OrderComplete />} />
        <Route path="sign-up-mentor" element={<SignUpMentor />}/>
        <Route path="my-learning/:id/learn" element={<CourseViewer />} />
        <Route path="order-history" element={<OrderHistory />} />
        {/* <Route path="course-viewer" element={<CourseViewer />} /> */}
      </Route>
      
      <Route path="home" element={<HomeScreen />} />
      <Route path="categories" element={<Categories />} />
      <Route path="course-details/:id" element={<CourseHeader />} />
        {/* <Route path="course-detail/:id" element={<CourseDetails />} />
      </Route> */}
      
    </Route>

    {/* Routes cho Mentor */}
    <Route path="mentor/*" element={<MentorLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="communication" element={<Communication />} />
      <Route path="courses" element={<ViewMentorCourses />} />
      <Route path="courses/add" element={<AddCourseForm />} />
      <Route path="courses/section/:courseId" element={<AddCourseSectionForm />} />
      <Route path="courses/:id/students" element={<CourseStudentList/>} />
    </Route>

    {/* Routes cho Admin */}
    <Route path="admin/*" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="categories" element={<CategoryList />} />
      <Route path="warehouse" element={<CategoryWarehouse />} />
      <Route path="users" element={<AdminUserPage />} />
    </Route>

    {/* Route 404 */}
    <Route path="*" element={<Error404 />} />
  </Routes>
);

export default AppRoutes;
