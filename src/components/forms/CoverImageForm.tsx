import { ImageUpload } from "./ImageUpload";
import { ImageIcon } from "lucide-react";

interface CoverImageFormProps {
  coverImage: string;
  onChange: (url: string) => void;
}

export const CoverImageForm = ({ coverImage, onChange }: CoverImageFormProps) => {
  return (
    <div className="form-section animate-fade-in">
      <h3 className="form-section-title">
        <ImageIcon className="w-5 h-5 text-accent" />
        صورة الغلاف
      </h3>
      
      <ImageUpload
        value={coverImage}
        onChange={onChange}
        label="صورة الغلاف"
        placeholder="https://... (صورة المناظر الطبيعية للوجهة)"
      />
    </div>
  );
};
