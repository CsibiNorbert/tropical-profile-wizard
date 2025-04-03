
import { useEffect, useState } from "react";
import { useWizard } from "../WizardProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const BasicInfoStep = () => {
  const { profile, updateProfile } = useWizard();
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age !== null ? String(profile.age) : "");
  const [gender, setGender] = useState<string | null>(profile.gender);
  const [errors, setErrors] = useState({ name: "", age: "" });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setAge(value);
      setErrors((prev) => ({ ...prev, age: "" }));
    }
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  useEffect(() => {
    updateProfile({
      name,
      age: age ? parseInt(age, 10) : null,
      gender: gender as any,
    });
  }, [name, age, gender, updateProfile]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          className={cn(
            "border-gray-300 focus:border-tropical-turquoise focus:ring-tropical-turquoise/30",
            errors.name && "border-red-500"
          )}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          placeholder="Enter your age"
          value={age}
          onChange={handleAgeChange}
          className={cn(
            "border-gray-300 focus:border-tropical-turquoise focus:ring-tropical-turquoise/30",
            errors.age && "border-red-500"
          )}
        />
        {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
      </div>

      <div className="space-y-3">
        <Label>Gender</Label>
        <RadioGroup
          value={gender || ""}
          onValueChange={handleGenderChange}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="male"
              id="male"
              className="border-gray-300 text-tropical-turquoise focus:ring-tropical-turquoise/30"
            />
            <Label htmlFor="male" className="font-normal">
              Male
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="female"
              id="female"
              className="border-gray-300 text-tropical-turquoise focus:ring-tropical-turquoise/30"
            />
            <Label htmlFor="female" className="font-normal">
              Female
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="non-binary"
              id="non-binary"
              className="border-gray-300 text-tropical-turquoise focus:ring-tropical-turquoise/30"
            />
            <Label htmlFor="non-binary" className="font-normal">
              Non-binary
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="prefer-not-to-say"
              id="prefer-not-to-say"
              className="border-gray-300 text-tropical-turquoise focus:ring-tropical-turquoise/30"
            />
            <Label htmlFor="prefer-not-to-say" className="font-normal">
              Prefer not to say
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default BasicInfoStep;
