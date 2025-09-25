import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AuthorProfile = ({ author }) => {
  return (
    <div className="bg-muted/50 rounded-xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={author?.avatar}
              alt={author?.name}
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover"
            />
            {author?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center border-2 border-background">
                <Icon name="Check" size={14} color="black" strokeWidth={3} />
              </div>
            )}
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-headline font-bold text-xl text-foreground">{author?.name}</h3>
                {author?.isExpert && (
                  <span className="inline-flex items-center px-2 py-1 bg-cyber-green/10 text-cyber-green text-xs font-mono font-semibold rounded border border-cyber-green/20">
                    ЕКСПЕРТ
                  </span>
                )}
              </div>
              <p className="font-cta font-medium text-primary mb-3">{author?.role}</p>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                {author?.bio}
              </p>
              
              {/* Author Stats */}
              <div className="flex items-center space-x-6 text-sm text-text-secondary mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={16} />
                  <span>{author?.articlesCount} статии</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} />
                  <span>{author?.followers?.toLocaleString('bg-BG')} последователи</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Award" size={16} />
                  <span>{author?.yearsExperience}+ години опит</span>
                </div>
              </div>
            </div>

            {/* Follow Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
              className="self-start"
            >
              Последвайте
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <span className="text-sm font-cta font-medium text-text-secondary">Свържете се:</span>
            {author?.socialLinks?.map((link) => (
              <a
                key={link?.platform}
                href={link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-background transition-colors text-text-secondary hover:text-foreground"
                title={link?.platform}
              >
                <Icon 
                  name={link?.platform === 'twitter' ? 'Twitter' : 
                        link?.platform === 'linkedin' ? 'Linkedin' : 
                        link?.platform === 'github' ? 'Github' : 'Globe'} 
                  size={18} 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;