import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <p>Sorry, something went wrong</p>
      <Link href="/">Go back to the home page</Link>
    </>
  );
}
