import { z } from "zod";

const commentSchema = z.object({
    body: z.string().min(1, { message: "Comment must be at least 1 character long" }),
});

export type CommentSchema = z.infer<typeof commentSchema>;

export default commentSchema;