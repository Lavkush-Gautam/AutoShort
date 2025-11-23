import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import api from "../helper/api.jsx";
import { toast } from "react-hot-toast";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  /** -------------------------------
   *  STATES
   --------------------------------*/
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  /** -------------------------------
   *  FETCH CURRENT USER
   --------------------------------*/
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/user/me", {
          withCredentials: true,
        });
        setUser(data?.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /** -------------------------------
   *  AUTH: REGISTER
   --------------------------------*/
  const register = async (formData) => {
    setAuthLoading(true);

    try {
      const { data } = await api.post("/user/register", formData, {
        withCredentials: true,
      });

      toast.success("Registered successfully!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
      return { error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  /** -------------------------------
   *  AUTH: LOGIN
   --------------------------------*/
  const login = async (formData) => {
    setAuthLoading(true);

    try {
      const { data } = await api.post("/user/login", formData, {
        withCredentials: true,
      });

      setUser(data.user);
      toast.success("Logged in successfully!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
      return { error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  /** -------------------------------
   *  UPDATE PROFILE
   --------------------------------*/
  const updateProfile = async (formData) => {
    if (!user?._id) return toast.error("User not found");

    setAuthLoading(true);

    try {
      const { data } = await api.put(
        `/user/update-profile/${user._id}`,
        formData,
        { withCredentials: true }
      );

      setUser(data.user);
      toast.success("Profile updated!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      toast.error(msg);
      return { error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  /** -------------------------------
   *  CHANGE PASSWORD
   --------------------------------*/
  const changePassword = async (formData) => {
    if (!user?._id) return toast.error("User not found");

    setAuthLoading(true);

    try {
      const { data } = await api.put(
        `/user/change-password/${user._id}`,
        formData,
        { withCredentials: true }
      );

      toast.success("Password changed!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password";
      toast.error(msg);
      return { error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  /** -------------------------------
   *  LOGOUT
   --------------------------------*/
  const logout = async () => {
    setAuthLoading(true);

    try {
      await api.post("/user/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out!");
    } catch {
      toast.error("Logout failed");
    } finally {
      setAuthLoading(false);
    }
  };

  /** -------------------------------
   *  PAYMENT: CREATE ORDER
   --------------------------------*/
  const createOrder = async (planId, planType) => {
    try {
      const { data } = await api.post("/payments/create-order", {
        planId,
        planType,
      });
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Order creation failed";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  /** -------------------------------
   *  PAYMENT: VERIFY
   --------------------------------*/
  const verifyPayment = async (paymentData) => {
    try {
      const { data } = await api.post("/payments/verify", paymentData);

      if (data?.user) {
        setUser((prev) => ({
          ...prev,
          subscription: data.user.subscription,
        }));
      }

      toast.success("Subscription activated!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Payment verification failed";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  /** -------------------------------
   *  SUBSCRIPTIONS: GET ALL PLANS
   --------------------------------*/
  const getPlans = async () => {
    try {
      const { data } = await api.get("/subscriptions/plans");
      setPlans(data?.plans || []);
      return data.plans;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load plans";
      toast.error(msg);
      return [];
    }
  };

  /** -------------------------------
   *  SUBSCRIPTIONS: CREATE PLAN (Admin)
   --------------------------------*/
  const createPlan = async (planData) => {
    try {
      const { data } = await api.post(
        "/subscriptions/create-plan",
        planData,
        { withCredentials: true }
      );

      toast.success("Plan created!");
      await getPlans();
      return data.plan;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create plan";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  /** -------------------------------
   *  SUBSCRIPTIONS: UPDATE PLAN (Admin)
   --------------------------------*/
  const updatePlan = async (id, updates) => {
    try {
      const { data } = await api.put(
        `/subscriptions/update-plan/${id}`,
        updates,
        { withCredentials: true }
      );

      toast.success("Plan updated!");
      await getPlans();
      return data.plan;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update plan";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  /** -------------------------------
   *  SUBSCRIPTIONS: DELETE PLAN (Admin)
   --------------------------------*/
  const deletePlan = async (id) => {
    try {
      await api.delete(`/subscriptions/delete-plan/${id}`, {
        withCredentials: true,
      });

      toast.success("Plan deleted!");
      await getPlans();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete plan";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  /** -------------------------------
   *  CONTEXT VALUE
   --------------------------------*/
  const value = useMemo(
    () => ({
      user,
      loading,
      authLoading,
      plans,

      // Auth
      register,
      login,
      logout,
      updateProfile,
      changePassword,

      // Payment
      createOrder,
      verifyPayment,

      // Plans
      getPlans,
      createPlan,
      updatePlan,
      deletePlan,
    }),
    [user, loading, authLoading, plans]
  );

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
