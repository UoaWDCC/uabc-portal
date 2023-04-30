import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <p>Welcome to UABC Booking Portal</p>
      <p>
        <Link href="/login">LOGIN</Link>
      </p>
    </div>
  );
}
