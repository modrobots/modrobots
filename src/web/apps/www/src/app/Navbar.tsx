import { Button } from "@signalco/ui-primitives/Button";
import { Row } from "@signalco/ui-primitives/Row";
import Link from "next/link";

export function Navbar() {
    return (
        <nav className="p-4">
            <Row spacing={4}>
                <Link href="/">
                    <Button variant="link">/(home)</Button>
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
