import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => {
  return (
    <form
      ref={ref}
      className={cn(
        "space-y-4",
        className
      )}
      {...props}
    />
  );
});
Form.displayName = "Form";

interface FormFieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, children }, ref) => {
    return (
      <div ref={ref} className="space-y-2">
        {label && <Label>{label}</Label>}
        {children}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { Form, FormField };