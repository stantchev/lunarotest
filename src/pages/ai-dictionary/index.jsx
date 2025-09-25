import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import DictionaryHeroSection from './components/DictionaryHeroSection';
import SearchBar from './components/SearchBar';
import AlphabetFilter from './components/AlphabetFilter';
import CategoryFilter from './components/CategoryFilter';
import DictionaryTermCard from './components/DictionaryTermCard';
import BookmarkModal from './components/BookmarkModal';
import ContributeModal from './components/ContributeModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AIDictionaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [contributeModalOpen, setContributeModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [bookmarkedTerms, setBookmarkedTerms] = useState([]);

  // Mock dictionary data
  const mockDictionaryTerms = [
    {
      id: 1,
      termBg: "Изкуствен интелект",
      termEn: "Artificial Intelligence (AI)",
      definition: "Област от компютърните науки, която се занимава със създаването на системи способни да изпълняват задачи, които обикновено изискват човешки интелект.",
      practicalExample: "ChatGPT е пример за AI система, която може да води разговори и отговаря на въпроси на естествен език.",
      category: "Основни понятия",
      difficulty: "beginner",
      relatedTerms: ["Машинно обучение", "Невронни мрежи", "Обработка на естествен език"],
      businessContext: "В бизнеса AI се използва за автоматизация на процеси, анализ на данни и подобряване на клиентското обслужване.",
      views: 15647,
      bookmarks: 892,
      lastUpdated: "15 септември 2024"
    },
    {
      id: 2,
      termBg: "Машинно обучение",
      termEn: "Machine Learning (ML)",
      definition: "Подобласт на изкуствения интелект, която позволява на компютърните системи автоматично да се учат и подобряват от опит без да бъдат изрично програмирани.",
      practicalExample: "Препоръчителните системи в Netflix използват машинно обучение за да предлагат филми според вашите предпочитания.",
      category: "Машинно обучение",
      difficulty: "intermediate",
      relatedTerms: ["Изкуствен интелект", "Алгоритъм", "Данни за обучение"],
      businessContext: "Компаниите използват ML за прогнозиране на продажби, оптимизация на реклами и откриване на измами.",
      views: 12453,
      bookmarks: 756,
      lastUpdated: "18 септември 2024"
    },
    {
      id: 3,
      termBg: "Невронна мрежа",
      termEn: "Neural Network",
      definition: "Изчислителен модел, вдъхновен от биологичните невронни мрежи, който се състои от взаимосвързани възли (неврони), обработващи информация.",
      practicalExample: "Системите за разпознаване на лица във Facebook използват дълбоки невронни мрежи за идентифициране на хора на снимки.",
      category: "Невронни мрежи",
      difficulty: "advanced",
      relatedTerms: ["Дълбоко обучение", "Неврон", "Слой", "Активационна функция"],
      businessContext: "Невронните мрежи се използват в банките за оценка на кредитни рискове и в медицината за диагностика.",
      views: 8934,
      bookmarks: 445,
      lastUpdated: "20 септември 2024"
    },
    {
      id: 4,
      termBg: "Компютърно зрение",
      termEn: "Computer Vision",
      definition: "Област на изкуствения интелект, която се фокусира върху способността на машините да интерпретират и разбират визуалната информация от света.",
      practicalExample: "Автономните коли използват компютърно зрение за разпознаване на пътни знаци, пешеходци и други превозни средства.",
      category: "Компютърно зрение",
      difficulty: "intermediate",
      relatedTerms: ["Обработка на изображения", "Разпознаване на образи", "OpenCV"],
      businessContext: "В търговията се използва за автоматизирано сканиране на продукти и контрол на качеството в производството.",
      views: 7621,
      bookmarks: 389,
      lastUpdated: "22 септември 2024"
    },
    {
      id: 5,
      termBg: "Обработка на естествен език",
      termEn: "Natural Language Processing (NLP)",
      definition: "Подобласт на изкуствения интелект, която се занимава с взаимодействието между компютри и човешки език.",
      practicalExample: "Google Translate използва NLP техники за превод на текст между различни езици.",
      category: "Обработка на език",
      difficulty: "intermediate",
      relatedTerms: ["Анализ на тон", "Извличане на ключови думи", "Чатботове"],
      businessContext: "NLP се използва за анализ на отзиви от клиenti, автоматизация на customer support и обобщаване на документи.",
      views: 6789,
      bookmarks: 334,
      lastUpdated: "19 септември 2024"
    }
  ];

  const categories = [
    "Всички категории",
    "Основни понятия", 
    "Машинно обучение",
    "Невронни мрежи",
    "Компютърно зрение",
    "Обработка на език",
    "AI етика",
    "Бизнес AI"
  ];

  const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ю', 'Я'];

  // Filter terms based on search and filters
  useEffect(() => {
    let filtered = mockDictionaryTerms;

    if (searchTerm) {
      filtered = filtered?.filter(term => 
        term?.termBg?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        term?.termEn?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        term?.definition?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (selectedLetter) {
      filtered = filtered?.filter(term => 
        term?.termBg?.charAt(0)?.toUpperCase() === selectedLetter
      );
    }

    if (selectedCategory && selectedCategory !== 'Всички категории') {
      filtered = filtered?.filter(term => term?.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered?.filter(term => term?.difficulty === selectedDifficulty);
    }

    setFilteredTerms(filtered);
  }, [searchTerm, selectedLetter, selectedCategory, selectedDifficulty]);

  // Initialize with all terms
  useEffect(() => {
    setFilteredTerms(mockDictionaryTerms);
  }, []);

  const handleBookmark = (term) => {
    setSelectedTerm(term);
    setBookmarkModalOpen(true);
  };

  const handleShare = (term) => {
    if (navigator?.share) {
      navigator.share({
        title: `AI Речник: ${term?.termBg}`,
        text: term?.definition,
        url: `${window.location?.origin}/ai-dictionary#${term?.id}`
      });
    } else {
      navigator?.clipboard?.writeText(`${window.location?.origin}/ai-dictionary#${term?.id}`);
      alert('Линкът е копиран в клипборда!');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLetter('');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  return (
    <>
      <Helmet>
        <title>AI Речник - Българска терминология за изкуствен интелект | Linaro News</title>
        <meta 
          name="description" 
          content="Comprehensive Bulgarian-language artificial intelligence terminology resource providing clear definitions and practical context for AI concepts. Interactive dictionary with search functionality and category filtering." 
        />
        <meta name="keywords" content="AI речник, изкуствен интелект терминология, машинно обучение, български AI речник, технически термини" />
        <meta property="og:title" content="AI Речник - Българска терминология за изкуствен интелект | Linaro News" />
        <meta property="og:description" content="Интерактивен речник с AI термини на български език, ясни обяснения и практически примери." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linaronews.bg/ai-dictionary" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Речник - Българска терминология за изкуствен интелект" />
        <meta name="twitter:description" content="Интерактивен речник с AI термини на български език" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop" />
        <link rel="canonical" href="https://linaronews.bg/ai-dictionary" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Речник - Българска терминология за изкуствен интелект",
            "description": "Comprehensive Bulgarian-language artificial intelligence terminology resource providing clear definitions and practical context for AI concepts",
            "url": "https://linaronews.bg/ai-dictionary",
            "inLanguage": "bg-BG",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Linaro News",
              "url": "https://linaronews.bg"
            },
            "about": {
              "@type": "Thing",
              "name": "AI терминология",
              "description": "Българска терминология за изкуствен интелект и машинно обучение"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <DictionaryHeroSection />
          
          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Search and Filters */}
            <div className="mb-12">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onVoiceSearch={() => {}}
              />
              
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AlphabetFilter
                  alphabet={alphabet}
                  selectedLetter={selectedLetter}
                  onLetterSelect={setSelectedLetter}
                />
                
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  onDifficultySelect={setSelectedDifficulty}
                />
                
                <div className="flex flex-col space-y-4">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                    iconName="X"
                    iconPosition="left"
                  >
                    Изчисти филтрите
                  </Button>
                  
                  <Button
                    variant="default"
                    onClick={() => setContributeModalOpen(true)}
                    className="w-full bg-ai-blue hover:bg-ai-blue/90"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Предложи термин
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-headline font-bold text-2xl text-foreground mb-2">
                  AI Терминология
                </h2>
                <p className="font-body text-text-secondary">
                  {filteredTerms?.length} {filteredTerms?.length === 1 ? 'термин намерен' : 'термина намерени'}
                  {(searchTerm || selectedLetter || selectedCategory || selectedDifficulty) && ' с приложени филтри'}
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} className="text-amber-500" />
                  <span className="font-cta text-sm text-text-secondary">
                    {bookmarkedTerms?.length} запазени
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBookmarkModalOpen(true)}
                  iconName="BookOpen"
                >
                  Моите термини
                </Button>
              </div>
            </div>
            
            {/* Dictionary Terms */}
            <div className="grid gap-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ai-blue mx-auto mb-4"></div>
                  <p className="font-body text-text-secondary">Зареждане на термини...</p>
                </div>
              ) : filteredTerms?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-6">
                    <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="font-headline font-bold text-xl text-foreground mb-2">
                      Няма намерени резултати
                    </h3>
                    <p className="font-body text-text-secondary mb-6">
                      Опитайте с различни ключови думи или изчистете филтрите
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      iconName="RotateCcw"
                    >
                      Изчисти филтрите
                    </Button>
                  </div>
                </div>
              ) : (
                filteredTerms?.map((term) => (
                  <DictionaryTermCard
                    key={term?.id}
                    term={term}
                    onBookmark={handleBookmark}
                    onShare={handleShare}
                    isBookmarked={bookmarkedTerms?.includes(term?.id)}
                  />
                ))
              )}
            </div>
            
            {/* Load More Button */}
            {!loading && filteredTerms?.length > 0 && filteredTerms?.length >= 10 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-ai-blue text-ai-blue hover:bg-ai-blue hover:text-white"
                  iconName="ChevronDown"
                >
                  Зареди още термини
                </Button>
              </div>
            )}
          </div>
        </main>

        {/* Modals */}
        <BookmarkModal
          isOpen={bookmarkModalOpen}
          onClose={() => setBookmarkModalOpen(false)}
          term={selectedTerm}
          bookmarkedTerms={bookmarkedTerms}
          onBookmarkUpdate={setBookmarkedTerms}
        />
        
        <ContributeModal
          isOpen={contributeModalOpen}
          onClose={() => setContributeModalOpen(false)}
        />

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-headline font-bold text-lg text-foreground mb-4">
                  За AI Речника
                </h3>
                <p className="font-body text-text-secondary leading-relaxed mb-4">
                  Нашият AI речник предлага ясни и практични обяснения на термини от областта 
                  на изкуствения интелект на български език. Създаден от експерти за българската публика.
                </p>
              </div>
              
              <div>
                <h3 className="font-headline font-bold text-lg text-foreground mb-4">
                  Полезни връзки
                </h3>
                <ul className="space-y-2 font-body text-text-secondary">
                  <li><a href="/ai-category" className="hover:text-ai-blue transition-colors">AI Категория</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Практически ръководства</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">AI Инструменти</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Експертни мнения</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-headline font-bold text-lg text-foreground mb-4">
                  Статистики
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-body text-text-secondary">Общо термини:</span>
                    <span className="font-cta font-medium text-foreground">{mockDictionaryTerms?.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-text-secondary">Категории:</span>
                    <span className="font-cta font-medium text-foreground">{categories?.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-text-secondary">Последна актуализация:</span>
                    <span className="font-cta font-medium text-foreground">23 септември 2024</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 mt-8 text-center">
              <p className="font-body text-text-secondary">
                © {new Date()?.getFullYear()} Linaro News. Всички права запазени. 
                AI Речник - първният български терминологичен ресурс за изкуствен интелект.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AIDictionaryPage;