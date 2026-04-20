import { exosomeArticles, therapyCosts, type ExosomeArticle } from "@/data/exosome-news";
import { BookOpen, DollarSign, ExternalLink, Newspaper, TrendingUp } from "lucide-react";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  Partnership: "bg-blue-50 text-blue-700 border-blue-200",
  Clinical: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Industry: "bg-purple-50 text-purple-700 border-purple-200",
  Regulatory: "bg-amber-50 text-amber-700 border-amber-200",
  Cosmeceutical: "bg-pink-50 text-pink-700 border-pink-200",
  Manufacturing: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Research: "bg-sky-50 text-sky-700 border-sky-200",
};

export function ExosomeNews() {
  const [subTab, setSubTab] = useState<"news" | "costs">("news");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Exosome Industry Intelligence
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Market news, therapy costs, and industry developments.
            Source: <a href="https://bioinformant.com/category/exosomes/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BioInformant</a>
          </p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSubTab("news")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              subTab === "news" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Newspaper className="w-4 h-4" /> News
          </button>
          <button
            onClick={() => setSubTab("costs")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              subTab === "costs" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <DollarSign className="w-4 h-4" /> Therapy Costs
          </button>
        </div>
      </div>

      {subTab === "news" && (
        <div className="space-y-3">
          {exosomeArticles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-gray-200/60 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${categoryColors[article.category] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                      {article.category}
                    </span>
                    <span className="text-[11px] text-gray-400">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{article.summary}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5">{article.source}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
              </div>
            </a>
          ))}

          <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-4 text-center">
            <a
              href="https://bioinformant.com/category/exosomes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-700 hover:underline flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              View Full Exosome Archive (27 pages, 270+ articles) on BioInformant
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {subTab === "costs" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200/60 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200/60">
              <h3 className="text-sm font-semibold text-gray-900">{therapyCosts.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Source: <a href={therapyCosts.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BioInformant</a>
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {therapyCosts.categories.map((cat, i) => (
                <div key={i} className="p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{cat.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{cat.notes}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200/60">
                      {cat.range}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Key Facts for Patients and Investors
            </h4>
            <ul className="space-y-1.5">
              {therapyCosts.keyFacts.map((fact, i) => (
                <li key={i} className="text-xs text-amber-700 leading-relaxed flex gap-2">
                  <span className="text-amber-400 shrink-0 mt-0.5">&#x2022;</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
