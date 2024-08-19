import { UserSchema } from "@/schema/user";
import { safeParse } from "valibot";

export const validateUser = (user) => {
  const result = safeParse(UserSchema, user);
  return result;
};
