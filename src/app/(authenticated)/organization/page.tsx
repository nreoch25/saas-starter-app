import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OrganizationList } from "@/features/organization/components/organization-list";
import { organizationCreatePath } from "@/paths";
import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const OrganizationsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Organizations"
        description="All your organizations"
        actions={
          <Button asChild>
            <Link href={organizationCreatePath()}>
              <LucidePlus className="w-4 h-4" />
              Create Organization
            </Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationsPage;
