import * as z from "zod"

export const registerSchmea = z.object(
    {
        name: z.string().min(3,{message: "Name must be between 3-6 characters"}).max(8,{message: "Name must be between 3-6 characters"}).trim(),
        email: z.string().email().nonempty(),
        password: z.string().min(6,{message: "Password must be at least 6 characters"})
    }
);