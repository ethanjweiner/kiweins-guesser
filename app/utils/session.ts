import { cookies } from "next/headers";
import { Quiz, Session } from "../types";

export function setSession<Q extends Quiz>(data: Session<Q>) {
  cookies().set("session", JSON.stringify(data), {
    httpOnly: true, // determines whether http requests are the only way to access the cookie (server-side)
  });
}

export function getSession<Q extends Quiz>(): Session<Q> {
  const sessionCookie = cookies().get("session");

  if (!sessionCookie) {
    throw new Error("No session cookie found");
  }

  return JSON.parse(sessionCookie.value) as Session<Q>;
}

export function updateSession<Q extends Quiz>(
  data: Partial<Session<Q>>
): Session<Q> {
  const session = getSession();
  const newSession = { ...session, ...data } as Session<Q>;
  setSession(newSession);
  return newSession;
}
