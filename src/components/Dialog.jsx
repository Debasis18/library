"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function CustomDialog({
  title = "Dialog",
  buttonLabel = "Open",
  children,
  className = "",
  variant,
  icon,
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`w-full  ${className}`} variant={variant}>
          {icon} {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { onClose: handleClose });
          }
          return child;
        })}
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
