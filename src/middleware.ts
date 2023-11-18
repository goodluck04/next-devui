export { default } from "next-auth/middleware"

// protect your routes
export const config = { matcher: ["/profile"] }