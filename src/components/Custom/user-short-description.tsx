import { AssetUrl } from "@/lib/helpers/api_helper";
import { UserType } from "@/types/user";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";

export interface UserDescriptionWithAvatarProps {
    /** User object to display */
    user?: UserType;
    /** Optional click handler */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** Whether to show the component as a card */
    asCard?: boolean;
    /** Whether to show contact information */
    showContact?: boolean;
    /** Whether to show the user's role */
    showRole?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Size of the avatar (sm, md, lg) */
    size?: "sm" | "md" | "lg";
}

/**
 * A component that displays a user's avatar and basic information.
 * Can be used as a standalone component or within a card.
 */
export const UserDescriptionWithAvatar: React.FC<UserDescriptionWithAvatarProps> = ({
    user,
    onClick,
    asCard = false,
    showContact = true,
    showRole = false,
    className,
    size = "md"
}) => {
    if (!user) return null;

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(part => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    // Determine avatar size based on prop
    const avatarSizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12"
    };

    // Determine text size based on avatar size
    const textSizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
    };

    const UserContent = (
        <div
            className={cn(
                "flex items-center gap-3 transition-all duration-300",
                onClick && "cursor-pointer hover:opacity-90",
                className
            )}
            onClick={onClick}
        >
            <Avatar className={cn(
                "border border-border shadow-sm",
                avatarSizeClasses[size]
            )}>
                <AvatarImage
                    src={AssetUrl + user.avatar}
                    alt={user.name}
                    className="object-cover"
                />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center space-y-0.5 min-w-0">
                <h3 className={cn(
                    "font-semibold capitalize truncate",
                    textSizeClasses[size]
                )}>
                    {user.name}
                </h3>

                {showRole && user.role && (
                    <span className="text-xs text-muted-foreground truncate">
                        {user.role.name}
                    </span>
                )}

                {showContact && (
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {user.email && (
                            <span className="flex items-center gap-1 truncate">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{user.email}</span>
                            </span>
                        )}

                        {user.phone && (
                            <span className="flex items-center gap-1 truncate">
                                <Phone className="h-3 w-3" />
                                <span>{user.phone}</span>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    // Return as card or standalone component
    if (asCard) {
        return (
            <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                    {UserContent}
                </CardContent>
            </Card>
        );
    }

    return UserContent;
}
