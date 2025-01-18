import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral(process.env.MISTRAL_API_KEY);

export const aiRouter = createTRPCRouter({
    processText: publicProcedure
        .input(z.object({ text: z.string() }))
        .mutation(async ({ input }) => {
            const response = await mistral.chat({
                model: "mistral-large-latest",
                messages: [{ role: "user", content: input.text }],
            });

            return response.messages[0]?.content || "";
        }),
}); 