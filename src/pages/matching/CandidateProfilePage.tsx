import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const CandidateProfilePage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { matches } = useMatchingStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'reviews'>('overview');

  const candidate =
    matches.find((m) => m.candidateId === candidateId) || matches[0];

  if (!candidate) {
    return (
      <div className="flex-1 w-full max-w-[960px] mx-auto p-12 text-center">
        <h2 className="text-[20px] font-semibold text-[#0b1c30]">Candidate Not Found</h2>
        <button
          onClick={() => navigate('/matches')}
          className="mt-4 px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-[14px]"
        >
          Back to Matches
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-8 py-8 flex flex-col items-center">
      {/* Centered Card Container */}
      <div className="w-full max-w-[960px] bg-white rounded-xl border border-[#d3e4fe] shadow-sm p-8">
        {/* Back Link */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate('/matches')}
            className="inline-flex items-center gap-1.5 text-[14px] text-[#474e64] hover:text-[#630ed4] transition-colors cursor-pointer"
          >
            <MaterialIcon icon="arrow_back" size={18} />
            <span>Back</span>
          </button>
        </div>

        {/* Header Section: Candidate Identity & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#e5eeff]">
          {/* Left: Avatar + Details */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#630ed4] to-[#0058be] flex items-center justify-center text-white text-[24px] font-bold shadow-sm shrink-0 ring-4 ring-[#eff4ff]">
              {candidate.initials}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-semibold text-[#0b1c30]">
                  {candidate.candidateName}
                </h1>
                <button
                  type="button"
                  onClick={() => navigate(`/matches/${candidate.candidateId}/explanation`)}
                  className="px-2.5 py-0.5 rounded-full bg-[#f3efff] border border-[#7C3AED]/30 text-[#7C3AED] text-[11px] font-bold hover:bg-[#7C3AED] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  title="View AI Match Explanation"
                >
                  <MaterialIcon icon="auto_awesome" size={13} />
                  <span>{candidate.matchScore}% Match</span>
                </button>
              </div>
              <p className="text-[14px] text-[#474e64] mt-0.5">{candidate.title}</p>
              <div className="flex items-center gap-1.5 text-[12px] text-[#7b7487] mt-1">
                <MaterialIcon icon="school" size={16} className="text-[#474e64]" />
                <span>{candidate.university}</span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/messages')}
              className="h-[42px] px-4 rounded-lg bg-white border border-[#ccc3d8] text-[#0b1c30] text-[14px] font-medium hover:bg-[#eff4ff] hover:border-[#5e667d] transition-all active:scale-[0.98] cursor-pointer"
            >
              Message
            </button>
            <button
              type="button"
              onClick={() => navigate(`/connections/request/${candidate.candidateId}`)}
              className="h-[42px] px-6 rounded-lg text-white text-[14px] font-medium active:scale-[0.98] flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:brightness-105 shadow-sm hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.35)] transition-all cursor-pointer"
            >
              <MaterialIcon icon="person_add" size={18} />
              <span>Connect</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Exactly 3 tabs) */}
        <div className="border-b border-[#e5eeff] mt-2">
          <nav className="flex gap-8 -mb-px">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`py-4 text-[14px] font-medium border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-[#630ed4] border-[#630ed4] font-semibold'
                  : 'text-[#7b7487] hover:text-[#0b1c30] border-transparent'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`py-4 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'projects'
                  ? 'text-[#630ed4] border-[#630ed4] font-semibold'
                  : 'text-[#7b7487] hover:text-[#0b1c30] border-transparent'
              }`}
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`py-4 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#630ed4] border-[#630ed4] font-semibold'
                  : 'text-[#7b7487] hover:text-[#0b1c30] border-transparent'
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="pt-8 space-y-8">
            {/* 1. About section */}
            <section>
              <h2 className="text-[16px] font-semibold text-[#0b1c30] mb-2">About</h2>
              <p className="text-[14px] leading-relaxed text-[#4a4455]">
                {candidate.bio}
              </p>
            </section>

            {/* 2. Skills section */}
            <section>
              <h2 className="text-[16px] font-semibold text-[#0b1c30] mb-3">Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {candidate.matchingTechStack.map((skill, idx) => {
                  const level = idx === 0 ? 'Advanced' : 'Intermediate';
                  const isAdv = level === 'Advanced';

                  return (
                    <div
                      key={skill}
                      className="bg-[#eff4ff] border border-[#d3e4fe] rounded-lg p-3 flex flex-col justify-between"
                    >
                      <span className="text-[14px] font-medium text-[#0b1c30]">{skill}</span>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isAdv ? 'bg-emerald-500' : 'bg-[#2170e4]'
                          }`}
                        />
                        <span
                          className={`text-[12px] font-medium ${
                            isAdv ? 'text-emerald-700' : 'text-[#0058be]'
                          }`}
                        >
                          {level}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. Interests section */}
            <section>
              <h2 className="text-[16px] font-semibold text-[#0b1c30] mb-3">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {['Artificial Intelligence', 'Web Development', 'Automation', 'Distributed Systems'].map(
                  (interest) => (
                    <span
                      key={interest}
                      className="h-8 px-3.5 inline-flex items-center rounded-full bg-[#e5eeff] text-[#0058be] text-[12px] font-medium border border-[#d3e4fe]"
                    >
                      {interest}
                    </span>
                  )
                )}
              </div>
            </section>

            {/* 4. Availability section */}
            <section>
              <h2 className="text-[16px] font-semibold text-[#0b1c30] mb-3">Availability</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#f8f9ff] border border-[#d3e4fe] text-[#0b1c30]">
                  <MaterialIcon icon="calendar_today" size={18} className="text-[#630ed4]" />
                  <span className="text-[12px]">Saturday</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#f8f9ff] border border-[#d3e4fe] text-[#0b1c30]">
                  <MaterialIcon icon="calendar_today" size={18} className="text-[#630ed4]" />
                  <span className="text-[12px]">Sunday</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#f8f9ff] border border-[#d3e4fe] text-[#0b1c30]">
                  <MaterialIcon icon="schedule" size={18} className="text-[#630ed4]" />
                  <span className="text-[12px]">6 PM - 9 PM</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#f8f9ff] border border-[#d3e4fe] text-[#0b1c30]">
                  <MaterialIcon icon="location_on" size={18} className="text-[#630ed4]" />
                  <span className="text-[12px]">Online / Jaffna</span>
                </div>
              </div>
            </section>

            {/* 5. Previous Projects section */}
            <section>
              <h2 className="text-[16px] font-semibold text-[#0b1c30] mb-3">Previous Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {candidate.previousProjects && candidate.previousProjects.length > 0 ? (
                  candidate.previousProjects.map((project, idx) => (
                    <div
                      key={project.title}
                      className="p-4 rounded-lg bg-[#f8f9ff] border border-[#d3e4fe] flex items-center gap-3.5 hover:border-[#ccc3d8] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#dce9ff] text-[#630ed4] flex items-center justify-center shrink-0">
                        <MaterialIcon icon={idx === 0 ? 'smart_toy' : 'groups'} size={22} />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#0b1c30]">{project.title}</h3>
                        <p className="text-[12px] text-[#474e64] mt-0.5">{project.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-4 rounded-lg bg-[#f8f9ff] border border-[#d3e4fe] flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-[#dce9ff] text-[#630ed4] flex items-center justify-center shrink-0">
                        <MaterialIcon icon="smart_toy" size={22} />
                      </div>
                      <h3 className="text-[16px] font-semibold text-[#0b1c30]">AI Chatbot</h3>
                    </div>
                    <div className="p-4 rounded-lg bg-[#f8f9ff] border border-[#d3e4fe] flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-[#dce9ff] text-[#630ed4] flex items-center justify-center shrink-0">
                        <MaterialIcon icon="groups" size={22} />
                      </div>
                      <h3 className="text-[16px] font-semibold text-[#0b1c30]">Student Management System</h3>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="pt-8 space-y-4">
            <h2 className="text-[16px] font-semibold text-[#0b1c30] mb-2">Verified Projects Portfolio</h2>
            <div className="space-y-4">
              {(candidate.previousProjects || [
                {
                  title: 'AI Chatbot Assistant',
                  description: 'Full stack autonomous copilot built with FastAPI, LangChain, and React.',
                  tags: ['Python', 'FastAPI', 'React', 'AI'],
                },
                {
                  title: 'University Course Management Portal',
                  description: 'Scalable multi-tenant academic portal with real-time grade notifications.',
                  tags: ['Angular', 'C#', '.NET', 'SQL'],
                },
              ]).map((proj) => (
                <div key={proj.title} className="p-5 rounded-lg border border-[#e5eeff] bg-[#f8f9ff]">
                  <h3 className="text-[16px] font-bold text-[#0b1c30]">{proj.title}</h3>
                  <p className="text-[14px] text-[#4a4455] mt-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {proj.tags?.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#0058be] text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-4 p-5 rounded-lg bg-[#f8f9ff] border border-[#e5eeff]">
              <div className="text-center px-4 border-r border-[#ccc3d8]">
                <div className="text-[32px] font-bold text-[#0b1c30]">{candidate.rating}</div>
                <div className="flex text-amber-500 justify-center">
                  {'★'.repeat(5)}
                </div>
                <div className="text-[12px] text-[#7b7487] mt-1">{candidate.reviewsCount} reviews</div>
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-bold text-[#0b1c30]">Verified Peer Collaboration</h3>
                <p className="text-[14px] text-[#4a4455] mt-1">
                  100% of project teammates recommend collaborating with {candidate.candidateName}.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
