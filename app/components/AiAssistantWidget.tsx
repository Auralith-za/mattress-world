import React, { useState } from 'react';
import { Bot, X, Send, ChevronRight, MessageSquare } from 'lucide-react';
import { Product } from '~/types';
import { formatPrice, getStartingPrice } from '~/utils/formatters';

interface AiAssistantWidgetProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  suggestedProducts?: Product[];
}

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({ products, onSelectProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your Mattress World Sleep Consultant. Ask me about weight ratings, back pain support, Cloud Nine beds, or custom bed set pricing!',
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let replyText = '';
      let matches: Product[] = [];
      const lower = query.toLowerCase();

      if (lower.includes('150kg') || lower.includes('heavy') || lower.includes('big')) {
        matches = products.filter((p) => p.weightLimitKg >= 150);
        replyText = `For 150kg per person weight capacity, I strongly recommend our flagship heavy-duty models. They feature reinforced rebond foam and heavy gauge coils to ensure zero sagging:`;
      } else if (lower.includes('cloud nine') || lower.includes('strandmattress')) {
        matches = products.filter((p) => p.brand === 'Cloud Nine');
        replyText = `Cloud Nine is South Africa's premier foam mattress manufacturer. Here are top Cloud Nine models with warranties up to 25 years:`;
      } else if (lower.includes('ortho') || lower.includes('back pain') || lower.includes('spine')) {
        matches = products.filter((p) => p.category === 'Orthopedic' || p.range.includes('Ortho'));
        replyText = `For back pain and spinal support, our Ortho Sleep Range is specifically engineered with chiropractor guidance:`;
      } else if (lower.includes('pocket') || lower.includes('partner') || lower.includes('motion')) {
        matches = products.filter((p) => p.category === 'Pocket Spring');
        replyText = `Pocket spring mattresses use individually encased coils to prevent motion transfer across the bed:`;
      } else if (lower.includes('cheap') || lower.includes('budget') || lower.includes('under 5000')) {
        matches = products
          .filter((p) => getStartingPrice(p) < 6000)
          .sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
        replyText = `Here are our best value beds and mattresses starting under R6,000 without compromising quality:`;
      } else {
        matches = products.slice(0, 3);
        replyText = `Thank you for asking! Based on our catalog, here are three of our top customer-rated sleep systems:`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          suggestedProducts: matches.slice(0, 3),
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#1B2845] hover:bg-[#141E34] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs transition-all hover:scale-105 border border-[#DECB54]"
        >
          <MessageSquare className="w-5 h-5 text-[#DECB54]" />
          <span className="hidden sm:inline">Ask Sleep Consultant</span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden h-[500px] text-slate-800">
          {/* Header */}
          <div className="bg-[#1B2845] p-4 text-white flex items-center justify-between shadow">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 border border-[#DECB54]">
                <Bot className="w-5 h-5 text-[#DECB54]" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-serif text-white">Live Sleep Consultant</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online • Ready to help
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#1B2845] text-[#DECB54] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#1B2845] text-white font-medium rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>

                  {/* Product Cards inside chat */}
                  {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {msg.suggestedProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => onSelectProduct(p)}
                          className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between gap-2 hover:border-[#1B2845] cursor-pointer transition-all"
                        >
                          <div className="min-w-0">
                            <span className="text-[9px] text-[#B89628] font-bold uppercase">{p.brand}</span>
                            <h6 className="text-[11px] font-bold text-[#1B2845] truncate">{p.name}</h6>
                            <span className="text-[10px] text-slate-500 font-semibold">From {formatPrice(getStartingPrice(p))}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#1B2845] shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSend('Show 150kg weight limit beds')}
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-200 font-semibold"
            >
              💪 150kg Beds
            </button>
            <button
              onClick={() => handleSend('Cloud Nine mattress options')}
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-200 font-semibold"
            >
              ☁️ Cloud Nine
            </button>
            <button
              onClick={() => handleSend('Best for back pain')}
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-200 font-semibold"
            >
              🩹 Back Support
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Sleep Consultant..."
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#1B2845]"
            />
            <button
              onClick={() => handleSend()}
              className="bg-[#1B2845] text-white p-2 rounded-xl"
            >
              <Send className="w-4 h-4 text-[#DECB54]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
