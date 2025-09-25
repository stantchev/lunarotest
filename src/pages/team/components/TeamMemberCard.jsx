import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TeamMemberCard = ({ member, achievements }) => {
  const [activeTab, setActiveTab] = useState('bio');

  const tabs = [
    { id: 'bio', label: 'Биография', icon: 'User' },
    { id: 'expertise', label: 'Експертиза', icon: 'Brain' },
    { id: 'certifications', label: 'Сертификати', icon: 'Award' },
    { id: 'achievements', label: 'Постижения', icon: 'Trophy' }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-cyber-green/10 p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="relative">
              <img
                src={member?.image}
                alt={member?.name}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-3 -right-3 bg-success rounded-full p-2 border-4 border-card">
                <Icon name="CheckCircle" size={16} color="white" />
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-headline font-bold text-3xl text-foreground mb-2">
                {member?.name}
              </h2>
              <p className="text-lg text-primary font-cta font-semibold mb-4">
                {member?.role}
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-3 mb-6">
                <a
                  href={`mailto:${member?.socialMedia?.email}`}
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  title="Email"
                >
                  <Icon name="Mail" size={18} />
                </a>
                <a
                  href={member?.socialMedia?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  title="LinkedIn"
                >
                  <Icon name="Linkedin" size={18} />
                </a>
                <a
                  href={member?.socialMedia?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  title="Twitter"
                >
                  <Icon name="Twitter" size={18} />
                </a>
                <a
                  href={member?.socialMedia?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  title="GitHub"
                >
                  <Icon name="Github" size={18} />
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="font-bold text-lg text-foreground">{member?.stats?.articlesWritten}</div>
                  <div className="text-xs text-text-secondary">Статии</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-foreground">{member?.stats?.yearsExperience}+</div>
                  <div className="text-xs text-text-secondary">Години</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-foreground">{member?.stats?.certificationsHeld}</div>
                  <div className="text-xs text-text-secondary">Сертификата</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-foreground">{member?.stats?.companiesAdvised}</div>
                  <div className="text-xs text-text-secondary">Компании</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-6 py-4 font-cta font-medium transition-colors ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                {tab?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'bio' && (
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed">
                {member?.bio}
              </p>
            </div>
          )}

          {activeTab === 'expertise' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {member?.expertise?.map((skill, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="font-cta font-semibold text-foreground">{skill}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-4">
              {member?.certifications?.map((cert, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="Award" size={24} className="text-success" />
                  <div>
                    <h4 className="font-cta font-semibold text-foreground">{cert}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements?.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-r from-accent/10 to-primary/5 border border-accent/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <Icon name={achievement?.icon} size={20} color="white" />
                    </div>
                    <div>
                      <h4 className="font-cta font-semibold text-foreground mb-1">
                        {achievement?.title}
                      </h4>
                      <p className="text-sm text-text-secondary mb-1">
                        {achievement?.source}
                      </p>
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                        {achievement?.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;