import type { AccessArgs } from "payload";
import type { User } from "payload";

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const accessAuthenticated: isAuthenticated = ({ req: { user } }) => {
	return user ? true : false;
};
