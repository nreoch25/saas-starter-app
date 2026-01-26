
import { CardCompact } from "@/components/card-compact";
import { PasswordForgotForm } from "@/features/password/components/password-forgot-form";

const PasswordForgotPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Forgot Password"
        description="Forgot your password? No problem. Just enter your email and we'll send you a link to reset your password."
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<PasswordForgotForm />}
        
      />
    </div>
  );
};

export default PasswordForgotPage;