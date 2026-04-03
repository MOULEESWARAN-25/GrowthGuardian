import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    // Simulate Auth
    if (isLogin) {
      const sampleEmail = "alexjohnson0625@gmail.com";
      const samplePassword = "1234";
      if (email === sampleEmail && password === samplePassword) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      // Simulate Signup success
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex selection:bg-secondary/30 selection:text-primary">
      {/* Left Decoration Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Target size={20} className="text-secondary" />
            <span className="text-foreground font-sans font-semibold tracking-tight font-bold text-xl tracking-tight">GrowthGuardian</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-sans font-semibold tracking-tight font-extrabold text-foreground leading-tight mb-6"
          >
            Start your journey to financial supremacy.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed mb-10"
          >
            Access our suite of tools to manage wealth, simulate investments risk-free, and build intuition through interactive courses.
          </motion.p>

          {/* Testimonial snippet */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel text-foreground p-6 rounded-2xl border-white/10"
          >
            <p className="italic text-muted-foreground mb-4">"The simulated dashboard taught me more in a week than all my finance courses combined."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-secondary to-accent flex items-center justify-center font-bold text-foreground shadow-soft">
                AM
              </div>
              <div>
                <p className="font-semibold text-sm">Alex M.</p>
                <p className="text-xs text-muted-foreground">Premium User</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 bg-white relative">
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center transform rotate-12">
              <Target size={18} className="text-foreground transform -rotate-12" />
            </div>
            <span className="font-sans font-semibold tracking-tight font-bold text-xl tracking-tight">GrowthGuardian</span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-sans font-semibold tracking-tight font-bold mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? "Enter your credentials to access your dashboard." : "Join thousands of users controlling their financial future."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                      placeholder="Alex Johnson"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                  placeholder="alex@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                {isLogin && <a href="#" className="text-xs text-secondary hover:text-accent font-semibold transition-colors">Forgot password?</a>}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLogin && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
                <CheckCircle2 size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                <span>By signing up, you agree to our Terms of Service and Privacy Policy.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/90 text-foreground font-semibold rounded-xl transition-all active:scale-[0.98] shadow-soft shadow-primary/30"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span>OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
             <button className="flex-1 py-2.5 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-sm flex items-center justify-center gap-2 transition-colors">
               <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
               Google
             </button>
             <button className="flex-1 py-2.5 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-sm flex items-center justify-center gap-2 transition-colors">
               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-1.11 9-5.53 9-10.95z"/>
               </svg>
               Facebook
             </button>
          </div>

          <div className="mt-10 text-center text-sm">
             <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button 
                  onClick={() => { setIsLogin(!isLogin); setError(""); setName(""); }} 
                  className="font-semibold text-primary hover:text-secondary transition-colors"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;