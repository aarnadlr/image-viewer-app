import { Header } from './Header';
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div style={{padding:'16px'}}>
      <main>{children}</main>
    </div>
  );
}
