import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to={'/'}>Go to homepage</Link>
    </div>
  )
}

export default PageNotFound
