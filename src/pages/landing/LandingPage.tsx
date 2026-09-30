import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const categories = [
    {
      title: 'Study Partner',
      desc: 'Learn together and master coursework',
      icon: 'school',
      iconBg: 'bg-[#eaddff]/50 text-[#630ed4]',
    },
    {
      title: 'Project Partner',
      desc: 'Build portfolio-ready projects together',
      icon: 'code',
      iconBg: 'bg-[#d8e2ff]/50 text-[#0058be]',
    },
    {
      title: 'Hackathon Team',
      desc: 'Form winning teams for hackathons',
      icon: 'emoji_events',
      iconBg: 'bg-[#eaddff]/50 text-[#630ed4]',
    },
    {
      title: 'Skill Exchange',
      desc: 'Teach what you know, learn what you need',
      icon: 'swap_horiz',
      iconBg: 'bg-[#d8e2ff]/50 text-[#0058be]',
    },
    {
      title: 'Startup Partner',
      desc: 'Find co-founders and launch new ideas',
      icon: 'rocket_launch',
      iconBg: 'bg-[#eaddff]/50 text-[#630ed4]',
    },
  ];

  const popularSkills = [
    'Python',
    'Angular',
    'Machine Learning',
    'UI/UX',
    'C#',
    'SQL',
    'React',
    'Flutter',
    'Data Science',
  ];

  const recentlyJoined = [
    {
      initials: 'KT',
      name: 'K.Thulaanchan',
      school: 'Stanford University',
      color: 'text-[#630ed4]',
      candidateId: 'cand-001',
    },
    {
      initials: 'VV',
      name: 'V.Vishanan',
      school: 'MIT',
      color: 'text-[#0058be]',
      candidateId: 'cand-002',
    },
    {
      initials: 'SP',
      name: 'S.Priyanka',
      school: 'UC Berkeley',
      color: 'text-[#7c3aed]',
      candidateId: 'cand-003',
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col items-center bg-[#f8f9ff]">
      {/* Hero Section (Dark navy-to-purple background block) */}
      <section
        id="home"
        className="w-full bg-gradient-to-r from-[#0b1c30] via-[#131b2e] to-[#25005a] border-b border-slate-800 text-white py-12 px-8"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6 items-center">
          {/* Left Text Cluster */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <h1 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight leading-tight">
              Find the right person to learn,{' '}
              <span className="text-purple-400">build and grow</span> with.
            </h1>
            <p className="text-[16px] text-[#dce9ff] max-w-xl">
              Connect with students, developers and creators for study, projects, hackathons and
              more.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/register')}
                className="h-[42px] px-[18px] rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#2170e4] text-white text-[14px] font-medium shadow-md hover:brightness-105 transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                type="button"
              >
                <span>Find a Partner</span>
                <MaterialIcon icon="arrow_forward" size={18} />
              </button>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="h-[42px] px-4 rounded-lg border border-slate-400 text-white hover:bg-white/10 text-[14px] font-medium transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                type="button"
              >
                <MaterialIcon icon="play_circle" size={18} />
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Side Illustration Container */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] h-[310px] rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl relative bg-[#0b1c30]">
              <img
                alt="Collaborative university students using PartnerFinder AI"
                className="w-full h-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1tynpzKKdWQ08o8m37xatFM4IpVemjOC7t5OJujpiVnhoEwBPuXDyitnKF7zr5BDgVIVr9Q8f1i1cSDqhPB53NNb2t56EsN0p7NheOz5edcOOrURqU84HPMs7yUzjzal6gTvV4HqqlPnV9aKiaAjvCCBOs8DnbjrzLAZftEAzJtoAc6JClq8f4Y7ub5e8q4kK2QUf1oyMvYzF_qWKbGznIg7NJiIl-L8zz-20v7HtRxBGWF1x-cIayQ"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Five Cards Section Directly Below Hero */}
      <section className="w-full px-8 py-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() => navigate(`/register?type=${encodeURIComponent(cat.title)}`)}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-150 flex flex-col cursor-pointer hover:border-[#7c3aed]/40"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${cat.iconBg}`}
              >
                <MaterialIcon icon={cat.icon} size={22} />
              </div>
              <h3 className="text-[16px] font-semibold text-[#0b1c30] mb-1">{cat.title}</h3>
              <p className="text-[12px] text-[#474e64]">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works? Section */}
      <section
        className="w-full px-8 py-10 max-w-[1440px] mx-auto border-t border-slate-200"
        id="how-it-works"
      >
        <div className="mb-8">
          <h2 className="text-[24px] font-semibold text-[#0b1c30] tracking-tight">
            How it works?
          </h2>
          <p className="text-[14px] text-[#474e64]">
            A direct three-step progression to start collaborating immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div
            onClick={() => navigate('/register')}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative cursor-pointer hover:border-[#0b1c30]/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-full bg-[#0b1c30] text-white flex items-center justify-center font-bold text-[12px]">
                1
              </span>
              <MaterialIcon icon="badge" size={20} className="text-slate-400" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#0b1c30] mb-1">Create Profile</h3>
            <p className="text-[14px] text-[#474e64]">
              List your target goals, universities, and technical skillset.
            </p>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => navigate('/matches')}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative cursor-pointer hover:border-[#630ed4]/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-full bg-[#630ed4] text-white flex items-center justify-center font-bold text-[12px]">
                2
              </span>
              <MaterialIcon icon="person_search" size={20} className="text-slate-400" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#0b1c30] mb-1">Find Partners</h3>
            <p className="text-[14px] text-[#474e64]">
              AI calculates skill affinity and matches mutual requirements.
            </p>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => navigate('/workspace/ai-event-assistant')}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col relative cursor-pointer hover:border-[#0058be]/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-full bg-[#0058be] text-white flex items-center justify-center font-bold text-[12px]">
                3
              </span>
              <MaterialIcon icon="handshake" size={20} className="text-slate-400" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#0b1c30] mb-1">
              Connect & Collaborate
            </h3>
            <p className="text-[14px] text-[#474e64]">
              Initiate workspace chats, plan milestones, and ship together.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Section: 3 Clean Columns (Popular Skills, Recently Joined, Success Stories) */}
      <section
        className="w-full px-8 py-10 max-w-[1440px] mx-auto border-t border-slate-200 mb-6"
        id="success-stories"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Area 1: Popular Skills */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon icon="trending_up" size={20} className="text-[#630ed4]" />
              <h3 className="text-[16px] font-semibold text-[#0b1c30]">Popular Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {popularSkills.map((skill) => (
                <span
                  key={skill}
                  onClick={() => navigate(`/matches?skill=${encodeURIComponent(skill)}`)}
                  className="h-[24px] px-2.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-[12px] font-medium flex items-center cursor-pointer hover:bg-[#BAE6FD]/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Area 2: Recently Joined */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MaterialIcon icon="group" size={20} className="text-[#0058be]" />
              <h3 className="text-[16px] font-semibold text-[#0b1c30]">Recently Joined</h3>
            </div>
            <div className="space-y-3">
              {recentlyJoined.map((student) => (
                <div
                  key={student.name}
                  onClick={() => navigate(`/candidates/${student.candidateId}`)}
                  className="flex items-center gap-3 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[12px] ${student.color}`}
                  >
                    {student.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#0b1c30] truncate">
                      {student.name}
                    </p>
                    <span className="inline-block text-[11px] font-medium text-[#474e64] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {student.school}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Area 3: Success Stories */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MaterialIcon icon="format_quote" size={20} className="text-purple-600" />
                <h3 className="text-[16px] font-semibold text-[#0b1c30]">Success Stories</h3>
              </div>
              <p className="text-[14px] text-[#474e64] italic leading-relaxed">
                "Through PartnerFinder AI, I matched with an ML engineer from Georgia Tech in under
                24 hours. Together, we designed and shipped our neural model for the global health
                AI challenge."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-[#0b1c30]">Elena Rostova</p>
                <p className="text-[11px] text-[#474e64]">CS & AI Student Researcher</p>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                1st Place AI Hackathon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Preview Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#0b1c30] text-white border border-slate-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <MaterialIcon icon="play_circle" size={22} className="text-purple-400" />
                <h4 className="text-[16px] font-bold">PartnerFinder AI Platform Demo</h4>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="my-6 aspect-video bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#2170e4] flex items-center justify-center text-white mb-3 shadow-lg">
                <MaterialIcon icon="play_arrow" size={28} />
              </div>
              <p className="text-[14px] font-medium text-[#dce9ff]">
                Interactive Matchmaking & Collaboration Walkthrough
              </p>
              <p className="text-[12px] text-slate-400 mt-1">
                See how algorithmic pairing and workspace milestone management work in practice.
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 text-[14px] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  navigate('/register');
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#2170e4] text-white text-[14px] font-medium hover:brightness-105 cursor-pointer"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
