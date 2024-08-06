import { Button } from "@signalco/ui-primitives/Button";
import { Row } from "@signalco/ui-primitives/Row";
import Link from "next/link";
import { Logo } from "../components/brand/Logo";

export function Navbar() {
    return (
        <nav className="p-4">
            <Row spacing={4}>
                <Link href="/" className="flex items-center text-4xl">
                    <Logo className="size-8" />
                </Link>
                <Link href="/modules">
                    <Button variant="link">/modules</Button>
                </Link>
                <Link href="/parts">
                    <Button variant="link">/parts</Button>
                </Link>
            </Row>
        </nav>
    );
}
