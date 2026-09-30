import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';

const partnerCategories = [
  {
    type: 'Study Partner',
    icon: 'menu_book',
    desc: 'Prepare for exams, course modules, or certifications with dedicated study companions.',
  },
  {
    type: 'Project Partner',
    icon: 'rocket_launch',
    desc: 'Build ambitious web, mobile, and AI software applications with complementary engineering skills.',
  },
  {
    type: 'Hackathon Team',
    icon: 'emoji_events',
    desc: 'Form high-performing multidisciplinary squads to win fast-paced hackathons and sprint challenges.',
  },
  {
    type: 'Skill Exchange',
    icon: 'swap_horiz',
    desc: 'Teach frameworks you have mastered and learn cutting-edge tools in peer-to-peer exchanges.',
  },
  {
    type: 'Startup Partner',
    icon: 'lightbulb',
    desc: 'Find technical co-founders and visionary operators to launch early-stage ventures.',
  },
];

const howItWorksSteps = [
  { step: '1', title: 'Create Profile', icon: 'badge', desc: 'Share your background, institutions, technical skills, and collaboration goals.' },
  { step: '2', title: 'Define Requirements', icon: 'person_search', desc: 'Specify project deadlines, tech stack, and weekly hours commitments.' },
  { step: '3', title: 'AI Matchmaking', icon: 'handshake', desc: 'Our algorithmic engine analyzes skills, availability, and interests to find the ideal match.' },
  { step: '4', title: 'Connect & Build', icon: 'trending_up', desc: 'Launch a shared workspace, track milestone progress, and build portfolio projects.' },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed border border-primary-fixed-dim text-primary text-label-sm font-semibold mb-6">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>AI-Powered Matchmaking Engine v4.2</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold font-sans text-on-surface tracking-tight max-w-4xl leading-tight">
          Find the right person to learn,{' '}
          <span className="bg-gradient-to-r from-primary-container to-secondary-container bg-clip-text text-transparent">
            build and grow
          </span>{' '}
          with.
        </h1>

        <p className="text-body-lg text-on-surface-variant max-w-2xl mt-6">
          Connect with vetted students, engineers, and designers for hackathons, study sessions,
          and production-grade projects powered by algorithmic intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link to="/register">
            <PrimaryButton icon="arrow_forward" iconPosition="right" className="h-12 px-7 text-base">
              Find a Partner
            </PrimaryButton>
          </Link>
          <a href="#how-it-works">
            <SecondaryButton icon="play_circle" iconPosition="left" className="h-12 px-6 text-base">
              How It Works
            </SecondaryButton>
          </a>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6 bg-surface-container-lowest border-y border-border-standard">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-headline-lg font-headline-lg font-bold text-on-surface">
              What kind of partner are you looking for?
            </h2>
            <p className="text-body-md text-on-surface-variant mt-2">
              Select your collaboration mode to match with targeted collaborators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {partnerCategories.map((cat) => (
              <Link
                key={cat.type}
                to={`/register?type=${encodeURIComponent(cat.type)}`}
                className="p-6 rounded-xl border border-border-standard bg-surface-container-lowest hover:border-primary-container hover:shadow-elevation-2 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary group-hover:bg-primary-fixed group-hover:text-primary transition-colors mb-4">
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                </div>
                <h3 className="text-headline-sm font-semibold text-on-surface mb-2">{cat.type}</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-headline-lg font-headline-lg font-bold text-on-surface">
            How it works?
          </h2>
          <p className="text-body-md text-on-surface-variant mt-2">
            From initial requirement definition to active project workspace in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-xl border border-border-standard bg-surface-container-lowest shadow-elevation-1 flex flex-col"
            >
              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-label-md mb-4 shadow-sm">
                {step.step}
              </div>
              <h3 className="text-headline-sm font-semibold text-on-surface mb-2">{step.title}</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 bg-nav-rail text-white text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to build your next breakthrough project?
          </h2>
          <p className="text-surface-container-highest text-body-lg mb-8 max-w-xl">
            Join vetted collaborators from top universities and tech communities today.
          </p>
          <Link to="/register">
            <PrimaryButton className="h-12 px-8 text-base">
              Get Started for Free
            </PrimaryButton>
          </Link>
        </div>
      </section>
    </div>
  );
};
