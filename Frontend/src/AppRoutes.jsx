import {BrowserRouter, Routes, Route, Navigate} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/post/pages/Feed';
import CreatePost from './features/post/pages/CreatePost';
import MainLayout from './shared/components/MainLayout';
import { useAuth } from './features/auth/hooks/useAuth';
// import Profile from './shared/components/Profile/Profile';
import MyProfile from './features/auth/pages/MyProfile';



function AppRoutes(){

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }

    return(
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route 
                    path='/login' 
                    element={!user ? <Login /> : <Navigate to="/" replace />} 
                />

                <Route 
                    path='/register' 
                    element={!user ? <Register /> : <Navigate to="/" replace />} 
                />

                {/* Protected Routes */}
                <Route 
                    element={user ? <MainLayout /> : <Navigate to="/login" replace />}
                >
                    <Route path='/' element={<Feed />} />
                    {/* <Route path='/profile/:username' element={<Profile />} /> */}
                    <Route path='/create-post' element={<CreatePost />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes;