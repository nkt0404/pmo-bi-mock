import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  X, 
  Send, 
  Bot, 
  ChevronDown,
  Paperclip,
  AlertTriangle,
  Clock,
  Target
} from 'lucide-react';

interface Message {
  id: string;
  type: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

interface AIAgentChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAgentChat: React.FC<AIAgentChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'こんにちは！PMダッシュボード分析エージェントです。\n\n現在のプロジェクト状況を分析して、**意思決定が必要な重要事項**と**推奨される方針**をご提案いたします。\n\n分析を開始いたしますので、少々お待ちください...',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // AIエージェントの初期分析を自動実行
      setTimeout(() => {
        generateAIAnalysis();
      }, 1500);
    }
  }, [isOpen]);

  const generateAIAnalysis = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      const analysisMessage = `## 🎯 PM意思決定依頼事項

### ⚠️ 緊急度：高 - 今週中にご回答をお願いします

---

### 📊 **プロジェクトA進捗遅延への対応方針**

**状況**: プロジェクトAが予定より2週間遅延しており、全体スケジュールに影響が出る可能性があります。

**選択肢**:
1. **追加リソース投入** (推奨)
   - 2名の開発者を追加投入
   - 予算増額：+500万円
   - 遅延解消：2週間短縮

2. **スコープ縮小**
   - 機能A-3の削除
   - 予算変更なし
   - 遅延解消：1週間短縮

3. **スケジュール延長**
   - リリース日を2週間延期
   - 予算変更なし
   - 他プロジェクトへの影響あり

---

### 🎯 **品質指標低下への対策**

**状況**: バグ発生率が目標値の1.5倍に増加しています。

**選択肢**:
1. **品質チェック強化** (推奨)
   - テスト工数を20%増加
   - 予算増額：+200万円
   - 効果：バグ発生率50%削減

2. **現状維持**
   - 変更なし
   - リスク：顧客満足度低下

---

### 🤝 **チーム間調整体制の見直し**

**状況**: チーム間の情報共有不足により、作業の重複が発生しています。

**選択肢**:
1. **週次調整会議の実施** (推奨)
   - 毎週金曜日14:00-15:00
   - 参加者：全チームリーダー
   - 効果：作業効率15%向上

2. **月次調整会議**
   - 毎月第1金曜日
   - 参加者：PMのみ
   - 効果：作業効率5%向上

---

### 💡 **総合推奨事項**

**最優先**: プロジェクトAへの追加リソース投入
**中優先**: 品質チェック強化の実施
**低優先**: 週次調整会議の開始

---

**ご回答をお願いします**:
- 各項目について、どの方針を選択されますか？
- 実施時期はいつ頃を予定されていますか？
- 追加でご相談したい事項はございますか？

ご不明な点がございましたら、お気軽にお聞かせください。`;

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'agent',
        content: analysisMessage,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // AI応答のシミュレーション
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'ご回答ありがとうございます。\n\n選択された方針に基づいて、具体的な実施計画を策定いたします。\n\n追加のご質問やご相談がございましたら、いつでもお聞かせください。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 w-[500px] h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl border border-blue-200 flex flex-col backdrop-blur-sm"
        >
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-4 border-b border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">PMO AI Agent</span>
                <div className="text-blue-100 text-xs">意思決定サポート</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/50 to-indigo-50/50">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white/80 backdrop-blur-sm border border-blue-200 text-gray-800'
                  }`}
                >
                  {message.type === 'agent' ? (
                    <div className="text-sm prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          h2: ({ children }) => (
                            <h2 className="text-lg font-bold mb-3 text-blue-700 flex items-center">
                              <Target className="w-4 h-4 mr-2" />
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-base font-semibold mb-2 text-blue-600 flex items-center">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold text-blue-700">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          hr: () => <hr className="border-blue-200 my-4" />
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-sm">{message.content}</div>
                  )}
                  <div className={`text-xs mt-2 flex items-center ${
                    message.type === 'user' ? 'text-blue-100' : 'text-blue-500'
                  }`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {message.timestamp.toLocaleTimeString('ja-JP', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-blue-200 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-blue-600">分析中...</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <div className="p-4 border-t border-blue-200 bg-white/50 backdrop-blur-sm rounded-b-2xl">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-blue-100 rounded-full transition-colors">
                <Paperclip className="w-4 h-4 text-blue-600" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="ご回答やご質問を入力してください..."
                className="flex-1 px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIAgentChat; 