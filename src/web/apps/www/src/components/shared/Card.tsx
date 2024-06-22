import cx from "classix";
import { HTMLAttributes } from "react";

export function Card({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cx("bg-white dark:bg-black border border-neutral-700 rounded-lg", className)} {...rest}>
            {children}
        </div>
    )
}

export function CardTitle({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cx("text-lg px-4 py-3", className)} {...rest}>
            {children}
        </div>
    )
}