import { ReactNode } from "react";
import { Label } from "../ui/label";

interface LabelRequiredProps extends React.ComponentPropsWithoutRef<typeof Label> {
    htmlFor: string;
    children?: ReactNode;
}
const LabelRequired: React.FC<LabelRequiredProps> = ({ htmlFor, children, ...props }) => {
    return (
        <Label htmlFor={htmlFor} {...props}>
            {children} <span className="text-red-500">*</span>
        </Label>
    );
};
export default LabelRequired;