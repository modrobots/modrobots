import cx from "classix";
import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

export function Table({ children, className, ...rest }: HTMLAttributes<HTMLTableElement>) {
    return (
        <div className="relative w-full overflow-auto">
            <table className={cx("w-full caption-bottom text-sm", className)} {...rest}>
                {children}
            </table>
        </div>
    )
}

export function TableHead({ children, className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <thead className={cx("[&_tr]:border-b", className)} {...rest}>
            {children}
        </thead>
    )
}

export function TableHeadCell({ children, className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
    return (
        <th className={cx("h-12 px-4 text-left align-middle font-medium opacity-60", className)} {...rest}>
            {children}
        </th>
    )
}

export function TableBody({ children, className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tbody className={cx("[&_tr:last-child]:border-0", className)} {...rest}>
            {children}
        </tbody>
    )
}

export function TableRow({ children, className, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr className={cx("border-b border-neutral-700 transition-colors hover:bg-neutral-700/50", className)} {...rest}>
            {children}
        </tr>
    )
}

export function TableCell({ children, className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
    return (
        <td className={cx("p-4 align-middle", className)} {...rest}>
            {children}
        </td>
    )
}