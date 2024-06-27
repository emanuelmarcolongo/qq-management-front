import { Profile } from "@/src/models/types/Profiles";

const profilesFilter = (profiles: Profile[], search: string): Profile[] => {
  const lowercasedSearch = search.toLowerCase();

  return profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(lowercasedSearch) ||
      profile.description?.toLowerCase().includes(lowercasedSearch)
  );
};

export default profilesFilter;
