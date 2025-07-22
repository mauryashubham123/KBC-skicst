import { user_apis } from "@/lib/helpers/api_urls";
import { UserType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Phone, Mail, MailPlus, PhoneIncoming, IdCard, Coins, BookCopy, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ChangeEmailPhoneDialog from "./change-email-phone";
import { UserDescriptionWithAvatar } from "@/components/Custom/user-short-description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUrlQuery } from "@/lib/utils";


export interface UserProfileResponse {
	user: UserType;
}

const UserProfile = () => {
	const { user_id } = useParams();
	const navigate = useNavigate();
	const queries = useUrlQuery();

	const userProfileQuery = useQuery<any, any, UserProfileResponse>({
		queryKey: ["userprofile", user_id],
		queryFn: () => user_apis.select(user_id || ""),
		select: (res) => res.data,
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		enabled: !!user_id,
	});
	useEffect(() => {
		if (userProfileQuery.isError)
			toast.error(
				userProfileQuery.error?.response?.data?.message ||
				userProfileQuery.error.message
			);
	}, [userProfileQuery.error]);



	return (
		<div className="container px-4 sm:px-8">
			{userProfileQuery.isLoading ? (<UserProfileSkeleton />) : userProfileQuery.data ? (
				<>
					<Card className="shadow-sm mt-4">
						<CardHeader className="">
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								<UserDescriptionWithAvatar size="lg" showRole showContact={false} user={userProfileQuery.data.user} />
								<div className="flex flex-wrap gap-3">
									<ChangeEmailPhoneDialog user={userProfileQuery.data.user} type="phone">
										<Button variant="outline" size="sm">
											{userProfileQuery.data.user.phone ? (
												<><Phone className="h-4 w-4 mr-2" />{userProfileQuery.data.user.phone}</>
											):(<span className="text-muted-foreground flex gap-2 items-center"><PhoneIncoming  className="h-4 w-4" />Add Phone</span>)}
										</Button>
									</ChangeEmailPhoneDialog>

									<ChangeEmailPhoneDialog user={userProfileQuery.data.user} type="email">
										<Button variant="outline" size="sm">
											{userProfileQuery.data.user.email ? (
												<><Mail className="h-4 w-4 mr-2" />{userProfileQuery.data.user.email}</>
											):(<span className="text-muted-foreground flex gap-2 items-center"><MailPlus  className="h-4 w-4" />Add Email</span>)}
										</Button>
									</ChangeEmailPhoneDialog>

								</div>
							</div>
						</CardHeader>
					</Card>
					{userProfileQuery.data.user.role.type === 'student' && (
						<Tabs value={queries.get('tb') ?? 'basic'} defaultValue="basic" className="mt-4">
							<TabsList className="grid grid-cols-4 w-full">
								<TabsTrigger onClick={()=>navigate('/users/profile/'+userProfileQuery.data.user.id+'?tb=basic')} value="basic">
									<IdCard className="h-4 w-4 mr-2 inline" />
									<span className="hidden md:inline">Basic</span>
								</TabsTrigger>
								<TabsTrigger onClick={()=>navigate('/users/profile/'+userProfileQuery.data.user.id+'?tb=fees')} value="fees">
									<Coins className="h-4 w-4 mr-2 inline" />
									<span className="hidden md:inline">Fees</span>
								</TabsTrigger>
								<TabsTrigger onClick={()=>navigate('/users/profile/'+userProfileQuery.data.user.id+'?tb=acadmics')} value="acadmics">
									<BookCopy className="h-4 w-4 mr-2 inline" />
									<span className="hidden md:inline">Academic</span>
								</TabsTrigger>
								<TabsTrigger onClick={()=>navigate('/users/profile/'+userProfileQuery.data.user.id+'?tb=attendance')} value="attendance">
									<FileSpreadsheet className="h-4 w-4 mr-2 inline" />
									<span className="hidden md:inline">Attendance</span>
								</TabsTrigger>
							</TabsList>
							
							<TabsContent value="attendance">Attendance</TabsContent>
						</Tabs>
					)}
				</>
			) : (<div className="text-center p-8"><p>No user data found.</p></div>)}
		</div>
	);
};

// Skeleton loading state component
const UserProfileSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div>
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-40" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Skeleton className="h-6 w-40" />
            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex py-4 gap-4">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-8 w-48" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;