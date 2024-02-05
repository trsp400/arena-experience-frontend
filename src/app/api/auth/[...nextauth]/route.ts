import config from '@/utils/config';
import { nextAuthOptions } from '@/utils/nextAuthOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };