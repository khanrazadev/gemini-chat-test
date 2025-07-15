import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CountrySelect from "../components/CountrySelect";
import { useState } from "react";
import { useChatStore } from "../store/chatStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  countryCode: z.string().min(1, "Select country"),
  phone: z.string().min(10, "Enter valid phone").max(14),
});

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const login = useChatStore((s) => s.login);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    setOtpSent(true);
    toast.success("OTP sent successfully!");
    setTimeout(() => setStep(2), 800); // simulate OTP send delay
  };

  const handleVerify = () => {
    if (otp !== "1234") {
      toast.error("Invalid OTP. Try '1234'");
      return;
    }

    const newUser = {
      name: getValues("name"),
      phone: getValues("phone"),
      countryCode: getValues("countryCode"),
    };

    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser?.phone === newUser.phone) {
      toast.success("Welcome back! You're logged in.");
    } else {
      toast.success("Signup complete. Welcome!");
    }

    login(newUser);
    navigate("/app");
  };

  return (
    <div className="min-h-screen flex overflow-hidden flex-col items-center justify-center bg-gemBg-light dark:bg-gemBg-dark">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-md shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login with Phone</h2>

        {step === 1 ? (
          <>
            <CountrySelect
              value={getValues("countryCode")}
              onChange={(val) => setValue("countryCode", val)}
            />
            {errors.countryCode && (
              <p className="text-red-500 text-sm">
                {errors.countryCode.message}
              </p>
            )}

            <input
              placeholder="Phone number"
              className="w-full p-2 border-zinc-600 focus:outline-none border bg-transparent rounded"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            <input
              placeholder="Your name"
              className="w-full p-2 border-zinc-600  focus:outline-none border bg-transparent rounded"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <button
              type="submit"
              className=" bg-emerald-800 text-white p-2 rounded w-full"
            >
              {otpSent ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded border-zinc-600  focus:outline-none  bg-transparent "
            />
            <button
              type="button"
              onClick={handleVerify}
              className="bg-emerald-800 text-white p-2 rounded w-full mt-2"
            >
              Verify OTP
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
