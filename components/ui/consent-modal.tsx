"use client";

import { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface ConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  acknowledgement: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onConfirm: () => void;
}

export function ConsentModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  acknowledgement,
  checked,
  onCheckedChange,
  onConfirm
}: ConsentModalProps) {
  useEffect(() => {
    if (!open) {
      onCheckedChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-start gap-3 rounded-2xl bg-secondary/40 p-4">
          <Checkbox
            id="consent-modal-checkbox"
            checked={checked}
            onCheckedChange={(value) => onCheckedChange(Boolean(value))}
          />
          <Label htmlFor="consent-modal-checkbox" className="text-sm text-foreground">
            {acknowledgement}
          </Label>
        </div>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-2xl px-6 py-3 text-sm font-semibold">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
            disabled={!checked}
            onClick={onConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

