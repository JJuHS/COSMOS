import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import ConferenceRoutes from "./routes/conferenceRoutes.js";
import NavBar from "./components/home/navBar.jsx";
import Footer from "./components/home/footer.jsx";
import Login from "./components/accounts/login.jsx";
import PasswordChange from "./components/accounts/passwordChange.jsx";
import KakaoRedirect from "./components/accounts/kakaoRedirect.jsx";
import NaverRedirect from "./components/accounts/naverRedirect.jsx";
import SignUp from "./components/accounts/signUp.jsx";
import PasswordFind from "./components/accounts/passwordFind.jsx";
import GroupRoutes from "./routes/groupRoutes.js";
import UserRouters from "./routes/userRouters.js";
import "./App.css";
import useAuthStore from "./store/auth.js";
import Loading from './components/Loading.jsx';
import { useEffect } from "react";

function AppContent() {
  const getIsLogin = useAuthStore((state) => state.isLogin);
  const navigate = useNavigate();
  const location = useLocation();
  const isConferenceRoute = location.pathname.startsWith("/conference");

  useEffect(() => {
    const isLogin = getIsLogin();
    console.log(isLogin);
    if (!isLogin && location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/password-find" && location.pathname !== "/" && location.pathname !== "/auth/kakao" && location.pathname !== "/auth/naver") {
      // 비로그인 상태에서 다른 경로로 접근 시 홈 화면으로 리다이렉트
      window.alert('로그인이 필요합니다')
      navigate("/", { replace: true });
    }
  }, [getIsLogin, location, navigate]);

  return (
    <div id="App">
      <Loading />
      {!isConferenceRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/conference/*" element={<ConferenceRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao/callback" element={<KakaoRedirect />} />
        <Route path="/auth/naver/callback" element={<NaverRedirect />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/password-find" element={<PasswordFind />} />
        <Route path="*" element={<HomeView />} />
        <Route path="/group/*" element={<GroupRoutes />} />
        <Route path="/users/*" element={<UserRouters />} />
      </Routes>
      {!isConferenceRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
