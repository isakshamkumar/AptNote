import LiveblocksProviderLayout from '@/app/components/Providers/live-block-provider'
import RoomProviderLayout from '@/app/components/Providers/RoomProvider'
import { ThemeProvider } from '@/app/context/ThemeContext'
import { RoomProvider } from '@liveblocks/react'
import React from 'react'

type Props = {
    children: React.ReactNode,
    params: {
        roomId: string
        }
}

const layout = ({ children,params }: Props) => {
  return (
    <LiveblocksProviderLayout>
<ThemeProvider>

   <RoomProviderLayout roomId={params.roomId} >
    {children}
   </RoomProviderLayout>
</ThemeProvider>
    </LiveblocksProviderLayout>
  )
}

export default layout