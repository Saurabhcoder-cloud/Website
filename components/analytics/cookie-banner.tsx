"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type CookieBannerProps = {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
};

export function CookieBanner({ open, onAccept, onDecline }: CookieBannerProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border border-primary/30 bg-background/95 p-4 shadow-lg backdrop-blur">
      <p className="text-sm text-muted-foreground">
        We use Google Tag Manager only after you opt in. Declining keeps analytics disabled and honors Do Not Track.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => { onAccept(); setVisible(false); }}>
          Accept
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            onDecline();
            setVisible(false);
          }}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}

