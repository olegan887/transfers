import React, { useState, useEffect } from 'react';
import { Settings, Database, AlertCircle, CheckCircle2, X, ExternalLink, HelpCircle, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminPanel() {
  const { googleScriptUrl, updateGoogleScriptUrl, errorDetails } = useData();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [urlInput, setUrlInput] = useState(googleScriptUrl);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    setUrlInput(googleScriptUrl);
  }, [googleScriptUrl]);

  const handleSave = async () => {
    if (!urlInput.trim()) {
      setSaveStatus(language === 'ru' ? 'Ошибка: URL не может быть пустым' : 'Error: URL cannot be empty');
      return;
    }
    await updateGoogleScriptUrl(urlInput);
    setSaveStatus(language === 'ru' ? 'URL успешно обновлен и сохранен!' : 'URL updated and saved successfully!');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const handleTestConnection = async () => {
    if (!urlInput.trim()) {
      setTestStatus('error');
      setTestMessage(language === 'ru' ? 'Пожалуйста, введите URL для проверки' : 'Please enter a URL to test');
      return;
    }

    setTestStatus('testing');
    setTestMessage(language === 'ru' ? 'Идет проверка подключения...' : 'Testing connection...');

    try {
      const cleanedUrl = urlInput.trim().replace(/^["']|["']$/g, '');
      const separator = cleanedUrl.includes('?') ? '&' : '?';
      const fetchUrl = `${cleanedUrl}${separator}t=${new Date().getTime()}`;

      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.result === 'success' || data.routes) {
        setTestStatus('success');
        setTestMessage(
          language === 'ru'
            ? `Связь успешно установлена! Найдено маршрутов: ${data.routes?.length || 0}`
            : `Success! Connection verified. Found ${data.routes?.length || 0} routes.`
        );
      } else {
        setTestStatus('error');
        setTestMessage(data.message || (language === 'ru' ? 'Неверный формат ответа от Google Sheets.' : 'Invalid response format from Google Sheets.'));
      }
    } catch (err: any) {
      console.error('Test connection failed:', err);
      setTestStatus('error');
      setTestMessage(err.message || 'Failed to fetch. CORS block or invalid URL.');
    }
  };

  return (
    <>
      {/* Floating Settings Gear (Bottom Left) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-yellow-400 text-black rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all duration-200"
        title={language === 'ru' ? 'Настройки Google Таблиц (База данных)' : 'Google Sheets Developer Settings'}
        id="dev-settings-button"
      >
        <Settings className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden text-black z-50"
              id="admin-panel-modal"
            >
              {/* Header */}
              <div className="bg-yellow-400 p-4 border-b-4 border-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-black" />
                  <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight">
                    {language === 'ru' ? 'Связь с Google Таблицами' : 'Google Sheets Connection'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-black bg-white hover:bg-red-400 rounded-md border-2 border-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {language === 'ru'
                    ? 'Ваш сайт получает цены, маршруты и занятые даты напрямую из Google Таблицы. Этот пульт управления позволяет подключить вашу личную таблицу.'
                    : 'This website dynamically pulls pricing, route availability, and blocked times from Google Sheets. Setup your App Script Web App URL below.'}
                </p>

                {/* Input block */}
                <div className="space-y-2 mb-6">
                  <label className="block text-xs font-black uppercase tracking-wider text-black">
                    {language === 'ru' ? 'Ссылка Google Script Web App URL:' : 'Google Script Web App URL:'}
                  </label>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full brutal-input px-3 py-3 font-mono text-xs bg-white text-black border-2 border-black rounded-lg"
                  />
                </div>

                {/* Status indicator on load errors */}
                {errorDetails && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-black rounded-lg flex items-start gap-2 text-black text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-black" />
                    <div>
                      <p className="uppercase font-black">{language === 'ru' ? 'Текущая ошибка связи:' : 'Current Connection Error:'}</p>
                      <p className="opacity-90 mt-0.5 font-normal">{errorDetails}</p>
                    </div>
                  </div>
                )}

                {/* Buttons block */}
                <div className="flex flex-col sm:flex-row gap-3 min-h-[44px]">
                  <button
                    onClick={handleTestConnection}
                    disabled={testStatus === 'testing'}
                    className="flex-1 brutal-btn bg-gray-100 hover:bg-gray-200 text-black py-2.5 text-xs flex items-center justify-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                    {language === 'ru' ? 'Проверить соединение' : 'Test Connection'}
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex-1 brutal-btn bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 text-xs font-black uppercase"
                  >
                    {language === 'ru' ? 'Сохранить и Синхронизировать' : 'Save & Sync'}
                  </button>
                </div>

                {/* Save Feedback */}
                {saveStatus && (
                  <div className="mt-4 p-3 bg-green-100 border-2 border-black rounded-lg flex items-center gap-2 text-xs font-bold text-green-800">
                    <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                    <span>{saveStatus}</span>
                  </div>
                )}

                {/* Test Connection Results */}
                {testStatus !== 'idle' && (
                  <div className={`mt-4 p-4 border-2 border-black rounded-lg text-xs font-bold ${
                    testStatus === 'success' ? 'bg-green-100 text-green-800' :
                    testStatus === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-blue-50 text-blue-800'
                  }`}>
                    <div className="flex items-start gap-2">
                      {testStatus === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-green-700 mt-0.5" />}
                      {testStatus === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-red-700 mt-0.5" />}
                      <div>
                        <p className="uppercase font-black">
                          {testStatus === 'success' ? (language === 'ru' ? 'Успешно!' : 'Success!') :
                           testStatus === 'error' ? (language === 'ru' ? 'Ошибка связи!' : 'Connection Error!') :
                           (language === 'ru' ? 'Проверка...' : 'Verification...')}
                        </p>
                        <p className="font-mono text-[11px] font-normal mt-1 leading-relaxed">{testMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Multi-browser Warning / Call to Action */}
                <div id="multi-browser-tip" className="mt-6 p-4 bg-yellow-50 border-2 border-dashed border-yellow-600 rounded-lg text-xs leading-normal">
                  <p className="font-bold uppercase text-yellow-800 mb-1.5 flex items-center gap-1.5">
                    <Database className="w-4 h-4 shrink-0 text-yellow-700" />
                    {language === 'ru' ? 'Как сделать эту ссылку постоянной для всех посетителей?' : 'How to make this link default for all visitors?'}
                  </p>
                  <p className="text-gray-700 mb-2">
                    {language === 'ru' 
                      ? 'Кнопка выше сохраняет ссылку только на вашем текущем устройстве и браузере (в localStorage). При открытии в другом браузере или у клиентов сайта ссылка сбросится на стандартную.' 
                      : 'The button above saves the URL only inside your current browser (localStorage). Other devices, browsers, and layout visitors will fall back to the default URL.'}
                  </p>
                  <p className="text-gray-900 font-bold">
                    {language === 'ru'
                      ? '👉 Чтобы настроить раз и навсегда для всех: Просто скопируйте вашу ссылку на Web App и отправьте её ИИ-помощнику в чат! Он мгновенно пропишет её в файл src/config.ts и опубликует рабочую версию для всех посетителей автоматически.'
                      : '👉 To make it default for everyone: Simply copy your final App Script URL and reply with it here in this chat! The AI assistant will update src/config.ts and build+redeploy the site automatically.'}
                  </p>
                </div>

                {/* Setup FAQ */}
                <div className="mt-8 border-t-2 border-black pt-6">
                  <h4 className="font-black text-sm uppercase mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    {language === 'ru' ? 'Инструкция по настройке Google Таблицы' : 'Google Sheets Integration Guide'}
                  </h4>
                  <ol className="text-xs text-gray-700 space-y-2.5 list-decimal pl-4 leading-normal">
                    <li>
                      {language === 'ru' ? (
                        <>
                          Откройте вашу Google Таблицу и выберите <strong>Расширения &rarr; Apps Script</strong>.
                        </>
                      ) : (
                        <>
                          Open your Google Sheet and click <strong>Extensions &rarr; Apps Script</strong>.
                        </>
                      )}
                    </li>
                    <li>
                      {language === 'ru' ? (
                        <>
                          Вставьте код скрипта Google Apps Script в редактор и сохраните.
                        </>
                      ) : (
                        <>
                          Paste your App Script code into the project editor and save.
                        </>
                      )}
                    </li>
                    <li>
                      {language === 'ru' ? (
                        <>
                          Нажмите кнопку <strong>Начать развертывание &rarr; Новое развертывание</strong>.
                        </>
                      ) : (
                        <>
                          Click blue <strong>Deploy &rarr; New deployment</strong> button.
                        </>
                      )}
                    </li>
                    <li>
                      {language === 'ru' ? (
                        <>
                          Выберите тип: <strong>Веб-приложение</strong>. Установите:
                          <ul className="list-disc pl-4 mt-1 space-y-1">
                            <li>Запуск от имени: <strong>Я (Ваша почта)</strong></li>
                            <li>У кого есть доступ: <strong>Все (Anyone)</strong></li>
                          </ul>
                        </>
                      ) : (
                        <>
                          Select type: <strong>Web App</strong>. Set permissions:
                          <ul className="list-disc pl-4 mt-1 space-y-1">
                            <li>Execute as: <strong>Me (your-email)</strong></li>
                            <li>Who has access: <strong>Anyone</strong></li>
                          </ul>
                        </>
                      )}
                    </li>
                    <li>
                      {language === 'ru' ? (
                        <>
                          Разверните, предоставьте разрешения в Google и скопируйте <strong>URL веб-приложения</strong>.
                        </>
                      ) : (
                        <>
                          Deploy, grant required script permissions, and copy the final <strong>Web App URL</strong>.
                        </>
                      )}
                    </li>
                    <li>
                      {language === 'ru' ? (
                        <>
                          Вставьте полученный URL в верхнее поле ввода в этом окне и нажмите <strong>Сохранить и Синхронизировать</strong>.
                        </>
                      ) : (
                        <>
                          Paste the copied URL in the input box above and click <strong>Save & Sync</strong>.
                        </>
                      )}
                    </li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
