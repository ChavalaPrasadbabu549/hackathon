import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { toast } from "react-toastify";
import instance from "@/utils/api";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await instance.post("/api/forgot-password", { email });
            if (response.status === 200) {
                toast.success(response?.data?.message || "Reset link sent to your email");
                navigate("/"); // redirect to login after success
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-150 flex flex-col justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader className="flex flex-col justify-center items-center">
                    <CardTitle className="text-center">Forgot Password?</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email address and we’ll send you a reset link
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="pt-4 flex flex-col gap-3">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2Icon className="animate-spin" /> : "Send Reset Link"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => navigate("/")}
                        >
                            Back to Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Forgotpassword;
