import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";

const AdminLogin = lazy(() => import("./pages/admin/Login.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard.tsx"));
const AdminBookings = lazy(() => import("./pages/admin/Bookings.tsx"));
const AdminMessages = lazy(() => import("./pages/admin/Messages.tsx"));
const AdminSubscribers = lazy(() => import("./pages/admin/Subscribers.tsx"));

const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const BookSession = lazy(() => import("./pages/BookSession.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-[#17252A]" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/book-session" element={<BookSession />} />
              <Route path="/services" element={<Services />} />

              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="/admin/bookings"
                element={
                  <ProtectedAdminRoute>
                    <AdminBookings />
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="/admin/messages"
                element={
                  <ProtectedAdminRoute>
                    <AdminMessages />
                  </ProtectedAdminRoute>
                }
              />

              <Route
                path="/admin/subscribers"
                element={
                  <ProtectedAdminRoute>
                    <AdminSubscribers />
                  </ProtectedAdminRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
