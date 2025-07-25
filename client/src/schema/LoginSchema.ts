import * as z from "zod";

export const LoginSchema = z.object(
    {
        email: z.string().email().nonempty(),
        password: z.string().min(6,{message: "Password must be at least 6 characters"})
    }
)