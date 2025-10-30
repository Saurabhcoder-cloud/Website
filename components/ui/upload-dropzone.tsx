"use client";

import { useRef, useState, type DragEvent } from "react";

import { CloudUpload, ShieldCheck, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "./badge";
import { Button } from "./button";

export interface UploadFileDescriptor {
  id: string;
  name: string;
  size?: number;
  type?: string;
}

export interface UploadDropzoneProps {
  files: UploadFileDescriptor[];
  onFilesAdded: (files: File[]) => void;
  onRemoveFile?: (id: string) => void;
  accept?: string[];
  maxSizeMb?: number;
  description: string;
  helperText?: string;
  badgeText?: string | string[];
  browseLabel?: string;
  removeLabel?: string;
  className?: string;
  onFileRejected?: (details: { reason: "size" | "type"; file: File }) => void;
}

export function UploadDropzone({
  files,
  onFilesAdded,
  onRemoveFile,
  accept,
  maxSizeMb = 10,
  description,
  helperText,
  badgeText,
  browseLabel = "Browse files",
  removeLabel = "Remove",
  className,
  onFileRejected
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const selected: File[] = [];
    const acceptedTypes = accept?.map((type) => type.toLowerCase());

    Array.from(fileList).forEach((file) => {
      const sizeOk = file.size <= maxSizeMb * 1024 * 1024;
      if (!sizeOk) {
        onFileRejected?.({ reason: "size", file });
        return;
      }

      if (!acceptedTypes || acceptedTypes.length === 0) {
        selected.push(file);
        return;
      }

      const fileType = file.type.toLowerCase();
      const fileName = file.name.toLowerCase();
      const isAccepted = acceptedTypes.some((type) => {
        if (type.includes("/*")) {
          const prefix = type.split("/*")[0];
          return fileType.startsWith(prefix);
        }
        if (type.startsWith(".")) {
          return fileName.endsWith(type);
        }
        return fileType === type;
      });

      if (!isAccepted) {
        onFileRejected?.({ reason: "type", file });
        return;
      }

      selected.push(file);
    });

    if (selected.length) {
      onFilesAdded(selected);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleFiles(event.dataTransfer?.files ?? null);
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>, dragging: boolean) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(dragging);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleBrowse}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleBrowse();
          }
        }}
        onDragEnter={(event) => handleDrag(event, true)}
        onDragOver={(event) => handleDrag(event, true)}
        onDragLeave={(event) => handleDrag(event, false)}
        onDrop={handleDrop}
        className={cn(
          "group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-surface/80 p-8 text-center shadow-inner transition-all",
          isDragging ? "border-primary bg-primary/5" : "hover:border-primary/60 hover:bg-primary/5"
        )}
      >
        <CloudUpload className="h-10 w-10 text-primary transition-transform group-hover:-translate-y-1" aria-hidden />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">{description}</p>
          {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
        </div>
        {badgeText && (
          <div className="flex flex-wrap justify-center gap-2">
            {(Array.isArray(badgeText) ? badgeText : [badgeText]).map((text) => (
              <Badge key={text} className="bg-primary/10 text-primary" variant="secondary">
                <ShieldCheck className="mr-2 h-3.5 w-3.5" aria-hidden />
                {text}
              </Badge>
            ))}
          </div>
        )}
        <Button variant="outline" size="sm" className="mt-2" type="button">
          {browseLabel}
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept?.join(",")}
          className="hidden"
          onChange={(event) => {
            handleFiles(event.target.files);
            if (event.target) {
              event.target.value = "";
            }
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file) => {
            const sizeKb = file.size ? Math.round(file.size / 1024) : null;
            return (
              <li
                key={file.id}
                className="flex items-center justify-between rounded-2xl border border-primary/20 bg-white/80 px-4 py-3 text-sm shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{file.name}</span>
                  {sizeKb !== null && (
                    <span className="text-xs text-muted-foreground">{sizeKb} KB</span>
                  )}
                </div>
                {onRemoveFile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemoveFile(file.id);
                    }}
                  >
                    <X className="mr-1 h-4 w-4" aria-hidden />
                    {removeLabel}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

