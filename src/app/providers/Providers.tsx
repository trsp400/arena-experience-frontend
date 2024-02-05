'use client'

import React, { ReactNode } from 'react';
import SessionProvider from './sessionProvider'
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';

interface Props {
  children: ReactNode
}

function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers;