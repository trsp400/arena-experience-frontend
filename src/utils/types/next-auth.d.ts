import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      role: string
      fullName: string
      email: string
    }
    token: string | JWT;
  }
  interface Token {
    user: {
      id: number;
      role: string
      fullName: string
      email: string
    }
  }
}
