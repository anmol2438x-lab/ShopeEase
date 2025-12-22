import React from 'react'

function PaddingSection({children, py = 0}) {
  return (
    <div className={`py-${py}`}>
      <div className='px-2 md:px-11'>
        {children}
      </div>
    </div>
  )
}

export default PaddingSection