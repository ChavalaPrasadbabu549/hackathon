import type { ReactNode } from "react";
import {
    Dialog as ShadDialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CommonDialogProps {
    trigger?: ReactNode;
    title: string;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showCloseButton?: boolean;
}

const CommonDialog: React.FC<CommonDialogProps> = ({
    trigger,
    title,
    children,
    open,
    onOpenChange,
    showCloseButton = true,
}) => {
    return (
        <ShadDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-2">{children}</div>
                {showCloseButton && (
                    <div className="mt-4 text-right">
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </div>
                )}
            </DialogContent>
        </ShadDialog>
    );
};

export default CommonDialog;
