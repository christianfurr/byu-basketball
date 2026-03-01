import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import * as jose from 'jose'

// Environment variables for authentication
// These should be set in .env.local file or through environment variables in production
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // Default SHA-256 hash of 'admin'
}

// Auth configuration
const AUTH_CONFIG = {
  tokenName: process.env.AUTH_TOKEN_NAME || "auth-token",
  tokenExpiry: parseInt(process.env.AUTH_TOKEN_EXPIRY || "86400"),
  secret: process.env.AUTH_SECRET || "fallback-secret-key-please-set-in-env-vars",
  saltRounds : parseInt(process.env.AUTH_SALT_ROUNDS || "10"),
}

export async function login(username: string, password: string) {
  try {
    // Check username first
    if (username !== ADMIN_CREDENTIALS.username) {
      console.log("Invalid username")
      return { success: false, error: "Invalid credentials" }
    }

    // Compare the entered password with the stored hash
    const bcrypt = (await import("bcryptjs")).default
    const isMatch = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash)

    if (!isMatch) {
      console.log("Invalid password")
      console.log(password, ADMIN_CREDENTIALS.passwordHash)
      console.log(isMatch)
      console.log(await hashPassword(password))
      console.log("HASH LENGTH:", process.env.ADMIN_PASSWORD_HASH?.length)
      console.log("HASH:", process.env.ADMIN_PASSWORD_HASH)

      return { success: false, error: "Invalid credentials" }
    }
    console.log("Valid credentials")

    // Generate a session token
    const token = await generateSessionToken(username)

    // Set a secure HTTP-only cookie with the session token
    await (await cookies()).set(AUTH_CONFIG.tokenName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: AUTH_CONFIG.tokenExpiry,
      path: "/",
      sameSite: "lax", // Provides CSRF protection
    })

    return { success: true }

  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

export async function logout() {
  (await cookies()).delete(AUTH_CONFIG.tokenName)
}

export async function getAuthToken() {
  return (await cookies()).get(AUTH_CONFIG.tokenName)?.value
}

export async function isAuthenticated() {
  try {
    const token = await getAuthToken()
    
    if (!token) {
      return false
    }
    
    // In a production app, you would verify the token signature and expiration
    // This is a simplified version that checks if the token exists and has the expected format
    return validateSessionToken(token)
  } catch (error) {
    console.error("Authentication error:", error)
    return false
  }
}

export async function requireAuth() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }
}


export async function hashPassword(password: string): Promise<string> {
  const bcrypt = (await import("bcryptjs")).default
  const hash = await bcrypt.hash(password, AUTH_CONFIG.saltRounds)
  console.log(hash, AUTH_CONFIG.saltRounds)
  return hash
}



export async function generateSessionToken(username: string): Promise<string> {
  try {
    const secret = new TextEncoder().encode(AUTH_CONFIG.secret)
    const payload = {
      username,
      iat: Math.floor(Date.now() / 1000)
    }

    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' }) // Add this line to set the algorithm
      .setExpirationTime('7d')
      .sign(secret)

    return token
  } catch (error) {
    console.error('Failed to generate token:', error)
    throw error
  }
}

export async function validateSessionToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(AUTH_CONFIG.secret)
    await jose.jwtVerify(token, secret)
    return true
  } catch (err) {
    console.error("Token validation error:", err)
    return false
  }
}
