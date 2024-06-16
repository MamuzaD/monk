import { OrganizationProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="w-full">
      <OrganizationProfile></OrganizationProfile>
    </div>
  );
}
