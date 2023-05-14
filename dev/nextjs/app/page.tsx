"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/server-actions">/server-actions</Link>
        </li>
        <li>
          <Link href="/react-hook-form">/react-hook-form</Link>
        </li>
        <li>
          <Link href="/custom-validator">/custom-validator</Link>
        </li>
      </ul>
    </main>
  );
}
