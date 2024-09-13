import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">hello world</h1>
      <Button asChild>
        <LoginLink>Signin</LoginLink>
      </Button>
      <RegisterLink>
        <Button>Sign Up</Button>
      </RegisterLink>
    </div>
  );
}
