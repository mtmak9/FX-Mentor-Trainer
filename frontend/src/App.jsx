import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

// --- Ikony SVG dla nowoczesnego wyglądu ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const AiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>;


// --- Komponenty UI ---

const Sidebar = () => (
  <aside className="w-20 lg:w-64 bg-gray-900 text-gray-300 flex flex-col items-center lg:items-start p-4 space-y-6 shrink-0">
    <div className="text-white text-2xl font-bold flex items-center w-full justify-center lg:justify-start">
      <span className="text-3xl text-cyan-400">A</span>
      <span className="hidden lg:inline ml-2">AIMentor</span>
    </div>
    <nav className="w-full flex flex-col items-center lg:items-stretch space-y-2">
      <a href="#" className="flex items-center p-3 rounded-lg bg-gray-700 text-white">
        <HomeIcon />
        <span className="hidden lg:inline ml-4">Dashboard</span>
      </a>
      <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors">
        <ChartIcon />
        <span className="hidden lg:inline ml-4">Analizy</span>
      </a>
      <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors">
        <WalletIcon />
        <span className="hidden lg:inline ml-4">Portfel</span>
      </a>
      <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors">
        <SettingsIcon />
        <span className="hidden lg:inline ml-4">Ustawienia</span>
      </a>
    </nav>
    <div className="mt-auto w-full p-4 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-lg text-center hidden lg:block">
        <h3 className="font-bold text-white">Przejdź na PRO</h3>
        <p className="text-sm text-white/80 mt-1">Odblokuj pełną moc AI!</p>
        <button className="w-full mt-4 bg-white text-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">Upgrade</button>
    </div>
  </aside>
);

const Header = () => (
  <header className="flex justify-between items-center p-4 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="text-sm text-gray-400">Witaj z powrotem, Trader!</p>
    </div>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input type="text" placeholder="Szukaj pary walutowej..." className="bg-gray-700 text-white rounded-full py-2 px-4 w-64 hidden md:block focus:outline-none focus:ring-2 focus:ring-cyan-400" />
      </div>
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-gray-800"></span>
      </div>
      <img src="https://placehold.co/40x40/7dd3fc/0f172a?text=U" alt="User Avatar" className="w-10 h-10 rounded-full" />
    </div>
  </header>
);

const TradingChart = ({ onNewTick }) => {
  const chartContainerRef = useRef();
  const [currentPair, setCurrentPair] = useState('EUR/USD');
  const [currentPrice, setCurrentPrice] = useState(1.0855);
  const candleSeriesRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1f2937' },
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: { color: '#2a3546' },
        horzLines: { color: '#2a3546' },
      },
      crosshair: { mode: 'normal' },
      rightPriceScale: { borderColor: '#4b5563' },
      timeScale: { borderColor: '#4b5563' },
    });

    candleSeriesRef.current = chart.addCandlestickSeries({
      upColor: '#22c55e', downColor: '#ef4444',
      borderDownColor: '#ef4444', borderUpColor: '#22c55e',
      wickDownColor: '#ef4444', wickUpColor: '#22c55e',
    });

    // Generowanie danych historycznych
    let lastClose = 1.0855;
    const initialData = Array.from({ length: 100 }, (_, i) => { // Dodano 'i' jako indeks
        const open = lastClose;
        const close = open + (Math.random() - 0.5) * 0.001;
        const high = Math.max(open, close) + Math.random() * 0.0005;
        const low = Math.min(open, close) - Math.random() * 0.0005;
        lastClose = close;
        const time = new Date();
        // POPRAWKA: Używamy indeksu 'i' zamiast 'initialData.length'
        time.setMinutes(time.getMinutes() - 100 + i);
        return { time: time.getTime() / 1000, open, high, low, close };
    });
    candleSeriesRef.current.setData(initialData);

    // Symulacja ticków w czasie rzeczywistym
    const interval = setInterval(() => {
        // Ta część kodu pozostaje bez zmian, ale teraz 'initialData' jest poprawnie zainicjalizowane
        const lastDataPoint = initialData[initialData.length - 1];
        const open = lastDataPoint.close;
        const close = open + (Math.random() - 0.5) * 0.0002;
        const high = Math.max(open, close) + Math.random() * 0.0001;
        const low = Math.min(open, close) - Math.random() * 0.0001;
        const newTick = { time: new Date().getTime() / 1000, open, high, low, close };
        
        candleSeriesRef.current.update(newTick);
        initialData.push(newTick);
        setCurrentPrice(newTick.close);
        onNewTick(newTick); // Przekazanie nowego ticku do rodzica (App)
    }, 2000);

    const handleResize = () => chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [onNewTick]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{currentPair}</h2>
          <p className={`text-lg font-semibold ${currentPrice > 1.0855 ? 'text-green-400' : 'text-red-400'}`}>{currentPrice.toFixed(5)}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-gray-700 text-white rounded-md">1H</button>
          <button className="px-3 py-1 text-sm bg-cyan-500 text-white rounded-md">4H</button>
          <button className="px-3 py-1 text-sm bg-gray-700 text-white rounded-md">1D</button>
          <button className="px-3 py-1 text-sm bg-gray-700 text-white rounded-md">1W</button>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};

const MarketWatch = () => {
    // Dane są statyczne w tym prototypie
    const pairs = [
        { name: 'EUR/USD', price: 1.0855, change: '+0.12%', trend: 'up' },
        { name: 'GBP/USD', price: 1.2710, change: '-0.05%', trend: 'down' },
        { name: 'USD/JPY', price: 157.25, change: '+0.25%', trend: 'up' },
        { name: 'AUD/USD', price: 0.6650, change: '+0.08%', trend: 'up' },
        { name: 'USD/CAD', price: 1.3680, change: '-0.15%', trend: 'down' },
    ];
    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">Obserwowane Rynki</h3>
            <div className="space-y-3">
                {pairs.map(pair => (
                    <div key={pair.name} className="flex justify-between items-center">
                        <span className="font-semibold text-white">{pair.name}</span>
                        <div className="text-right">
                            <span className="text-white">{pair.price.toFixed(4)}</span>
                            <span className={`ml-2 text-sm font-bold ${pair.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                {pair.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AiInsightPanel = ({ lastTick }) => {
    // Symulacja predykcji AI na podstawie ostatniego ticku
    const [prediction, setPrediction] = useState("Oczekiwanie na dane...");

    useEffect(() => {
        if (lastTick) {
            // Prosta, symulowana logika: jeśli cena rośnie, sugeruj KUP, w przeciwnym razie SPRZEDAJ
            const trend = lastTick.close > lastTick.open ? "KUP" : "SPRZEDAJ";
            const confidence = Math.random() * (95 - 75) + 75; // Losowa pewność między 75% a 95%
            setPrediction(`Sygnał AI: ${trend} (Pewność: ${confidence.toFixed(1)}%)`);
        }
    }, [lastTick]);

    return (
    <div className="bg-gray-900 p-6 rounded-lg space-y-6 h-full flex flex-col">
        <h2 className="text-xl font-bold text-white flex items-center">
            <AiIcon />
            Analiza AI dla EUR/USD
        </h2>

        <div>
            <h3 className="font-semibold text-cyan-400 mb-2">Analiza Trendu</h3>
            <div className="flex items-center space-x-3">
                <span className="text-3xl">📈</span>
                <div>
                    <p className="text-white font-bold">{prediction}</p>
                    <p className="text-sm text-gray-400">Analiza na podstawie ostatniego ticku.</p>
                </div>
            </div>
        </div>

        <div>
            <h3 className="font-semibold text-cyan-400 mb-2">Sentyment Rynkowy (Symulowany)</h3>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full" style={{width: '75%'}}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Negatywny</span>
                <span>Neutralny</span>
                <span>Pozytywny</span>
            </div>
             <p className="text-sm text-gray-300 mt-2">Sentyment jest w większości byczy, napędzany pozytywnymi danymi z UE.</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg flex-grow">
            <h3 className="font-bold text-white mb-2">Dlaczego tak się dzieje? (Wyjaśnienie AI)</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
                Rynek EUR/USD doświadcza silnego impetu wzrostowego. Głównym powodem jest przebicie psychologicznego i technicznego poziomu oporu na **1.0850**. 
                <br/><br/>
                Dodatkowo, wskaźnik RSI (niepokazany na wykresie) zbliża się do strefy wykupienia (ok. 70), co sugeruje, że obecny ruch jest bardzo silny, ale może być podatny na krótkoterminową korektę.
                <br/><br/>
                **Ryzyko:** Uważaj na ewentualne "fałszywe wybicie". Potwierdzeniem trendu będzie utrzymanie się ceny powyżej 1.0850 na zamknięciu dzisiejszej sesji.
            </p>
        </div>
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Generuj pełny raport
        </button>
    </div>
)};


// --- Główny komponent aplikacji ---

export default function App() {
  const [lastTick, setLastTick] = useState(null);

  // Funkcja callback, którą przekażemy do komponentu wykresu
  const handleNewTick = (tick) => {
    setLastTick(tick);
  };

  return (
    <div className="flex h-screen bg-gray-900 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <TradingChart onNewTick={handleNewTick} />
            <MarketWatch />
          </div>
          <div className="lg:col-span-1 h-full">
            <AiInsightPanel lastTick={lastTick} />
          </div>
        </div>
      </main>
    </div>
  );
}
