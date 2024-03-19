import React from 'react';
import Sidebar from './layout/Sidebar';
import FollowBar from './layout/FollowBar';
//#040214e5
const Layout = ({children}) => {
  return (
    <div className='h-screen'>
      <div className='container h-full mx-auto xl:px-32 max-w-6xl'>
        <div className='grid grid-cols-4 h-full'>
            <Sidebar />
            <div
                className='
                col-span-3 
                lg:col-span-2 
                border-x-[1px] 
                border-neutral-600
                '
            >
                {children}
            </div>
            <FollowBar />
        </div>
      </div>
    </div>
  )
}

export default Layout
