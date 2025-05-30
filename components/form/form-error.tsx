import { X, XCircle } from "lucide-react";

interface FormErrorProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormError = ({ id, errors }: FormErrorProps) => {
  if (!errors) return null;

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="my-2 text-xs text-red-500"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center font-medium p-2 border border-red-500 bg-red-500/10 rounded-sm"
        >
          <X className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
};
