import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Github } from "lucide-react";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  onSSOClick?: () => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm = ({
  onSubmit = () => {},
  onSSOClick = () => {},
  isLoading = false,
  error = "",
}: LoginFormProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Card className="w-[400px] bg-background transition-transform hover:scale-[1.02]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-inter text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="transition-colors duration-300"
            />
          </div>
          {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
          <Button
            type="submit"
            className="w-full transition-all duration-300 hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="relative my-6">
          <Separator />
          <div className="absolute inset-x-0 -top-2 flex justify-center">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full transition-all duration-300 hover:scale-[1.02]"
          onClick={onSSOClick}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
