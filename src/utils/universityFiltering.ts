import { type University } from '../types';

export interface FilterOptions {
  profile?: any;
  budgetRange?: string;
  preferredCountries?: string[];
  fieldOfStudy?: string;
  minIELTS?: number;
  showOnlyAffordable?: boolean;
}

export const filterUniversities = (universities: University[], options: FilterOptions): University[] => {
  let filtered = [...universities];

  // Budget filtering
  if (options.budgetRange && options.showOnlyAffordable) {
    const maxBudget = parseInt(options.budgetRange.replace(/[^0-9]/g, '')) || 0;
    filtered = filtered.filter(uni => {
      const tuition = parseInt(uni.tuitionFee?.replace(/[^0-9]/g, '') || '0');
      return tuition <= maxBudget;
    });
  }

  // Country preference filtering
  if (options.preferredCountries && options.preferredCountries.length > 0) {
    filtered = filtered.filter(uni => 
      options.preferredCountries!.includes(uni.country)
    );
  }

  // Field of study filtering
  if (options.fieldOfStudy) {
    filtered = filtered.filter(uni => 
      uni.name.toLowerCase().includes(options.fieldOfStudy!.toLowerCase()) ||
      uni.whyFit.toLowerCase().includes(options.fieldOfStudy!.toLowerCase())
    );
  }

  // IELTS score compatibility
  if (options.profile?.ieltsScore) {
    const ieltsScore = parseFloat(options.profile.ieltsScore);
    filtered = filtered.filter(uni => {
      if (uni.acceptanceChance === 'High') return ieltsScore >= 6.0;
      if (uni.acceptanceChance === 'Medium') return ieltsScore >= 6.5;
      if (uni.acceptanceChance === 'Low') return ieltsScore >= 7.0;
      return true;
    });
  }

  return filtered;
};

export const sortUniversitiesByFit = (universities: University[], profile: any): University[] => {
  return universities.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Budget fit scoring
    const budgetNum = parseInt(profile.budgetRange?.replace(/[^0-9]/g, '') || '0');
    const tuitionA = parseInt(a.tuitionFee?.replace(/[^0-9]/g, '') || '0');
    const tuitionB = parseInt(b.tuitionFee?.replace(/[^0-9]/g, '') || '0');
    
    if (tuitionA <= budgetNum) scoreA += 3;
    if (tuitionB <= budgetNum) scoreB += 3;

    // Country preference scoring
    if (profile.preferredCountries?.includes(a.country)) scoreA += 2;
    if (profile.preferredCountries?.includes(b.country)) scoreB += 2;

    // Acceptance chance scoring (higher chance = better fit)
    if (a.acceptanceChance === 'High') scoreA += 3;
    else if (a.acceptanceChance === 'Medium') scoreA += 2;
    else scoreA += 1;

    if (b.acceptanceChance === 'High') scoreB += 3;
    else if (b.acceptanceChance === 'Medium') scoreB += 2;
    else scoreB += 1;

    return scoreB - scoreA; // Higher score first
  });
};

export const getRecommendedUniversities = (universities: University[], profile: any): {
  dream: University[];
  target: University[];
  safe: University[];
} => {
  const filtered = filterUniversities(universities, {
    profile,
    preferredCountries: profile.preferredCountries,
    fieldOfStudy: profile.fieldOfStudy
  });

  const sorted = sortUniversitiesByFit(filtered, profile);

  const dream = sorted.filter(uni => uni.acceptanceChance === 'Low').slice(0, 3);
  const target = sorted.filter(uni => uni.acceptanceChance === 'Medium').slice(0, 4);
  const safe = sorted.filter(uni => uni.acceptanceChance === 'High').slice(0, 3);

  return { dream, target, safe };
};