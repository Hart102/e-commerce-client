import { Button } from "@nextui-org/react";

export default function ConfirmationModal({
  message,
  onCancle,
  onContinue,
}: {
  message: string;
  onCancle?: () => void;
  onContinue?: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl text-center">Confirm</h2>

        <p className="text-neutral-5001 first-letter:capitalize text-xl">
          {message}
        </p>
      </div>

      <div className="flex justify-around pt-5">
        <Button
          onPress={onCancle}
          className="border rounded-full bg-black text-white"
        >
          Cancel
        </Button>
        <Button onClick={onContinue} className="border rounded-full">
          Continue
        </Button>
      </div>
    </>
  );
}
