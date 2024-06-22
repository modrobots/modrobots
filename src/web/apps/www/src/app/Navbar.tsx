import Link from "next/link";

export function Navbar() {
    return (
        <nav className="flex justify-between p-4">
            <Link className="hover:bg-neutral-700 px-4 py-1 transition-colors rounded" href="/">/</Link>
            <div className="flex gap-4">
                <Link className="hover:bg-neutral-700 px-4 py-1 transition-colors rounded" href="/modules">/modules</Link>
                <Link className="hover:bg-neutral-700 px-4 py-1 transition-colors rounded" href="/parts">/parts</Link>
            </div>
        </nav>
    );
}
