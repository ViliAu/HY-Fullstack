const Hideable = ({ visible, children }) => {

  return (
    <div style={{ display: visible ? '' : 'none' } } className='detailsContainer'>
      {children}
    </div>
  )
}

export default Hideable