import React from 'react'
import RoomLayoutProvider from '../components/Providers/RoomLayoutProvider'

type Props = {
    children:React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <RoomLayoutProvider>
        {children}
    </RoomLayoutProvider>
  )
}

export default layout