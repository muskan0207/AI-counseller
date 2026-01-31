import { type AppState, type University } from '../types';

export interface ProfileAnalysis {
  strengths: string[];
  gaps: string[];
  overallScore: number;
  recommendations: string[];
}

export const analyzeProfile = (profile: any): ProfileAnalysis => {
  const strengths: string[] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];
  let score = 0;

  // IELTS Analysis
  const ieltsScore = parseFloat(profile.ieltsScore || '0');
  if (ieltsScore >= 7.5) {
    strengths.push(`Excellent IELTS score (${ieltsScore}) - meets top university requirements`);
    score += 25;
  } else if (ieltsScore >= 6.5) {
    strengths.push(`Good IELTS score (${ieltsScore}) - meets most university requirements`);
    score += 15;
  } else if (ieltsScore > 0) {
    gaps.push(`IELTS score (${ieltsScore}) may limit university options`);
    recommendations.push('Consider retaking IELTS to improve score above 7.0');
  } else {
    gaps.push('No IELTS score recorded');
    recommendations.push('Take IELTS exam - required for most international applications');
  }

  // GRE Analysis
  const greScore = parseInt(profile.greScore || '0');
  if (greScore >= 320) {
    strengths.push(`Strong GRE score (${greScore}) - competitive for top programs`);
    score += 20;
  } else if (greScore >= 300) {
    strengths.push(`Decent GRE score (${greScore}) - meets minimum requirements`);
    score += 10;
  } else if (greScore > 0) {
    gaps.push(`GRE score (${greScore}) below competitive range`);
    recommendations.push('Consider retaking GRE to score above 310');
  }

  // GPA Analysis
  const gpa = parseFloat(profile.gpa?.split('/')[0] || '0');
  if (gpa >= 3.7) {
    strengths.push(`Strong academic record (${profile.gpa}) - excellent foundation`);
    score += 20;
  } else if (gpa >= 3.0) {
    strengths.push(`Good academic record (${profile.gpa}) - meets requirements`);
    score += 10;
  } else if (gpa > 0) {
    gaps.push(`GPA (${profile.gpa}) may limit top university options`);
    recommendations.push('Highlight other strengths to compensate for GPA');
  }

  // Field Alignment
  if (profile.major && profile.fieldOfStudy) {
    if (profile.major.toLowerCase().includes(profile.fieldOfStudy.toLowerCase()) || 
        profile.fieldOfStudy.toLowerCase().includes(profile.major.toLowerCase())) {
      strengths.push('Strong field alignment between background and target study');
      score += 15;
    } else {
      gaps.push('Limited alignment between current major and target field');
      recommendations.push('Consider bridging courses or highlight transferable skills');
    }
  }

  // Budget Realism
  const budgetRange = profile.budgetRange || '';
  if (budgetRange.includes('15,000') || budgetRange.includes('20,000')) {
    strengths.push('Realistic budget planning for international education');
    score += 10;
  } else if (budgetRange.includes('50,000')) {
    strengths.push('Strong financial capacity for premium universities');
    score += 15;
  }

  // SOP Status
  if (profile.sopStatus === 'Draft') {
    gaps.push('Statement of Purpose still in draft stage');
    recommendations.push('Complete and refine your Statement of Purpose');
  }

  return {
    strengths,
    gaps,
    overallScore: Math.min(score, 100),
    recommendations
  };
};

export const getUniversityFitReason = (university: University, profile: any): string => {
  const reasons: string[] = [];
  
  // Budget fit
  const budgetNum = parseInt(profile.budgetRange?.replace(/[^0-9]/g, '') || '0');
  const tuitionNum = parseInt(university.tuitionFee?.replace(/[^0-9]/g, '') || '0');
  
  if (tuitionNum <= budgetNum) {
    reasons.push('fits your budget range');
  } else {
    reasons.push('exceeds your budget - consider scholarships');
  }

  // Country preference
  if (profile.preferredCountries?.includes(university.country)) {
    reasons.push('matches your preferred country');
  }

  // Field alignment
  if (profile.fieldOfStudy && university.name.toLowerCase().includes(profile.fieldOfStudy.toLowerCase())) {
    reasons.push('strong program in your field of interest');
  }

  // Score compatibility
  const ieltsScore = parseFloat(profile.ieltsScore || '0');
  if (university.acceptanceChance === 'High' && ieltsScore >= 7.0) {
    reasons.push('your IELTS score meets their requirements');
  } else if (university.acceptanceChance === 'Low' && ieltsScore < 7.0) {
    reasons.push('may be challenging with current IELTS score');
  }

  return reasons.length > 0 ? reasons.join(', ') : 'general fit based on your profile';
};

export const categorizeUniversityForProfile = (university: University, profile: any): 'Dream' | 'Target' | 'Safe' => {
  const ieltsScore = parseFloat(profile.ieltsScore || '0');
  const gpa = parseFloat(profile.gpa?.split('/')[0] || '0');
  const greScore = parseInt(profile.greScore || '0');
  
  let profileStrength = 0;
  if (ieltsScore >= 7.5) profileStrength += 3;
  else if (ieltsScore >= 6.5) profileStrength += 2;
  else if (ieltsScore >= 6.0) profileStrength += 1;
  
  if (gpa >= 3.7) profileStrength += 3;
  else if (gpa >= 3.0) profileStrength += 2;
  else if (gpa >= 2.5) profileStrength += 1;
  
  if (greScore >= 320) profileStrength += 2;
  else if (greScore >= 300) profileStrength += 1;

  // Strong profile (7-8): Can aim for Dream schools
  // Medium profile (4-6): Should focus on Target schools  
  // Weak profile (0-3): Should focus on Safe schools
  
  if (profileStrength >= 7) {
    return university.acceptanceChance === 'Low' ? 'Dream' : 
           university.acceptanceChance === 'Medium' ? 'Target' : 'Safe';
  } else if (profileStrength >= 4) {
    return university.acceptanceChance === 'Low' ? 'Dream' :
           university.acceptanceChance === 'Medium' ? 'Target' : 'Safe';
  } else {
    return university.acceptanceChance === 'High' ? 'Target' : 'Dream';
  }
};