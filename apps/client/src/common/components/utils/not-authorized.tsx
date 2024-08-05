import { UserX } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button, buttonVariants } from "../ui/button";

const Notauthorized = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-2">
      <UserX size={100} />
      <h1 className="text-2xl text-center">Not Authorized</h1>
      <p className="text-center">You are not authorized to view this page</p>
      <Button
        className={cn(
          buttonVariants({
            size: "lg",
          })
        )}
      >
        Sign In
      </Button>
    </div>
  );
};

export default Notauthorized;
