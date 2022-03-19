import Link from 'next/link'

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
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