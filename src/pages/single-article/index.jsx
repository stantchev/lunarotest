import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ArticleHeader from './components/ArticleHeader';
import ReadingProgress from './components/ReadingProgress';
import ArticleContent from './components/ArticleContent';
import SocialShare from './components/SocialShare';
import AuthorProfile from './components/AuthorProfile';
import RelatedArticles from './components/RelatedArticles';
import NewsletterSignup from './components/NewsletterSignup';
import CommentSection from './components/CommentSection';
import ArticleActions from './components/ArticleActions';

const SingleArticle = () => {
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowProgress(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock article data
  const article = {
    id: 1,
    title: "Нови киберзаплахи в България: Как да защитим личните си данни в дигиталната ера",
    subtitle: "Експертен анализ на най-актуалните заплахи за кибер сигурността и практически съвети за защита на личната информация в интернет пространството.",
    category: "киберсигурност",
    isBreaking: true,
    views: 15420,
    publishedDate: "24.09.2024",
    readingTime: 8
  };

  const author = {
    name: "Д-р Петър Георгиев",
    role: "Старши експерт по кибер сигурност",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    isVerified: true,
    isExpert: true,
    bio: "Д-р Георгиев е водещ специалист в областта на кибер сигурността с над 15 години опит в защитата на критична инфраструктура. Автор на множество научни публикации и консултант на правителствени институции.",
    articlesCount: 127,
    followers: 8500,
    yearsExperience: 15,
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/pgeorgiev' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/pgeorgiev' },
      { platform: 'github', url: 'https://github.com/pgeorgiev' }
    ]
  };

  const featuredImage = {
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Кибер сигурност и защита на данни",
    caption: "Модерните киберзаплахи изискват нови подходи за защита на личните данни"
  };

  const content = {
    paragraphs: [
      {
        type: 'text',
        content: 'В последните месеци България се сблъсква с нарастващ брой кибератаки, насочени към както институции, така и към обикновени граждани. Според последните данни от Държавната агенция "Електронно управление", броят на регистрираните инциденти е нараснал с 340% спрямо същия период от миналата година.'
      },
      {
        type: 'heading',
        content: 'Основни видове заплахи'
      },
      {
        type: 'text',
        content: 'Киберпрестъпниците използват все по-софистицирани методи за достъп до лични данни. Най-разпространените атаки включват фишинг имейли, злонамерен софтуер и социално инженерство.'
      },
      {
        type: 'list',
        items: [
          'Фишинг атаки чрез имейл и SMS съобщения',
          'Ransomware атаки срещу малки и средни предприятия',
          'Кражба на самоличност чрез социални мрежи',
          'Компрометиране на банкови сметки',
          'Атаки срещу IoT устройства в домашни мрежи'
        ]
      },
      {
        type: 'quote',
        content: 'Кибер сигурността не е технологичен проблем, а човешки. Най-голямата заплаха идва от липсата на образование и осведоменост.',
        author: 'Д-р Петър Георгиев, експерт по кибер сигурност'
      },
      {
        type: 'heading',
        content: 'Практически мерки за защита'
      },
      {
        type: 'text',
        content: 'Защитата на личните данни започва с основни мерки за сигурност, които всеки потребител може да приложи в ежедневието си.'
      },
      {
        type: 'warning',
        content: 'Никога не споделяйте лични данни или пароли чрез имейл или телефон. Банките и официалните институции никога няма да поискат такава информация по този начин.'
      },
      {
        type: 'code',
        content: `// Пример за силна парола
const strongPassword = generatePassword({
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true
});

// Използвайте различни пароли за всеки акаунт
const accounts = {
  email: 'MyStr0ng3m@il!',
  banking: 'B@nk1ng$ecur3',
  social: 'S0c1@lM3d1@!'
};`
      },
      {
        type: 'text',
        content: 'Внедряването на двуфакторна автентификация (2FA) е една от най-ефективните мерки за защита. Тя добавя допълнителен слой сигурност, който прави компрометирането на акаунти значително по-трудно.'
      }
    ],
    tags: ['кибер-сигурност', 'защита-данни', 'фишинг', 'двуфакторна-автентификация', 'България', 'дигитална-безопасност']
  };

  const relatedArticles = [
    {
      id: 2,
      title: "AI алгоритмите на Google: Новите промени в SEO за 2024",
      excerpt: "Анализ на последните обновления в алгоритмите за търсене и тяхното влияние върху SEO стратегиите.",
      category: "seo",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      publishedDate: "22.09.2024",
      readingTime: 6,
      views: 8900
    },
    {
      id: 3,
      title: "ChatGPT-4 срещу Claude: Сравнение на възможностите",
      excerpt: "Детайлно сравнение между най-популярните AI асистенти и техните приложения в бизнеса.",
      category: "ai",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      publishedDate: "20.09.2024",
      readingTime: 10,
      views: 12300
    },
    {
      id: 4,
      title: "Защита на корпоративни мрежи: Най-добри практики",
      excerpt: "Ръководство за IT администратори за изграждане на сигурна корпоративна инфраструктура.",
      category: "киберсигурност",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      publishedDate: "18.09.2024",
      readingTime: 12,
      views: 6700
    }
  ];

  return (
    <>
      <Helmet>
        <title>{article?.title} | Linaro News</title>
        <meta name="description" content={article?.subtitle} />
        <meta property="og:title" content={article?.title} />
        <meta property="og:description" content={article?.subtitle} />
        <meta property="og:image" content={featuredImage?.url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article?.title} />
        <meta name="twitter:description" content={article?.subtitle} />
        <meta name="twitter:image" content={featuredImage?.url} />
        <link rel="canonical" href="https://linaronews.bg/single-article" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <ReadingProgress isVisible={showProgress} />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <ArticleHeader 
              article={article}
              author={author}
              readingTime={article?.readingTime}
              publishedDate={article?.publishedDate}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <ArticleContent 
                  content={content}
                  featuredImage={featuredImage}
                />

                <SocialShare article={article} />

                <AuthorProfile author={author} />

                <CommentSection articleId={article?.id} />
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  <NewsletterSignup />
                </div>
              </div>
            </div>

            <RelatedArticles articles={relatedArticles} />
          </div>
        </main>

        <SocialShare article={article} isSticky />
        <ArticleActions />
      </div>
    </>
  );
};

export default SingleArticle;