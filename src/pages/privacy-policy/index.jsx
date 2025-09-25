import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  const sections = [
    { id: 'overview', title: 'Общ преглед', icon: 'Eye' },
    { id: 'data-collection', title: 'Събиране на данни', icon: 'Database' },
    { id: 'data-usage', title: 'Използване на данни', icon: 'Settings' },
    { id: 'cookies', title: 'Бисквитки', icon: 'Cookie' },
    { id: 'third-party', title: 'Трети страни', icon: 'ExternalLink' },
    { id: 'security', title: 'Сигурност', icon: 'Shield' },
    { id: 'user-rights', title: 'Вашите права', icon: 'UserCheck' },
    { id: 'gdpr', title: 'GDPR съответствие', icon: 'FileText' },
    { id: 'contact-data', title: 'Контакт за данни', icon: 'Mail' }
  ];

  const cookieTypes = [
    {
      type: 'essential',
      name: 'Необходими бисквитки',
      description: 'Задължителни за функционирането на сайта',
      enabled: true,
      locked: true
    },
    {
      type: 'analytics',
      name: 'Аналитични бисквитки',
      description: 'Google Analytics за анализ на трафика',
      enabled: true,
      locked: false
    },
    {
      type: 'functional',
      name: 'Функционални бисквитки',
      description: 'Запомняне на настройки и предпочитания',
      enabled: true,
      locked: false
    },
    {
      type: 'advertising',
      name: 'Рекламни бисквитки',
      description: 'Персонализирани реклами и съдържание',
      enabled: false,
      locked: false
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyber-green/10 to-ai-blue/10 border border-cyber-green/20 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Icon name="Info" size={24} className="text-cyber-green mt-1" />
                <div>
                  <h3 className="font-cta font-bold text-foreground mb-2">Нашият ангажимент към вашата поверителност</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Linaro News се задължава да защитава личните ви данни в съответствие с най-високите стандарти за сигурност 
                    и прозрачност. Като водеща платформа за технологични новини, ние прилагаме строги мерки за защита на 
                    информацията, която споделяте с нас.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <Icon name="Shield" size={32} className="text-cyber-green mb-4" />
                <h3 className="font-cta font-bold text-foreground mb-2">Защита на данните</h3>
                <p className="text-text-secondary text-sm">
                  Прилагаме SSL криптиране, редовни сигурностни одити и съхранение на данни в защитени сървъри в ЕС.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <Icon name="Eye" size={32} className="text-ai-blue mb-4" />
                <h3 className="font-cta font-bold text-foreground mb-2">Прозрачност</h3>
                <p className="text-text-secondary text-sm">
                  Пълна информация за начините, по които събираме, използваме и защитаваме вашите лични данни.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <Icon name="UserCheck" size={32} className="text-accent mb-4" />
                <h3 className="font-cta font-bold text-foreground mb-2">Вашият контрол</h3>
                <p className="text-text-secondary text-sm">
                  Пълни права за достъп, редактиране, изтегляне и изтриване на вашите лични данни по всяко време.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <Icon name="Scale" size={32} className="text-success mb-4" />
                <h3 className="font-cta font-bold text-foreground mb-2">GDPR съответствие</h3>
                <p className="text-text-secondary text-sm">
                  Пълно съответствие с европейските разпоредби за защита на личните данни и българското законодателство.
                </p>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="Clock" size={20} className="text-warning mt-1" />
                <div>
                  <h4 className="font-cta font-semibold text-foreground mb-2">Актуализация на политиката</h4>
                  <p className="text-text-secondary text-sm mb-3">
                    Последна актуализация: 24 септември 2024 г. | Влиза в сила: незабавно
                  </p>
                  <p className="text-text-secondary text-sm">
                    Ще ви уведомим за всички съществени промени чрез имейл или известие на сайта поне 30 дни преди влизането им в сила.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data-collection':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-cta font-bold text-foreground mb-4">Какви данни събираме</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Ние събираме различни типове информация, за да ви предоставим най-добрата възможна услуга и 
                да защитим нашата платформа от злоупотреби.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="User" size={24} className="text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Лични данни, които предоставяте:</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Име и имейл адрес при записване за бюлетин</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Контактна информация при изпращане на запитвания</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Коментари и отзиви, които публикувате</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Предпочитания за съдържание и категории</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Activity" size={24} className="text-cyber-green mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Автоматично събирани данни:</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>IP адрес и местоположение (за сигурност и локализация)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Тип браузър и операционна система</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Страници, които посещавате и време на престой</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Реферални източници и търсещи заявки</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Взаимодействия със съдържанието (кликове, споделяния)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Shield" size={24} className="text-ai-blue mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Данни за сигурност:</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Логове за сигурност и опити за неоторизиран достъп</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Данни за предотвратяване на злоупотреби и спам</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Резервни копия за възстановяване на данни</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-info/10 border border-info/20 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-info mt-1" />
                <div>
                  <h4 className="font-cta font-semibold text-foreground mb-2">Важна информация</h4>
                  <p className="text-text-secondary text-sm">
                    Никога не събираме чувствителни данни като номера на кредитни карти, лични номера или парóли. 
                    Всички данни се събират за легитимни бизнес цели и се обработват според принципа на минимизация на данните.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data-usage':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-cta font-bold text-foreground mb-4">Как използваме вашите данни</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Използваме събираните данни единствено за легитимни бизнес цели и за подобряване на вашето потребителско изживяване.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Комуникация с вас:</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>• Изпращане на седмичния бюлетин с най-важните новини</li>
                      <li>• Отговори на ваши запитвания и техническа поддръжка</li>
                      <li>• Известяване за важни актуализации на сайта</li>
                      <li>• Спешни предупреждения за киберсигурност (при заявка)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="TrendingUp" size={24} className="text-cyber-green mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Подобряване на услугата:</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>• Анализ на най-четените теми и категории</li>
                      <li>• Оптимизация на скоростта и производителността</li>
                      <li>• Персонализирани препоръки за съдържание</li>
                      <li>• A/B тестване на нови функционалности</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Shield" size={24} className="text-ai-blue mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Сигурност и защита:</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>• Предотвратяване на злоупотреbi и спам коментари</li>
                      <li>• Защита от DDoS атаки и зловредна активност</li>
                      <li>• Мониториране за необичайна активност</li>
                      <li>• Съблюдаване на законовите изисквания</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="BarChart" size={24} className="text-accent mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Аналитика и статистики:</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>• Анониматизирани статистики за посещаемост</li>
                      <li>• Демографски данни за по-добро таргетиране</li>
                      <li>• Анализ на поведението на потребителите</li>
                      <li>• ROI анализ на съдържанието и рекламите</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success mt-1" />
                <div>
                  <h4 className="font-cta font-semibold text-foreground mb-2">Нашите гаранции</h4>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>✓ Никога не продаваме вашите данни на трети страни</li>
                    <li>✓ Не изпращаме нежелана поща или спам</li>
                    <li>✓ Използваме данните само за заявените цели</li>
                    <li>✓ Предоставяме лесни начини за отписване и изтриване</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cookies':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-cta font-bold text-foreground mb-4">Политика за бисквитки</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Използваме бисквитки за подобряване на вашето изживяване, анализ на трафика и персонализиране на съдържанието. 
                Ето подробна информация за всички видове бисквитки, които използваме.
              </p>
            </div>

            <div className="space-y-4">
              {cookieTypes?.map((cookie, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={cookie?.locked ? 'Lock' : 'Cookie'} 
                        size={24} 
                        className={cookie?.enabled ? 'text-success' : 'text-text-secondary'} 
                      />
                      <div>
                        <h4 className="font-cta font-semibold text-foreground">{cookie?.name}</h4>
                        <p className="text-sm text-text-secondary">{cookie?.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {cookie?.locked ? (
                        <span className="px-3 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                          Задължителни
                        </span>
                      ) : (
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            cookie?.enabled ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              cookie?.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Cookie details based on type */}
                  {cookie?.type === 'essential' && (
                    <div className="text-sm text-text-secondary space-y-2">
                      <p><strong>Цел:</strong> Основни функционалности на сайта, сесии, сигурност</p>
                      <p><strong>Данни:</strong> Session ID, CSRF токени, настройки за достъпност</p>
                      <p><strong>Срок:</strong> До затваране на браузъра или 30 дни</p>
                      <p><strong>Трети страни:</strong> Няма</p>
                    </div>
                  )}

                  {cookie?.type === 'analytics' && (
                    <div className="text-sm text-text-secondary space-y-2">
                      <p><strong>Цел:</strong> Google Analytics за анализ на посещенията и поведението</p>
                      <p><strong>Данни:</strong> Анонимни данни за трафик, време на престой, страници</p>
                      <p><strong>Срок:</strong> 2 години (Google Analytics 4)</p>
                      <p><strong>Трети страни:</strong> Google LLC</p>
                    </div>
                  )}

                  {cookie?.type === 'functional' && (
                    <div className="text-sm text-text-secondary space-y-2">
                      <p><strong>Цел:</strong> Запомняне на предпочитания, език, тема</p>
                      <p><strong>Данни:</strong> Избрани настройки, запазени търсения, любими статии</p>
                      <p><strong>Срок:</strong> 1 година</p>
                      <p><strong>Трети страни:</strong> Няма</p>
                    </div>
                  )}

                  {cookie?.type === 'advertising' && (
                    <div className="text-sm text-text-secondary space-y-2">
                      <p><strong>Цел:</strong> Персонализирани реклами, ремаркетинг</p>
                      <p><strong>Данни:</strong> Интереси, демография, история на разглеждания</p>
                      <p><strong>Срок:</strong> 90 дни</p>
                      <p><strong>Трети страни:</strong> Google AdSense, Facebook</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-cta font-semibold text-foreground mb-4">Управление на бисквитките</h4>
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  Можете да управлявате настройките за бисквитки по всяко време чрез настройките на браузъра или 
                  чрез бутона по-долу. Имайте предвид, че изключването на определени бисквитки може да повлияе 
                  на функционалността на сайта.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Settings"
                    onClick={() => setShowCookieSettings(!showCookieSettings)}
                  >
                    Настройки за бисквитки
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Trash2"
                  >
                    Изчисти всички бисквитки
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                  >
                    Експорт на данните
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-info/10 border border-info/20 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-info mt-1" />
                <div>
                  <h4 className="font-cta font-semibold text-foreground mb-2">За браузърите</h4>
                  <p className="text-text-secondary text-sm mb-3">
                    Можете да управлявате бисквитките директно от браузъра си:
                  </p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• <strong>Chrome:</strong> Settings > Privacy and security > Cookies</li>
                    <li>• <strong>Firefox:</strong> Settings > Privacy & Security > Cookies</li>
                    <li>• <strong>Safari:</strong> Preferences > Privacy > Cookies</li>
                    <li>• <strong>Edge:</strong> Settings > Cookies and site permissions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'user-rights':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-cta font-bold text-foreground mb-4">Вашите права според GDPR</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Като потребител имате законови права относно вашите лични данни. Ето пълния списък с права и 
                как можете да ги упражните.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Eye" size={24} className="text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Право на достъп</h4>
                    <p className="text-text-secondary text-sm mb-3">
                      Имате право да знаете какви лични данни съхраняваме за вас и как ги използваме.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Безплатно</span>
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">До 30 дни</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Edit" size={24} className="text-cyber-green mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Право на корекция</h4>
                    <p className="text-text-secondary text-sm mb-3">
                      Можете да поискате корекция на неточни или непълни лични данни.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-cyber-green/10 text-cyber-green text-xs rounded">Незабавно</span>
                      <span className="px-2 py-1 bg-info/10 text-info text-xs rounded">Верификация</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Trash2" size={24} className="text-destructive mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Право на изтриване ("Право да бъдете забравени")</h4>
                    <p className="text-text-secondary text-sm mb-3">
                      Можете да поискате изтриване на вашите лични данни при определени обстоятелства.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded">Условно</span>
                      <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded">Необратимо</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Pause" size={24} className="text-ai-blue mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Право на ограничаване на обработката</h4>
                    <p className="text-text-secondary text-sm mb-3">
                      Можете да поискате временно спиране на обработката на данни при спорни случаи.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-ai-blue/10 text-ai-blue text-xs rounded">Временно</span>
                      <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded">При спор</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Download" size={24} className="text-accent mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Право на преносимост на данни</h4>
                    <p className="text-text-secondary text-sm mb-3">
                      Можете да получите копие от данните си в структуриран, машинно-четим формат.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">JSON/CSV</span>
                      <span className="px-2 py-1 bg-info/10 text-info text-xs rounded">Преносим</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="XCircle" size={24} className="text-warning mt-1" />
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-3">Право на възражение</h4>
                    <p className="text-text-secondary text-sm mb-3">
                      Можете да възразите срещу обработката на данни за директен маркетинг или легитимни интереси.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded">Директен маркетинг</span>
                      <span className="px-2 py-1 bg-error/10 text-error text-xs rounded">Легитимен интерес</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyber-green/10 to-ai-blue/10 border border-primary/20 rounded-lg p-6">
              <h4 className="font-cta font-semibold text-foreground mb-4">Как да упражните правата си</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Icon name="Mail" size={32} className="text-primary mx-auto mb-2" />
                    <h5 className="font-medium text-foreground mb-1">Имейл заявка</h5>
                    <p className="text-xs text-text-secondary">privacy@linaronews.bg</p>
                  </div>
                  
                  <div className="text-center">
                    <Icon name="FileText" size={32} className="text-primary mx-auto mb-2" />
                    <h5 className="font-medium text-foreground mb-1">Онлайн форма</h5>
                    <p className="text-xs text-text-secondary">Сигурна контактна форма</p>
                  </div>
                  
                  <div className="text-center">
                    <Icon name="Phone" size={32} className="text-primary mx-auto mb-2" />
                    <h5 className="font-medium text-foreground mb-1">Телефон</h5>
                    <p className="text-xs text-text-secondary">+359 888 123 456</p>
                  </div>
                </div>

                <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={16} className="text-info mt-1" />
                    <div>
                      <p className="text-xs text-info font-medium mb-1">Необходима информация за заявката:</p>
                      <ul className="text-xs text-text-secondary space-y-1">
                        <li>• Пълно име и имейл адрес за идентификация</li>
                        <li>• Конкретно право, което искате да упражните</li>
                        <li>• Допълнителни детайли при необходимост</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  variant="default"
                  size="sm"
                  iconName="ExternalLink"
                  className="bg-gradient-to-r from-cyber-green to-ai-blue text-white"
                >
                  Подай заявка за данни
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-text-secondary">Избрете секция от менюто.</div>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Политика за поверителност - Linaro News | GDPR съответствие и защита на данни</title>
        <meta 
          name="description" 
          content="Пълна политика за поверителност на Linaro News. Прозрачност в събирането, използването и защитата на лични данни. GDPR съответствие и права на потребителите." 
        />
        <meta name="keywords" content="политика поверителност, GDPR, защита данни, бисквитки, права потребители, Linaro News, лични данни" />
        <meta property="og:title" content="Политика за поверителност - Linaro News" />
        <meta property="og:description" content="Прозрачна политика за защита на вашите данни с пълно GDPR съответствие и ясни права на потребителите." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://linaronews.bg/privacy-policy" />
        <link rel="canonical" href="https://linaronews.bg/privacy-policy" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Политика за поверителност",
            "description": "Политика за защита на личните данни и поверителност на Linaro News",
            "url": "https://linaronews.bg/privacy-policy",
            "publisher": {
              "@type": "Organization",
              "name": "Linaro News"
            },
            "lastReviewed": "2024-09-24"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12 lg:py-16">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                  <Icon name="Shield" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">GDPR съответствие</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-headline font-bold text-foreground mb-4">
                  Политика за{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    поверителност
                  </span>
                </h1>
                
                <p className="text-lg text-text-secondary leading-relaxed">
                  Прозрачност, сигурност и уважение към вашата поверителност са в основата на нашата дейност. 
                  Научете как защитаваме вашите данни и какви права имате.
                </p>
                
                <div className="flex items-center justify-center space-x-6 mt-6">
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="Check" size={16} />
                    <span className="text-sm font-medium">GDPR Ready</span>
                  </div>
                  <div className="flex items-center space-x-2 text-primary">
                    <Icon name="Shield" size={16} />
                    <span className="text-sm font-medium">SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2 text-info">
                    <Icon name="Globe" size={16} />
                    <span className="text-sm font-medium">EU Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-card border border-border rounded-xl p-4">
                    <h3 className="font-cta font-bold text-foreground mb-4">Съдържание</h3>
                    <nav className="space-y-2">
                      {sections?.map((section) => (
                        <button
                          key={section?.id}
                          onClick={() => setActiveSection(section?.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeSection === section?.id
                              ? 'bg-primary text-primary-foreground'
                              : 'text-text-secondary hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <Icon name={section?.icon} size={16} />
                          <span className="text-left flex-1">{section?.title}</span>
                        </button>
                      ))}
                    </nav>

                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="text-xs text-text-secondary space-y-2">
                        <p className="font-medium">Последна актуализация:</p>
                        <p>24 септември 2024 г.</p>
                        <p className="font-medium">Версия:</p>
                        <p>2.1.0</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="bg-card border border-border rounded-xl p-8">
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="bg-card/80 backdrop-blur border border-border/50 rounded-xl p-8">
                <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-6" />
                
                <h2 className="text-2xl font-headline font-bold text-foreground mb-4">
                  Имате въпроси за поверителността?
                </h2>
                
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Нашият екип по защита на данните е готов да отговори на всички ваши въпроси 
                  относно събирането, използването и защитата на лични данни.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Mail"
                    className="bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    privacy@linaronews.bg
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Phone"
                  >
                    +359 888 123 456
                  </Button>
                </div>

                <div className="mt-6 text-xs text-text-secondary">
                  <p>
                    Отговор в рамките на 48 часа | Безплатни консултации | Професионална поддръжка
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;