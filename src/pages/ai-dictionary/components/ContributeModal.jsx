import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContributeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    termBg: '',
    termEn: '',
    definition: '',
    practicalExample: '',
    businessContext: '',
    category: '',
    difficulty: 'beginner',
    relatedTerms: '',
    submitterName: '',
    submitterEmail: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Основни понятия',
    'Машинно обучение',
    'Невронни мрежи',
    'Компютърно зрение',
    'Обработка на език',
    'AI етика',
    'Бизнес AI',
    'Друго'
  ];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.termBg?.trim()) newErrors.termBg = 'Българският термин е задължителен';
    if (!formData?.termEn?.trim()) newErrors.termEn = 'Английският термин е задължителен';
    if (!formData?.definition?.trim()) newErrors.definition = 'Определението е задължително';
    if (!formData?.practicalExample?.trim()) newErrors.practicalExample = 'Практическият пример е задължителен';
    if (!formData?.category) newErrors.category = 'Категорията е задължителна';
    if (!formData?.submitterEmail?.trim()) newErrors.submitterEmail = 'Email адресът е задължителен';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData?.submitterEmail && !emailRegex?.test(formData?.submitterEmail)) {
      newErrors.submitterEmail = 'Невалиден email адрес';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      alert('Благодарим за предложението! Терминът ще бъде прегледан от нашия екип.');
      onClose();
      
      // Reset form
      setFormData({
        termBg: '',
        termEn: '',
        definition: '',
        practicalExample: '',
        businessContext: '',
        category: '',
        difficulty: 'beginner',
        relatedTerms: '',
        submitterName: '',
        submitterEmail: '',
        additionalNotes: ''
      });
    } catch (error) {
      alert('Възникна грешка при изпращането. Моля, опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-headline font-bold text-xl text-foreground flex items-center space-x-2">
            <Icon name="Plus" size={24} className="text-ai-blue" />
            <span>Предложи нов термин</span>
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-text-secondary hover:text-foreground"
            iconName="X"
          />
        </div>
        
        {/* Form */}
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Term in Bulgarian */}
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Термин на български *
                  </label>
                  <input
                    type="text"
                    value={formData?.termBg}
                    onChange={(e) => handleInputChange('termBg', e?.target?.value)}
                    placeholder="напр. Изкуствен интелект"
                    className={`w-full px-3 py-2 bg-background border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue ${
                      errors?.termBg ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors?.termBg && <p className="text-red-500 text-sm mt-1">{errors?.termBg}</p>}
                </div>
                
                {/* Term in English */}
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Термин на английски *
                  </label>
                  <input
                    type="text"
                    value={formData?.termEn}
                    onChange={(e) => handleInputChange('termEn', e?.target?.value)}
                    placeholder="напр. Artificial Intelligence"
                    className={`w-full px-3 py-2 bg-background border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue ${
                      errors?.termEn ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors?.termEn && <p className="text-red-500 text-sm mt-1">{errors?.termEn}</p>}
                </div>
                
                {/* Category */}
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Категория *
                  </label>
                  <select
                    value={formData?.category}
                    onChange={(e) => handleInputChange('category', e?.target?.value)}
                    className={`w-full px-3 py-2 bg-background border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue ${
                      errors?.category ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Изберете категория</option>
                    {categories?.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors?.category && <p className="text-red-500 text-sm mt-1">{errors?.category}</p>}
                </div>
                
                {/* Difficulty */}
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Ниво на трудност
                  </label>
                  <select
                    value={formData?.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e?.target?.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue"
                  >
                    <option value="beginner">Начинаещи</option>
                    <option value="intermediate">Напреднали</option>
                    <option value="advanced">Експерти</option>
                  </select>
                </div>
                
                {/* Related Terms */}
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Свързани термини
                    <span className="text-text-secondary font-normal ml-1">(разделени със запетая)</span>
                  </label>
                  <input
                    type="text"
                    value={formData?.relatedTerms}
                    onChange={(e) => handleInputChange('relatedTerms', e?.target?.value)}
                    placeholder="напр. Машинно обучение, Невронни мрежи, Алгоритъм"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue"
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Definition */}
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Определение *
                  </label>
                  <textarea
                    value={formData?.definition}
                    onChange={(e) => handleInputChange('definition', e?.target?.value)}
                    placeholder="Ясно и точно определение на термина..."
                    rows={4}
                    className={`w-full px-3 py-2 bg-background border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue resize-none ${
                      errors?.definition ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors?.definition && <p className="text-red-500 text-sm mt-1">{errors?.definition}</p>}
                </div>
                
                {/* Practical Example */}
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Практически пример *
                  </label>
                  <textarea
                    value={formData?.practicalExample}
                    onChange={(e) => handleInputChange('practicalExample', e?.target?.value)}
                    placeholder="Конкретен пример за използване на термина в реална ситуация..."
                    rows={3}
                    className={`w-full px-3 py-2 bg-background border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue resize-none ${
                      errors?.practicalExample ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors?.practicalExample && <p className="text-red-500 text-sm mt-1">{errors?.practicalExample}</p>}
                </div>
                
                {/* Business Context */}
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Бизнес контекст
                    <span className="text-text-secondary font-normal ml-1">(по избор)</span>
                  </label>
                  <textarea
                    value={formData?.businessContext}
                    onChange={(e) => handleInputChange('businessContext', e?.target?.value)}
                    placeholder="Как се използва терминът в бизнес среда..."
                    rows={3}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue resize-none"
                  />
                </div>
              </div>
            </div>
            
            {/* Submitter Information */}
            <div className="border-t border-border pt-6 mt-8">
              <h3 className="font-headline font-bold text-lg text-foreground mb-4">
                Информация за подаващия
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Име
                    <span className="text-text-secondary font-normal ml-1">(по izbор)</span>
                  </label>
                  <input
                    type="text"
                    value={formData?.submitterName}
                    onChange={(e) => handleInputChange('submitterName', e?.target?.value)}
                    placeholder="Вашето име"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue"
                  />
                </div>
                
                <div>
                  <label className="font-cta font-medium text-foreground mb-2 block">
                    Email адрес *
                  </label>
                  <input
                    type="email"
                    value={formData?.submitterEmail}
                    onChange={(e) => handleInputChange('submitterEmail', e?.target?.value)}
                    placeholder="your.email@example.com"
                    className={`w-full px-3 py-2 bg-background border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue ${
                      errors?.submitterEmail ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors?.submitterEmail && <p className="text-red-500 text-sm mt-1">{errors?.submitterEmail}</p>}
                </div>
              </div>
              
              {/* Additional Notes */}
              <div className="mt-4">
                <label className="font-cta font-medium text-foreground mb-2 block">
                  Допълнителни бележки
                  <span className="text-text-secondary font-normal ml-1">(по избор)</span>
                </label>
                <textarea
                  value={formData?.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
                  placeholder="Допълнителна информация или бележки..."
                  rows={2}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue resize-none"
                />
              </div>
            </div>
            
            {/* Submission Info */}
            <div className="bg-muted border border-border rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-ai-blue mt-0.5" />
                <div>
                  <p className="font-cta font-medium text-foreground mb-1">
                    Процес на одобрение
                  </p>
                  <p className="font-body text-text-secondary text-sm">
                    Всички предложения преминават през редакторски преглед. Ще получите email уведомление 
                    за статуса на предложението ви в рамките на 3-5 работни дни.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex space-x-4 mt-8">
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="flex-1 bg-ai-blue hover:bg-ai-blue/90 disabled:opacity-50"
                iconName={isSubmitting ? 'Loader2' : 'Send'}
              >
                {isSubmitting ? 'Изпраща се...' : 'Изпрати предложение'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Откажи
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributeModal;