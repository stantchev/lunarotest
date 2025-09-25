import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "Георги Петров",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        isVerified: true
      },
      content: "Много полезна статия! Особено частта за двуфакторната автентификация. Препоръчвам на всички да я прочетат.",
      timestamp: "преди 2 часа",
      likes: 12,
      replies: [
        {
          id: 11,
          author: {
            name: "Мария Иванова",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            isVerified: false
          },
          content: "Съгласна съм! Аз вече внедрих тези мерки в компанията си.",
          timestamp: "преди 1 час",
          likes: 5
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Димитър Стоянов",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        isVerified: false
      },
      content: "Имате ли препоръки за конкретни инструменти за мониторинг на сигурността? Търся нещо подходящо за малка фирма.",
      timestamp: "преди 4 часа",
      likes: 8,
      replies: []
    },
    {
      id: 3,
      author: {
        name: "Елена Николова",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        isVerified: true
      },
      content: "Отлична статия! Бихте ли могли да напишете продължение за корпоративната сигурност?",
      timestamp: "преди 6 часа",
      likes: 15,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = (e) => {
    e?.preventDefault();
    if (!newComment?.trim()) return;

    const comment = {
      id: Date.now(),
      author: {
        name: "Вие",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        isVerified: false
      },
      content: newComment,
      timestamp: "току-що",
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (commentId) => {
    if (!replyText?.trim()) return;

    const reply = {
      id: Date.now(),
      author: {
        name: "Вие",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        isVerified: false
      },
      content: replyText,
      timestamp: "току-що",
      likes: 0
    };

    setComments(comments?.map(comment => 
      comment?.id === commentId 
        ? { ...comment, replies: [...comment?.replies, reply] }
        : comment
    ));
    
    setReplyText('');
    setReplyingTo(null);
  };

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-12' : ''} mb-6`}>
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={comment?.author?.avatar}
              alt={comment?.author?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {comment?.author?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyber-green rounded-full flex items-center justify-center border-2 border-background">
                <Icon name="Check" size={10} color="black" strokeWidth={3} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-cta font-semibold text-foreground">{comment?.author?.name}</h4>
              <span className="text-xs text-text-secondary">{comment?.timestamp}</span>
            </div>
            <p className="font-body text-foreground leading-relaxed">{comment?.content}</p>
          </div>

          <div className="flex items-center space-x-4 mt-2 text-sm">
            <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors">
              <Icon name="ThumbsUp" size={14} />
              <span>{comment?.likes}</span>
            </button>
            {!isReply && (
              <button 
                onClick={() => setReplyingTo(comment?.id)}
                className="text-text-secondary hover:text-primary transition-colors"
              >
                Отговорете
              </button>
            )}
          </div>

          {replyingTo === comment?.id && (
            <div className="mt-4">
              <div className="flex space-x-3">
                <Image
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Вие"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e?.target?.value)}
                    placeholder="Напишете отговор..."
                    className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows="3"
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleSubmitReply(comment?.id)}
                      disabled={!replyText?.trim()}
                    >
                      Отговорете
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                    >
                      Отказ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mt-12">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-1 h-8 bg-gradient-to-b from-cyber-green to-ai-blue rounded-full"></div>
        <h2 className="font-headline font-bold text-2xl text-foreground">
          Коментари ({comments?.length})
        </h2>
      </div>
      {/* Comment Form */}
      <div className="mb-8">
        <form onSubmit={handleSubmitComment}>
          <div className="flex space-x-4">
            <Image
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Вие"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                placeholder="Споделете вашето мнение..."
                className="w-full p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                rows="4"
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-text-secondary">
                  Моля, спазвайте нашите правила за коментиране
                </p>
                <Button
                  type="submit"
                  disabled={!newComment?.trim()}
                  iconName="Send"
                  iconPosition="right"
                >
                  Публикувайте
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Comments List */}
      <div className="space-y-6">
        {comments?.map((comment) => (
          <div key={comment?.id}>
            <CommentItem comment={comment} />
            {comment?.replies?.map((reply) => (
              <CommentItem key={reply?.id} comment={reply} isReply />
            ))}
          </div>
        ))}
      </div>
      {/* Load More Comments */}
      <div className="text-center mt-8">
        <Button variant="outline" iconName="MessageCircle" iconPosition="left">
          Заредете повече коментари
        </Button>
      </div>
    </section>
  );
};

export default CommentSection;