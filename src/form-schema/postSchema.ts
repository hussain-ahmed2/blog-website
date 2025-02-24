import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
    body: z.string().min(10, { message: "Body must be at least 10 characters long" }),
});

export type PostSchema = z.infer<typeof postSchema>;

export default postSchema;