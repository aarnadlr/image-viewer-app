import { Header } from './Header';
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <main style={{padding:'16px'}}>
      {children}
    </main>
  );
}
