import { hashPassword, verifyPassword } from "@/lib/password";
import type { User } from "@/types";

const globalForAuth = globalThis as typeof globalThis & {
  users?: Array<User & { passwordHash: string }>;
};

if (!globalForAuth.users) {
  globalForAuth.users = [];
}

const users = globalForAuth.users;

export async function signup(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();

  if (users.some((u) => u.email === normalizedEmail)) {
    return { success: false, error: "An account with this email already exists." };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }

  const passwordHash = await hashPassword(password);
  const user: User & { passwordHash: string } = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email: normalizedEmail,
    name: name.trim(),
    createdAt: new Date().toISOString(),
    passwordHash,
  };

  users.push(user);

  return { success: true, user };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find((u) => u.email === normalizedEmail);

  if (!user) {
    return { success: false, error: "No account found with this email address." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid password. Please try again." };
  }

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
  };
}

export function getUserById(id: string): User | undefined {
  const user = users.find((u) => u.id === id);
  if (!user) {
    return undefined;
  }
  return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
}
