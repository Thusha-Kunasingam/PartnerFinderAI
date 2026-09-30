import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SkillPill } from '../../components/common/SkillPill';
import { useMatchingStore } from '../../stores/useMatchingStore';
import { useConnectionStore } from '../../stores/useConnectionStore';
import { ModalContainer } from '../../components/feedback/ModalContainer';
import { Textarea } from '../../components/common/Textarea';
import { cn } from '../../utils/cn';

export const CandidateProfilePage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { matches } = useMatchingStore();
  const { sendRequest } = useConnectionStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'reviews'>('overview');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectMessage, setConnectMessage] = useState(
    "Hi, I would love to connect and explore collaborating together on an upcoming project!"
  );

  const candidate = matches.find((m) => m.candidateId === candidateId) || matches[0];

  const handleSendConnect = () => {
    sendRequest(
      candidate.candidateId,
      candidate.candidateName,
      'AI Event Assistant',
      connectMessage
    );
    setIsConnectModalOpen(false);
    navigate(`/connections/success/${candidate.candidateId}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate('/matches')}
        className="self-start inline-flex items-center gap-2 text-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        <span>Back to Matches</span>
      </button>

      {/* Hero Profile Banner Card */}
      <div className="p-6 md:p-8 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {candidate.avatarUrl ? (
            <img
              src={candidate.avatarUrl}
              alt={candidate.candidateName}
              className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-high shadow-sm flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-surface-container-low border-2 border-surface-container-high flex items-center justify-center font-bold text-secondary text-2xl flex-shrink-0">
              {candidate.initials}
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-on-surface">{candidate.candidateName}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-label-xs font-bold bg-primary-fixed text-primary border border-primary-fixed-dim">
                {candidate.matchScore}% Match
              </span>
            </div>

            <p className="text-body-md text-on-surface-variant font-medium mt-1">
              {candidate.title} • {candidate.university}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-body-sm text-outline mt-2">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {candidate.location}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {candidate.availabilityText}
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                {candidate.rating} ({candidate.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SecondaryButton
            icon="chat"
            iconPosition="left"
            onClick={() => navigate('/messages')}
          >
            Message
          </SecondaryButton>
          <PrimaryButton
            icon="person_add"
            iconPosition="left"
            onClick={() => setIsConnectModalOpen(true)}
          >
            Connect
          </PrimaryButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border-standard">
        {(['overview', 'projects', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'pb-3.5 text-label-md font-label-md capitalize transition-all cursor-pointer border-b-2 -mb-px',
              activeTab === tab
                ? 'border-primary-container text-primary-container font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface font-medium'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 2-col Left */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* About Card */}
            <div className="p-6 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1">
              <h2 className="text-headline-sm font-semibold text-on-surface mb-3">About</h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed">{candidate.bio}</p>
            </div>

            {/* Skills Card */}
            <div className="p-6 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1">
              <h2 className="text-headline-sm font-semibold text-on-surface mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.matchingTechStack.map((tech) => (
                  <SkillPill key={tech} label={tech} level="Advanced" />
                ))}
              </div>
            </div>

            {/* Previous Projects */}
            <div className="p-6 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1">
              <h2 className="text-headline-sm font-semibold text-on-surface mb-4">Previous Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(candidate.previousProjects || [
                  { title: 'AI Chatbot', description: 'Context-aware customer service copilot with hybrid RAG.', tags: ['Python', 'FastAPI'] },
                  { title: 'Student Management System', description: 'Role-based university portal handling course enrollment.', tags: ['Angular', 'C#'] },
                ]).map((proj) => (
                  <div key={proj.title} className="p-4 rounded-xl border border-border-standard bg-surface-container-low flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-label-md text-on-surface mb-1">{proj.title}</h3>
                      <p className="text-body-sm text-on-surface-variant mb-3">{proj.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-surface-container-lowest border border-border-standard text-on-surface-variant font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Availability & Interests */}
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1">
              <h2 className="text-headline-sm font-semibold text-on-surface mb-3">Availability</h2>
              <div className="flex items-center gap-2 text-body-md text-on-surface mb-2">
                <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                <span>Saturdays & Sundays</span>
              </div>
              <div className="flex items-center gap-2 text-body-md text-on-surface mb-2">
                <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                <span>15 hours per week</span>
              </div>
              <div className="flex items-center gap-2 text-body-md text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-primary">public</span>
                <span>UTC+5:30 (Sri Lanka / Remote)</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1">
              <h2 className="text-headline-sm font-semibold text-on-surface mb-3">Interests</h2>
              <div className="flex flex-col gap-2 text-body-sm text-on-surface-variant">
                <span>• Artificial Intelligence & LLM Fine-Tuning</span>
                <span>• Distributed Systems & Cloud Microservices</span>
                <span>• Hackathon MVP Sprints</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="p-6 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1">
          <h2 className="text-headline-sm font-semibold text-on-surface mb-4">Featured Work & Repositories</h2>
          <p className="text-body-md text-on-surface-variant">
            Explore verified open source repositories and completed deliverables built by {candidate.candidateName}.
          </p>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="p-6 rounded-xl bg-surface-container-lowest border border-border-standard shadow-elevation-1">
          <h2 className="text-headline-sm font-semibold text-on-surface mb-4">Teammate Reviews</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-on-surface">★ {candidate.rating}</span>
            <span className="text-body-sm text-on-surface-variant">based on {candidate.reviewsCount} verified project reviews</span>
          </div>
          <p className="text-body-md text-on-surface-variant italic border-l-2 border-primary-container pl-4">
            "K.Thulaanchan delivered high-performance FastAPI endpoints on time and collaborated smoothly with the frontend team. Highly recommended collaborator!"
          </p>
        </div>
      )}

      {/* Connect Modal */}
      <ModalContainer
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        title={`Connect with ${candidate.candidateName}`}
      >
        <div className="flex flex-col gap-4">
          <Textarea
            label="Invitation Message"
            rows={4}
            value={connectMessage}
            onChange={(e) => setConnectMessage(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-border-standard">
            <SecondaryButton onClick={() => setIsConnectModalOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton icon="send" iconPosition="right" onClick={handleSendConnect}>
              Send Connection Request
            </PrimaryButton>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};
