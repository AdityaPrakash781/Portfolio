import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertMessage } from "@shared/schema";

export function useCreateMessage() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.messages.create.input.parse(data);
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid input");
        }
        throw new Error("Failed to send message");
      }
      return api.messages.create.responses[201].parse(await res.json());
    },
  });
}
