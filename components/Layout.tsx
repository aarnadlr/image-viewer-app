import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Gallery</a>
            </Link>
          </li>
          <li>
            <Link href="/upload">
              <a>Upload</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      
    </>
  )
}