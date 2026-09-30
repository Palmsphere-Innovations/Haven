import { LoginForm } from "@/components/auth/sign-in-form";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
      <LoginForm />
    </div>
  );
}