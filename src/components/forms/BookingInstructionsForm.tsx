import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, AlertCircle } from "lucide-react";

interface BookingInstructionsFormProps {
  instructions: string[];
  onChange: (instructions: string[]) => void;
}

export const BookingInstructionsForm = ({ instructions, onChange }: BookingInstructionsFormProps) => {
  const addInstruction = () => {
    onChange([...instructions, ""]);
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    onChange(newInstructions);
  };

  const removeInstruction = (index: number) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    onChange(newInstructions);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-primary" />
        <Label className="text-lg font-semibold">Booking Instructions</Label>
      </div>
      <div className="space-y-2">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="text"
              value={instruction}
              onChange={(e) => updateInstruction(index, e.target.value)}
              className="flex-grow"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeInstruction(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={addInstruction}>
        <Plus className="w-4 h-4 mr-2" />
        Add Instruction
      </Button>
    </div>
  );
};